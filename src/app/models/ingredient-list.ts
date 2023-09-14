export interface IngredientList {
    id: number,
    extendedIngredients : [
        {
            'name': string,
            'amount': number,
            'unit': string
        }
    ]
}
    // {
    //     "id": 1012014,
    //     "aisle": "Spices and Seasonings",
    //     "image": "ground-cumin.jpg",
    //     "consistency": "SOLID",
    //     "name": "ground cumin",
    //     "nameClean": "ground cumin",
    //     "original": "1 1/4 teaspoons ground cumin",
    //     "originalName": "ground cumin",
    //     "amount": 1.25,
    //     "unit": "teaspoons",
    //     "meta": [],
    //     "measures": {
    //       "us": {
    //         "amount": 1.25,
    //         "unitShort": "tsps",
    //         "unitLong": "teaspoons"
    //       },
    //       "metric": {
    //         "amount": 1.25,
    //         "unitShort": "tsps",
    //         "unitLong": "teaspoons"
    //       }
    //     }
    //   }

