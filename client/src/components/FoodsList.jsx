import React from "react";
import FoodItem from "./FoodItem";

const FoodsList = ({foods, onDelete}) => {
    if(!foods || foods.length === 0) {
        return <p style={{textAlign: "center"}}>No foods to display</p>
    }

    return (
        <div>
            {foods.map(food => (
                <FoodItem key={food._id} food={food} onDelete={onDelete} />
            ))}
        </div>
    )
};

export default FoodsList