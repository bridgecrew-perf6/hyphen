/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { exec } from "child_process";
import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { promisify } from "util";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { version } = JSON.parse(
		readFileSync(resolve(process.cwd(), "package.json"), "utf-8")
	);

	const promiseExec = promisify(exec);

	let commit = null;
	let source = null;

	commit = (await promiseExec("git rev-parse HEAD")).stdout;
	source = (await promiseExec("git remote get-url origin")).stdout;

	res.json({
		version,
		commit: commit.trim() || null,
		source: source.trim() || null,
	});
};
