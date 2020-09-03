
class UserModel{

    constructor(parseUser) {
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("email");
        this.phone = parseUser.get("phone");
        this.birthday = parseUser.get("birthday");
        this.height = parseUser.get("height")/100;
        this.weight = parseUser.get("weight"); 
        this.ismale = parseUser.get("isMale");  
        this.isnutrit = parseUser.get("isnutrit");
        this.message = 0;     
    }
    
}

export default UserModel;