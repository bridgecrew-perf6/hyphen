/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { GlobalStyle } from "../components/GlobalStyle";
import { NavBar } from "../components/NavBar";

const App = ({ Component, pageProps }: AppProps) => {
	React.useEffect(() => {
		window.addEventListener("load", () => {
			(window as any).finishedLoading = true;
		});
	}, []);

	return (
		<>
			<Head>
				<link
					rel="shortcut icon"
					type="image/x-icon"
					href="/favicon.ico"
					sizes="16x16 24x24 32x32 64x64"
				></link>
				<link
					rel="icon"
					type="image/svg+xml"
					sizes="any"
					href="/favicon.svg"
				></link>
				<link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
				<link rel="icon" type="image/png" href="/favicon.png"></link>
			</Head>

			<GlobalStyle />

			<NavBar />

			<div id="main-content">
				<Component {...pageProps} />
			</div>
		</>
	);
};

export default App;
