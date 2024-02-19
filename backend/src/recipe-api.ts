require('dotenv').config();

const API_KEY = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {

    if (!API_KEY) {
  
      throw new Error("API key not found");
  
    }
  
   
  
    const baseURL = "https://api.spoonacular.com/recipes/complexSearch";
  
    const url = new URL(baseURL);
  
   
  
    const queryParams = {
  
      apiKey: API_KEY,
  
      query: searchTerm,
  
      number: 10,
  
      offset: (page - 1) * 10,
  
    };

  
    const queryParamsString = `apiKey=${queryParams.apiKey}&query=${queryParams.query}&number=${queryParams.number}&offset=${queryParams.offset}`;
    url.search = queryParamsString;
    

  
   
  
    try {
  
      const searchResponse = await fetch(url.toString());
  
      const resultsJson = await searchResponse.json();
  
      return resultsJson;
  
    } catch (error) {
  
      console.error(error);
  
    }
  
  };