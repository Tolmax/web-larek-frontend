import { IApiResponseCreateOrder, ModalSuccessNodes } from '../types';
import { cloneTemplate } from '../utils/utils';
import { Modal } from './base/common/modal';
import { EventEmitter } from './base/events';

export class ModalSucсess extends Modal {
	private _templateSelector: string;
	private _events: EventEmitter;
	private _nodes: ModalSuccessNodes;

	constructor(events: EventEmitter, templateSelector: string) {
		super();
		this._templateSelector = templateSelector;
		this._events = events;
	}

	public open(order: IApiResponseCreateOrder): void {
		const content = this._createHTMLElement(order);
		this._render(content);
		super._open();
	}

	private _createHTMLElement(order: IApiResponseCreateOrder): HTMLElement {
		const modalSucess = cloneTemplate(this._templateSelector);

		this._nodes = {
			modalSuccess: modalSucess,
			modalSuccessDescription: modalSucess.querySelector(
				'.order-success__description'
			),
			modalSuccessCloseButton: modalSucess.querySelector(
				'.order-success__close'
			),
		};

		this._nodes.modalSuccessDescription.textContent =
			`Списано ${order.total} синапсов`;

		this._nodes.modalSuccessCloseButton.addEventListener('click', () => {
			this._close();
		});

		return this._nodes.modalSuccess;
	}
}
