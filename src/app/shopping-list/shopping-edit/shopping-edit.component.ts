import { Component, OnDestroy, OnInit, ViewChild,  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm', { static: false }) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  editedItemIndex: number;

  constructor(private listService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.listService.startedEditing
      .subscribe( (index: number) => {
        this.editMode = true;
        this.editedItem = this.listService.getIngredient(index);
        this.editedItemIndex = index;
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      })
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.listService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.listService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.resetForm();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
