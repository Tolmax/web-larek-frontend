import { IProduct } from "../types";
import { EventEmitter, IEvents } from "./base/events";

export class BasketData {
    
    protected _selectedGoods: [];
    protected _selected: boolean;
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    set selectedGoods(selectedGoods: []) {
        this._selectedGoods = selectedGoods;
        this.events.emit('basket:changed')
    }

    get selectedGoods () {
        return this._selectedGoods;
    }

    addGoodToBasket(selected: string) {
        // this._selected = [selected, ...this._selected]
        this.events.emit('good:selected')
    }

    deleteGoodFromBasket(_id: string, payload: Function | null = null) {
        // this._goods = this._goods.filter(good => good._id !== _id);

        if(payload) {
            payload();
        } else {
            this.events.emit('good:selected')
        }
    }

    // getBasketInfo(): TBoxOfChoosenGoods;

    // deleteGood(selected: boolean, payload: Function | null): void;) {
	// 	this.good.remove();
	// 	thisgood = null;
	// }

    // updateBasket(basket: IBasket, payload: Function | null): void;
}