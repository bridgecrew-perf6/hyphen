/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from "@emotion/styled";

export const StyledSwitch = styled.button`
	--size: 38px;

	width: var(--size);
	height: calc(var(--size) / 2);

	display: flex;
	align-items: center;
	justify-content: flex-start;

	padding: calc(var(--size) / 2 / 6);

	border-radius: var(--size);

	transition: 0.2s background-color, 0.05s outline;

	${({ checked }: { checked: boolean }) => `
	    background-color: ${checked ? "rgb(22, 98, 211)" : "rgba(0, 0, 0, 0.3)"};

        &:focus {
            outline-offset: 2px;
            outline: 3px solid ${
				checked ? "rgba(18, 78, 169, 0.5)" : "rgba(0, 0, 0, 0.2)"
			};
        }
        
        &:hover:active {
            background-color: ${
				checked ? "rgb(18, 78, 169)" : "rgba(0, 0, 0, 0.4)"
			};
        }

        &:focus:not(:focus-visible) {
            outline: none;
        }
    `};
`;

export const SwitchBubble = styled.i`
	width: calc(var(--size) / 2);
	height: calc(var(--size) / 2);

	background-color: white;

	border-radius: var(--size);

	transition: 0.2s all;
`;
