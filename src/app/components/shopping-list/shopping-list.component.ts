import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientList } from 'src/app/models/ingredient-list';
import { MealPlannerService } from 'src/app/services/meal-planner.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList: IngredientList[] = [];
  totalIngredients: any[] = [];
  service = inject(MealPlannerService)

  ngOnInit(): void {
    
    this.shoppingList = this.service.getShoppingList()
    console.log(this.shoppingList)
    
    if (this.shoppingList && this.shoppingList.length > 0) {
      console.log('shopping list is ' + this.shoppingList);
      const summedIngredientsMap = new Map<string, { totalAmount: number; unit: string }>();

      this.shoppingList.forEach((ingredientList) => {
        ingredientList.extendedIngredients.forEach((ingredient: any) => {
          const { name, amount, unit } = ingredient;
          const key = `${name}`;

          if (summedIngredientsMap.has(key)) {
            // If the ingredient is already in the map, add the amount
            const existingIngredient = summedIngredientsMap.get(key)!;
            existingIngredient.totalAmount += amount;
          } else {
            // If the ingredient is not in the map, initialize it
            summedIngredientsMap.set(key, { totalAmount: amount, unit });
          }
        });
      });
      console.log(summedIngredientsMap);
      
      // Convert the map to an array of objects
      const summedIngredients: { ingredient: string; totalAmount: number; unit: string }[] = [];

      summedIngredientsMap.forEach((value, key) => {
        summedIngredients.push({ ingredient: key, totalAmount: value.totalAmount, unit: value.unit });
      });
      this.totalIngredients = summedIngredients;
      console.log(summedIngredients);
    }
  }
}
