import React from "react";
import {Typography, Input, Button} from "@material-tailwind/react";

export default function Reset() {
	const [email, setEmail] = React.useState("");
	return (
		<div className="grid grid-cols-1 h-screen justify-items-center items-center">
			<div className="w-96">
				<Typography variant="h6" color="blue-gray" className="pb-4">
					Enter the email associated with your account and we'll send you a link
					to reset your password
				</Typography>
				<Input
					type="email"
					name="email"
					lable="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Button variant="gradient" fullWidth className="mt-4">
					Continue
				</Button>
			</div>
		</div>
	);
}
