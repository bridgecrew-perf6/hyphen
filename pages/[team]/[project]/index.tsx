/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { css } from "@emotion/css";
import { Home, HomeFilled, MoreHorizontal, Stocks } from "@fdn-ui/icons-react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { Avatar } from "../../../components/Avatar";
import { Button } from "../../../components/Button";
import { Content } from "../../../components/Content";
import { DocumentTitle } from "../../../components/DocumentTitle";
import { Group } from "../../../components/Group";
import { Header } from "../../../components/Header";
import { Stack } from "../../../components/Stack";
import { Tabs } from "../../../components/Tabs";
import { Tab } from "../../../components/Tabs/Tab";
import { Text } from "../../../components/Text";
import { H1 } from "../../../components/Title";
import { useHasLoaded } from "../../../hooks/loaded";
import { fetchTeamSSRProps } from "../../../state/fetch-team";

const TeamProjectPage = () => {
	const router = useRouter();
	const [activeTab, setActiveTab] = React.useState(0);
	const { scope } = parseCookies();
	const loaded = useHasLoaded();

	return (
		<>
			<DocumentTitle>
				{scope && router.query.project
					? `${scope}/${router.query.project} ― Hyphen`
					: `Project ― Hyphen`}
			</DocumentTitle>

			<Header>
				<Content>
					<Group justify={"space-between"} align={"center"}>
						<Stack gap={0.375}>
							<Group gap={0.75}>
								<Avatar
									size={1}
									src={
										loaded
											? `https://github.com/${scope}.png`
											: ``
									}
								/>
								<Text
									className={css({
										color: "rgba(0, 0, 0, 0.75)",
									})}
								>
									{loaded ? scope : ""}
								</Text>
							</Group>
							<H1>{router.query.project}</H1>
						</Stack>

						<Group gap={14 / 16}>
							<Button variant={"outlined"}>
								<MoreHorizontal />
							</Button>
							<Button variant={"filled"}>New Service</Button>
						</Group>
					</Group>
				</Content>

				<Content m={0}>
					<Tabs detached onChange={(tab) => setActiveTab(tab)}>
						<Tab
							text={
								<Group gap={10 / 16}>
									<Home fill={"inherit"} />
									<Text>Overview</Text>
								</Group>
							}
						/>
						<Tab
							text={
								<Group gap={10 / 16}>
									<Stocks fill={"inherit"} />
									<Text>Activity</Text>
								</Group>
							}
						/>
					</Tabs>
				</Content>
			</Header>

			<Content>
				<Stack gap={1}>
					<Group gap={1}>
						<Button variant={"filled"}>
							<HomeFilled />
						</Button>
						<Button variant={"filled"}>Filled</Button>
						<Button variant={"filled"} iconLeft={<HomeFilled />}>
							Filled with left icon
						</Button>
						<Button variant={"filled"} iconRight={<HomeFilled />}>
							Filled with right icon
						</Button>
						<Button
							variant={"filled"}
							iconLeft={<HomeFilled />}
							iconRight={<HomeFilled />}
						>
							Filled with dual icons
						</Button>
					</Group>

					<Group gap={1}>
						<Button variant={"outlined"}>
							<HomeFilled />
						</Button>
						<Button variant={"outlined"}>Outlined</Button>
						<Button variant={"outlined"} iconLeft={<HomeFilled />}>
							Outlined with left icon
						</Button>
						<Button variant={"outlined"} iconRight={<HomeFilled />}>
							Outlined with right icon
						</Button>
						<Button
							variant={"outlined"}
							iconLeft={<HomeFilled />}
							iconRight={<HomeFilled />}
						>
							Outlined with dual icons
						</Button>
					</Group>

					<Group gap={1}>
						<Button variant={"light"}>
							<HomeFilled />
						</Button>
						<Button variant={"light"}>Light</Button>
						<Button variant={"light"} iconLeft={<HomeFilled />}>
							Light with left icon
						</Button>
						<Button variant={"light"} iconRight={<HomeFilled />}>
							Light with right icon
						</Button>
						<Button
							variant={"light"}
							iconLeft={<HomeFilled />}
							iconRight={<HomeFilled />}
						>
							Light with dual icons
						</Button>
					</Group>

					<Group gap={1}>
						<Button>
							<HomeFilled />
						</Button>
						<Button>Normal</Button>
						<Button iconLeft={<HomeFilled />}>
							Normal with left icon
						</Button>
						<Button iconRight={<HomeFilled />}>
							Normal with right icon
						</Button>
						<Button
							iconLeft={<HomeFilled />}
							iconRight={<HomeFilled />}
						>
							Normal with dual icons
						</Button>
					</Group>
				</Stack>

				{/* {activeTab == 0 && <Text>Overview Tab</Text>}
                 {activeTab == 1 && <Text>Activity Tab</Text>} */}
			</Content>
		</>
	);
};

export const getServerSideProps = fetchTeamSSRProps;

export default TeamProjectPage;
