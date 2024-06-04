import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Avatar} from "@material-tailwind/react";
import {AuthContext} from "../AppContext/AppContext";
import avatar from "../../assets/images/avatar.jpg";
import bgImg from "../../assets/images/wallpaper.jpg";
import remove from "../../assets/images/delete.png";
import {
	arrayRemove,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import {db} from "../firebase/firebase";

export default function RightSide() {
	const [input, setInput] = useState("");
	const {user, userData} = useContext(AuthContext);
	const friendList = userData?.friends;
	// console.log(friendList);
	const searchFriends = (data) => {
		return data.filter((item) =>
			item["name"].toLowerCase().includes(input.toLowerCase())
		);
	};

	const removeFriend = async (id, name, image) => {
		const q = query(collection(db, "users"), where("uid", "==", user?.uid));
		const getDoc = await getDocs(q);
		const userDocumentId = getDoc.docs[0].id;

		await updateDoc(doc(db, "users", userDocumentId), {
			friends: arrayRemove({id: id, name: name, image: image}),
		});
	};

	return (
		<div className="flex flex-col h-screen shadow-lg border-2 rounded-l-xl">
			{/* <div className="flex flex-col items-center relative pt-10">
				<img className="h-48 rounded-md" src={bgImg} alt="nature" />
			</div>
			<p className="font-roboto font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mx-2">
				Toronto, Canada's largest city, is a vibrant cultural and economic hub,
				known for its diverse neighborhoods, iconic skyline, and the stunning CN
				Tower.
			</p> */}
			<div className="mx-2 mt-4">
				<p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
					Friends:
				</p>
				<input
					type="text"
					name="input"
					className="mt-4 border-0 outline-none"
					value={input}
					placeholder="Search friends"
					onChange={(e) => {
						setInput(e.target.value);
					}}
				/>
				{friendList?.length > 0 ? (
					searchFriends(friendList)?.map((friend) => {
						return (
							<div
								className="flex items-center justify-between hover:bg-gray-100 duration-300 ease-in-out"
								key={friend.id}
							>
								<Link to={`/profile/${friend.id}`}>
									<div className="flex items-center my-2 cursor-pointer">
										<div className="flex items-center">
											<Avatar
												size="sm"
												variant="circular"
												src={friend?.image || avatar}
												alt="avatar"
											></Avatar>
											<p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
												{friend.name}
											</p>
										</div>
									</div>
								</Link>
								<div className="mr-4">
									<img
										className="cursor-pointer size-8"
										src={remove}
										alt="deleteFriend"
										onClick={() => removeFriend(friend.id, friend.name, friend.image)}
									/>
								</div>
							</div>
						);
					})
				) : (
					<p className="mt-10 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
						Add friends to check their profile
					</p>
				)}
			</div>
		</div>
	);
}
