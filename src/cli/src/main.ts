#!/usr/bin/env node

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import chalk from "chalk";
import { Command } from "commander";
import { readFileSync } from "fs";
import { resolve } from "path";
import commands from "./commands";
import { examplesHelpText } from "./examples";

const program = new Command();

const { version } = JSON.parse(
	readFileSync(resolve(__dirname, "..", "package.json"), "utf-8")
);

program
	.name("hyphen")
	.description(chalk.dim(`Hyphen CLI ${version}`))
	.version(version, "-V, --version", "Show the version number")
	.helpOption("-h, --help", "Display help for command")
	.option("-c, --config <key>=<val>", "Override a config variable")
	.option("-v, --verbose", "Enable verbose logging mode")
	.addHelpCommand("help [cmd]", "Display help for command")
	.addHelpText("after", examplesHelpText)
	.usage("[options] [cmd]");

process.env.HYPHEN_CLI_VERSION = version;

program.on("option:config", (value: string) => {
	if (!value.includes("=")) return;

	const [key, val] = value.split("=");

	process.env[`HYPHEN_CONFIG_OVERRIDE_${key.toUpperCase()}`] = val.toString();
});

program.on("option:verbose", () => {
	process.env.VERBOSE = "1";
});

for (const [_, value] of Object.entries(commands) as any) {
	const cmd = program
		.command(value.name)
		.description(value.description)
		.action(value.action);

	if (value.options) {
		value.options.forEach((opt: any) => {
			cmd.option(opt.flags.join(", "), opt.description);
		});
	}
}

program.parse();
