/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyPluginCallback } from "fastify";
import setup from "./setup";

const api: FastifyPluginCallback = (server, options, done) => {
	server.register(setup, { prefix: "/setup" });

	done();
};

export default api;
