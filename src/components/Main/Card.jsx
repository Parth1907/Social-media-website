import React from "react";
export default function Card({name, img, status}) {
	return (
		<div className="">
			<div
				className="h-80 rounded-2xl hover:scale-105 duration-700 ease-in-out cursor-pointer shadow-lg flex flex-col justify-end"
				style={{
					backgroundImage: `url(${img})`,
					backgroundSize: "cover",
				}}
			>
				<p className="text-sm font-medium font-roboto no-underline leading-none ml-4 bg-opacity-100">
					{name}
				</p>
				<p
					className={`mr-4 mb-2 flex justify-end text-sm font-medium ${
						status === "Offline" ? "text-red-600" : "text-green-600"
					} font-roboto no-underline leading-none`}
				>
					{status}
				</p>
			</div>
		</div>
	);
}
