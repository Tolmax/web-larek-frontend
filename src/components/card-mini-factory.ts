// import { dataCards } from "./data";

import { EventEmitter } from './base/events';
import { cloneTemplate } from '../utils/utils';
import { CardElementFactoryNodes, IProduct } from '../types';
import { Component } from './component';
import { CDN_URL } from '../utils/constants';
import {  getCategoryClass } from '../utils//utils';

export class CardMiniFactory extends Component {
	private _nodes: CardElementFactoryNodes;

	constructor(events: EventEmitter, templateSelector: string) {
		super(events, templateSelector);
	}

	
	public createHTMLElement(product: IProduct): HTMLElement {
		const card = cloneTemplate<HTMLButtonElement>(this._templateSelector);

		this._nodes = {
			card: card,
			cardCategory: card.querySelector('.card__category'),
			cardTitle: card.querySelector('.card__title'),
			cardImage: card.querySelector('.card__image'),
			cardPrice: card.querySelector('.card__price'),
			cardDescription: card.querySelector('.card__text')
		};

		const cardPriceText = product.price === null ? 'Бесценно' : `${product.price} синапсов`;
		this._nodes.cardPrice.textContent = cardPriceText;
		this._nodes.cardTitle.textContent = product.title;
		this._nodes.cardCategory.textContent = product.category;
		this._nodes.cardImage.alt = product.title;
		this._nodes.cardImage.src = `${CDN_URL}${product.image}`;
		
		const category = getCategoryClass(product.category);
		this._nodes.cardCategory.classList.remove('card__category_soft');
		this._nodes.cardCategory.classList.add(`card__category_${category}`);


		this._nodes.card.addEventListener('click', () => {
			this._events.emit('product:open', { card: product });
		});

		
		return card;
	}


	// get id() {
	// 	return this.cardId;
	// }

	// render() {
	// 	return this.element;
	// }
}
