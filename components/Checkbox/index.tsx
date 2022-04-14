/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Check } from "@fdn-ui/icons-react";
import React from "react";
import { StyledCheckbox } from "./style";

export const Checkbox = ({
	checked,
	onChange,
}: {
	checked?: boolean;
	onChange?: (value: boolean) => void;
}) => {
	const [internalChecked, setIChecked] = React.useState(checked || false);

	return (
		<StyledCheckbox
			checked={internalChecked}
			onClick={() => {
				setIChecked(!internalChecked);
				onChange && onChange(internalChecked);
			}}
		>
			{internalChecked && <Check fill={"white"} />}
		</StyledCheckbox>
	);
};
