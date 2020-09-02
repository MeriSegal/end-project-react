import Parse from 'parse';
import moment from 'moment';


class SymptomTrModel{

    constructor(parseTrSymptom) {
        this.id = parseTrSymptom.id;
        this.date = parseTrSymptom.get("date");
        this.time = parseTrSymptom.get("time");
        this.symptom = parseTrSymptom.get("symptom");
    }
        
}

export default SymptomTrModel;