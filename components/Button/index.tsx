/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import {
	cloneElement,
	CSSProperties,
	HTMLAttributes,
	ReactChild,
	ReactElement,
} from "react";
import { Text } from "../Text";
import { FilledButton } from "./Filled";
import { LightButton } from "./Light";
import { OutlinedButton } from "./Outlined";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	variant?: "filled" | "outlined" | "light" | "normal";
	children: string | ReactChild;
	iconLeft?: ReactElement;
	iconRight?: ReactElement;
	fullWidth?: boolean;
	align?: CSSProperties["alignItems"];
	justify?: CSSProperties["justifyContent"];
}

const ButtonLabel = styled(Text)`
	padding: 0 1rem;
	height: 100%;
`;

export const Button = (props: ButtonProps) => {
	const children = (
		<>
			{props.iconLeft &&
				cloneElement(props.iconLeft, { fill: "currentColor" })}
			<ButtonLabel
				className={css({
					padding:
						props.iconLeft ||
						props.iconRight ||
						typeof props.children !== "string"
							? "0"
							: "0 1rem",
				})}
			>
				{props.children}
			</ButtonLabel>
			{props.iconRight &&
				cloneElement(props.iconRight, { fill: "currentColor" })}
		</>
	);

	switch (props.variant) {
		case "light":
			return <LightButton {...props}>{children}</LightButton>;
		case "outlined":
			return <OutlinedButton {...props}>{children}</OutlinedButton>;
		case "filled":
			return <FilledButton {...props}>{children}</FilledButton>;
		case "normal":
		default:
			return (
				<OutlinedButton
					className={css({ boxShadow: "none" })}
					{...props}
				>
					{children}
				</OutlinedButton>
			);
	}
};
