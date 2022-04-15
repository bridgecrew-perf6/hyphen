/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Ajv, { JSONSchemaType } from "ajv";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { ensureDirSync } from "fs-extra";
import { resolve } from "path";
import XDGAppPaths from "xdg-app-paths";

interface Configuration {
	"server.url"?: string;
}
export const configSchema: JSONSchemaType<Configuration> = {
	type: "object",
	properties: {
		"server.url": { type: "string", nullable: true },
	},
	additionalProperties: false,
};

export const defaultConfig: Configuration = {};

const globalConfigDir = new XDGAppPaths({ name: "hyphen" }).config();

export const getConfigPath = (scope: "local" | "global") => {
	const globalConfigPath = resolve(globalConfigDir, "hyphen.json");
	const localConfigPath = resolve(process.cwd(), "hyphen.json");

	return scope == "local" ? localConfigPath : globalConfigPath;
};

export const getConfig = (scope: "local" | "global") => {
	const configPath = getConfigPath(scope);

	if (!existsSync(configPath)) {
		if (scope == "global") ensureDirSync(globalConfigDir);

		return defaultConfig;
	}

	const configData = readFileSync(configPath, "utf-8");

	try {
		JSON.parse(configData);
	} catch (e) {
		throw new Error(
			`Failed to parse${
				scope == "local" ? "" : "global"
			} Hyphen configuration at '${configPath}'. Corrupt or badly structured JSON.`
		);
	}

	return JSON.parse(configData);
};

export const getEnvConfig = () => {
	const env = Object.fromEntries(
		Object.entries(process.env)
			.filter(([key]) => key.startsWith("HYPHEN_CONFIG_OVERRIDE_"))
			.map(([key, value]) => [
				key.split("HYPHEN_CONFIG_OVERRIDE_")[1].toLowerCase(),
				value,
			])
	);

	return env;
};

export const getMergedConfig = (): Configuration => {
	const ajv = new Ajv();

	const globalConfig = getConfig("global");
	const localConfig = getConfig("local");
	const envConfig = getEnvConfig();

	const config: Configuration = {
		...defaultConfig,
		...globalConfig,
		...localConfig,
		...envConfig,
	};

	const validate = ajv.compile(configSchema);

	validate(config);

	if (validate.errors) {
		for (const [k, error] of Object.entries(validate.errors)) {
			throw error;
		}
	}

	return config;
};

export const setConfig = (
	scope: "local" | "global",
	key: string,
	value: any
) => {
	const filterNullValues = (obj: any) => {
		Object.keys(obj).forEach((key) => {
			if (obj[key] === null) {
				delete obj[key];
			}
		});

		return obj;
	};

	const ajv = new Ajv();
	const validate = ajv.compile(configSchema);

	validate({ [key]: value });

	if (!validate.errors) {
		const config = getConfig(scope);

		const newConfig = filterNullValues({ ...config, [key]: value });

		writeFileSync(getConfigPath(scope), JSON.stringify(newConfig, null, 2));

		return newConfig;
	} else {
		for (const [k, error] of Object.entries(validate.errors)) {
			throw error;
		}
	}
};
