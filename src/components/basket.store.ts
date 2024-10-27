import { IProduct } from "../types";
import { EventEmitter } from "./base/events";
import { ProductsStore } from "./products.store";

export class BasketStore {
    private _basket: Set<string> = new Set<string>();
    private _events: EventEmitter;
    private _productsStore: ProductsStore;

    constructor(events: EventEmitter, productsStore: ProductsStore) {
        this._productsStore = productsStore;
        this._events = events;
    }

    public add(productId: string): void {
        this._basket.add(productId);
        this._changeBasket();
    }

    public delete(productId: string) {
        this._basket.delete(productId);
        this._changeBasket();
    }

    private _changeBasket() {
        this._events.emit('basket:changed', this.getAll());
    }

    get size(): number {
        return this._basket.size;
    }

    public getAllIds(): string[] {
        return Array.from(this._basket);
    }

    public getAll(): IProduct[] {
        return this.getAllIds().map(this._productsStore.getOne);
    }

    public calcSum(): number {
        return this.getAll().reduce((acc, curr) => {
            const price = curr.price === null ? 0 : curr.price;
            acc = acc + price;
            return acc;
        }, 0);
    }

    public clear(): void {
        this._basket.clear();
        this._changeBasket();
    }
}