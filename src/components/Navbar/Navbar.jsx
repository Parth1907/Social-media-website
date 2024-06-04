import React from "react";
import {Link} from "react-router-dom"; 
import NavLinks from "./Navlinks";
import UserLinks from "./UserLinks";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center border-b border-gray-100 w-full px-44 py-2">
            <Link to="/">
                <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-roboto">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400">
                        Social Media
                    </span>{" "}
                    App
                </div>
            </Link>
            <div className="flex justify-center items-center mx-auto">
                <NavLinks />
            </div>
            <div className="">
                <UserLinks />
            </div>
        </div>
    )
}