import "./App.css";
import React, { useState, FormEvent, useRef} from "react";

import * as api from "./API";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";

function App() {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearchSubmit = async (event: FormEvent) => { //vai lidae com o envio do formulari de pesquisa

    event.preventDefault();

    try {

      const response = await fetch(

        `http://localhost:5000/api/recipes/search?searchTerm=${searchTerm}`

      );

      if (!response.ok) {

        throw new Error(`HTTP error! status: ${response.status}`);

      }

      const data = await response.json();

      setRecipes(data.results);

      pageNumber.current = 1;

    } catch (error) {

      console.error(error);

    }

  };

  const handleViewMoreClick = async () => {

    try {
  
      const nextPage = pageNumber.current + 1;
  
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
  
      setRecipes((prevRecipes) => [...prevRecipes, ...nextRecipes.results]);
  
      pageNumber.current = nextPage;
  
    } catch (error) {
  
      console.error(error);
  
    }
  
  };

  const pageNumber = useRef(1);

  return (

    <div>

      <form onSubmit={handleSearchSubmit}>

        <input
          type="text"
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquise por receitas..."
        />

        <button type="submit">Pesquisar</button>

      </form>

      {recipes.map((recipe) => (

        <RecipeCard key={recipe.id} recipe={recipe} />

      ))}

      <button className="view-more" onClick={handleViewMoreClick}> 

      Ver mais 

      </button>

    </div>

  );

};

export default App;








