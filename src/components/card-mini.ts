// import { dataCards } from "./data";

import { EventEmitter } from './base/events';
import { cloneTemplate, getCardPriceText } from '../utils/utils';
import { CardMiniNodes, IProduct } from '../types';
import { Component } from './component';
import { CDN_URL } from '../utils/constants';
import {  getCategoryClass } from '../utils//utils';

export class CardMini extends Component {
	private _nodes: CardMiniNodes;

	constructor(events: EventEmitter, templateSelector: string) {
		super(events, templateSelector);
	}
	
	public createHTMLElement(product: IProduct): HTMLElement {
		const card = this._container as HTMLButtonElement;

		this._nodes = {
			card: card,
			cardCategory: card.querySelector('.card__category'),
			cardTitle: card.querySelector('.card__title'),
			cardImage: card.querySelector('.card__image'),
			cardPrice: card.querySelector('.card__price'),
			cardDescription: card.querySelector('.card__text')
		};

		const cardPriceText = getCardPriceText(product.price);
		this._nodes.cardPrice.textContent = cardPriceText;
		this._nodes.cardTitle.textContent = product.title;
		this._nodes.cardImage.alt = product.title;
		this._nodes.cardImage.src = `${CDN_URL}${product.image}`;
		
		const category = getCategoryClass(product.category);
		
		this._nodes.cardCategory.classList.remove('card__category_soft');
		this._nodes.cardCategory.classList.add(`card__category_${category}`);
		this._nodes.cardCategory.textContent = product.category;

		this._nodes.card.addEventListener('click', () => {
			this._events.emit('product:open', product);
		});

		return card;
	}
}
