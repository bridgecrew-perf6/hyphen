/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from "@emotion/styled";
import { CSSProperties } from "react";

export const FlexibleSpacing = styled.div`
	display: flex;

	${({
		gap,
		align,
		justify,
		flex,
		m,
		mt,
		mr,
		mb,
		ml,
		p,
		pt,
		pr,
		pb,
		pl,
	}: {
		gap?: CSSProperties["gap"];
		align?: CSSProperties["alignItems"];
		justify?: CSSProperties["justifyContent"];
		flex?: CSSProperties["flex"];

		m?: CSSProperties["margin"];
		mt?: CSSProperties["marginTop"];
		mr?: CSSProperties["marginRight"];
		mb?: CSSProperties["marginBottom"];
		ml?: CSSProperties["marginLeft"];

		p?: CSSProperties["padding"];
		pt?: CSSProperties["paddingTop"];
		pr?: CSSProperties["paddingRight"];
		pb?: CSSProperties["paddingBottom"];
		pl?: CSSProperties["paddingLeft"];
	}) => {
		if (typeof gap == "undefined") gap = 1;
		if (typeof flex == "undefined" && justify) flex = 1;

		return `
            gap: ${typeof gap == "number" ? `${gap}rem` : gap};
            align-items: ${align};
            justify-content: ${justify};
            flex: ${flex};

            margin: ${typeof m == "number" ? `${m}rem` : m};
            margin-top: ${typeof mt == "number" ? `${mt}rem` : mt};
            margin-right: ${typeof mr == "number" ? `${mr}rem` : mr};
            margin-bottom: ${typeof mb == "number" ? `${mb}rem` : mb};
            margin-left: ${typeof ml == "number" ? `${ml}rem` : ml};

            padding: ${typeof p == "number" ? `${p}rem` : p};
            padding-top: ${typeof pt == "number" ? `${pt}rem` : pt};
            padding-right: ${typeof pr == "number" ? `${pr}rem` : pr};
            padding-bottom: ${typeof pb == "number" ? `${pb}rem` : pb};
            padding-left: ${typeof pl == "number" ? `${pl}rem` : pl};
        `;
	}}
`;
