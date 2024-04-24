import React from "react";
import Home from "./Home";
import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import FriendProfile from "./FriendProfile";

export default function Pages() {
	return (
		<div className="">
			<Routes>
				<Route path="/" element={<Home/>} ></Route>
				<Route path="/login" element={<Login/>} ></Route>
				<Route path="/register" element={<Register/>} ></Route>
				<Route path="/reset" element={<Reset/>} ></Route>
				<Route path="/profile/:id" element={<FriendProfile/>}></Route>
			</Routes>
		</div>
	);
}