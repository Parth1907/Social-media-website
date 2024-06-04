import React from "react";
import Pages from "./components/Pages/Pages";
import {BrowserRouter} from "react-router-dom";
import AppContext from "./components/AppContext/AppContext";
export default function App() {
	return (
		<div className="">
			{/* BrowserRouter- used for wrapping the parent element for routing */}
			<BrowserRouter>
				{/* AppContext- used for passing data to other components without passing it as props */}
				<AppContext>
					{/* Pages- Defines the routes on which different component should be loaded */}
					<Pages />
				</AppContext>
			</BrowserRouter>
		</div>
	);
}
