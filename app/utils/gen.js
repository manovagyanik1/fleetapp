export default class Gen {

    static isDevelopment() {
        return true;
    }

    static isServer(){
        return false;
    }

    static isProduction(){
        return false;
    }

    static getBaseUrl() {
        return Gen.isDevelopment() ? 'https://quicknodeserver.herokuapp.com' : 'https://lolmenow.herokuapp.com';
    }

    static getAuth() {
        return {
            headers: {
                Authorization: ''
            }
        };
    }

    static isLogEnabled() {
        return true;
    }

    static log(...printStatement) {
        if (this.isLogEnabled() && this.isDevelopment()) {
            console.log(...printStatement);
        }
    }
}