
import { ModalNodes } from '../../../types';
import { Component } from './component';
import { EventEmitter } from '../events';

export class Modal {
	protected _modalNodes: ModalNodes;

	constructor() {
		const modal = document.querySelector<HTMLElement>('#modal-container');

		this._modalNodes = {
			modal: modal,
			modalClose: modal.querySelector('.modal__close'),
			modalContent: modal.querySelector('.modal__content')
		};

		this._modalNodes.modalClose.addEventListener('click', this._close);
		this._modalNodes.modal.addEventListener('pointerdown', (evt) => {
			if (evt.target === evt.currentTarget) {
				this._close();
			}
		});
	}

	protected _render(content: HTMLElement): void {
		this._modalNodes.modalContent.textContent = '';
		this._modalNodes.modalContent.append(content);
	}

	protected _open(): void {
		this._modalNodes.modal.classList.add('modal_active');
		document.addEventListener('keyup', this._handleEscUp);
	}

	protected _close = (): void => {
		this._modalNodes.modal.classList.remove('modal_active');
		document.removeEventListener('keyup', this._handleEscUp);
	};

	private _handleEscUp = (evt: KeyboardEvent): void => {
		if (evt.key === 'Escape') {
			this._close();
		}
	};
}
