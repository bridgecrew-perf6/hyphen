/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createAPIClient } from "../api";
import { getMergedConfig } from "../config";
import { getHyphenServerURI } from "../utils/server";

export default {
	name: "deploy [directory]",
	description: "Deploy a service to the Hyphen server",
	action: async () => {
		const config = getMergedConfig();
		const uri = await getHyphenServerURI();
		const api = createAPIClient(uri);

		const { data } = await api.post("/");

		console.log(data);
	},
};
