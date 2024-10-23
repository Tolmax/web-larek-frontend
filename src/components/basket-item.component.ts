import { IProduct } from "../types";
import { getCardPriceText } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { Component } from "./base/common/component";

export class BasketItemComponent extends Component {
    constructor(events: EventEmitter, templateSelector: string) {
        super(events, templateSelector);
    }

    public createHTMLElement(product: IProduct, i: number, callbackDelete: (product: IProduct) => any): HTMLElement {
        const copyBasketItemNode = this._container.cloneNode(true) as HTMLElement;

        copyBasketItemNode.querySelector('.basket__item-index').textContent = `${i + 1}`;
        copyBasketItemNode.querySelector('.card__title').textContent = product.title;
        copyBasketItemNode.querySelector('.card__price').textContent = getCardPriceText(product.price);
        copyBasketItemNode.querySelector('.basket__item-delete').addEventListener('click', () => {
            this._events.emit('basket:delete', { productId: product.id });
            copyBasketItemNode.remove();
            callbackDelete(product);
        });

        return copyBasketItemNode;
    }
}