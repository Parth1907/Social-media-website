import React, {useEffect, useState, useReducer, useRef} from "react";
import {Avatar, Alert} from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import Navbar from "../Navbar/Navbar";
import RightSide from "../RightSidebar/RightSide";
import profilePic from "../../assets/images/profilePic.jpg";
import {useParams} from "react-router-dom";
import {
	collection,
	onSnapshot,
	query,
	where,
	orderBy,
} from "firebase/firestore";
import {db} from "../firebase/firebase";
import PostCard from "../Main/PostCard";
import {
	PostsReducer,
	postsStates,
	postActions,
} from "../AppContext/PostReducer";
import Main from "../Main/Main";

export default function FriendProfile() {
	const [state, dispatch] = useReducer(PostsReducer, postsStates);

	const {SUBMIT_POST, HANDLE_ERROR} = postActions;
	const scrollRef = useRef("");

	const {id} = useParams();
	const [profile, setProfile] = useState(null);
	useEffect(() => {
		const getUserProfile = async () => {
			const q = query(collection(db, "users"), where("uid", "==", id));
			onSnapshot(q, (doc) => {
				setProfile(doc.docs[0].data());
			});
		};
		getUserProfile();
	}, [id]);

	useEffect(() => {
		const postData = async () => {
			const q = query(
				collection(db, "posts"),
				where("uid", "==", id),
				orderBy("timestamp", "desc")
			);
			const unsubscribe = onSnapshot(q, (doc) => {
				dispatch({
					type: SUBMIT_POST,
					posts: doc?.docs?.map((item) => item?.data()),
				});
				scrollRef?.current?.scrollIntoView({behavior: "smooth"});
			});
			return () => unsubscribe();
		};
		postData();

	}, [id, SUBMIT_POST]);

	return (
		<div className="w-full">
			<div className="fixed top-0 z-10 w-full bg-white">
				<Navbar />
			</div>
			<div className="flex bg-gray-100">
				<div className="flex-auto w-[20%] fixed top-12">
					{/* <LeftSide /> */}
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
											From {profile?.state}, {profile?.country}
										</span>
									</div>
									<div className="flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-10 text-white"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
											/>
										</svg>

										<span className="ml-2 py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none flex justify-center">
											{profile?.job}
										</span>
									</div>
								</div>
							</div>
						</div>
						{/* <Main /> */}
						<div className="flex flex-col py-4 w-full">
							{state.error ? (
								<div className=" flex justify-center items-center ">
									<Alert color="red">
										Something went wrong, refresh and try again...
									</Alert>
								</div>
							) : (
								<div className="">
									{state.posts.length > 0 &&
										state?.posts?.map((post, index) => {
											return (
												<PostCard
													key={index}
													logo={post.logo}
													id={post?.documentId}
													uid={post?.uid}
													name={post.name}
													email={post.email}
													text={post.text}
													image={post.image}
													timestamp={new Date(
														post?.timestamp?.toDate()
													)?.toUTCString()}
												/>
											);
										})}
								</div>
							)}
						</div>
						<div ref={scrollRef}></div>
					</div>
				</div>
				<div className="flex-auto w-[20%] fixed right-0 top-12">
					<RightSide />
				</div>
			</div>
		</div>
	);
}
