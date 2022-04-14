/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Children, cloneElement, ReactElement } from "react";
import { Group } from "../Group";
import { Stack } from "../Stack";
import { Tab } from "./Tab";

export const Tabs = ({
	children,
	detached,
	onChange,
}: {
	children: ReactElement<typeof Tab> | Array<ReactElement<typeof Tab>>;
	detached?: boolean;
	onChange?: (value: number) => void;
}) => {
	const tabs = Children.toArray(children as any) as React.ReactElement[];

	const [activeTab, setActiveTab] = React.useState(0);

	const reactTabs = tabs.map((tab, index) =>
		cloneElement(tab, {
			active: activeTab == index,
			onClick: () => setActiveTab(index),
		})
	);

	React.useEffect(() => {
		onChange && onChange(activeTab);
	}, [activeTab]);

	return (
		<Stack gap={2}>
			<Group gap={0}>{reactTabs}</Group>

			{!detached && (
				<div>{(reactTabs as any)[activeTab].props.children}</div>
			)}
		</Stack>
	);
};
