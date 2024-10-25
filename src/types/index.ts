export interface IProduct {
	id: string;
    description: string;
    image: String;
    title: string;
    category: string;
    price: number | null;
}

export interface IOrder {
    payment: TOrderPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface ModalNodes {
    modal: HTMLElement;
    modalClose: HTMLButtonElement;
    modalContent: HTMLElement;
}

export interface CardMiniNodes {
    card: HTMLButtonElement;
    cardCategory: HTMLElement;
    cardTitle: HTMLElement;
    cardImage: HTMLImageElement;
    cardPrice: HTMLElement;
    cardDescription: HTMLElement;
}

export interface ModalProductNodes {
    modalProduct: HTMLElement;
    modalProductImage: HTMLImageElement;
    modalProductCategory: HTMLElement;
    modalProductTitle: HTMLElement;
    modalProductDescription: HTMLElement;
    modalProductButton: HTMLButtonElement;
    modalProductPrice: HTMLElement;
}

export interface ModalBasketNodes {
    modalBasket: HTMLElement;
    modalBasketSubmit: HTMLButtonElement;
    modalBasketPrice: HTMLElement;
}

export interface ModalOrderNodes {
    modalOrder: HTMLElement;
    modalOrderForm: HTMLFormElement;
    modalOrderErrors: HTMLSpanElement;
    modalOrderCashButton: HTMLButtonElement;
    modalOrderCardButton: HTMLButtonElement;
    modalOrderInput: HTMLInputElement;
    modalOrderSubmitButton: HTMLButtonElement;
}

export interface ModalContactsNodes {
    modalContacts: HTMLElement;
    modalContactsForm: HTMLFormElement;
    modalContactsErrors: HTMLSpanElement;
    modalContactsEmailInput: HTMLInputElement;
    modalContactsPhoneInput: HTMLInputElement;
    modalContactsSubmitButton: HTMLButtonElement;
}

export interface ModalSuccessNodes {
    modalSuccess: HTMLElement;
    modalSuccessDescription: HTMLElement;
    modalSuccessCloseButton: HTMLButtonElement;
}

export type TOrderPayment = 'online' | 'offline';

export interface IApiResponseCreateOrder {
    id: string;
    total: number;
}

export interface IApiResponseGetProductList {
    total: number;
    items: IProduct[];
}
