import React,{useContext} from "react";
import {AuthContext} from "../AppContext/AppContext";
import {cardData} from "../../assets/cardData";
import Card from "./Card";
export default function CardSection() {
	// const {user, userData} = useContext(AuthContext);
	// console.log(userData);
	// const friendList = userData?.friends;
	// console.log(friendList);
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
				{/* {friendList.map((card) => {
					console.log(card);
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
				})} */}
			</div>
		</div>
	);
}
