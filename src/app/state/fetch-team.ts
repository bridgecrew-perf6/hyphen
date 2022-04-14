/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { GetServerSideProps } from "next";

export const fetchTeamSSRProps: GetServerSideProps = async (ctx) => {
	const team = ctx.params?.team as any;

	if (!["dothq", "EnderDev"].includes(team)) {
		return {
			notFound: true,
		};
	}

	return {
		props: {},
	};
};
