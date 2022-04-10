/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { Content } from "../components/Content";
import { Header } from "../components/Header";
import { H1 } from "../components/Title";

const NotFound = () => {
	return (
		<>
			<Header>
				<Content>
					<H1>Not Found</H1>
				</Content>
			</Header>
		</>
	);
};

export default NotFound;
