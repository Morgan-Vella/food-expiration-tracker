import React from "react"

const DaysLeft = ({expirationDate}) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let style = {color: "black"};
    let text = '';

    if (diffDays < 0) {
        style.color = "red";
        text = `Expired ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : "" } ago`;
    } else if(diffDays === 0 ){ 
        style.color = "orange";
        text = "Expires today!"
    } else if (diffDays <= 3){
        style.color = "yellow";
        text = `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
    } else {
        text = `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
    }

    return <span style={style}>{text}</span>
}

export default DaysLeft