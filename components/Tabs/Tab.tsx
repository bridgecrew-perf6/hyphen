/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Suspense } from "react";
import { Text } from "../Text";
import { StyledTab } from "./style";

export const Tab = ({
	text,
	active,
	onClick,
	children,
}: {
	text: any;
	active?: boolean;
	onClick?: any;
	children?: any;
}) => {
	return (
		<Suspense>
			<StyledTab active={active} onClick={onClick}>
				{typeof text == "string" ? <Text>{text}</Text> : text}
			</StyledTab>
		</Suspense>
	);
};
