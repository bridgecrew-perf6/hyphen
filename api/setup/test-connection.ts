/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyPluginCallback } from "fastify";
import { Sequelize } from "sequelize";
import { connectDB } from "../../lib/db";

const testConnection: FastifyPluginCallback = (server, options, done) => {
	server.post(
		"/test-database-connection",
		{
			schema: {
				body: {
					properties: {
						provider: { type: "string" },
						host: { type: "string" },
						port: { type: "number" },
						username: { type: "string" },
						password: { type: "string" },
						table: { type: "string" },
						filename: { type: "string" },
					},
				},
			},
		},
		async (req, res) => {
			let { provider, host, port, username, password, table, filename } =
				req.body as any;

			if (
				provider == "postgres" ||
				provider == "cockroachdb" ||
				provider == "redshift"
			) {
				provider = "postgres";
			}

			if (provider == "mssql") {
				provider = "tedious";
			}

			let db: Sequelize | any;
			const pipe: any[] = [];

			try {
				if (provider == "sqlite") {
					pipe.push(`Connecting to ${filename}...`);
				} else {
					pipe.push(`Connecting to ${host}:${port}...`);
					pipe.push(
						`Using credentials ${username}:${[
							...Array(password.length),
						]
							.map((i) => "*")
							.join("")}.`
					);
				}

				db = connectDB({
					provider,
					host,
					port,
					username,
					password,
					table,
					filename,
				});

				pipe.push(`Initialised client.`);

				await db.authenticate({
					logging: (sql: any, timing: any) => {
						pipe.push(`${sql} (${JSON.stringify(timing)})`);
					},
				});

				pipe.push(`Successfully authenticated.`);

				await db.close();

				pipe.push(`Closing session...`);
			} catch (e: any) {
				await db.close();

				res.status(500);
				res.send({
					ok: false,
					message: e.message,
				});

				return;
			}

			res.send({
				ok: true,
				message: pipe.join("\n"),
			});
		}
	);

	done();
};

export default testConnection;
