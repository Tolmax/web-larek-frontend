import { IOrder, TOrderPayment } from "../types";
import { BasketStore } from "./basket.store";

export class OrderStore {
    private _payment: TOrderPayment | null = null;
    private _address: string | null = null;
    private _email: string | null = null;
    private _phone: string | null = null;
    private _basketStore: BasketStore;

    constructor(basketStore: BasketStore) {
        this._basketStore = basketStore;
    }

    public setPayment(payment: TOrderPayment): void {
        this._payment = payment;
    }

    public setAddress(address: string): void {
        this._address = address;
    }

    public setEmail(email: string): void {
        this._email = email;
    }

    public setPhone(phone: string): void {
        this._phone = phone;
    }

    public clear(): void {
        this._payment = null;
        this._address = null;
        this._email = null;
        this._phone = null;
        // this._items = [];
    }

    public getOrder(): IOrder {
        if (
            this._payment === null ||
            this._address === null ||
            this._email === null ||
            this._phone === null ||
            this._basketStore.size === 0
        ) throw new Error('Заказ не заполнен');

        return {
            payment: this._payment,
            address: this._address,
            email: this._email,
            phone: this._phone,
            items: this._basketStore.getAllIds(),
            total: this._basketStore.calcSum()
        };
    }
}