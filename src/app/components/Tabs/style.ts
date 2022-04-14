/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from "@emotion/styled";

export const StyledTab = styled.button`
	display: flex;
	align-items: center;

	width: fit-content;
	height: 42px;

	padding: 0 1rem;

	user-select: none;
	cursor: pointer;

	transition: 0.2s border-bottom, 0.2s color, 0.05s outline;

	border-bottom: 2px solid rgba(0, 0, 0, 0);

	color: rgba(0, 0, 0, 0.75);
	fill: currentColor;

	${({ active }: { active?: boolean }) => `
        border-bottom: ${active && `2px solid rgba(22, 98, 211, 1)`};
        color: ${active && `rgba(22, 98, 211, 1)`};

		&:focus {
			outline: 3px solid ${active ? `rgba(22, 98, 211, 0.5)` : `rgba(0, 0, 0, 0.5)`};
			outline-offset: 0px;
		}

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
