/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyPluginCallback } from "fastify";
import { SocketStream } from "fastify-websocket";
import { resolve } from "path";
import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";
import { connectDB } from "../../lib/db";

const initDatabase: FastifyPluginCallback = (server, options, done) => {
	server.get(
		"/init-database",
		{
			websocket: true,
		},
		async (connection: SocketStream, res) => {
			let db: Sequelize;

			connection.socket.on("message", async (message) => {
				try {
					const data = JSON.parse(message.toString());

					if (data.type == "conn") {
						let {
							provider,
							host,
							port,
							username,
							password,
							table,
							filename,
						} = data.payload;

						db = connectDB({
							provider,
							host,
							port,
							username,
							password,
							table,
							filename,
						});

						const log = (level: string, message: any) => {
							try {
								for (const [key, value] of Object.entries(
									message
								)) {
									connection.socket.send(
										JSON.stringify({
											type: "msg",
											payload: `${level.toUpperCase()}: ${key} ${JSON.stringify(
												value as any
											).toString()}`,
										})
									);
								}
							} catch (e) {}
						};

						await db.authenticate({
							logging: (sql: any, timing: any) => {
								log("debug", { sql, timing });
							},
						});

						const umzug = new Umzug({
							migrations: {
								glob: resolve(
									process.cwd(),
									"migrations",
									"*.ts"
								),
							},
							context: db.getQueryInterface(),
							storage: new SequelizeStorage({ sequelize: db }),
							logger: {
								info: (message) => log("info", message),
								warn: (message) => log("warn", message),
								error: (message) => log("error", message),
								debug: (message) => log("debug", message),
							},
						});

						await umzug.up();
					}
				} catch (e: any) {
					connection.socket.send(
						JSON.stringify({
							type: "msg",
							payload: `ERROR: ${e.toString()}`,
						})
					);
				}
			});
		}
	);

	done();
};

export default initDatabase;
