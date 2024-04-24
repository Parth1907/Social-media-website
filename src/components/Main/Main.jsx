import React, {
	useRef,
	useContext,
	useState,
	useReducer,
	useEffect,
} from "react";
import {Avatar, Button, Alert} from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import smile from "../../assets/images/smile.png";
import live from "../../assets/images/live.png";
import addImage from "../../assets/images/add-image.png";
import {AuthContext} from "../AppContext/AppContext";
import {
	doc,
	setDoc,
	collection,
	serverTimestamp,
	query,
	orderBy,
	onSnapshot,
} from "firebase/firestore";
import {db} from "../firebase/firebase";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import {
	PostsReducer,
	postActions,
	postsStates,
} from "../AppContext/PostReducer";
import PostCard from "./PostCard";

export default function Main() {
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);

	const text = useRef("");
	const scrollRef = useRef("");

	const {user, userData} = useContext(AuthContext);

	const collectionRef = collection(db, "posts");
	const postRef = doc(collection(db, "posts"));
	const document = postRef.id;

	const [state, dispatch] = useReducer(PostsReducer, postsStates);
	const {SUBMIT_POST, HANDLE_ERROR} = postActions;

	const [progressBar, setProgressBar] = useState(0);

	const handleUpload = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmitPost = async (e) => {
		e.preventDefault();
		if (text.current.value !== "") {
			try {
				await setDoc(postRef, {
					documentId: document,
					uid: user?.uid || userData?.uid,
					logo: user?.photoURL,
					name: user?.displayName || userData?.name,
					email: user?.email || userData?.email,
					text: text.current.value,
					image: image,
					timestamp: serverTimestamp(),
				});
				text.current.value = "";
			} catch (error) {
				dispatch({type: HANDLE_ERROR});
				alert(error.message);
				console.log(error.message);
			}
		} else {
			dispatch({type: HANDLE_ERROR});
		}
	};

	const storage = getStorage();

	const metadata = {
		contentType: [
			"image/jpg",
			"image/jpeg",
			"image/png",
			"image/gif",
			"image/svg+xml",
		],
	};

	const submitImage = async () => {
		const fileType = metadata.contentType.includes(file["type"]);
		// console.log("file", file);
		if (!file) return;
		if (fileType) {
			try {
				const storageRef = ref(storage, `images/${file.name}`);
				const uploadTask = uploadBytesResumable(
					storageRef,
					file,
					metadata.contentType
				);
				await uploadTask.on(
					"state_changed",
					(snapshot) => {
						const progress = Math.round(
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						);
						setProgressBar(progress);
					},
					(error) => {
						alert(error);
					},
					async () => {
						await getDownloadURL(uploadTask.snapshot.ref).then(
							(downloadURL) => {
								setImage(downloadURL);
							}
						);
					}
				);
			} catch (error) {
				dispatch({type: HANDLE_ERROR});
				alert(error.message);
				console.log(error.message);
			}
		}
	};

	useEffect(() => {
		const postData = async () => {
			const q = query(collectionRef, orderBy("timestamp", "asc"));
			onSnapshot(q, (doc) => {
				dispatch({
					type: SUBMIT_POST,
					posts: doc?.docs?.map((item) => item?.data()),
				});
				scrollRef?.current?.scrollIntoView({behavior: "smooth"});
				setImage(null);
				setFile(null);
				setProgressBar(0);
			});
		};
		return () => postData();
	}, [SUBMIT_POST]);

	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
				<div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
					<Avatar
						src={user?.photoURL || avatar}
						size="sm"
						variant="circular"
						alt="avatar"
					></Avatar>
					<form className="w-full" onSubmit={handleSubmitPost}>
						<div className="flex justify-between items-center">
							<div className="w-full ml-4">
								<input
									type="text"
									name="text"
									placeholder="What on your mind?"
									className="outline-none w-full bg-white rounded-md"
									ref={text}
								/>
							</div>
							<div className="mx-4">
								{image && (
									<img
										className="h-24 rounded-xl"
										src={image}
										alt="previewImage"
									></img>
								)}
							</div>
							<div className="mr-4">
								<Button variant="text" type="submit">
									Share
								</Button>
							</div>
						</div>
					</form>
				</div>
				<span
					style={{width: `${progressBar}%`}}
					className=" bg-blue-700 py-1 rounded-md "
				></span>
				<div className="flex justify-around items-center pt-4">
					<div className="flex items-center">
						<label
							htmlFor="addImage"
							className="cursor-pointer flex items-center"
						>
							<img className="h-10 mr-4" src={addImage} alt="addImage" />
							<input
								style={{display: "none"}}
								type="file"
								id="addImage"
								onChange={handleUpload}
							/>
						</label>
						{file && (
							<Button variant="text" onClick={submitImage}>
								Upload
							</Button>
						)}
					</div>
					<div className="flex items-center">
						<img className="h-10 mr-4" src={live} alt="live" />
						<p className="font-roboto font-medium text-gray-700 no-underline tracking-normal leading-none">
							Live
						</p>
					</div>
					<div className="flex items-center">
						<img className="h-10 mr-4" src={smile} alt="feeling" />
						<p className="font-roboto font-medium text-gray-700 no-underline tracking-normal leading-none">
							Feeling
						</p>
					</div>
				</div>
			</div>
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
	);
}
