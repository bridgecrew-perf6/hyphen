/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { css } from "@emotion/css";
import { ChevronDown12 } from "@fdn-ui/icons-react";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { Suspense } from "react";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { Group } from "./Group";
import {
	Popover,
	PopoverAnchor,
	PopoverArrow,
	PopoverContent,
	PopoverTrigger,
} from "./Popover";
import { Stack } from "./Stack";
import { Tag } from "./Tag";
import { Text } from "./Text";

export const RealmSwitcher = () => {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);

	const { scope } = parseCookies();

	const clearScope = () => {
		setOpen(false);
		destroyCookie(null, "scope");
		router.push("/dashboard");
	};

	const setScope = (id: string) => {
		setOpen(false);
		setCookie(null, "scope", id, { maxAge: Date.now() + 31557600000 });
		router.push(`/${id}`);
	};

	return (
		<Popover open={open}>
			<PopoverTrigger onClick={() => setOpen(!open)}>
				<Group
					gap={0.8}
					align={"center"}
					className={css({
						padding: "0.6rem 0.8rem",
						svg: {
							padding: "0.5rem",
							borderRadius: "1rem",
							transition: "0.1s background-color",
							backgroundColor: open ? "rgba(0, 0, 0, 0.075)" : "",
						},
						":hover > svg": {
							backgroundColor: "rgba(0, 0, 0, 0.075)",
						},
					})}
				>
					<Suspense>
						<Avatar
							src={`https://github.com/${
								scope == "dothq" ? "dothq" : "enderdev"
							}.png`}
							size={1.5}
						/>
						<Text>{scope == "dothq" ? "Dot HQ" : "Kieran"}</Text>
						<Tag>{scope == "dothq" ? "Team" : "Personal"}</Tag>
						<ChevronDown12 fill={"currentColor"} />
					</Suspense>
				</Group>
			</PopoverTrigger>

			<PopoverAnchor />

			<PopoverContent
				side={"bottom"}
				sideOffset={35}
				align={"start"}
				alignOffset={-230}
				className={css({ width: 250 })}
			>
				<PopoverArrow />

				<Stack gap={1} pt={1.5} pb={0.5}>
					<Group p={1.5} pt={0} pb={0}>
						<Text>Personal Account</Text>
					</Group>

					<Group p={0.5} pt={0} pb={0}>
						<Button
							fullWidth
							variant={scope == "dothq" ? "normal" : "filled"}
							justify={"flex-start"}
							onClick={() => clearScope()}
							iconLeft={
								<Avatar
									src={"https://github.com/EnderDev.png"}
									size={1.5}
								/>
							}
						>
							Kieran
						</Button>
					</Group>

					<Group p={1.5} pt={0} pb={0}>
						<Text>Team Accounts</Text>
					</Group>

					<Group p={0.5} pt={0} pb={0}>
						<Button
							fullWidth
							justify={"flex-start"}
							variant={scope == "dothq" ? "filled" : "normal"}
							onClick={() => setScope("dothq")}
							iconLeft={
								<Avatar
									src={"https://github.com/dothq.png"}
									size={1.5}
								/>
							}
						>
							Dot HQ
						</Button>
					</Group>
				</Stack>
			</PopoverContent>
		</Popover>
	);
};
