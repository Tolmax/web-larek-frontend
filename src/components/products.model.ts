import { IProduct } from "../types";
import { EventEmitter } from "./base/events";

export class ProductsModel {
    protected _products: IProduct[] = [];
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    setProducts(products: IProduct[]): void {
        this._products = products;
        this.events.emit('products:changed');
    }

    // set goods(goods: IGood[]) {
    //     this._goods = goods;
    //     this.events.emit('goods:changed');
    // }

    getProducts(): IProduct[] {
        return this._products;
    }

    getProduct(_id: string): IProduct {
        return this._products.find(product => product.id === _id);
    }

    // set preview(_id: string | null) {
    //     if (!_id) {
    //         this._preview = null;
    //         return;
    //     }
    //     const selectedCard = this.getGood(_id);
    //     if (selectedCard) {
    //         this._preview = _id;
    //         this.events.emit('good:previewed')
    //     }
    // }
    
    // addGoodToBasket(good: IGood) {
    //     this._goods = [good, ...this._goods]
    //     this.events.emit('good:selected')
    // }

    // deleteGoodFromBasket(_id: string, payload: Function | null = null) {
    //     this._goods = this._goods.filter(good => good._id !== _id);

    //     if(payload) {
    //         payload();
    //     } else {
    //         this.events.emit('good:selected')
    //     }
    // }
}