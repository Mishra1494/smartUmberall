class expressError extends Error{
    
    constructor(status,message){
        super();
        this.message = message;
        this.statud = status;
    }
}

module.exports = expressError;