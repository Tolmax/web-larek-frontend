import { IProduct, ModalProductNodes } from "../types";
import { CDN_URL } from "../utils/constants";
import { cloneTemplate, getCardPriceText, getCategoryClass } from "../utils/utils";
import { Modal } from "./base/common/modal";
import { EventEmitter } from "./base/events";

export class ModalProduct extends Modal {
    private _templateSelector: string;
    private _events: EventEmitter;
    private _nodes: ModalProductNodes;

    constructor (events: EventEmitter, templateSelector: string) {
        super();
        this._templateSelector = templateSelector;
        this._events = events;
    }

    public open(product: IProduct): void {
        const content = this._createHTMLElement(product);
        this._render(content);
        super._open();
    }

    private _createHTMLElement(product: IProduct): HTMLElement {
        const modalProduct = cloneTemplate(this._templateSelector);

        this._nodes = {
            modalProduct: modalProduct,
            modalProductImage: modalProduct.querySelector(".card__image"),
            modalProductCategory: modalProduct.querySelector(".card__category"),
            modalProductTitle: modalProduct.querySelector(".card__title"),
            modalProductDescription: modalProduct.querySelector(".card__text"),
            modalProductButton: modalProduct.querySelector(".button"),
            modalProductPrice: modalProduct.querySelector(".card__price")
        };

        // const basketItems = this._basketStore.getAll();
        // btnSubmit.disabled = basketItems.length === 0;

        const category = getCategoryClass(product.category);
		
		this._nodes.modalProductCategory.classList.remove('card__category_soft');
		this._nodes.modalProductCategory.classList.add(`card__category_${category}`);
        this._nodes.modalProductCategory.textContent = product.category;

        this._nodes.modalProductImage.alt = product.title;
        this._nodes.modalProductImage.src = `${CDN_URL}${product.image}`;
        
        this._nodes.modalProductDescription.textContent = product.description;
        this._nodes.modalProductPrice.textContent = getCardPriceText(product.price);
        this._nodes.modalProductTitle.textContent = product.title;

        this._nodes.modalProductButton.addEventListener('click', () => {
            this._events.emit('basket:add', { productId: product.id });
            this._close();
        });

        return this._nodes.modalProduct;
    }

}
