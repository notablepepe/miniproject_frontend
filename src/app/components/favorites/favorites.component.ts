// favorites.component.ts
import { Component, Input, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeCardDetails } from 'src/app/models/recipe-card-details';
import { MealPlannerService } from 'src/app/services/meal-planner.service';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  
  favoriteRecipes : any[] = []
  service = inject(MealPlannerService)
  favoriteRecipesSub! : Subscription
  username! : string;
  favoriteRecipeCardList : RecipeCardDetails[] = []
  recipeCardSub! : Subscription
  recipeDetailsSub: any;
  recipeCardDetails: any;
  dialog = inject(MatDialog)

  ngOnInit(): void {
    this.username = localStorage.getItem('token') ?? ''
    console.log('user name is ' + this.username);
    this.favoriteRecipesSub = this.service.getFavoritesRecipe(this.username).subscribe({
      next: (data) => {
        this.favoriteRecipes = data
        console.log(this.favoriteRecipes);
        this.recipeCardSub = this.service.getRecipesByIds(this.favoriteRecipes).subscribe({
          next: (data) => {
            this.favoriteRecipeCardList = data;
            console.log('hello');
            console.log(this.favoriteRecipeCardList);
          },
          error: (error) => { console.log(error)},
          complete: () => { 
            if(this.recipeCardSub) {
              this.recipeCardSub.unsubscribe()
            }
          }
        })
      },
      error: (error) => {console.log(error)},
      complete: () => {this.favoriteRecipesSub.unsubscribe()}
    })
  }

  removeFromFavorites(recipeId: number) {
    const recipeToRemove = this.favoriteRecipeCardList.find(recipe => recipe.id === recipeId);

    if (recipeToRemove) {
      const index = this.favoriteRecipeCardList.indexOf(recipeToRemove);
      if (index !== -1) {
        this.favoriteRecipeCardList.splice(index, 1);
      }
    }
    console.log(this.favoriteRecipeCardList);
    
    this.service.unfavoriteRecipe(localStorage.getItem('token') ?? '',recipeId);
  }

  getDetails(id: number) {
    // Show the recipe details, after clicking need to query recipe details with the id
    this.recipeDetailsSub = this.service.getRecipeDetails(id).subscribe({
      next: (data) => {
        this.recipeCardDetails = data
        this.dialog.open(RecipeDialogComponent, {
          data: {
            card: this.recipeCardDetails,
            
          }
        })
      },
      error: (error) => {console.log(error)},
      complete: () => {
        this.recipeDetailsSub.unsubscribe()
      }
      
    })
  }





}