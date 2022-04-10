/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { css } from "@emotion/css";
import React, { CSSProperties, HTMLProps } from "react";
import { StyledAvatar } from "./style";

export const Avatar = ({
	src,
	size,
}: {
	src: HTMLProps<HTMLImageElement>["src"];
	size: CSSProperties["width"];
}) => {
	const [loaded, setLoaded] = React.useState(false);

	return (
		<StyledAvatar size={size}>
			<img
				src={src}
				onLoad={() => setLoaded(true)}
				className={css({
					opacity: Number(loaded),
					transition: "0.2s opacity",
				})}
			/>
		</StyledAvatar>
	);
};
