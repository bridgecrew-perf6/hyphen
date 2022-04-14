/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";

export function useHasLoaded(event?: keyof WindowEventMap) {
	const [loaded, setLoaded] = React.useState(false);

	React.useEffect(() => {
		if (typeof window == "undefined") return;

		const handler = () => {
			setLoaded(true);
		};

		window.addEventListener(event || "load", handler);

		return () => {
			window.removeEventListener(event || "load", handler);
		};
	});

	return loaded;
}
