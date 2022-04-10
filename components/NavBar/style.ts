/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from "@emotion/styled";
import { FRONTEND_APP_MAX_WIDTH } from "../../constants/style";

export const StyledNavBar = styled.nav`
	display: flex;

	width: 100%;
	height: 72px;

	justify-content: center;
	align-items: center;

	background-color: rgba(255, 255, 255, 1);
`;

export const NavBarContainer = styled.div`
	display: flex;

	width: 100%;
	height: 100%;

	max-width: ${FRONTEND_APP_MAX_WIDTH}px;

	align-items: center;

	padding: 0 1.5rem;
`;
