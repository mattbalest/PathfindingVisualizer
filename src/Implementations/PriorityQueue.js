export class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(value, priority) {
        this.items.push({ value, priority });
        this.sort();
    }

    dequeue() {
        return this.items.shift().value;
    }

    sort() {
        this.items.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.items.length === 0;
    }

    length(){
        return this.items.length();
    }
}