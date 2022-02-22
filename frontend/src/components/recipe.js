import cancelIcon from "../assets/images/cancel.svg";


export const Recipe = (props) => {

    const deleteDish = (recipeName) => {
        fetch("http://localhost:5000/dishes", 
        {  
            method: "DELETE",  
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                "recipeName": recipeName
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
            <h4>
                {props.recipe.recipeName}
            </h4>
            <div className="delete-recipe" onClick={()=>{
                    deleteDish(props.recipe.recipeName);
                    console.log("in here");
                    }}>
                {/* <CancelIcon/> */}
                <img src={cancelIcon} style={{ height: 20, width: 20 }} className="App-logo" alt="logo"/>
            </div>
        </div>
    );
}