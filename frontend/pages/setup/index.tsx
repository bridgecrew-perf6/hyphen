/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Button, Group, Space, Stack, Title, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const SetupHome = () => {
	const navigate = useNavigate();

	return (
		<Stack spacing={"lg"}>
			<Stack spacing={"sm"} align={"center"} justify={"center"}>
				<Title order={1}>Welcome to Convoy</Title>
				<Text align={"center"}>
					Convoy is ready for setup. This should only take a few
					minutes.
				</Text>
			</Stack>

			<Space h={"xl"} />

			<Group position={"center"}>
				<Button
					onClick={() => navigate("diagnostics")}
					variant={"default"}
				>
					Diagnostics
				</Button>
				<Button color={"blue"} variant={"filled"}>
					Start setup
				</Button>
			</Group>
		</Stack>
	);
};

export default SetupHome;
