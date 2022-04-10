/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from "@emotion/styled";
import { CSSProperties } from "react";

export const Text = styled.span`
	display: flex;
	align-items: center;

	${({
		size,
		weight,
	}: {
		size?: CSSProperties["fontSize"];
		weight?: CSSProperties["fontWeight"];
	}) => {
		if (!size) size = 14 / 16;
		if (!weight) weight = 500;

		const lineHeight =
			(typeof size == "number" ? size : parseInt(size) / 16) -
			(typeof size == "number" ? size : parseInt(size) / 16) / 4;

		return `
            font-size: ${typeof size == "number" ? `${size}rem` : size};
            line-height: ${lineHeight};
            font-weight: ${weight};
        `;
	}}
`;
