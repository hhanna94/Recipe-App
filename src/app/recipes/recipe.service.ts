import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe("Tasty Schnitzel",
    "A super tasy Schnitzel -- just awesome!",
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/Figlm%C3%BCller-Schnitzel_in_Wien.jpg",
    [
      new Ingredient("Meat", 1),
      new Ingredient("French Fries", 20)
    ]),
    new Recipe("Big Fat Burger",
    "What else do you need to say?",
    "http://hillsdalecollegian.com/wp-content/uploads/2021/03/48574958831_a1845ea075_o.jpg",
    [
      new Ingredient("Buns", 2),
      new Ingredient("Meat", 1),
      new Ingredient("Cheese", 1),

    ]),
  ];

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
