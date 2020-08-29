
class HomeConModel{

    constructor(parseTrfood) {
        this.id = parseTrfood.id;
        this.title = parseTrfood.get("title");
        this.sub = parseTrfood.get("subTitle");
        this.content = parseTrfood.get("content");
        this.img = parseTrfood.get("image")._url;
    }
    
}

export default HomeConModel;