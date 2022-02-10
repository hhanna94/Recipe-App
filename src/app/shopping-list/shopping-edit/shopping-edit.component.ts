import { Component, OnInit,  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private listService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    this.listService.addIngredient(newIngredient);
  }

}
