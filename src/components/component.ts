import { EventEmitter } from "./base/events";

export class Component<T = object> {
    protected _templateSelector: string;
    protected _events: EventEmitter;

    constructor(events: EventEmitter, templateSelector: string) {
        this._events = events;
        this._templateSelector = templateSelector;
    }

    /**
     * Абстрактный метод для создания DOM-элемента. Дочерние классы должны будут его реализовать
     */
    protected createHTMLElement(data: T): HTMLElement {
        throw new Error('Метод createHTMLElement должен быть реализован подклассом');
    }
}
