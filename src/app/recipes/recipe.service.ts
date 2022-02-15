import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  getRecipes() {
    return [...this.recipes];
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.updateDOM();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.updateDOM();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.updateDOM();
  }

  updateDOM() {
    this.recipesChanged.next([...this.recipes]);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updateDOM();
  }

  constructor() { }
}
