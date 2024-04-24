import React, {useEffect, useState} from "react";
import {Avatar} from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import Navbar from "../Navbar/Navbar";
import LeftSide from "../LeftSidebar/LeftSide";
import RightSide from "../RightSidebar/RightSide";
import Main from "../Main/Main";
import profilePic from "../../assets/images/profilePic.jpg";
import {useParams} from "react-router-dom";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../firebase/firebase";

export default function FriendProfile() {
	const {id} = useParams();
	const [profile, setProfile] = useState(null);
	useEffect(() => {
		const getUserProfile = async () => {
			const q = query(collection(db, "users"), where("uid", "==", id));
			await onSnapshot(q, (doc) => {
				setProfile(doc.docs[0].data());
			});
		};
		getUserProfile();
	}, [id]);

	return (
		<div className="w-full">
			<div className="fixed top-0 z-10 w-full bg-white">
				<Navbar />
			</div>
			<div className="flex bg-gray-100">
				<div className="flex-auto w-[20%] fixed top-12">
					<LeftSide />
				</div>
				<div className="flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl ">
					<div className="w-[80%] mx-auto">
						<div>
							<div className="relative py-4">
								<img
									src={profilePic}
									alt="profilePic"
									className="h-96 w-full rounded-md"
								/>
								<div className="absolute bottom-10 left-6">
									<Avatar
										size="xl"
										variant="circular"
										alt="avatar"
										src={profile?.image || avatar}
									></Avatar>
									<p className=" py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
										{profile?.name}
									</p>
									<p className=" py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
										{profile?.email}
									</p>
								</div>
								<div className="flex flex-col absolute right-6 bottom-10">
									<div className="flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="#fff"
											className="w-6 h-6"
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
										<span className="ml-2 py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
											From Tokyo, Japan
										</span>
									</div>
									<div className="flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
											/>
										</svg>

										<span className="ml-2 py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
											Lives in New York
										</span>
									</div>
								</div>
							</div>
						</div>
						<Main />
					</div>
				</div>
				<div className="flex-auto w-[20%] fixed right-0 top-12">
					<RightSide />
				</div>
			</div>
		</div>
	);
}
