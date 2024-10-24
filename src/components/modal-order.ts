import { ModalOrderNodes, TOrderPayment } from '../types';
import { cloneTemplate } from '../utils/utils';
import { Modal } from './base/common/modal';
import { EventEmitter } from './base/events';
import { OrderStore } from './order.store';

export class ModalOrder extends Modal {
	private _templateSelector: string;
	private _events: EventEmitter;
	private _nodes: ModalOrderNodes;
	private _orderStore: OrderStore;
	private _paymentMethod: TOrderPayment | null = null;

	constructor(
		events: EventEmitter,
		templateSelector: string,
		orderStore: OrderStore
	) {
		super();
		this._templateSelector = templateSelector;
		this._events = events;
		this._orderStore = orderStore;
	}

	public open(): void {
		const content = this._createHTMLElement();
		this._render(content);
		super._open();
	}

	private _createHTMLElement(): HTMLElement {
		const modalOrder = cloneTemplate(this._templateSelector);

		this._nodes = {
			modalOrder: modalOrder,
			modalOrderForm: modalOrder.querySelector('.order'),
			modalOrderErrors: modalOrder.querySelector('.form__errors'),
			modalOrderCashButton: modalOrder.querySelector('[name=cash]'),
			modalOrderCardButton: modalOrder.querySelector('[name=card]'),
			modalOrderInput: modalOrder.querySelector('[name=address]'),
			modalOrderSubmitButton: modalOrder.querySelector('.order__button'),
		};

		this._nodes.modalOrderCashButton.addEventListener('click', () =>
			this._setPayment('offline')
		);
		this._nodes.modalOrderCardButton.addEventListener('click', () =>
			this._setPayment('online')
		);

		this._nodes.modalOrderInput.addEventListener('input', () => {
			this._validate();
		});

		this._nodes.modalOrderSubmitButton.addEventListener('click', (event) => {
			event.preventDefault();
			this._orderStore.setAddress(this._nodes.modalOrderInput.value);
			this._orderStore.setPayment(this._paymentMethod);
			this._events.emit('order:submit');
		});

		return this._nodes.modalOrder;
	}

	private _setPayment(payment: TOrderPayment): void {
		this._paymentMethod = payment;

		if (payment === 'online') {
			this._nodes.modalOrderCardButton.classList.add('button_alt-active');
			this._nodes.modalOrderCashButton.classList.remove('button_alt-active');
		}
		if (payment === 'offline') {
			this._nodes.modalOrderCardButton.classList.remove('button_alt-active');
			this._nodes.modalOrderCashButton.classList.add('button_alt-active');
		}

		this._validate();
	}

	private _validate(): void {
		const valid =
			this._paymentMethod !== null && this._nodes.modalOrderInput.value !== '';

		this._renderErrorValidationText();
		this._nodes.modalOrderSubmitButton.disabled = !valid;
	}

	private _renderErrorValidationText(): void {
		const addressErrorText = 'Введите адрес доставки';
		const paymentErrorText = 'Выберите способ оплаты';
		const addressAndPaymentErrorText = `${addressErrorText}<br>${paymentErrorText}`;

		if (
			this._paymentMethod === null &&
			this._nodes.modalOrderInput.value === ''
		) {
			this._nodes.modalOrderErrors.innerHTML = addressAndPaymentErrorText;
		} else if (this._paymentMethod === null) {
			this._nodes.modalOrderErrors.textContent = paymentErrorText;
		} else if (this._nodes.modalOrderInput.value === '') {
			this._nodes.modalOrderErrors.textContent = addressErrorText;
		} else {
			this._nodes.modalOrderErrors.textContent = '';
		}
	}
}
