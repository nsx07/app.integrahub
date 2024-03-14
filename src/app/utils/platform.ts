export type Platforms = "ios" | "android" | "web";
export class PlatformUtils {

    private static get IOS() {
        return (
          /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window)
        );
    }
    
    private static get ANDROID() {
        return /android/i.test(navigator.userAgent);
    }

    public static detect() : Platforms {
        if (this.IOS) {
            return "ios";
        } else if (this.ANDROID) {
            return "android";
        } else {
            return "web";
        }
    }

    public static get mobile() {
        return this.detect() !== "web";
    }

}