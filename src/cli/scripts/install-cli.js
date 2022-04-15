/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const { cpSync } = require("fs-extra");
const { resolve } = require("path");
const { tmpdir } = require("os");
const rimraf = require("rimraf");
const { spawn } = require("child_process");

const main = async () => {
	if (process.getuid() !== 0)
		return console.error("This has to be run with superuser privileges.");

	rimraf.sync(resolve(tmpdir(), "hyphen"));

	cpSync(resolve(__dirname, "..", "..", "cli"), resolve(tmpdir(), "hyphen"), {
		recursive: true,
	});

	spawn("npm", ["i", "-g"], {
		stdio: "inherit",
		cwd: resolve(tmpdir(), "hyphen"),
	});
};

main();
