import { IBasketItemSpecialNode, IProduct, ModalBasketNodes } from '../types';
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
	private _basketItems: IBasketItemSpecialNode[] = [];

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

		const basketStoreItems = this._basketStore.getAll();
        const basketListNode = modalBasket.querySelector('.basket__list');
		const basketItems = basketStoreItems.map((product, i) => 
			this._basketItemComponent.createHTMLElement(product, i, this._deleteCallbackBasketItem)
		);
		const basketItemNodes = basketItems.map(basketItem => basketItem.node);

		this._basketItems = basketItems;

		basketListNode.append(...basketItemNodes);

		this._nodes.modalBasketSubmit.addEventListener('click', () => {
			this._events.emit('basket:submit');
		});

		this._calcBasketInfo();

		return this._nodes.modalBasket;
	}

	private _deleteCallbackBasketItem = (product: IProduct, iDelete: number) => {
		this._calcBasketInfo();
		this._basketItems.splice(iDelete, 1);
		this._reRenderBasketItemsIndex();
	};

	private _reRenderBasketItemsIndex(): void {
		for (let i = 0; i < this._basketItems.length; i++) {
			this._basketItems[i].reRenderIndex(i);
		}
	}

	private _calcBasketInfo = () => {
		this._nodes.modalBasketPrice.textContent = `${this._basketStore.calcSum()} синапсов`;
		this._nodes.modalBasketSubmit.disabled = this._basketStore.size === 0;
	};
}

