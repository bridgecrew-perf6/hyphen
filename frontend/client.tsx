/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import { createRoot } from "react-dom/client";
import Application from "./pages/_app";

const container = document.getElementById("convoy") as Element;
const root = createRoot(container);

root.render(<Application />);
