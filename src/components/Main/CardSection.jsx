import React from "react";
import {cardData} from "../../assets/cardData";
import Card from "./Card";
export default function CardSection() {
	return (
		<div className="">
			<div className="grid grid-cols-5 gap-2 pt-8 mb-10">
				{cardData.map((card) => {
					return (
						<div key={card.id}>
							<Card
								id={card.id}
								name={card.name}
								img={card.image}
								status={card.status}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
