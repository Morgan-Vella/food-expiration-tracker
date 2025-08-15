import DaysLeft from "./DaysLeft.jsx";

const FoodItem = ({food, onDelete}) => {
    return(
        <div style={{
            display:"flex",
            alignItems: "center",
            gap:"1rem",
            padding:"0.5rem 0",
            borderBottom: "1px solid #ddd"
        }}>
            <span style={{flex: 1}}>{food.name}</span>
            <DaysLeft expirationDate={food.expirationDate}/>
            <button onClick={()=>onDelete(food._id)}
                style={{
                    background: 'transparent',
                    border: '1px solid red',
                    color: 'red',
                    cursor: 'pointer',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px'
                }}>Delete
            </button>
        </div>
    )
};

export default FoodItem;