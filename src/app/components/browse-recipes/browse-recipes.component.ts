import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RecipeCard } from 'src/app/models/recipe-card';
import { RecipeCardDetails } from 'src/app/models/recipe-card-details';
import { MealPlannerService } from 'src/app/services/meal-planner.service';
import { MatDialog} from '@angular/material/dialog';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';

@Component({
  selector: 'app-browse-recipes',
  templateUrl: './browse-recipes.component.html',
  styleUrls: ['./browse-recipes.component.css']
})
export class BrowseRecipesComponent implements OnInit{
  macrosForm!: FormGroup;

  fb = inject(FormBuilder)
  http = inject(HttpClient)
  recipeSub!: Subscription
  recipeList : RecipeCard[] = []
  service = inject(MealPlannerService)
  recipeDetailsSub! : Subscription
  recipeCardDetails!: RecipeCardDetails 
  dialog = inject(MatDialog)
  

  ngOnInit(): void {
    this.macrosForm = this.fb.group({
      caloriesMin:['', Validators.required],
      caloriesMax:['', Validators.required],
      protein: ['', Validators.required],
      carbs: ['', Validators.required],
      fat: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.macrosForm.valid) {
      //to do Send a request to your backend with the form values
      const caloriesMin = this.macrosForm.value['caloriesMin']
      const caloriesMax = this.macrosForm.value['caloriesMax']
      const protein = this.macrosForm.value['protein']
      const carbs = this.macrosForm.value['carbs']
      const fat = this.macrosForm.value['fat']

      this.recipeSub = this.service.getRecipes(caloriesMin,caloriesMax,protein,carbs,fat).subscribe({
        next: (data) => {
          this.recipeList = data;
          console.log(this.recipeList);
          if(this.recipeList.length == 0) {
            alert('No results found, check if your inputs are valid')
          }
          else {
            alert('Submission succesful')
          }
        },
        error: (error) => {console.log(error)},
        complete: () => {
          this.recipeSub.unsubscribe()
        }
        
      })
      
    } else {
      alert('One of the fields are left empty')
    }
  }

  showDetails(id: number) {
    // Show the recipe details, after clicking need to query recipe details with the id
    this.recipeDetailsSub = this.service.getRecipeDetails(id).subscribe({
      next: (data) => {
        this.recipeCardDetails = data
        this.dialog.open(RecipeDialogComponent, {
          data: {card: this.recipeCardDetails}
        })
      },
      error: (error) => {console.log(error)},
      complete: () => {
        this.recipeDetailsSub.unsubscribe()
      }
      
    })
  }

  

}
