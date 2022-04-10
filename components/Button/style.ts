/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from "@emotion/styled";
import { CSSProperties } from "react";

export const StyledButton = styled.button`
	display: flex;

	border-radius: 0.5rem;

	transition: 0.2s background-color, 0.2s box-shadow;

	& svg {
		fill: currentColor;
	}

	&:active:hover {
		transition: 0.05s background-color, 0.05s box-shadow;
	}

	${({
		fullWidth,
		align,
		justify,
	}: {
		fullWidth?: boolean;
		align?: CSSProperties["alignItems"];
		justify?: CSSProperties["justifyContent"];
	}) => `
        width: ${fullWidth ? "100%" : ""};
        align-items: ${align || "center"};
        justify-content: ${justify || "center"};
    `};
`;
