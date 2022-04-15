/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { NextApiResponse } from "next";

export const errors = {
	forbidden: {
		status: 403,
		message: "Not Authorised",
	},
	absent_digest: {
		status: 400,
		message:
			"Digest was not present for file. Ensure X-Hyphen-Digest is set and it is a SHA-1 hash.",
	},
	digest_no_match: {
		status: 400,
		message: "Hash of file does not match provided digest.",
	},
	no_content: {
		status: 400,
		message: "No data was provided with request.",
	},
};

export const sendError = (res: NextApiResponse, id: keyof typeof errors) => {
	const error = errors[id];

	res.status(error.status).send({
		error: {
			ok: false,
			code: id,
			...error,
		},
	});
};
