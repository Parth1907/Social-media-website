import React from "react";
export default function Card({name, img, status}) {
	return (
		<div className="">
			<div className="relative">
				<img
					className="h-80 w-56 rounded-2xl hover:scale-105 duration-700 ease-in-out cursor-pointer shadow-lg"
					src={img}
					alt={name}
				/>
				<p className="absolute bottom-4 left-4 text-sm font-medium text-white font-roboto no-underline leading-none">
					{name}
				</p>
				<p
					className={`absolute bottom-4 right-4 text-sm font-medium ${
						status === "Offline" ? "text-red-600" : "text-green-600"
					} font-roboto no-underline leading-none`}
				>
					{status}
				</p>
			</div>
		</div>
	);
}
