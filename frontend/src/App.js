import { useState, useEffect } from "react";
import { Recipe } from "./components/recipe";

import './App.css';

function App() {

  const [addingRecipe,setAddingRecipe] = useState(false);

  const [dishes,setDishes] = useState([]);

  const getDishes = () => {
    fetch('http://localhost:5000/dishes')
    .then(result => {return result.json()})
    .then(data => {
      console.log(data);
      setDishes(data);
    });
  }

  const addDish = (recipeName) => {
    fetch("http://localhost:5000/dishes", 
        {  
            method: "POST",  
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
            getDishes();
        });
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      addDish(e.target.value);
      setAddingRecipe(false);
    }
      
  }

  useEffect(()=>{
    getDishes();
  },[]);



  return (
    <div className="App">
      <header className="App-header">
        <div className="title-header-container">
          <h1>Recipe Quest</h1>
          <button className="add-recipe-button" onClick={()=>setAddingRecipe(!addingRecipe)}>
          { addingRecipe ? (<>cancel</>):(<>add recipe</>)}
          </button>
        </div>
        <div className="body-section">
          { addingRecipe &&
          <div className="input-holder">
            <>New Recipe Name:</>
            <input onKeyDown={(e) => handleKeyDown(e)}></input>
          </div>
          }
          {dishes.map((recipe,index) => 
            <Recipe recipe={recipe} getDishes={getDishes} key={index}/>        
          )
          }
        </div>
      </header>
    </div>
  );
}

export default App;
