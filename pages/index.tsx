/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import TeamPage from "./[team]";

const Index = () => {
	const router = useRouter();

	React.useEffect(() => {
		const { scope } = parseCookies();

		router.push(`/${scope || "dashboard"}`);
	}, []);

	return <TeamPage />;
};

export default Index;
