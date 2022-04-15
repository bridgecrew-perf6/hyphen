/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import chalk from "chalk";
import { Command } from "commander";
import { getConfig, setConfig } from "../config";
import { info } from "../utils/log";

export default {
	name: "config [key]=[value]",
	description: "Configure Hyphen",
	options: [
		{
			flags: ["--global", "-g"],
			description: "Use global scope instead of local scope.",
		},
	],
	action: (
		keyval: string,
		options: { G?: boolean } | undefined,
		program?: Command
	) => {
		if (!keyval) {
			info(`Hyphen Global Config:`);

			const globalConfig = getConfig("global");
			const localConfig = getConfig("local");

			if (Object.keys(globalConfig).length >= 1) {
				console.log(
					Object.entries(globalConfig)
						.map(
							([key, value]) =>
								`     ${key} ${chalk.dim("=")} \`${value}\``
						)
						.join("\n")
				);
			}

			info(`Hyphen Local Config:`);

			if (Object.keys(localConfig).length >= 1) {
				console.log(
					Object.entries(localConfig)
						.map(
							([key, value]) =>
								`     ${key} ${chalk.dim("=")} \`${value}\``
						)
						.join("\n")
				);
			}

			info("For help, append `--help` to the command.");
			return;
		}

		const [key, value] = keyval.split("=");

		const config = getConfig(options?.G ? "global" : "local") as any;

		if (key && !value) {
			if (!(key in config)) return;

			console.log(`${key} ${chalk.dim("=")} \`${config[key]}\``);
		} else {
			setConfig(options?.G ? "global" : "local", key, value);
		}
	},
};
