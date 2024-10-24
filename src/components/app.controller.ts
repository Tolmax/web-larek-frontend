import { EventEmitter } from '../components/base/events';
import { ApiWeblarekService } from './api-weblarek.service';
import { ProductsStore } from './products.store';
import { CardMini } from './card-mini';
import { IApiResponseCreateOrder, IProduct } from '../types';
import { ModalProduct } from './modal-product';
import { BasketStore } from './basket.store';
import { ModalBasket } from './modal-basket';
import { BasketItemComponent } from './basket-item.component';
import { ModalOrder } from './modal-order';
import { OrderStore } from './order.store';
import { ModalContacts } from './modal-contacts';
import { ModalSucess } from './modal-success';

export class AppController {
    private _inited: boolean = false;
    private _events: EventEmitter;
    private _apiWeblarekService: ApiWeblarekService;
    private _productsStore: ProductsStore;
    private _modalProduct: ModalProduct;
    private _basketStore: BasketStore;
    private _modalBasket: ModalBasket;
    private _basketItemComponent: BasketItemComponent;
    private _orderStore: OrderStore;
    private _modalOrder: ModalOrder;
    private _modalContacts: ModalContacts;
    private _modalSuccess: ModalSucess;


    constructor() {
        this._events = new EventEmitter();
        this._apiWeblarekService = new ApiWeblarekService();
        // this._apiResponseCreateOrder = new ModalContacts;
        this._productsStore = new ProductsStore(this._events);
        this._modalProduct = new ModalProduct(this._events, '#card-preview');
        this._basketStore = new BasketStore(this._events, this._productsStore);
        this._orderStore = new OrderStore(this._basketStore);
        this._basketItemComponent = new BasketItemComponent(this._events, '#card-basket');
        this._modalBasket = new ModalBasket(this._events, '#basket', this._basketStore, this._basketItemComponent);
        this._modalOrder = new ModalOrder(this._events, '#order', this._orderStore);
        this._modalContacts = new ModalContacts(this._events, '#contacts', this._orderStore, this._apiWeblarekService);
        this._modalSuccess = new ModalSucess(this._events, '#success');
    }

    public init(): void {
        if (this._inited === true) return;
        this._inited = true

        this._listenEvents();
        this._loadProducts();
    }

    private _loadProducts(): void {
        this._apiWeblarekService.getProductList().then(({ items }) => {
            this._productsStore.setAll(items);
        });
    }

    private _listenEvents(): void {
        this._events.on<IProduct[]>('products:changed', products => {
            this._renderProducts(products);  
        });

        this._events.on<IProduct>('product:open', product => {
            // console.log('Кликнули по карточке галереи', product);
            this._modalProduct.open(product);
        });

        this._events.on<{ productId: string }>('basket:delete', ({ productId }) => {                          
            this._basketStore.delete(productId);
        });

        this._events.on<{ productId: string }>('basket:add', ({ productId }) => {
            console.log('Кликнули по кнопке в корзину', productId);
            this._basketStore.add(productId);
        });

        this._events.on('basket:submit', () => {
            console.log('Кликнули по кнопке корзины - Оформить')
            this._modalOrder.open();
        });

        this._events.on('order:submit', () => {
            this._modalContacts.open();
        });

        this._events.on<IApiResponseCreateOrder>('contacts:submit', (order) => { 
            console.log(order);
                    
            this._modalSuccess.open(order);
        });

        const headerBasketCounterNode = document.querySelector('.header__basket-counter');
        const headerBasketNode = document.querySelector('.header__basket');

        this._events.on<IProduct[]>('basket:changed', products => {
            // console.log('изменилась корзина');
            headerBasketCounterNode.textContent = `${products.length}`;
        });

        // вешаем слушатель на кнопку корзины
        headerBasketNode.addEventListener('click', () => {
            this._modalBasket.open();
        })
        
        
    }

    private _renderProducts(products: IProduct[]) {
        // Вынести реализацию этой функции в отдельный класс
        const galleryElement = document.querySelector('.gallery');
        galleryElement.textContent = '';

        for (const product of products) {
            const cardMini = new CardMini(this._events, '#card-catalog');
            const cardMiniHTMLElement = cardMini.createHTMLElement(product);

            galleryElement.append(cardMiniHTMLElement);
        }

        
    }
}