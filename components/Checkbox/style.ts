/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from "@emotion/styled";

export const StyledCheckbox = styled.button`
	--size: 23px;

	width: var(--size);
	height: var(--size);

	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: calc(var(--size) / 4);

	transition: 0.2s background-color, 0.05s outline, 0.2s box-shadow;

	${({ checked }: { checked: boolean }) => `
	    background-color: ${checked ? "rgb(22, 98, 211)" : "transparent"};
		border: 1px solid ${checked ? "rgb(22, 98, 211)" : "rgba(0, 0, 0, 0.3)"};

        &:focus {
			outline-offset: 2px;
            outline: 3px solid ${
				checked ? "rgba(18, 78, 169, 0.5)" : "rgba(0, 0, 0, 0.2)"
			};
        }

		&:focus:not(:focus-visible) {
			outline: none;
		}
    `};
`;
