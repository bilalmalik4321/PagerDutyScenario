import { useState } from "react";

import cancelIcon from "../assets/images/cancel.svg";
import editIcon from "../assets/images/edit.svg";


export const Recipe = (props) => {

    const [editing,setEditing] = useState(false);

    const deleteDish = (dishID) => {
        fetch("http://localhost:5000/dishes", 
        {  
            method: "DELETE",  
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                "dishID": dishID
            })
        }) 
        .then(response => {    
            console.log(response.status); 
            return response.json(); 
        })  
        .then(data => {
            console.log(data);
            props.getDishes();
        });
    }

    return (
        <div className="recipe-holder">
            { editing ? (
                <>editing</>
            ):(
            <>
                <h4>
                    {props.recipe.recipeName}
                </h4>
                {props.recipe.halal && <h6 style={{ backgroundColor: "#d6f5d6", color: "#196619", borderRadius: 5 }}>Halal</h6>}
                {props.recipe.kosher && <h6 style={{ backgroundColor: "#b3d1ff", color: "#002966", borderRadius: 5 }}>Kosher</h6>}
                {props.recipe.vegan && <h6 style={{ backgroundColor: "#ffd699", color: "#995c00", borderRadius: 5 }}>Vegan Friendly</h6>}
            </>
            )
            }
            <div className="delete-recipe" onClick={()=>deleteDish(props.recipe.dishID)}>
                <img src={cancelIcon} style={{ height: 20, width: 20 }} className="cancel" alt="cancel"/>
            </div>
            {/* <img src={editIcon} onClick={()=>setEditing(!editing)} style={{ height: 20, width: 20 }} className="App-logo" alt="logo"/> */}
        </div>
    );
}