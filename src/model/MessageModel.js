
class MessageModel{
   
    constructor(parseMsg) {
        this.id = parseMsg.id;
        this.content = parseMsg.get("content");
        this.isNutrit = parseMsg.get("isNutrit");
        this.isRead = parseMsg.get("isRead");
        this.date = parseMsg.get("date");
        this.time = parseMsg.get("time");
    }
    
}

export default MessageModel;