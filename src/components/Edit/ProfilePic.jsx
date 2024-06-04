import React, {useContext, useEffect, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../AppContext/AppContext";
import Navbar from "../Navbar/Navbar";
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Button,
} from "@material-tailwind/react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import {db} from "../firebase/firebase";

export default function ProfilePic() {
	const {user, userData} = useContext(AuthContext);

	const navigate = useNavigate();

	const [profilePic, setProfilePic] = useState(userData?.profilePicUrl);
	const [profilePicFile, setProfilePicFile] = useState(null);
	const [profileBackground, setProfileBackground] = useState(
		userData?.profileBackgroundUrl
	);
	const [profileBackgroundFile, setProfileBackgroundFile] = useState(null);


	const [progressBar, setProgressBar] = useState(0);
	const storage = getStorage();

	const handleUpload = (event, setFile) => {
		setFile(event.target.files[0]);
	};
	const metadata = {
		contentType: [
			"image/jpg",
			"image/jpeg",
			"image/png",
			"image/gif",
			"image/svg+xml",
		],
	};

	// const submitImage = async () => {
	const submitImage = async (file, setImage, folder) => {
		const fileType = metadata.contentType.includes(file["type"]);
		// console.log("file", file);
		if (!file) {
			alert('Invalid file type, allowed file types are jpg, jpeg, png, gif, svg+xml');
			return;
		};
		if (fileType) {
			try {
				// const storageRef = ref(storage, `images/${file.name}`);
				const storageRef = ref(storage, `images/${folder}/${file.name}`);
				const uploadTask = uploadBytesResumable(
					storageRef,
					file
					// metadata.contentType
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

	const handleformSubmission = async(e) => { 
		e.preventDefault();
		try {
			const q = query(
				collection(db, "users"),
				where("uid", "==", userData?.uid)
			);
			const querySnapshot = await getDocs(q);
			let docID = "";
			querySnapshot.forEach((doc) => {
				docID = doc.id;
			});
			const userRef = doc(db, "users", docID);
			await updateDoc(userRef, {
				profilePicUrl: profilePic,
				profileBackgroundUrl: profileBackground,
			});
			navigate("/");
		} catch (error) {
			
		}
	}
	return (
		<div className="w-full">
			<div className="fixed top-0 z-10 w-full bg-white">
				<Navbar />
			</div>
			<div className="flex bg-gray-100">
				<div className="flex-auto w-[100%] absolute top-14 bg-gray-100 rounded-xl ">
					<div className="w-[80%] mx-auto">
						<div className="grid grid-cols-1 h-[90vh] justify-items-center items-center">
							<Card className="w-96">
								<CardHeader
									variant="gradient"
									color="gray"
									className="mb-4 grid h-28 place-items-center"
								>
									<Typography variant="h3" color="white">
										Edit Profile Page Pictures
									</Typography>
								</CardHeader>
								<CardBody className="flex flex-col">
									<form onSubmit={handleformSubmission}>
										{/* Profile Pic */}
										<div className="mb-2 mt-4">
											<label htmlFor="addProfilePic">
												<input
													type="file"
													name="profilePic"
													id="addProfilePic"
													onChange={(e) => handleUpload(e, setProfilePicFile)}
												/>
											</label>
											{profilePicFile && (
												<Button
													variant="text"
													onClick={() =>
														submitImage(
															profilePicFile,
															setProfilePic,
															"profileImgs"
														)
													}
												>
													Upload
												</Button>
											)}
											<span
												style={{width: `${progressBar}%`}}
												className=" bg-blue-700 py-1 rounded-md "
											></span>
											{profilePic && (
												<img
													src={profilePic}
													alt="ProfilePic"
													className="w-36"
												/>
											)}
										</div>

										{/* Profile Backgrund */}
										<div className="mb-2 mt-4">
											<label htmlFor="addProfileBackground">
												<input
													type="file"
													name="profileBackground"
													id="addProfileBackground"
													onChange={(e) =>
														handleUpload(e, setProfileBackgroundFile)
													}
												/>
											</label>
											{profileBackgroundFile && (
												<Button
													variant="text"
													onClick={() =>
														submitImage(
															profileBackgroundFile,
															setProfileBackground,
															"backgroundImgs"
														)
													}
												>
													Upload
												</Button>
											)}
											<span
												style={{width: `${progressBar}%`}}
												className=" bg-blue-700 py-1 rounded-md "
											></span>
											{profileBackground && (
												<img
													src={profileBackground}
													alt="ProfileBackground"
													className="w-full"
												/>
											)}
										</div>
                                        <Button
											variant="gradient"
											className="mb-4 mt-2"
											type="submit"
											fullWidth
										>
											Submit
										</Button>
									</form>
								</CardBody>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
