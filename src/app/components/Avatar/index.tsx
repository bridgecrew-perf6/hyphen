/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { CSSProperties, HTMLProps } from "react";
import { StyledAvatar } from "./style";

export const Avatar = ({
	src,
	size,
}: {
	src: HTMLProps<HTMLImageElement>["src"];
	size: CSSProperties["width"];
}) => {
	const ref = React.createRef<HTMLImageElement>();

	React.useEffect(() => {
		if (!ref.current) return;
		ref.current.style.opacity = "0";

		const img = new Image();
		img.src = src as any;

		img.onload = () => {
			if (!ref.current) return;

			ref.current.style.opacity = "1";
		};
	}, []);

	return (
		<StyledAvatar size={size}>
			<img
				src={src}
				ref={ref}
				style={{
					opacity: 1,
					transition: "0.2s opacity",
				}}
			/>
		</StyledAvatar>
	);
};
