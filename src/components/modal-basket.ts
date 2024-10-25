import { IProduct, ModalBasketNodes } from '../types';
import { cloneTemplate, getCardPriceText } from '../utils/utils';
import { Modal } from './base/common/modal';
import { EventEmitter } from './base/events';
import { BasketItemComponent } from './basket-item.component';
import { BasketStore } from './basket.store';

export class ModalBasket extends Modal {
	private _templateSelector: string;
	private _events: EventEmitter;
	private _nodes: ModalBasketNodes;
	private _basketStore: BasketStore;
	private _basketItemComponent: BasketItemComponent;

	constructor(
		events: EventEmitter,
		templateSelector: string,
		basketStore: BasketStore,
		basketItemComponent: BasketItemComponent
	) {
		super();
		this._templateSelector = templateSelector;
		this._events = events;
		this._basketStore = basketStore;
		this._basketItemComponent = basketItemComponent;
	}

	public open(): void {		
		const content = this._createHTMLElement();
		this._render(content);
		super._open();
	}

	private _createHTMLElement(): HTMLElement {
		const modalBasket = cloneTemplate(this._templateSelector);

		this._nodes = {
			modalBasket: modalBasket,
			modalBasketSubmit: modalBasket.querySelector('.button'),
			modalBasketPrice: modalBasket.querySelector('.basket__price'),
		};

		const basketItems = this._basketStore.getAll();
        const basketListNode = modalBasket.querySelector('.basket__list');
		const basketItemNodes = basketItems.map((product, i) => 
			this._basketItemComponent.createHTMLElement(product, i, this._deleteCallbackBasketItem)
		);

		basketListNode.append(...basketItemNodes);

		this._nodes.modalBasketSubmit.addEventListener('click', () => {
			this._events.emit('basket:submit');
		});

		this._calcBasketInfo();


		return this._nodes.modalBasket;
	}

	private _deleteCallbackBasketItem = (product: IProduct) => {
		this._calcBasketInfo();
	};

	private _calcBasketInfo = () => {
		this._nodes.modalBasketPrice.textContent = `${this._basketStore.calcSum()} синапсов`;
		this._nodes.modalBasketSubmit.disabled = this._basketStore.size === 0;
	};
}

