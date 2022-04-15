/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { getMergedConfig } from "../config";
import { info } from "../utils/log";
import { getHyphenServerURI } from "../utils/server";

export default {
	name: "deploy [directory]",
	description: "Deploy a service to the Hyphen server",
	action: async () => {
		const config = getMergedConfig();
		const uri = await getHyphenServerURI();

		info(`Connected to Hyphen at \`${uri}\`.`);
	},
};
