/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { ButtonProps } from ".";
import { StyledButton } from "./style";

const StyledLightButton = styled(StyledButton)`
	background-color: rgba(22, 98, 211, 0.05);
	color: rgb(22, 98, 211);

	height: ${42 / 16}rem;
	min-width: ${42 / 16}rem;

	&:hover {
		background-color: rgba(22, 98, 211, 0.125);
	}

	&:hover:active,
	&:focus:active {
		background-color: rgba(22, 98, 211, 0.225);
	}

	&:focus {
		outline: 3px solid rgba(22, 98, 211, 0.5);
	}
`;

export const LightButton = ({
	children,
	iconLeft,
	iconRight,
	fullWidth,
	align,
	justify,
	...rest
}: ButtonProps) => {
	return (
		<StyledLightButton
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
		</StyledLightButton>
	);
};
