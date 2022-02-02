import { CustomLogger } from './CustomLogger';

export class CustomMisc {

    static getArrayFromStringSplit(str: string, splitDelimiter: string) {
        return str.split(splitDelimiter);
    }

    static getCurrentTimeInMilli() {
        return Date.now();
    }
    static getCurrentTimeInString() {
        let d = new Date(Date.now());
        let delim = "/";
        let delim2 = ":";
        return d.getDate() + delim + d.getMonth() + delim + d.getFullYear() + delim2 + d.getHours() + delim2 + d.getMinutes() + delim2 + d.getSeconds();
    }

    
    static getTimeInString(milli) {
        let d = new Date(milli);
        let delim = "/";
        let delim2 = ":";
        return d.getDate() + delim + d.getMonth() + delim + d.getFullYear() + delim2 + d.getHours() + delim2 + d.getMinutes() + delim2 + d.getSeconds();
    }

    static getCurrentBrowser() {
        // let isIE1 =/^.*MSIE [5-9]/i.test(window.navigator.userAgent);
         CustomLogger.logStringWithObject("navigator:: ", window.navigator);
        return window.navigator.appCodeName + " - " + window.navigator.appVersion;
    }

    static showAlert(message: string, isError: boolean = false) {
        if (isError)
            alert("!!!! " + message + " !!!!");
        else
            alert(message);
    }

    static showErrorObject(errorObj) {
        var str = "ERROR. Please Check Internal Logs.";
        try {
            str = errorObj.error.data.details;
        } catch (error) {
            CustomLogger.logError(error);
        }

        alert("!!!!! " + str + " !!!!!");
    }


    static searchDataArr(tableDataArr, term: string, fieldName) {
        let filteredTableDataArr = tableDataArr;
        if (!term) {
            filteredTableDataArr = tableDataArr;
        } else {
            filteredTableDataArr = tableDataArr.filter(x =>
                x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
            );
        }
        return filteredTableDataArr;
    }

    static convertRuleStringArrToMap(tmpStr) {
        let tmpStrArr = tmpStr.split("#");
        let map = new Map();
        for (let k = 0; k < tmpStrArr.length; k++) {
            let tmpEntityPermissionStrArr = tmpStrArr[k].split(":");
            let key = tmpEntityPermissionStrArr[0];
            let value: string[] = tmpEntityPermissionStrArr[1].split(",")
            CustomLogger.logString("key:" + key + " value:" + value);
            map.set(key, value);
        }
        return map;
    }

    static convertRuleMapToString(map) {
        let tmpStrArr = [];
        map.forEach((value, key) => {
            tmpStrArr.push(key + ":" + value);
        });
        return tmpStrArr.join("#");
    }

    /**
     * 
     */

     
    static getNewUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


      //user types
     /*  static readonly USER_TYPE_ADMIN = "Admin";
      static readonly USER_TYPE_MANAGER = "Manager";
      static readonly USER_TYPE_SALES = "Sales User"; */
      static readonly USER_TYPE_Super_Admin="Super Admin";
      static readonly USER_TYPE_Super_Manager="Super Manager";
      static readonly USER_TYPE_Super_Sales ="Super Sales";
    /*static readonly USER_TYPE_CUSTOMERS ="Customers"; */
      static readonly USER_TYPE_Sales_Admin ="Sales Admin";
      static readonly USER_TYPE_Sales_Manager="Sales Manager";
      static readonly USER_TYPE_Sales_User ="Sales User";
      static readonly USER_TYPE_Ogoul_User ="Ogoul User";
      static readonly USER_TYPE_Super_Ogoul_Admin ="Super Ogoul Admin";
      static readonly USER_TYPE_Super_Ogoul_Manager ="Super Ogoul Manager";
      static readonly USER_TYPE_Super_Ogoul_Sales ="Super Ogoul Sales";
      static readonly USER_TYPE_Super_Ogoul_Service ="Super Ogoul Service";
      static readonly USER_TYPE_Marketing_Admin = "Marketing Admin";
      static readonly USER_TYPE_Marketing_Manager= "Marketing Manager";
      static readonly USER_TYPE_Marketing_User ="Marketing User";
      static readonly USER_TYPE_Service_Admin = "Service Admin";
      static readonly USER_TYPE_Service_Manager= "Service Manager";
      static readonly USER_TYPE_Service_User ="Service User";
      static readonly USER_TYPE_Inventory_Admin = "Inventory Admin";
      static readonly USER_TYPE_Inventory_Manager= "Inventory Manager";
      static readonly USER_TYPE_Inventory_User ="Inventory User";
      static readonly USER_TYPE_Hr_Admin = "Hr Admin";
      static readonly USER_TYPE_Hr_Manager= "Hr Manager";
      static readonly USER_TYPE_Hr_User ="Hr User";

      
  
  
      static isPageVisible(next, userType_Name) {
          console.log("CustomMisc: next:" + next + " userType_Name:" + userType_Name);
          if (next._routerState.url == "/expense/expenselist") {
              if (userType_Name == CustomMisc.USER_TYPE_Super_Admin) return false;
          }
          return true;
      }
  
  
  
}//end of class