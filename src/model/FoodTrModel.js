
class FoodTrModel{

    constructor(parseTrfood) {
        this.id = parseTrfood.id;
        this.date = parseTrfood.get("date");
        this.time = parseTrfood.get("time");
        this.foodName = parseTrfood.get("foodName");
        this.calories = parseTrfood.get("calories");
    }
    
}


export default FoodTrModel;