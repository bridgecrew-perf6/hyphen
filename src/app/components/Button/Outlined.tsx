/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { ButtonProps } from ".";
import { StyledButton } from "./style";

const StyledOutlinedButton = styled(StyledButton)`
	box-shadow: 0 0 0 1px rgb(0, 0, 0, 0.1);
	color: rgb(0, 0, 0);

	height: ${42 / 16}rem;
	min-width: ${42 / 16}rem;

	&:hover {
		box-shadow: 0 0 0 1px rgb(0, 0, 0, 0.075);
		background-color: rgb(0, 0, 0, 0.075);
	}

	&:hover:active,
	&:focus:active {
		box-shadow: 0 0 0 1px rgb(0, 0, 0, 0.15);
		background-color: rgb(0, 0, 0, 0.15);
	}

	&:focus {
		outline: 3px solid rgb(0, 0, 0, 0.5);
	}
`;

export const OutlinedButton = ({
	children,
	iconLeft,
	iconRight,
	fullWidth,
	align,
	justify,
	...rest
}: ButtonProps) => {
	return (
		<StyledOutlinedButton
			{...rest}
			fullWidth={fullWidth}
			align={align}
			justify={justify}
			className={[
				css({
					gap: iconLeft || iconRight ? "1rem" : "",
					padding: iconLeft || iconRight ? "0 1rem" : "0",
				}),
				...(rest.className?.split(" ") || []),
			].join(" ")}
		>
			{children}
		</StyledOutlinedButton>
	);
};
