/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Stack, Title, Text, Space, Code, Button, Group } from "@mantine/core";
import React from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";

const logColours: any = {
	INFO: null,
	ERROR: "red",
	WARN: "yellow",
	DEBUG: "gray",
};

const SetupPostDatabase = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [msgs, setMsgs] = React.useState([
		"Awaiting connection from socket...",
	]);

	const [wsState, setWsState] = React.useState(0); // 0: undefined, 1: error, 2: success

	const setupDatabase = () => {
		setWsState(0);
		setMsgs(["Awaiting connection from socket..."]);

		const { protocol, host } = window.location;

		const sockUrl = `ws${
			protocol == "https:" ? "s" : ""
		}://${host}/api/setup/init-database`;

		try {
			const ws = new WebSocket(sockUrl);

			ws.addEventListener("open", () => {
				const {
					databaseProvider,
					databaseHost,
					databasePort,
					databaseUsername,
					databasePassword,
					databaseTable,
					databaseFilename,
				} = location.state as any;

				ws.send(
					JSON.stringify({
						type: "conn",
						payload: {
							provider: databaseProvider,
							host: databaseHost,
							port: databasePort,
							username: databaseUsername,
							password: databasePassword,
							table: databaseTable,
							filename: databaseFilename,
						},
					})
				);
			});

			ws.addEventListener("message", (event) => {
				const json = JSON.parse(event.data.toString());

				if (json.type == "msg") {
					if (json.payload.startsWith("ERROR")) setWsState(1);

					setMsgs((arr: any) => [...arr, json.payload]);
				}
			});

			ws.addEventListener("error", () => {
				setWsState(1);
			});

			ws.addEventListener("close", () => {
				setWsState(1);
			});
		} catch (e) {
			console.error(e);
			setMsgs((arr: any) => [
				...arr,
				"!!! Failed to connect to ${sockUrl}. Perhaps you need to enable Websockets on your web server.",
			]);
		}
	};

	React.useEffect(() => {
		if (
			!location ||
			!location.state ||
			!(location.state as any).databaseProvider
		) {
			navigate("/setup/database");
		} else {
			setupDatabase();
		}
	}, []);

	return (
		<Stack spacing={"lg"}>
			<Stack spacing={"sm"} align={"center"} justify={"center"}>
				<Title order={1}>One moment...</Title>
				<Text align={"center"}>Convoy is setting up the database.</Text>
			</Stack>

			<Space h={"xl"} />

			<Code block>
				{msgs.map((i) => (
					<span key={i}>
						<Text
							sx={{
								lineHeight: 2,
								fontFamily: "inherit",
								fontSize: 12,
							}}
							color={
								i.split(":")[0] in logColours
									? logColours[i.split(":")[0]]
									: null
							}
						>
							{i}
						</Text>
					</span>
				))}
			</Code>

			{wsState == 1 && (
				<Group position={"center"}>
					<Button onClick={() => setupDatabase()}>Retry</Button>
				</Group>
			)}
		</Stack>
	);
};

export default SetupPostDatabase;
