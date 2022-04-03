import { Sequelize } from "sequelize/types";
import { MigrationParams } from "umzug";

export type Migration = (
	params: MigrationParams<Sequelize>
) => Promise<unknown>;
