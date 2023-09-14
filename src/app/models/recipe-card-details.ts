export interface RecipeCardDetails {
    id: number,
    name: string,
    duration: number,
    servings: number
    image: string,
    summary: string,
    instructions: string,
    ingredients : [
        {
            'ingredientDetails' : string
        }
    ],
    nutrients : [
        {
            "name": string,
            "amount": number,
            "unit": string,
            "percentOfDailyNeeds": number
        }
    ],
    extendedIngredients : [
        {
            'name': string,
            'amount': number,
            'unit': string
        }
    ]
}
