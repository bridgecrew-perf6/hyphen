/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyPluginCallback } from "fastify";
import initDatabase from "./init-database";
import testConnection from "./test-connection";

const setup: FastifyPluginCallback = (server, options, done) => {
	server.register(testConnection);
	server.register(initDatabase);

	done();
};

export default setup;
