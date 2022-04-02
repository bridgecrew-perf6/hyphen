/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { build } from "esbuild";
import fs from "fs-extra";
import { resolve } from "path";
import rimraf from "rimraf";

const hex = (size) =>
	[...Array(size)]
		.map(() => Math.floor(Math.random() * 16).toString(16))
		.join("");

const main = async () => {
	const outdir = resolve(process.cwd(), "dist");

	await new Promise((r) => {
		rimraf(outdir, () => r(true));
	});

	await fs.copy(resolve(process.cwd(), "static"), resolve(outdir, "www"));

	await build({
		entryPoints: {
			[`client-${hex(16)}`]: resolve(
				process.cwd(),
				"frontend",
				"client.tsx"
			),
		},
		minify: process.env.NODE_ENV == "prod",
		write: true,
		bundle: true,
		define: {
			"process.env.BUILD_CONFIG": JSON.stringify({
				version: fs.readJsonSync(resolve(process.cwd(), "package.json"))
					.version,
			}),
		},
		outdir: resolve(outdir, "www", "js"),
		platform: "browser",
		logLevel: "info",
	});

	await build({
		entryPoints: {
			server: resolve(process.cwd(), "src", "index.tsx"),
		},
		minify: process.env.NODE_ENV == "prod",
		write: true,
		bundle: true,
		outdir,
		platform: "node",
		logLevel: "info",
	});
};

main();
