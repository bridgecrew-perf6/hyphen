/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { StyledSwitch, SwitchBubble } from "./style";

export const Switch = ({
	checked,
	onChange,
}: {
	checked?: boolean;
	onChange?: (value: boolean) => void;
}) => {
	const [internalChecked, setIChecked] = React.useState(checked || false);
	const [mouseDown, setMouseDown] = React.useState(false);

	return (
		<StyledSwitch
			checked={internalChecked}
			onClick={() => {
				setIChecked(!internalChecked);
				onChange && onChange(internalChecked);
			}}
			onMouseDown={() => setMouseDown(true)}
			onMouseUp={() => setMouseDown(false)}
			onMouseLeave={() => setMouseDown(false)}
		>
			<SwitchBubble
				style={{
					marginLeft: `${
						internalChecked ? (mouseDown ? 30 : 50) : 0
					}%`,
					width: mouseDown ? "70%" : internalChecked ? "100%" : "50%",
				}}
			/>
		</StyledSwitch>
	);
};
