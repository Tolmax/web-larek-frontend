import { EventEmitter } from '../components/base/events';
import { ApiWeblarekService } from './api-weblarek.service';
import { ProductsStore } from './products.store';
import { CardMini } from './card-mini';
import { IProduct } from '../types';
import { ModalProduct } from './modal-product';
import { BasketStore } from './basket.store';
import { ModalBasket } from './modal-basket';
import { BasketItemComponent } from './basket-item.component';

export class AppController {

    private _inited: boolean = false;
    private _events: EventEmitter;
    private _apiWeblarekService: ApiWeblarekService;
    private _productsStore: ProductsStore;
    private _modalProduct: ModalProduct;
    private _basketStore: BasketStore;
    private _modalBasket: ModalBasket;
    private _basketItemComponent: BasketItemComponent;

    // private _cardsRenderer: CardsRenderer;

    constructor() {
        this._events = new EventEmitter();
        this._apiWeblarekService = new ApiWeblarekService();
        this._productsStore = new ProductsStore(this._events);
        this._modalProduct = new ModalProduct(this._events, '#card-preview');
        this._basketStore = new BasketStore(this._events, this._productsStore);
        this._basketItemComponent = new BasketItemComponent(this._events, '#card-basket');
        this._modalBasket = new ModalBasket(this._events, '#basket', this._basketStore, this._basketItemComponent);
        // this._card = new Cards(cardTemplate, this._events)
    }

    public init(): void {
        if (this._inited === true) return;
        this._inited = true

        this._listenEvents();
        this._loadProducts();

        // this._card.setData(dataCards[0]);
        // testCard.append(this._card.render())
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
            // console.log('Кликнули по кнопке в корзину', productId);
            this._basketStore.add(productId);
            
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