import express from "express";
import cors from "cors";
import * as recipeAPI from './recipe-api'







const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/recipe/search", async (req, res) => {

    const searchTerm = req.query.searchTerm as string;

    const page = parseInt(req.query.page as string);
  
   
  
    const results = await recipeAPI.searchRecipes(searchTerm, page);
  
    return res.json(results);
  
});


app.get("/api/recipe/:recipeId/summary", async (req, res) => {

    const recipeId = req.params.recipeId;
  
    const result = await recipeAPI.getRecipeSummary(recipeId);
  
    res.json(result);
  
  });

app.listen(5000, () => {

    console.log("Server rodando na porta 5000");
  
});

