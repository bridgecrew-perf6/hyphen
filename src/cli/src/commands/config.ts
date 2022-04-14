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
			info(`Hyphen ${options?.G ? "Global" : "Local"} Config:`);

			const config = getConfig(options?.G ? "global" : "local");

			if (Object.keys(config).length == 0) {
				info("For help, append `--help` to the command.");
			} else {
				console.log(
					Object.entries(config)
						.map(
							([key, value]) =>
								`     ${key} ${chalk.dim("=")} \`${value}\``
						)
						.join("\n")
				);
			}

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
