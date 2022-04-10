/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from "@emotion/styled";
import { FRONTEND_APP_MAX_WIDTH } from "../../constants/style";

export const Content = styled.main`
	display: flex;

	width: calc(100% - 1.5rem * 2);
	max-width: ${FRONTEND_APP_MAX_WIDTH}px;

	padding: 0 1.5rem;

	${({ m }: { m?: number }) => `
		margin: ${typeof m == "undefined" ? 2 : m}rem auto;
	`};
`;
