/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Center, Loader, MantineProvider } from "@mantine/core";
import emotionReset from "emotion-reset";
import { css, Global } from "@emotion/react";
import SetupDiagnostics from "./setup/diagnostics";
import Setup from "./setup/root";
import SetupHome from "./setup";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { FullscreenLoader } from "../components/Loader";
import SetupDatabase from "./setup/database";

const AsyncSetup = loadable(() => pMinDelay(import("./setup/root"), 500), {
	fallback: <FullscreenLoader />,
});

const AsyncSetupDatabase = loadable(
	() => pMinDelay(import("./setup/database"), 500),
	{
		fallback: (
			<Center>
				<Loader />
			</Center>
		),
	}
);

const AsyncSetupPostDatabase = loadable(
	() => pMinDelay(import("./setup/post-database"), 1000),
	{
		fallback: (
			<Center>
				<Loader />
			</Center>
		),
	}
);

const Application = () => {
	return (
		<ErrorBoundary>
			<MantineProvider emotionOptions={{ key: "css" }}>
				<Global
					styles={css`
						${emotionReset}

						*,
						*::after,
						*::before {
							box-sizing: border-box;
							-moz-osx-font-smoothing: grayscale;
							-webkit-font-smoothing: antialiased;
							font-smoothing: antialiased;
							text-rendering: optimizelegibility;
						}
					`}
				/>
				<BrowserRouter>
					<Routes>
						<Route path={"/setup"} element={<AsyncSetup />}>
							<Route index element={<SetupHome />} />
							<Route
								path={"diagnostics"}
								element={<SetupDiagnostics />}
							/>
							<Route
								path={"database"}
								element={<AsyncSetupDatabase />}
							/>
							<Route
								path={"post-database"}
								element={<AsyncSetupPostDatabase />}
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</MantineProvider>
		</ErrorBoundary>
	);
};

export default Application;
