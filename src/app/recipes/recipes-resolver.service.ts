import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataService: DataStorageService, private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    // Only fetch recipes from the DB if there are no recipes.
    if (recipes.length === 0) {
      return this.dataService.fetchRecipes();
    }
    return recipes;
  }
}
