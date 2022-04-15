/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { sendError } from "@hyphen/util";
import { createHash } from "crypto";
import formidable, { File } from "formidable";
import { readFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import rimraf from "rimraf";

const route = nc<NextApiRequest, NextApiResponse>({});

export const config = {
	api: {
		bodyParser: false,
	},
};

route.post(async (req, res) => {
	if (!req.headers["x-hyphen-digest"]) return sendError(res, "absent_digest");

	req.headers["x-hyphen-digest"] = req.headers["x-hyphen-digest"]
		.toString()
		.toLowerCase();

	formidable().parse(req, async (err, fields, files) => {
		if (err) return;

		const file = files[Object.keys(files)[0]] as File;
		if (!file) return sendError(res, "no_content");

		const buffer = await readFile(file.filepath);

		await new Promise((r) => rimraf(file.filepath, () => r(true)));

		const hash = createHash("sha1");
		hash.update(Uint8Array.from(buffer));
		const digest = hash.digest("hex");

		if (req.headers["x-hyphen-digest"] !== digest)
			return sendError(res, "digest_no_match");
	});
});

export default route;
