/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as PO from "@radix-ui/react-popover";

export const Popover = styled(PO.Root)``;
export const PopoverTrigger = styled(PO.Trigger)``;
export const PopoverAnchor = styled(PO.Anchor)``;

const slideUpAndFade = keyframes({
	"0%": { opacity: 0, transform: "translateY(4px)" },
	"100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
	"0%": { opacity: 0, transform: "translateX(-4px)" },
	"100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
	"0%": { opacity: 0, transform: "translateY(-4px)" },
	"100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
	"0%": { opacity: 0, transform: "translateX(4px)" },
	"100%": { opacity: 1, transform: "translateX(0)" },
});

export const PopoverArrow = styled.div`
	width: 20px;
	height: 20px;
	background-color: white;
	transform: rotate(45deg);
	left: 50%;
	position: absolute;
	top: -11px;
	border-top: 1px solid rgba(0, 0, 0, 0.12);
	border-left: 1px solid rgba(0, 0, 0, 0.12);
	border-top-left-radius: 6px;
`;

export const PopoverContent = styled(PO.Content)`
    border-radius: 8px;
    background-color: white;
    box-shadow: 
		rgba(14, 18, 22, 0.35) 0px 10px 38px -10px,
		rgba(14, 18, 22, 0.2) 0px 10px 20px -15px;
	border: 1px solid rgba(0, 0, 0, 0.12);

    @media (prefers-reduced-motion: no-preference) {
		animation-duration: 0.4s;
		animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

		will-change: transform, opacity;

		&[data-state="open"] {
			&[data-side="top"] { animation-name: ${slideDownAndFade} };
			&[data-side="right"] { animation-name: ${slideLeftAndFade} };
			&[data-side="bottom"] { animation-name: ${slideUpAndFade} };
			&[data-side="left"] { animation-name: ${slideRightAndFade} };
		},
	}
`;
