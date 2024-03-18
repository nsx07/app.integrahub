export type Signal = number
export class Reactor {

    private static cache = new Map<Signal, Promise<unknown>>()

    static async doWhen(task: () => void, when: () => (Promise<boolean> | boolean) , abort?: () => boolean, interval = 100) {
        let intervalId: any
        const promise = new Promise(async(resolve, reject) => {
            intervalId = setInterval(async () => {
                if (await when()) {
                    this.flush(intervalId)
                    resolve(task())
                }

                if (abort && abort()) {
                    this.flush(intervalId)
                    reject('Aborted')
                }   
            }, interval)
        })

        this.cache.set(intervalId, promise)

        return promise
    }

    private static flush(interval: any) {
        this.cache.delete(interval)
        clearInterval(interval)
    }

}