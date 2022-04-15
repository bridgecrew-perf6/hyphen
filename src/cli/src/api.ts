/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import axios, { AxiosResponse } from "axios";
import type { ClientRequest } from "http";
import { debug } from "./utils/log";

const methods = [
	"get",
	"delete",
	"head",
	"options",
	"post",
	"put",
	"patch",
	"purge",
	"link",
	"unlink",
];

export const createAPIClient = (serverURL: string) => {
	process.env.HYPHEN_CLI_ACR_COUNT = "0";

	const instance = axios.create({
		baseURL: serverURL,
		headers: {
			"user-agent": `Hyphen/${process.env.HYPHEN_CLI_VERSION}`,
		},
	});

	for (const [key, value] of Object.entries(instance)) {
		if (!methods.includes(key)) continue;

		const originalMethod = (instance as any)[key];

		(instance as any)[key] = async (...args: any) => {
			let count = parseInt(process.env.HYPHEN_CLI_ACR_COUNT as any) + 1;
			process.env.HYPHEN_CLI_ACR_COUNT = `${count}`;

			debug(
				`#${count} .. ${key.toUpperCase()} ${
					typeof args[0] == "string" ? args[0] : "<unknown path>"
				} | ${Date.now()}`
			);

			const d = Date.now();

			const res = (await originalMethod(...args)) as AxiosResponse;
			const req = res.request as ClientRequest;

			debug(
				`#${count} -> ${req.method} ${req.path} (${res.status}) [${
					Date.now() - d
				}ms] | ${Date.now()}`
			);

			return res;
		};
	}

	return instance;
};
