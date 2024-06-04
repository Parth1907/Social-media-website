import React, {useEffect, useRef} from "react";
import {Tooltip, Avatar} from "@material-tailwind/react";
import nature from "../../assets/images/nature.jpg";
import avatar from "../../assets/images/avatar.jpg";
import facebook from "../../assets/images/facebook.png";
import twitter from "../../assets/images/twitter.png";
import laptop from "../../assets/images/laptop.jpg";
import media from "../../assets/images/media.jpg";
import apps from "../../assets/images/apps.jpg";
import tiktok from "../../assets/images/tik.jpg";
import {AuthContext} from "../AppContext/AppContext";
import {Link} from "react-router-dom";

export default function LeftSide() {
	const [data, setData] = React.useState([]);
	const count = useRef(0);
	const {user, userData} = React.useContext(AuthContext);

	const handleRandom = (arr) => {
		setData(arr[Math.floor(Math.random() * arr?.length)]);
	};

	useEffect(() => {
		const imgList = [
			{
				id: 1,
				img: laptop,
			},
			{
				id: 2,
				img: media,
			},
			{
				id: 3,
				img: apps,
			},
			{
				id: 4,
				img: tiktok,
			},
		];
		handleRandom(imgList);
		let countAds = 0;
		let startAds = setInterval(() => {
			countAds++;
			handleRandom(imgList);
			count.current = countAds;
			if (countAds == 5) {
				clearInterval(startAds);
			}
		}, 2000);

		return () => {
			clearInterval(startAds);
		};
	}, []);

	const progressBar = () => {
		switch (count.current) {
			case 1:
				return 15;
			case 2:
				return 30;
			case 3:
				return 45;
			case 4:
				return 60;
			case 5:
				return 75;

			default:
				return 0;
		}
	};

	return (
		<div className="flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg">
			<div className="flex flex-col items-center relative">
				<img
					className="h-28 w-full rounded-r-xl"
					src={userData?.profileBackgroundUrl}
					alt="Background Img"
				/>
				<div className="absolute -bottom-4">
					<Link to="/editProfilePic">
						<Tooltip content="Profile" placement="top">
							<Avatar
								src={user?.photoURL || userData?.profilePicUrl}
								size="md"
								alt="avatar"
							></Avatar>
						</Tooltip>
					</Link>
				</div>
			</div>
			<div className="flex flex-col items-center pt-6">
				<p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
					{user?.email || userData?.email}
				</p>
				{/* <p className="font-roboto font-medium text-xs text-gray-700 no-underline tracking-normal leading-none">
                    Access exclusive tools & insights
                </p>
                <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none py-2">
                    Try premium for free
                </p> */}
			</div>
			<div className="flex flex-col pl-2">
				<div className="flex items-center pb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-10"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
						/>
					</svg>
					<p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none">
						{userData?.state}, {userData?.country}
					</p>
				</div>
				<div className="flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-10"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
						/>
					</svg>
					<p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none">
						{userData?.job}
					</p>
				</div>
				<div className="flex justify-center items-center pt4">
					<p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
						Events
					</p>
					<p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2">
						Groups
					</p>
					<p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
						Follow
					</p>
					<p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2">
						More
					</p>
				</div>
			</div>
			<div className="ml-2">
				<p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2">
					Social Profiles
				</p>
				<div className="flex items-center">
					<img className="h-5 mr-2" src={facebook} alt="facebook" />
					<p className="font-roboto font-bold text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2">
						Social Network
					</p>
				</div>
				<div className="flex items-center">
					<img className="h-5 mr-2" src={twitter} alt="twitter" />
					<p className="font-roboto font-bold text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2">
						Social Network
					</p>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center pt-4">
				<p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2">
					Random Ads
				</p>
				<div
					style={{width: `${progressBar()}%`}}
					className="bg-blue-600 rounded-xl h-1 mb-4"
				></div>
				<img className="h-36 rounded-lg" src={data.img} alt="ads" />
			</div>
		</div>
	);
}
