export interface IGood {
	_id: string;
    description: string;
    image: String;
    title: string;
    category: string;
    price: number;
    selected: boolean;
}

export interface ITotalgoods {
    goods: IGood[];
    _preview: string | null;
    
    addGoodToBasket(_preview: string): void;
}

export interface IOrder {
    payment: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    totalSum: string | null;
    setOrderInfo(order: IOrder): void;
    checkValidationPMNT(data: Record<keyof TUserAddresInfo, string>): boolean;
    checkValidationAddress(data: Record<keyof TUserAddresInfo, string>): boolean;
    checkValidationEmail(data: Record<keyof TUserEmailInfo, string>): boolean;
    checkValidationPhone(data: Record<keyof TUserPhoneInfo, string>): boolean;
}

export interface IBasket {
    selectedGoods: [];
    selected: boolean;

    getBasketInfo(): TBoxOfChoosenGoods;
    deleteGood(selected: boolean, payload: Function | null): void;
    updateBasket(basket: IBasket, payload: Function | null): void;
}

export type TAddGoodToBox = Pick<IGood, "description" | "image" | "title" | "category" | "price">;

export type TBoxOfChoosenGoods = Pick<IGood, "title" | "price">;

export type TUserEmailInfo = Pick<IOrder, "email">;

export type TUserPhoneInfo = Pick<IOrder, "phone">;

export type TUserPaymentInfo = Pick<IOrder, "payment">;

export type TUserAddresInfo = Pick<IOrder, "address">;

export type TOrderDone = Pick<IOrder, 'totalSum'>;


    // openGoodCard(_preview: string): IGood;
    // closeGoodCard(_preview: string): IGood;