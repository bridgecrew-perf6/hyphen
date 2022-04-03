/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Button, ButtonProps, useMantineTheme } from "@mantine/core";
import { Loading } from "../icons/loading";
import React from "react";

export const LoadableButton = (props: ButtonProps<"button">) => {
	const theme = useMantineTheme();

	return (
		<Button
			disabled={props.disabled || props.loading}
			sx={{ positon: "relative", ...props.sx }}
			{...props}
			loading={false}
		>
			{props.loading && (
				<span
					style={{
						position: "absolute",
						left: 0,
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Loading fill={theme.black} />
				</span>
			)}
			<span style={{ opacity: Number(!props.loading) }}>
				{props.children}
			</span>
		</Button>
	);
};
