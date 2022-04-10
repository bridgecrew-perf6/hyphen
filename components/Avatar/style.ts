/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from "@emotion/styled";
import { CSSProperties } from "react";

export const StyledAvatar = styled.div`
	display: flex;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
	overflow: hidden;

	${({ size }: { size: CSSProperties["width"] }) => `
        width: ${typeof size == "number" ? `${size}rem` : size};
        height: ${typeof size == "number" ? `${size}rem` : size};
        min-width: ${typeof size == "number" ? `${size}rem` : size};
        max-width: ${typeof size == "number" ? `${size}rem` : size};
        min-height: ${typeof size == "number" ? `${size}rem` : size};
        max-height: ${typeof size == "number" ? `${size}rem` : size};

        border-radius: ${typeof size == "number" ? `${size}rem` : size};
    `}
`;
