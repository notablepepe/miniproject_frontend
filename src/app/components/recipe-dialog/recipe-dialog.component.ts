import { Component, Inject, Input, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RecipeCardDetails } from 'src/app/models/recipe-card-details';
import { MealPlannerService } from 'src/app/services/meal-planner.service';


@Component({
  selector: 'app-recipe-dialog',
  templateUrl:'./recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {card: RecipeCardDetails}) { }
  
  service = inject(MealPlannerService)
  addSub! : Subscription

  addToFavorites(recipeId: number) {
    
    console.log(`recipeId to favorite is ${recipeId}`);
    
    this.service.favoriteRecipe(localStorage.getItem('token') ?? '',recipeId)
  
  }

  removeFromFavorites(recipeId: number) {
    this.service.unfavoriteRecipe(localStorage.getItem('token') ?? '',recipeId);
  }
  
}
