import "./App.css";
import React, { useState, FormEvent } from "react";
import searchRecipes from "./API";
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

    } catch (error) {

      console.error(error);

    }

  };

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

    </div>

  );

};

export default App;








