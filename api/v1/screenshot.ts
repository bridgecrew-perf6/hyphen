/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { PuppeteerBlocker } from "@cliqz/adblocker-puppeteer";
import chrome from "chrome-aws-lambda";
import fetch from "cross-fetch";
import { readFile, writeFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { tmpdir } from "os";
import { resolve } from "path";
import puppeteer from "puppeteer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { w, h, q, url } = req.query as any;

	if (!url) res.end(Buffer.from(""));

	try {
		const browser = await puppeteer.launch(
			process.env.NODE_ENV === "production"
				? {
						args: chrome.args,
						executablePath: await chrome.executablePath,
						headless: chrome.headless,
				  }
				: {}
		);

		const page = await browser.newPage();

		const blocker = await PuppeteerBlocker.fromLists(
			fetch,
			[
				"https://easylist.to/easylist/easylist.txt",
				"https://raw.githubusercontent.com/dothq/blocking-lists/main/out/annoyances.txt",
			],
			{},
			{
				path: resolve(tmpdir(), "hyphen-screenshots.bin"),
				read: readFile,
				write: writeFile,
			}
		);

		await blocker.enableBlockingInPage(page);

		page.setUserAgent(
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 12_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36"
		);

		await page.setViewport({
			width: parseInt(w) || 1920,
			height: parseInt(h) || 1080,
		});

		await page.goto(url);
		await page.waitForNetworkIdle();

		const screenshot = await page.screenshot({
			type: "webp",
			quality: parseInt(q) || 20,
		});
		await browser.close();

		res.end(screenshot);
	} catch (e: any) {
		res.end(e.message);
	}
};
