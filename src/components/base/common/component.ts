import { cloneTemplate } from "../../../utils/utils";
import { EventEmitter } from "../events";

export class Component<T = object> {
    protected _events: EventEmitter;
    protected _container: HTMLElement;

    constructor(events: EventEmitter, templateSelector: string) {
        this._events = events;
        this._container = cloneTemplate(templateSelector);
    }

    /**
     * Абстрактный метод для создания DOM-элемента. Дочерние классы должны будут его реализовать
     */
    protected createHTMLElement(data: T, ...args: any[]): HTMLElement {
        throw new Error('Метод createHTMLElement должен быть реализован подклассом');
    }
}
