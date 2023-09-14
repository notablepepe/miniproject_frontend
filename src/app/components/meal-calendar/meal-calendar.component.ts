import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngredientList } from 'src/app/models/ingredient-list';
import { Macros } from 'src/app/models/macros';
import { RecipeCard } from 'src/app/models/recipe-card';
import { RecipeCardDetails } from 'src/app/models/recipe-card-details';
import { MealPlannerService } from 'src/app/services/meal-planner.service';

@Component({
  selector: 'app-meal-calendar',
  templateUrl: './meal-calendar.component.html',
  styleUrls: ['./meal-calendar.component.css']
})
export class MealCalendarComponent implements OnInit{
  username! : string
  router = inject(Router)
  ingredientsFromCalendar : IngredientList[] = []
  favoriteRecipes : any[] = []
  service = inject(MealPlannerService)
  favoriteRecipesSub! : Subscription
  favoriteRecipeCardList : RecipeCardDetails[] = []
  recipeCardSub! : Subscription
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  mealPlanner: {
    [day: string]: {
      [mealType: string]: RecipeCardDetails | undefined;
    };
  } = {
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
    Sunday: {},
  };

  macrosMap : {
    [day: string] : Macros | undefined;
    
  } = {
    Monday: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    },
    Tuesday: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    },
    Wednesday: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    },
    Thursday: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0  
    },
    Friday: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    },
    Saturday: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    },
    Sunday: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    },
  };
  

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

  addToMealPlanner(day:string , mealTime: string , mealId: string) {
      console.log(`meal is ${mealId}`);
      if(mealId != ""){
        const id = Number(mealId);
        const recipe: RecipeCardDetails = this.favoriteRecipeCardList.find(recipe => recipe.id === id)!;
        console.log(`recipe selected is ${recipe.id}`);
        this.setMeal(day,mealTime,recipe)
        console.log(this.mealPlanner);
        
        const dayMacros = this.calculateTotalMacros(day);
        this.macrosMap[day] = dayMacros;
        const ingredients : IngredientList = {
          'id' : recipe.id,
          'extendedIngredients' : recipe.extendedIngredients
        }
        this.ingredientsFromCalendar.push(ingredients)
        console.log('current ingredients are ' + this.ingredientsFromCalendar);
        

      }
      else {
        const existingMeal = this.mealPlanner[day][mealTime];
        if (existingMeal) {
          
          for (const nutrient of existingMeal.nutrients) {
            if (nutrient.name === 'Calories') {
              this.macrosMap[day]!.calories -= nutrient.amount;
            } else if (nutrient.name === 'Protein') {
              this.macrosMap[day]!.protein -= nutrient.amount;
            } else if (nutrient.name === 'Fat') {
              this.macrosMap[day]!.fats -= nutrient.amount;
            } else if (nutrient.name === 'Carbohydrates') {
              this.macrosMap[day]!.carbs -= nutrient.amount;
            }
          }
          const id = existingMeal.id
          const indexToRemove = this.ingredientsFromCalendar.findIndex(item => item.id === id);

          if (indexToRemove !== -1) {
            this.ingredientsFromCalendar.splice(indexToRemove, 1); 
          }
          delete this.mealPlanner[day][mealTime]
          console.log(this.mealPlanner);
          console.log('current ingredients are ' + this.ingredientsFromCalendar);

        }
      }
    
  }

  setMeal(day: string, mealType: string, recipe: RecipeCardDetails) {
    console.log(`day is ${day} and mealtype is ${mealType}`);
    console.log(recipe);
    
    this.mealPlanner[day][mealType] = recipe; // Set the recipe for the specified day and meal
  }

  calculateTotalMacros(day: string): Macros {
    const macros: Macros = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    };

    for (const mealType of ['breakfast', 'lunch', 'dinner']) {
      if (this.mealPlanner[day][mealType]) {
        const recipe = this.mealPlanner[day][mealType];
        if(recipe){
          for (const nutrient of recipe.nutrients) {
            if (nutrient.name === 'Calories') {
              macros.calories += nutrient.amount;
            } else if (nutrient.name === 'Protein') {
              macros.protein += nutrient.amount;
            } else if (nutrient.name === 'Fat') {
              macros.fats += nutrient.amount;
            } else if (nutrient.name === 'Carbohydrates') {
              macros.carbs += nutrient.amount;
            }
          }
        }
      }
    }
    console.log('calories are' + macros.calories);
    

    return macros;
  }

  generateShoppingList() {
    this.service.generateShoppingList(this.ingredientsFromCalendar)
    this.router.navigate(['/shoppinglist'])
  }
  

}

