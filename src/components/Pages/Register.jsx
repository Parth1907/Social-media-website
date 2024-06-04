import React, {useContext, useEffect, useReducer, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Button,
} from "@material-tailwind/react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ClipLoader} from "react-spinners";
import {auth, onAuthStateChanged} from "../firebase/firebase";
import {AuthContext} from "../AppContext/AppContext";


export default function Register() {
	const [loading, setLoading] = React.useState(false);
	const {registerWithEmailAndPassword} = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate("/");
				setLoading(false);
			} else {
				setLoading(false);
			}
		});
	}, [navigate]);

	let initialValues = {
		name: "",
		email: "",
		password: "",
		state: "",
		country: "",
		job: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.required("Required")
			.min("2", "Must be atleast 2 characters long")
			.matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
		email: Yup.string().email("Invalid email address").required("Required"),
		password: Yup.string()
			.required("Required")
			.min("6", "Must be atleast 6 characters long")
			.matches(
				/^[a-zA-Z0-9]+$/,
				"Password can only contain alphanumeric characters"
			),
		state: Yup.string().matches(
			/^[a-zA-Z\s]+$/,
			"State can only contain letters or a space"
		),
		country: Yup.string().matches(
			/^[a-zA-Z\s]+$/,
			"Country can only contain letters or a space"
		),
		job: Yup.string().matches(
			/^[a-zA-Z\s]+$/,
			"Job position can only contain letters"
		),
	});

	const handleRegister = async (e) => {
		e.preventDefault();
		const {name, email, password, state, country, job} = formik.values;
		if (formik.isValid) {
			registerWithEmailAndPassword(name, email, password, state, country, job);
			setLoading(true);
		} else {
			setLoading(false);
			alert("Check your input fields");
		}
		// console.log('formik: ',formik)
	};
	const formik = useFormik({initialValues, validationSchema});

	return (
		<div className="grid grid-cols-1 h-screen justify-items-center items-center">
			{loading ? (
				<ClipLoader color="#3650d6" size={150} speedMultiplier={0.5} />
			) : (
				<Card className="w-96">
					<CardHeader
						variant="gradient"
						color="gray"
						className="my-4 grid h-28 place-items-center"
					>
						<Typography variant="h3" color="white">
							REGISTER
						</Typography>
					</CardHeader>
					<CardBody className="flex flex-col">
						<form onSubmit={handleRegister}>
							{/* Name */}
							<div className="mb-2">
								<Input
									name="name"
									type="text"
									label="Name"
									size="lg"
									{...formik.getFieldProps("name")}
								/>
							</div>
							<div className="">
								{formik.touched.name && formik.errors.name && (
									<Typography variant="small" color="red">
										{formik.errors.name}
									</Typography>
								)}
							</div>
							{/* Email */}
							<div className="mt-4 mb-2">
								<Input
									name="email"
									type="email"
									label="Email"
									size="lg"
									{...formik.getFieldProps("email")}
								/>
							</div>
							<div className="">
								{formik.touched.email && formik.errors.email && (
									<Typography variant="small" color="red">
										{formik.errors.email}
									</Typography>
								)}
							</div>
							{/* Password */}
							<div className="mt-4 mb-2">
								<Input
									name="password"
									type="password"
									label="Password"
									size="lg"
									{...formik.getFieldProps("password")}
								/>
							</div>
							<div className="">
								{formik.touched.password && formik.errors.password && (
									<Typography variant="small" color="red">
										{formik.errors.password}
									</Typography>
								)}
							</div>

							<h1 className="font-bold mt-4">Profile Info</h1>

							{/* State */}
							<div className="mt-4 mb-2">
								<Input
									name="state"
									type="text"
									label="Residing state"
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
							<div className="mb-2 mt-4">
								<Input
									name="country"
									type="text"
									label="Residing country"
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
							<div className="mb-2 mt-4">
								<Input
									name="job"
									type="text"
									label="Current job"
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
								className="mb-4 mt-4"
								type="submit"
								fullWidth
							>
								Register
							</Button>
						</form>
						<h1 className="flex justify-center mt-0">OR</h1>
					</CardBody>
					<CardFooter className="pt-0">
						<Button variant="gradient" fullWidth className="mb-4">
							Sign In with Google
						</Button>
						<div className="mt-6 flex items-center font-roboto text-base justify-center">
							Already have an account?
							<Link to="/login">
								<p className="ml-1 font-bold font-roboto text-base text-blue-500 text-center">
									Login
								</p>
							</Link>
						</div>
					</CardFooter>
				</Card>
			)}
		</div>
	);
}
