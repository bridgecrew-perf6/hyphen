/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import axios from "axios";
import { getMergedConfig } from "../config";
import { error } from "./log";
import { isURL } from "./url";

const locateAPIBase = async (
	host: string,
	path: string
): Promise<{ path: string; result: boolean }> => {
	return new Promise(async (resolve) => {
		const url = new URL(path, host);

		try {
			const res = await axios.get(url.href);

			resolve({ path, result: res.data && "version" in res.data });
		} catch (e: any) {
			resolve({ path, result: false });
		}
	});
};

export const getHyphenServerURI = async (): Promise<any> => {
	const config = getMergedConfig();

	if (
		"server.url" in config &&
		config["server.url"]?.length &&
		isURL(config["server.url"])
	) {
		const serverURL = config["server.url"];

		const checks = [
			locateAPIBase(serverURL, "/"),
			locateAPIBase(serverURL, "/api"),
		];

		const results = await Promise.all(checks);

		const resultMatch = results.find((r) => r.result == true);

		if (resultMatch) {
			return new URL(resultMatch.path, serverURL).href.replace(/\/$/, "");
		} else {
			error(
				`Failed to resolve \`${serverURL}\`. Is the Hyphen server running and accessible?`
			);
			error(
				`Use \`hyphen config -g server.url <value>\` to set globally.`
			);
		}
	} else {
		error(
			`The \`server.url\` config option is not defined or is malformed.`
		);
		error(`Use \`hyphen config -g server.url <value>\` to set globally.`);
	}
};
