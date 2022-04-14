/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ComponentProps, createElement } from "react";
import { Text } from "./Text";

export const H1 = (props: ComponentProps<typeof Text>) =>
	createElement(Text, {
		size: 2,
		...props,
		as: "h1",
	});

export const H2 = (props: ComponentProps<typeof Text>) =>
	createElement(Text, {
		size: 1.75,
		...props,
		as: "h2",
	});

export const H3 = (props: ComponentProps<typeof Text>) =>
	createElement(Text, {
		size: 1.5,
		...props,
		as: "h3",
	});

export const H4 = (props: ComponentProps<typeof Text>) =>
	createElement(Text, {
		size: 1.25,
		...props,
		as: "h4",
	});

export const H5 = (props: ComponentProps<typeof Text>) =>
	createElement(Text, {
		size: 1,
		...props,
		as: "h5",
	});
