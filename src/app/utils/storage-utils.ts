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

    private static serializer(value: any) {
        return JSON.stringify(value);
    }

    private static deserializer(value: any) {
        return JSON.parse(value);
    }
}