/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { cache } from "@emotion/css";
import createEmotionServer from "@emotion/server/create-instance";
import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";
import * as React from "react";

export default class HyphenDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);

		const { extractCritical } = createEmotionServer(cache);
		const { ids, css } = extractCritical(initialProps.html);

		return {
			...initialProps,
			styles: (
				<React.Fragment>
					{initialProps.styles}
					<style
						data-emotion={`css ${ids.join(" ")}`}
						dangerouslySetInnerHTML={{ __html: css }}
					/>
				</React.Fragment>
			),
		} as any;
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
