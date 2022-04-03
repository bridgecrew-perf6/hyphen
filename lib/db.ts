/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Sequelize } from "sequelize";

export const connectDB = ({
	provider,
	host,
	port,
	username,
	password,
	table,
	filename,
}: {
	provider: string;
	host?: string;
	port?: number;
	username?: string;
	password?: string;
	table?: string;
	filename?: string;
}): Sequelize => {
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

	if (provider == "sqlite") {
		return new Sequelize({
			storage: filename,
			dialect: provider,
		});
	} else {
		if (!table) throw new Error("table not set");

		return new Sequelize(table, username as any, password as any, {
			host,
			port,
			dialect: provider as any,
		});
	}
};
