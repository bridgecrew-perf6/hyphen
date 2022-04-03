/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import fastify from "fastify";
import fastifyStatic from "fastify-static";
import { resolve } from "path";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { readdirSync } from "fs-extra";
import { Center, Title } from "@mantine/core";
import { createStylesServer, ServerStyles } from "@mantine/ssr";
import api from "../api";
import fastifyWebsocket from "fastify-websocket";

const convoy = fastify({
	logger: true,
});

convoy.register(fastifyWebsocket);
convoy.register(api, { prefix: "/api" });

convoy.get("*", {}, (request, reply) => {
	const scripts = readdirSync(
		resolve(process.cwd(), "dist", "www", "js")
	).map((s) => `/_convoy/www/js/${s}`);

	const html = renderToString(
		<html>
			<head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>Convoy Dashboard</title>
			</head>
			<body>
				<noscript
					dangerouslySetInnerHTML={{
						__html: (() => {
							const stylesServer = createStylesServer();

							const html = renderToString(
								<Center>
									<Title>
										We're sorry. JavaScript is required for
										this app.
									</Title>
								</Center>
							);

							const styles = renderToStaticMarkup(
								<ServerStyles
									html={html}
									server={stylesServer}
								/>
							);

							return `${styles} ${html}`;
						})(),
					}}
				></noscript>
				<div id="convoy"></div>

				{scripts?.map((s) => (
					<script key={s} src={s}></script>
				))}
			</body>
		</html>
	).replace(/data-reactroot=""/g, "");

	reply.header("content-type", "text/html");
	reply.send("<!DOCTYPE html>" + html);
});

convoy.register(fastifyStatic, {
	root: resolve(process.cwd(), "dist", "www"),
	prefix: "/_convoy/www",
});

convoy.listen(process.env.PORT || 9000, "0.0.0.0", (err) => {
	if (err) throw err;

	console.log(convoy.printRoutes());

	convoy.log.info(
		`Convoy Dashboard listening at http://0.0.0.0:${
			process.env.PORT || 9000
		}`
	);
});
