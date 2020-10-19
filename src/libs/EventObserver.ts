export default class EventObserver {
	private observers: Array<Function>;
	constructor() {
		this.observers = [];
	}

	subscribe(fn: Function): void {
		this.observers.push(fn);
	}

	unsubscribe(fn: Function): void {
		this.observers = this.observers.filter(subscriber => subscriber !== fn);
	}

	broadcast(data: any): void {
		this.observers.forEach(subscriber => subscriber(data));
	}
}
