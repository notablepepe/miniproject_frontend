import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin} from 'rxjs';
import { IngredientList } from '../models/ingredient-list';

@Injectable({
  providedIn: 'root'
})
export class MealPlannerService {
 

  http = inject(HttpClient);
  shoppingList : IngredientList[] = [] // might need to do in localstorage

  getRecipes(caloriesMin: number ,caloriesMax:number, protein: number , carbs: number , fat: number) : Observable<any> {
    return this.http.get(`/api/recipes` , { params: {
      'caloriesMin' : caloriesMin,
      'caloriesMax': caloriesMax,
      'protein' : protein,
      'carbs' : carbs,
      'fat' : fat
    }})
  }

  getRecipeDetails(id : number) : Observable<any> {
    return this.http.get(`/api/recipes/${id}`)
  }

  getRecipesByIds(recipeIds: number[]): Observable<any[]> {
    const observables: Observable<any>[] = recipeIds.map(recipeId =>
      this.getRecipeDetails(recipeId)
    );
  
    return forkJoin(observables);
  }
  

  favoriteRecipe(username: string, recipeId : number) {
    const payload = {
      username : username,
      recipeId : recipeId
    }
    console.log("im inside the favorite recipe service");
    console.log(payload);
    
    
    this.http.post(`/api/recipes/user/favorite`, payload).subscribe({
      next: (response) => console.log(response)
    })
  }

  unfavoriteRecipe(username: string, recipeId : number) {
    this.http.delete(`/api/recipes/${username}/favorites/${recipeId}`).subscribe({
      next: (response) => console.log(response)
      
    })  
  }

  getFavoritesRecipe(username:string) : Observable<any> {
    return this.http.get(`/api/recipes/favorites/${username}`)
  }
  
  generateShoppingList(shoppinglist: IngredientList[]) {
    this.shoppingList = shoppinglist
  }

  getShoppingList() : IngredientList[] {
    return this.shoppingList
  }

  registerAccount(username: string, password: string, email:string) {
    const payload = {
      username: username,
      password: password,
      email: email
    }
    console.log(payload)
    this.http.post(`/api/register`, payload).subscribe({
      next: (response) => {
        console.log('response is' + response);
      },
      error: (error) => console.log(error)
      
    })
  }

  loginToAccount(username: string, password: string) {
    const payload = {
      username: username,
      password: password,
    }
    console.log(payload)
    return this.http.post(`/api/login`, payload)
  }

}
