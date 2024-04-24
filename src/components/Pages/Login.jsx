import React, {useEffect} from "react";
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
import {AuthContext} from "../AppContext/AppContext";
import {auth, onAuthStateChanged} from "../firebase/firebase";

export default function Login() {
	const [loading, setLoading] = React.useState(false);
	const {signInWithGoogle, loginWithEmailAndPassword} =
		React.useContext(AuthContext);
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
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email address").required("Required"),
		password: Yup.string()
			.required("Required")
			.min("6", "Must be atleast 6 characters long")
			.matches(/^[a-zA-Z0-9]+$/, "Password can only contain letters"),
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const {email, password} = formik.values;
		if (formik.isValid === true) {
			loginWithEmailAndPassword(email, password);
			setLoading(true);
		} else {
			setLoading(false);
		}
		// console.log('formik: ',formik)
	};

	const formik = useFormik({initialValues, validationSchema, handleSubmit});

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
							Login
						</Typography>
					</CardHeader>
					<CardBody className="flex flex-col">
						<form onSubmit={handleSubmit}>
							<div className="mb-2">
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
								Login
							</Button>
						</form>
						<h1 className="flex justify-center mt-0">OR</h1>
					</CardBody>
					<CardFooter className="pt-0">
						<Button
							variant="gradient"
							fullWidth
							className="mb-4"
							onClick={signInWithGoogle}
						>
							Sign In with Google
						</Button>
						<Link to="/reset">
							<p className="ml-1 font-bold font-roboto text-sm text-blue-500 mt-6 flex justify-center">
								Reset Password
							</p>
						</Link>
						<div className="mt-6 flex items-center font-roboto text-base justify-center">
							Don't have an account?
							<Link to="/register">
								<p className="ml-1 font-bold font-roboto text-sm text-blue-500 text-center">
									Register
								</p>
							</Link>
						</div>
					</CardFooter>
				</Card>
			)}
		</div>
	);
}
