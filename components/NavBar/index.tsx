/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { css } from "@emotion/css";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { Avatar } from "../Avatar";
import { Group } from "../Group";
import { VerticalLine } from "../Line";
import { Logo } from "../Logo";
import { RealmSwitcher } from "../RealmSwitcher";
import { Stack } from "../Stack";
import { NavBarContainer, StyledNavBar } from "./style";

export const NavBar = () => {
	const router = useRouter();
	const [homeUrl, setHomeUrl] = React.useState("/");

	React.useEffect(() => {
		const { scope } = parseCookies();

		setHomeUrl(`/${scope || "dashboard"}`);

		router.events.on("routeChangeComplete", () => {
			const { scope } = parseCookies();

			setHomeUrl(`/${scope || "dashboard"}`);
		});
	}, []);

	return (
		<StyledNavBar>
			<NavBarContainer>
				<Group justify={"space-between"}>
					<Group gap={0} align={"center"}>
						<Link href={homeUrl}>
							<Stack
								as={"a"}
								align={"center"}
								justify={"center"}
								className={css({
									width: "2.25rem",
									height: "2.25rem",
									cursor: "pointer",
								})}
							>
								<Logo />
							</Stack>
						</Link>

						<VerticalLine
							className={css({
								marginLeft: "1rem",
								marginRight: "0.5rem",
							})}
						/>

						<RealmSwitcher />
					</Group>

					<Group gap={1} align={"center"}>
						<Avatar
							src={"https://github.com/EnderDev.png"}
							size={2}
						/>
					</Group>
				</Group>
			</NavBarContainer>
		</StyledNavBar>
	);
};
