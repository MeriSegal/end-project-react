
class FoodModel{

    constructor(parsePyfood) {
        this.id = parsePyfood.id;
        this.foodName = parsePyfood.get("Display_Name");
        this.calories = parsePyfood.get("Calories");
    }
    
}

export default FoodModel;