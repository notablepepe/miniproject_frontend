export interface RecipeCard {
    id: number,
    name: string,
    imgUrl: string,
    nutrition : [
        {
            'name': string,
            'amount': number,
            'unit': string
        },
        {
            'name': string,
            'amount': number,
            'unit': string
        },
        {
            'name': string,
            'amount': number,
            'unit': string
        },
        {
            'name': string,
            'amount': number,
            'unit': string
        }
    ]
    
}
