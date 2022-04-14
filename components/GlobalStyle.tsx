/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { css, Global } from "@emotion/react";
import emotionReset from "emotion-reset";

export const GlobalStyle = () => {
	return (
		<Global
			styles={css`
				${emotionReset};

				@font-face {
					font-family: "Inter";
					font-style: normal;
					font-weight: 100 900;
					font-display: block;
					src: url("/static/fonts/Inter.woff2") format("woff2");
					font-named-instance: "Regular";
				}

				html,
				body {
					background-color: #fcfcfc;
					font-family: "Inter", -apple-system, BlinkMacSystemFont,
						"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
						"Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
				}

				hr {
					border: none;
					outline: none;
					margin: 0;
					padding: 0;
				}

				button {
					appearance: none;
					border: none;
					outline: none;
					background-color: transparent;
					font-family: inherit;
					padding: 0;
					margin: 0;
					box-sizing: content-box;
				}
			`}
		/>
	);
};
