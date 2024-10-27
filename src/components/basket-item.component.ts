import { IProduct, IBasketItemSpecialNode } from "../types";
import { getCardPriceText } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { Component } from "./base/common/component";

export class BasketItemComponent extends Component {
    constructor(events: EventEmitter, templateSelector: string) {
        super(events, templateSelector);
    }

    public createHTMLElement(product: IProduct, i: number, callbackDelete: (product: IProduct, iDelete: number) => any): IBasketItemSpecialNode {
        const basketItemNode = this._container.cloneNode(true) as HTMLElement;
        const basketItemIndexNode = basketItemNode.querySelector('.basket__item-index');

        basketItemIndexNode.textContent = `${i + 1}`;
        basketItemNode.querySelector('.card__title').textContent = product.title;
        basketItemNode.querySelector('.card__price').textContent = getCardPriceText(product.price);
        basketItemNode.querySelector('.basket__item-delete').addEventListener('click', () => {
            this._events.emit('basket:delete', { productId: product.id });
            basketItemNode.remove();
            callbackDelete(product, i);
        });

        return {
            node: basketItemNode,
            reRenderIndex: (_i: number): void => {
                if (i === _i) return;
                i = _i;
                basketItemIndexNode.textContent = `${_i + 1}`;
            }
        };
    }
}