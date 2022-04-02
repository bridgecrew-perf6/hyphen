import {
	AppShell,
	Button,
	Card,
	Center,
	Group,
	Space,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";

const Setup = () => {
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
					<Outlet />
				</Card>
			</Center>
		</AppShell>
	);
};

export default Setup;
