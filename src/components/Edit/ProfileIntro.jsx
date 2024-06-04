import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../AppContext/AppContext";
import Navbar from "../Navbar/Navbar";
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Input,
	Button,
} from "@material-tailwind/react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import {db} from "../firebase/firebase";

export default function ProfileIntro() {
	const {user, userData} = useContext(AuthContext);
	const navigate = useNavigate();

	let initialValues = {
		state: userData?.state,
		country: userData?.country,
		job: userData?.job,
	};
	// const userRef = doc(db, "users", userData?.uid);
	const editUserProfile = async (state, country, job) => {
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
				state: state,
				country: country,
				job: job,
			});
		} catch (error) {
			alert(error.message);
			console.log(error.message);
		}
	};

	const validationSchema = Yup.object({
		state: Yup.string()
			.required("Required")
			.min("2", "Must be atleast 2 characters long")
			.matches(/^[a-zA-Z\s]+$/, "State can only contain letters or spaces"),
		country: Yup.string()
			.required("Required")
			.min("2", "Must be atleast 2 characters long")
			.matches(/^[a-zA-Z\s]+$/, "Country can only contain letters or spaces"),
		job: Yup.string()
			.required("Required")
			.min("2", "Must be atleast 2 characters long")
			.matches(/^[a-zA-Z\s]+$/, "Job position can only contain letters or spaces"),
	});

	const formik = useFormik({initialValues, validationSchema});

	const handleformSubmission = (e) => {
		e.preventDefault();
		const {state, country, job} = formik.values;
		if (formik.isValid === true) {
			editUserProfile(state, country, job);
			navigate('/');
		} else {
			alert("Check your input fields");
		}
	};

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
										Edit Profile Page Intro
									</Typography>
								</CardHeader>
								<CardBody className="flex flex-col">
									<form onSubmit={handleformSubmission}>
										{/* State */}
										<div className="mb-2">
											<Input
												name="state"
												type="text"
												label="Please enter your residing state"
												size="lg"
												{...formik.getFieldProps("state")}
											/>
										</div>
										<div className="">
											{formik.touched.state && formik.errors.state && (
												<Typography variant="small" color="red">
													{formik.errors.state}
												</Typography>
											)}
										</div>
										{/* Country */}
										<div className="mb-2 mt-2">
											<Input
												name="country"
												type="text"
												label="Please enter your residing country"
												size="lg"
												{...formik.getFieldProps("country")}
											/>
										</div>
										<div className="">
											{formik.touched.country && formik.errors.country && (
												<Typography variant="small" color="red">
													{formik.errors.country}
												</Typography>
											)}
										</div>
										{/* Job */}
										<div className="mb-2 mt-2">
											<Input
												name="job"
												type="text"
												label="Please enter your job postion"
												size="lg"
												{...formik.getFieldProps("job")}
											/>
										</div>
										<div className="">
											{formik.touched.job && formik.errors.job && (
												<Typography variant="small" color="red">
													{formik.errors.job}
												</Typography>
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
