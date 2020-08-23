
class UserModel{

    constructor(parseUser) {
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("email");
        this.birthday = parseUser.get("birthday");
        this.height = parseUser.get("height");
        this.weight = parseUser.get("weight");    
        this.isnutrit = parseUser.get("isnutrit");     
    }
    
}

export default UserModel;