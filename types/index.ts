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
}

export interface IBasket {
    selectedGoods: [];
    selected: boolean;

    getBasketInfo(): TBoxOfChoosenGoods;
    deleteGood(selected: boolean, payload: Function | null): void;
    updateBasket(basket: IBasket, payload: Function | null): void;
    setOrderInfo(order: IOrder): void;
    checkValidation(data: Record<keyof TUserPublicInfo, string>): boolean;
}

export type TAddGoodToBox = Pick<IGood, "description" | "image" | "title" | "category" | "price">;

export type TBoxOfChoosenGoods = Pick<IGood, "title" | "price">;

export type TUserPublicInfo = Pick<IOrder, "payment" | "address" | "email" | "phone">;

export type TOrderDone = Pick<IOrder, 'totalSum'>;


    // openGoodCard(_preview: string): IGood;
    // closeGoodCard(_preview: string): IGood;