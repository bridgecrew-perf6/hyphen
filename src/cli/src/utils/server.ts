/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { getMergedConfig } from "../config";
import { error } from "./log";
import { isURL } from "./url";

export const getHyphenServerURI = () => {
	const config = getMergedConfig();

	if (
		"server.url" in config &&
		config["server.url"]?.length &&
		isURL(config["server.url"])
	) {
		return config["server.url"];
	} else {
		error(`No \`server.url\` option defined.`);
		error(`Use \`hyphen config -g server.url <value>\` to set globally.`);
	}
};
