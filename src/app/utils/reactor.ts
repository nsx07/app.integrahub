export type Signal = number

type EventHandler = (...args: any[]) => void;
type AbortEvent = () => (Promise<boolean> | boolean)
type ContitionEvent = () => (Promise<boolean> | boolean)
type Action = { id: Signal, execute: EventHandler, abort?: AbortEvent, condition: ContitionEvent, progress?: boolean}

export class Reactor {

    private cache = new Map<Signal, Action>();
    private TIMEOUT = 100;
    private mainLoop: any;

    private static instance: Reactor;

    private next() {
        return Reactor.instance.cache.size + 1;
    }

    public static on(handler: EventHandler, when: ContitionEvent, abortCondition?: ContitionEvent) {
        const id = this.instance.next();


        if (!abortCondition || abortCondition && this.instance.isPromise(abortCondition()) && !this.instance.ableToAbort(abortCondition)) {
            this.instance.cache.set(id, { id, execute: handler, abort: abortCondition, condition: when });
        }

        if (!this.instance.isEmpty() && !this.instance.mainLoop) {
            this.instance.eventLoop(Array.from(this.instance.cache.values()));
        }
        
    }
  
    off(action: Pick<Action, "id">): void {
        this.cache.delete(action.id);
        if (this.cache.size === 0) {
            clearInterval(this.mainLoop);
            this.mainLoop = null;
        }
    }

    private isEmpty() {
        return this.cache.size === 0;
    }

    private ableToAbort(abort?: AbortEvent) {
        return abort && abort();
    }

    private ableToEmit(action: Action) {
        return action.condition();
    }

    private eventLoop(actions: Action[]) {
        this.mainLoop = setInterval(() => {
            actions.forEach(action => {
                if (action.condition()) {
                    this.emit(action);
                    this.off(action);
                    return;
                }

                if (action.abort && action.abort()) {
                    this.off(action);
                }
            });
        }, this.TIMEOUT);
    }
  
    private emit(action: Action): void {
        action.execute();
    }

    private promisy(value: boolean | Promise<boolean>) {
        return Promise.resolve(value);
    }

    private isPromise(value: boolean | Promise<boolean>): value is Promise<boolean> {
        return value instanceof Promise;
    }

}

export type TaskCallback = () => Promise<void>;
export type ConditionCallback = (signal: AbortSignal) => Promise<boolean>;
export type AbortCallback = (signal: AbortSignal) => Promise<boolean>;
enum RaceId {
    Condition = 1,
    Abort = 2,
}

export class TaskManager {
  async execute(task: TaskCallback, condition: ConditionCallback, abort: AbortCallback): Promise<void> {
    const controller = new AbortController();
    const signal = controller.signal;
    const race = await Promise.race([TaskManager.wrap(condition, RaceId.Condition, signal), TaskManager.wrap(abort, RaceId.Abort, signal)]);

    if (race.id === RaceId.Abort && race.value) {
      controller.abort();
      return;
    }

    await task();
  }

  static async wrap(cb: ConditionCallback | AbortCallback, defaultValue: RaceId, signal: AbortSignal) : Promise<{id: RaceId, value: boolean}> {
    let result = await cb(signal);
    return Promise.resolve({ id: defaultValue, value: result });
  }
}