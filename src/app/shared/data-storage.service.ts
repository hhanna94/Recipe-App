import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://angular-demo-8062e-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe( (recipes) => {
        console.log(recipes);
      })
  }

  fetchRecipes() {
    this.http.get<Recipe[]>('https://angular-demo-8062e-default-rtdb.firebaseio.com/recipes.json')
      .subscribe( (recipes) => {
        this.recipeService.setRecipes(recipes);
      })
  }

}
