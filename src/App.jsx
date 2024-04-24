import React from "react";
import Pages from "./components/Pages/Pages";
import {BrowserRouter} from "react-router-dom";
import AppContext from "./components/AppContext/AppContext";
export default function App() {
	return (
		<div className="">
			<BrowserRouter>
				<AppContext>
					<Pages />
				</AppContext>
			</BrowserRouter>
		</div>
	);
}
