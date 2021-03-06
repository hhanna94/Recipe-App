import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingredientChangedSub: Subscription

  constructor(private listService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.listService.getIngredients();
    this.ingredientChangedSub = this.listService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
  }

  onEditItem(index: number) {
    this.listService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
      this.ingredientChangedSub.unsubscribe();
  }
}
