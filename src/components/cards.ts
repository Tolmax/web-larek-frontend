// import { dataCards } from "./data";

import { IEvents } from './base/events';
import { IGood } from '../types/index';
import { cloneTemplate } from '../utils/utils';

export class Cards {
	protected element: HTMLElement;
	protected events: IEvents;
	protected cardButton: HTMLButtonElement;
	protected cardCategory: HTMLElement;
	protected cardTitle: HTMLElement;
	protected cardImage: HTMLElement;
	protected cardPrice: HTMLElement;
	protected cardDescription: HTMLElement;
	protected cardId: string;

	constructor(template: HTMLTemplateElement, events: IEvents) {
		// this.events = events;
		// this.element = cloneTemplate(template);

		// this.cardButton = this.element.querySelector('.gallery__item');
		// this.cardCategory = this.element.querySelector('.card__category');
		// this.cardTitle = this.element.querySelector('.card__title');
		// this.cardImage = this.element.querySelector('.card__image');
		// this.cardPrice = this.element.querySelector('.card__price');
		// this.cardDescription = this.element.querySelector('.card__text');

		// this.cardButton.addEventListener('çlick', () =>
		// 	this.events.emit('good:preview', { card: this })
		// );
	}

	setData(cardData: Partial<IGood>) {
		this.cardId = cardData.id;
		this.cardCategory.textContent = cardData.category;
		this.cardTitle.textContent = cardData.title;
		this.cardImage.style.backgroundImage = `url(${cardData.image})`;
		this.cardPrice.textContent = `${cardData.price}`;
		this.cardDescription.textContent = cardData.description;
	}

	get id() {
		return this.cardId;
	}

	render() {
		return this.element;
	}
}

// const elementTemplate = document.querySelector('#card-catalog').content;

// const elementPlace = document.querySelector('.gallery');

// // function createCards({category, title, image, price}) {
// function createCards(dataCards) {

//     const elementCard = elementTemplate.querySelector('.gallery__item').cloneNode(true);

// elementCard.document.querySelector('.card__category').textContent = dataCards.category;
// elementCard.document.querySelector('.card__title').textContent = dataCards.title;
// elementCard.document.querySelector('.card__title').src = dataCards.image;
// elementCard.document.querySelector('.card__price').textContent = dataCards.price;

//         return elementCard;

// }

// export function renderCards() {
//     dataCards.forEach(function (dataCards) {
//         const typeNew = createCards(dataCards);
//         elementPlace.append(typeNew);
//       });
// }

// <button class="gallery__item card">
// <span class="card__category card__category_soft">софт-скил</span>
// <h2 class="card__title">+1 час в сутках</h2>
// <img class="card__title" src="<%=require('../images/Subtract.svg')%>" alt="" />
// <span class="card__price">750 синапсов</span>
// </button>
