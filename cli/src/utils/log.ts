/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import chalk from "chalk";

const subs = (...args: any[]) => {
	return args.map((a) =>
		a.replace(/([\`])(?:\\\1|.)*?\1/g, (m: any) => {
			return chalk.dim(m);
		})
	);
};

export const info = (...args: any[]) => {
	console.info(...subs(`${chalk.blue("info")}`, ...args));
};

export const error = (...args: any[]) => {
	console.error(...subs(`${chalk.red("error")}`, ...args));
};
