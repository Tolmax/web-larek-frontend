import { IProduct } from "../types";
import { EventEmitter } from "./base/events";

export class ProductsStore {
    private _products: IProduct[] = [];
    private _events: EventEmitter;

    constructor(events: EventEmitter) {
        this._events = events;
    }

    public setAll(products: IProduct[]): void {
        this._products = products;
        this._events.emit('products:changed', products);
    }

    public getAll(): IProduct[] {
        return this._products;
    }

    public getOne(_id: string): IProduct | undefined {
        return this._products.find(product => product.id === _id);
    }
}