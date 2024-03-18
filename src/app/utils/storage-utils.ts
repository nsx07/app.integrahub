export class StorageUtils {
    static setLocalItem(key: string, value: any) {
        localStorage.setItem(key, this.serializer(value));
    }

    static getLocalItem(key: string) {
        return this.deserializer(localStorage.getItem(key));
    }

    static removeLocalItem(key: string) {
        localStorage.removeItem(key);
    }

    static clearLocal() {
        localStorage.clear();
    }

    static setSessionItem(key: string, value: any) {
        sessionStorage.setItem(key, this.serializer(value));
    }

    static getSessionItem(key: string) {
        return this.deserializer(sessionStorage.getItem(key));
    }

    static removeSessionItem(key: string) {
        sessionStorage.removeItem(key);
    }

    static clearSession() {
        sessionStorage.clear();
    }

    static forget() {
        this.clearLocal();
        this.clearSession();
    }

    /**
     * @TODO implement a custom serializer that can handle more than just JSON
     * @param value
     */
    private static serializer(value: any) {
        let nvalue: string = value;

        if (typeof value === "object") {
            nvalue = JSON.stringify(nvalue);
        }

        return nvalue
    }

    /**
     * @TODO implement a custom deserializer that can handle more than just JSON
     * @param value 
     * @returns value deserialized
     */
    private static deserializer(value: any) {
        let nvalue: unknown;

        try {
            nvalue = JSON.parse(value);
        } catch (e) {
            // console.error(e)
            nvalue = this.evaluate(value)
        }
        
        return nvalue
    }

    private static evaluate(value: any) {
        if (!Number.isNaN(+ value)) {
            return value
        }

        if (value === "true") {
            return true
        }

        if (value === "false") {
            return false
        }

        return value
    }
}