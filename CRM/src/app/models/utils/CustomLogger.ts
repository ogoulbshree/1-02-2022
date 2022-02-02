export class CustomLogger {
    constructor(){

    }
    static logString(str) {
        // console.log("#### " + str + " ####");
    }

    static logObj(obj) {
        // console.log(obj);
    }

    static logStringWithObject(str, obj) {
        this.logString(str);
        this.logObj(obj);
    }

    static logError(obj) {
        // console.log("******* ERROR *******", obj);
    }
}