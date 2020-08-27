class SymptomModel{

    constructor(parseSymptom) {
        this.id = parseSymptom.id;
        this.symptomName = parseSymptom.get("SymptomName");
    }
    
}

export default SymptomModel;