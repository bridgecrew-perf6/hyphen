/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from "@emotion/styled";

export const StyledTab = styled.a`
	display: flex;
	align-items: center;

	width: fit-content;
	height: 42px;

	padding: 0 1rem;

	user-select: none;
	cursor: pointer;

	transition: 0.1s border-bottom, 0.1s color;

	border-bottom: 2px solid rgba(0, 0, 0, 0);

	color: rgba(0, 0, 0, 0.75);
	fill: currentColor;

	${({ active }: { active?: boolean }) => `
        border-bottom: ${active && `2px solid #1662D3`};
        color: ${active && `#1662D3`};

        ${
			!active &&
			`
            &:hover {
                border-bottom: 2px solid rgba(0, 0, 0, 0.25);
            }
        `
		}
    `};
`;
