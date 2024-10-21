import { GoodData } from './products.model';
import { EventEmitter } from '../components/base/events';
// import { dataCards } from '../utils/data';
import { ApiWeblarekService } from './api-weblarek.service';
import { Cards } from './cards';
import { dataCards } from '../utils/data';
// import { cardTemplate, testCard } from '../index';

const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
// console.log(cardTemplate)
const testCard = document.querySelector('.gallery');
// console.log(testCard)
const cardButton: HTMLButtonElement = document.querySelector('.gallery__item');
console.log(cardButton)

export class AppController {

    private _inited: boolean = false;
    private _events: EventEmitter;
    private _apiWeblarekService: ApiWeblarekService;
    private _goodData: GoodData;
    private _card: Cards;

    constructor() {
        this._events = new EventEmitter();
        this._apiWeblarekService = new ApiWeblarekService();
        this._goodData = new GoodData(this._events);
        this._card = new Cards(cardTemplate, this._events)
    }

    public init(): void {
        if (this._inited === true) return;
        this._inited = true

        // this._goodData.goods = this._apiWeblarekService.getProductList().then(console.log);
        // console.log(goodData.goods)
        // console.log(goodData.getGood("854cef69-976d-4c2a-a18c-2aa45046c390"))

        this._apiWeblarekService.getProductList().then(({ items }) => {
            this._goodData.goods = items;
            console.log(this._goodData.goods);
            console.log(this._goodData.getGood("854cef69-976d-4c2a-a18c-2aa45046c390"));
        });
        // this._apiWeblarekService.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390").then(console.log);

        // this._card.setData(dataCards[0]);
        // testCard.append(this._card.render())
    }
}