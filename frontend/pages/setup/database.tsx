/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import {
	Button,
	Group,
	Space,
	Stack,
	Title,
	Text,
	TextInput,
	Checkbox,
	Select,
	PasswordInput,
	NumberInput,
	Center,
	RadioGroup,
	Radio,
	useMantineTheme,
	Collapse,
	Code,
	Loader,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { Prism } from "@mantine/prism";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { sleep } from "../../../utils/sleep";
import { LoadableButton } from "../../components/LoadableButton";
import { Check } from "../../icons/check";
import { Close } from "../../icons/close";
import { Loading } from "../../icons/loading";

const commonDatabaseConfigs: any = {
	postgres: {
		databaseHost: "127.0.0.1",
		databasePort: 5432,
		databaseUsername: "postgres",
		databasePassword: "postgres",
		databaseTable: "convoy",
	},
	mysql: {
		databaseHost: "127.0.0.1",
		databasePort: 3306,
		databaseUsername: "mysql",
		databasePassword: "mysql",
		databaseTable: "convoy",
	},
	mariadb: {
		databaseHost: "127.0.0.1",
		databasePort: 3306,
		databaseUsername: "mariadb",
		databasePassword: "mariadb",
		databaseTable: "convoy",
	},
	mssql: {
		databaseHost: "127.0.0.1",
		databasePort: 1433,
		databaseUsername: "mysql",
		databasePassword: "mysql",
		databaseTable: "convoy",
	},
};

const defaultConfig = {
	databaseProvider: "postgres",
	...commonDatabaseConfigs.postgres,
};

const SetupDatabase = () => {
	const navigate = useNavigate();
	const theme = useMantineTheme();
	const [connectionState, setConnectionState] = React.useState(0); // 0: undefined, 1: error, 2: success
	const [showError, setShowError] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState("");
	const [msToConnect, setMsToConnect] = React.useState(0);

	const initialValues = {
		databaseProvider: "",
		databaseHost: "",
		databasePort: 0,
		databaseUsername: "",
		databasePassword: "",
		databaseTable: "",
		databaseFilename: "",
		databaseUri: "",
	};

	const form = useForm({
		initialValues,
	});

	React.useEffect(() => {
		form.setValues(defaultConfig);
	}, []);

	const handleProviderProps = () => {
		const props = form.getInputProps("databaseProvider");

		props.onChange = (value: string) => {
			setConnectionState(0);
			setErrorMsg("");
			setShowError(false);

			if (value in commonDatabaseConfigs) {
				form.setValues({
					...initialValues,
					...(commonDatabaseConfigs[value] || {}),
					databaseProvider: value,
				});
			} else {
				form.setValues({
					...initialValues,
					databaseProvider: value,
				});
			}
		};

		return props;
	};

	const testConnection = async () => {
		setConnectionState(1);
		setShowError(false);
		setErrorMsg("");
		let d = Date.now();

		await sleep(1000);

		axios
			.post("/api/setup/test-database-connection", {
				provider: form.values.databaseProvider,
				...(form.values.databaseProvider == "sqlite"
					? {
							filename: form.values.databaseFilename,
					  }
					: {
							host: form.values.databaseHost,
							port: form.values.databasePort,
							username: form.values.databaseUsername,
							password: form.values.databasePassword,
							table: form.values.databaseTable,
					  }),
			})
			.then((r) => {
				setConnectionState(3);
				setMsToConnect(Date.now() - d);
				setErrorMsg(r.data.message);
			})
			.catch((e) => {
				setConnectionState(2);
				setErrorMsg(e.response.data.message);
			});
	};

	return (
		<Stack spacing={"lg"}>
			<Stack spacing={"sm"} align={"center"} justify={"center"}>
				<Title order={1}>Database</Title>
				<Text>
					Convoy needs a database to store application data, users,
					jobs and images.
				</Text>
			</Stack>

			<Space h={"xl"} />

			<form onSubmit={form.onSubmit((values) => console.log(values))}>
				<Stack spacing={"md"}>
					<Group grow={form.values.databaseProvider == "sqlite"}>
						<Select
							label={"Database provider"}
							data={[
								{ value: "postgres", label: "PostgreSQL" }, // Postgres
								{ value: "mysql", label: "MySQL" }, // MySQL
								{ value: "mariadb", label: "MariaDB" }, // MySQL
								{ value: "sqlite", label: "SQLite" },
								{ value: "cockroach", label: "CockroachDB" }, // Postgres
								{ value: "redshift", label: "Amazon Redshift" }, // Postgres
								{ value: "mssql", label: "Microsoft SQL" },
							]}
							{...handleProviderProps()}
						/>

						{form.values.databaseProvider == "sqlite" && (
							<TextInput
								label={"Database path"}
								sx={{ maxWidth: "unset" }}
								{...form.getInputProps("databaseFilename")}
							/>
						)}

						{form.values.databaseProvider !== "sqlite" && (
							<Group
								spacing={4.2}
								align={"flex-end"}
								sx={{
									maxWidth: "unset",
								}}
							>
								<TextInput
									label={"Database host or IP"}
									sx={{ maxWidth: "unset" }}
									{...form.getInputProps("databaseHost")}
								/>

								<Text sx={{ height: 32 }}>:</Text>

								<TextInput
									label={"Database port"}
									sx={{ maxWidth: 88 }}
									{...form.getInputProps("databasePort")}
								/>
							</Group>
						)}
					</Group>

					{form.values.databaseProvider !== "sqlite" && (
						<Group grow>
							<TextInput
								label={"Database username"}
								{...form.getInputProps("databaseUsername")}
							/>

							<PasswordInput
								label={"Database password"}
								{...form.getInputProps("databasePassword")}
							/>
						</Group>
					)}

					{form.values.databaseProvider !== "sqlite" && (
						<Group grow>
							<TextInput
								label={"Database table name"}
								{...form.getInputProps("databaseTable")}
							/>
						</Group>
					)}

					<Group
						position="right"
						mt="md"
						sx={{ justifyContent: "space-between" }}
					>
						{connectionState == 3 && (
							<Group sx={{ color: theme.colors.green[9] }}>
								<Check fill={"currentColor"} />
								<Text
									size={"sm"}
									weight={600}
									sx={{
										display: "flex",
										gap: 8,
										alignItems: "center",
									}}
								>
									Successful connection in {msToConnect}ms.
									<Button
										onClick={() => setShowError(!showError)}
										variant="subtle"
										color={"green"}
										styles={(theme) => ({
											root: {
												color: theme.colors.green[9],
												backgroundColor: theme.fn.rgba(
													theme.colors.green[9],
													0.05
												),
											},
										})}
									>
										{showError ? `Hide` : `Show`} log
									</Button>
								</Text>
							</Group>
						)}

						{connectionState == 2 && (
							<Group
								spacing={"md"}
								sx={{ color: theme.colors.red[9] }}
							>
								<Close fill={"currentColor"} />
								<Text
									size={"sm"}
									weight={600}
									sx={{
										display: "flex",
										gap: 8,
										alignItems: "center",
									}}
								>
									Failed to connect to database.{" "}
									<Button
										onClick={() => setShowError(!showError)}
										variant="subtle"
										color={"red"}
										styles={(theme) => ({
											root: {
												color: theme.colors.red[9],
												backgroundColor: theme.fn.rgba(
													theme.colors.red[9],
													0.05
												),
											},
										})}
									>
										{showError ? `Hide` : `Show`} error
									</Button>
								</Text>
							</Group>
						)}

						{connectionState == 1 && (
							<Group>
								<Loading fill={"currentColor"} />
								<Text size={"sm"} weight={600}>
									Connecting...
								</Text>
							</Group>
						)}

						{connectionState == 0 && <Group></Group>}

						<Button
							onClick={() => testConnection()}
							variant={"filled"}
							sx={{ flex: 1, maxWidth: "fit-content" }}
						>
							Test Connection
						</Button>
					</Group>
				</Stack>
			</form>

			<Collapse in={showError}>
				<Code block>{errorMsg}</Code>
			</Collapse>

			<Space h={"xl"} />

			<Group position={"center"}>
				<Button onClick={() => navigate("/setup")} variant={"default"}>
					Go Back
				</Button>
				<Button
					disabled={connectionState !== 3}
					onClick={() =>
						navigate("/setup/post-database", { state: form.values })
					}
					variant={connectionState == 3 ? "filled" : "default"}
				>
					Next
				</Button>
			</Group>
		</Stack>
	);
};

export default SetupDatabase;
