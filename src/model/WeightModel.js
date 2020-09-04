class WeightModel{

    constructor(parsePyfood) {
        this.id = parsePyfood.id;
        this.date = parsePyfood.get("date");
        this.weight = parsePyfood.get("weight");
    }
    
}

export default WeightModel;