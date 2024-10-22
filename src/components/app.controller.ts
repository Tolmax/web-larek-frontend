import { EventEmitter } from '../components/base/events';
import { ApiWeblarekService } from './api-weblarek.service';
// import { CardsRenderer } from './card-element-factory';
// import { dataCards } from '../utils/data';
import { ProductsStore } from './products.store';
import { CardMini } from './card-mini';
import { IProduct } from '../types';
import { ModalProduct } from './modal-product';
import { BasketStore } from './basket.store';

export class AppController {

    private _inited: boolean = false;
    private _events: EventEmitter;
    private _apiWeblarekService: ApiWeblarekService;
    private _productsStore: ProductsStore;
    private _modalProduct: ModalProduct;
    private _basketStore: BasketStore;
    // private _cardsRenderer: CardsRenderer;

    constructor() {
        this._events = new EventEmitter();
        this._apiWeblarekService = new ApiWeblarekService();
        this._productsStore = new ProductsStore(this._events);
        this._modalProduct = new ModalProduct(this._events, '#card-preview');
        this._basketStore = new BasketStore(this._events, this._productsStore);
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

        this._events.on<{ productId: string }>('product:add', ({ productId }) => {
            // console.log('Кликнули по кнопке в корзину', productId);
            this._basketStore.add(productId);

            console.clear();
            console.log(this._basketStore.calcSum());
            console.log(this._basketStore.getAll());
            
        });

        const headerBasketCounterNode = document.querySelector('.header__basket-counter');

        this._events.on<IProduct[]>('basket:changed', products => {
            console.log('Изменилась корзина');
            console.log(products);

            headerBasketCounterNode.textContent = `${products.length}`;
        });

        
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