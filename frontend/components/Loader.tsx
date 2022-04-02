/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { AppShell, Center, Card, Loader, Stack } from "@mantine/core";
import React from "react";

export const FullscreenLoader = () => {
	return (
		<AppShell
			padding={0}
			styles={(theme) => ({
				main: {
					width: "100%",
					height: "100vh",
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
		>
			<Center sx={{ maxWidth: 700, margin: "auto", height: "100vh" }}>
				<Card
					sx={{ width: "100%" }}
					shadow={"sm"}
					p={"5rem"}
					py={"8rem"}
				>
					<Stack justify={"center"} align={"center"}>
						<Loader />
					</Stack>
				</Card>
			</Center>
		</AppShell>
	);
};
