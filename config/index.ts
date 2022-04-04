/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ensureDir } from "fs-extra";
import { homedir, platform } from "os";
import { resolve } from "path";

export const CONFIG_DIRECTORIES: Record<string, string> = {
	linux: resolve("/var", "lib", "convoy"),
	win32: resolve("C:", "ProgramData", "Convoy"),
	darwin: resolve(homedir(), "Library", "Application Support", "Convoy"),
};

class ConfigManager {
	public async maybeCreateDefaultConfiguration() {
		const os = platform();

		switch (os) {
			case "win32":
				await ensureDir(CONFIG_DIRECTORIES.win32);
				break;
			case "darwin":
				await ensureDir(CONFIG_DIRECTORIES.darwin);
				break;
			case "linux":
			default:
				await ensureDir(CONFIG_DIRECTORIES.linux);
				break;
		}
	}

	public async init() {
		await this.maybeCreateDefaultConfiguration();
	}
}

export default ConfigManager;
