import React, {useContext, useEffect} from "react";
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
			.matches(/^[a-zA-Z0-9]+$/, "Password can only contain alphanumeric characters"),
	});

	const handleRegister = (e) => {
		e.preventDefault();
		const {name, email, password} = formik.values;
		if (formik.isValid === true) {
			registerWithEmailAndPassword(name, email, password);
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
						className="mb-4 grid h-28 place-items-center"
					>
						<Typography variant="h3" color="white">
							REGISTER
						</Typography>
					</CardHeader>
					<CardBody className="flex flex-col">
						<form onSubmit={handleRegister}>
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
							<Button
								variant="gradient"
								className="mb-4"
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
