/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Button, Group, Space, Stack, Title, Text } from "@mantine/core";
import { Prism } from "@mantine/prism";
import React from "react";
import { useNavigate } from "react-router-dom";

const SetupDiagnostics = () => {
	const navigate = useNavigate();

	return (
		<Stack spacing={"lg"}>
			<Stack spacing={"sm"} align={"center"} justify={"center"}>
				<Title order={1}>Diagnostics</Title>
				<Prism noCopy sx={{ width: 300 }} language="json">
					{JSON.stringify(process.env.BUILD_CONFIG, null, 2)}
				</Prism>
			</Stack>

			<Space h={"xl"} />

			<Group position={"center"}>
				<Button onClick={() => navigate("/setup")} variant={"default"}>
					Go Back
				</Button>
			</Group>
		</Stack>
	);
};

export default SetupDiagnostics;
