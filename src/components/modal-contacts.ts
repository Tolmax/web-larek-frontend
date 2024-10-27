import { ModalContactsNodes, ModalOrderNodes, TOrderPayment } from '../types';
import { cloneTemplate } from '../utils/utils';
import { ApiWeblarekService } from './api-weblarek.service';
import { Modal } from './base/common/modal';
import { EventEmitter } from './base/events';
import { BasketStore } from './basket.store';
import { OrderStore } from './order.store';

export class ModalContacts extends Modal {
	private _templateSelector: string;
	private _events: EventEmitter;
	private _nodes: ModalContactsNodes;
	private _orderStore: OrderStore;
	private _apiWeblarekService: ApiWeblarekService;
	private _basketStore: BasketStore;

	constructor(
		events: EventEmitter,
		templateSelector: string,
		orderStore: OrderStore,
		apiWeblarekService: ApiWeblarekService,
		basketStore: BasketStore,
	) {
		super();
		this._templateSelector = templateSelector;
		this._events = events;
		this._orderStore = orderStore;
		this._apiWeblarekService = apiWeblarekService;
		this._basketStore = basketStore;
	}

	public open(): void {
		const content = this._createHTMLElement();
		this._render(content);
		super._open();
	}

	private _createHTMLElement(): HTMLElement {
		const modalContacts = cloneTemplate(this._templateSelector);

		this._nodes = {
			modalContacts: modalContacts,
			modalContactsForm: modalContacts.querySelector('.order'),
			modalContactsErrors: modalContacts.querySelector('.form__errors'),
			modalContactsEmailInput: modalContacts.querySelector('[name=email]'),
			modalContactsPhoneInput: modalContacts.querySelector('[name=phone]'),
			modalContactsSubmitButton: modalContacts.querySelector('[type=submit]'),
		};

		this._nodes.modalContactsEmailInput.addEventListener('input', () =>
			this._validate()
		);
		this._nodes.modalContactsPhoneInput.addEventListener('input', () =>
			this._validate()
		);

		this._nodes.modalContactsSubmitButton.addEventListener('click', (event) => {
			event.preventDefault();
			this._orderStore.setEmail(this._nodes.modalContactsEmailInput.value);
			this._orderStore.setPhone(this._nodes.modalContactsPhoneInput.value);
			this._apiWeblarekService
				.sendOrder(this._orderStore.getOrder())
				.then((order) => {
					this._basketStore.clear();
					this._events.emit('contacts:submit', order);
				})
				.catch(() => {
					alert('Произошла ошибка при отправке заказа');
				});
		});

		return this._nodes.modalContacts;
	}

	private _validate(): void {
		const valid =
			this._nodes.modalContactsEmailInput.value !== '' &&
			this._nodes.modalContactsPhoneInput.value !== '';

		this._renderErrorValidationText();
		this._nodes.modalContactsSubmitButton.disabled = !valid;
	}

	private _renderErrorValidationText(): void {
		const emailErrorText = 'Введите Email';
		const phoneErrorText = 'Введите номер телефона';
		const emailAndPhoneErrorText = `${emailErrorText}<br>${phoneErrorText}`;

		if (
			this._nodes.modalContactsEmailInput.value === '' &&
			this._nodes.modalContactsPhoneInput.value === ''
		) {
			this._nodes.modalContactsErrors.innerHTML = emailAndPhoneErrorText;
		} else if (this._nodes.modalContactsEmailInput.value === '') {
			this._nodes.modalContactsErrors.textContent = emailErrorText;
		} else if (this._nodes.modalContactsPhoneInput.value === '') {
			this._nodes.modalContactsErrors.textContent = phoneErrorText;
		} else {
			this._nodes.modalContactsErrors.textContent = '';
		}
	}
}
