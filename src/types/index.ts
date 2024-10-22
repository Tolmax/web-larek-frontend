export interface IProduct {
	id: string;
    description: string;
    image: String;
    title: string;
    category: string;
    price: number | null;
}

export interface CardMiniNodes {
    card: HTMLButtonElement;
    cardCategory: HTMLElement;
    cardTitle: HTMLElement;
    cardImage: HTMLImageElement;
    cardPrice: HTMLElement;
    cardDescription: HTMLElement;
}

export interface ModalProductNodes {
    modalProduct: HTMLElement;
    modalProductImage: HTMLImageElement;
    modalProductCategory: HTMLElement;
    modalProductTitle: HTMLElement;
    modalProductDescription: HTMLElement;
    modalProductButton: HTMLButtonElement;
    modalProductPrice: HTMLElement;
}

export interface ModalNodes {
    modal: HTMLElement;
    modalClose: HTMLButtonElement;
    modalContent: HTMLElement;
}

// export interface ITotalgoods {
//     goods: IGood[];
//     preview: string | null;
    
//     getGood(_id: string): IGood;
// }



export interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
    // setOrderInfo(order: IOrder): void;
    // checkValidationPMNT(data: Record<keyof TUserAddresInfo, string>): boolean;
    // checkValidationAddress(data: Record<keyof TUserAddresInfo, string>): boolean;
    // checkValidationEmail(data: Record<keyof TUserEmailInfo, string>): boolean;
    // checkValidationPhone(data: Record<keyof TUserPhoneInfo, string>): boolean;
}

export interface IBasket {
    selectedProducts: []; 
    selected: boolean;


    // addGoodToBasket():
    // getBasketInfo(): TBoxOfChoosenGoods;
    // deleteGood(selected: boolean, payload: Function | null): void;
    // updateBasket(basket: IBasket, payload: Function | null): void;
}

export interface IApiResponseCreateOrder {
    id: string;
    total: number;
}

export interface IApiResponseGetProductList {
    total: number;
    items: IProduct[];
}

// export type TAddGoodToBox = Pick<IProduct, "description" | "image" | "title" | "category" | "price">;

// export type TBoxOfChoosenGoods = Pick<IProduct, "title" | "price">;

// export type TUserEmailInfo = Pick<IOrder, "email">;

// export type TUserPhoneInfo = Pick<IOrder, "phone">;

// export type TUserPaymentInfo = Pick<IOrder, "payment">;

// export type TUserAddresInfo = Pick<IOrder, "address">;

// export type TOrderDone = Pick<IOrder, 'totalSum'>;


    // openGoodCard(_preview: string): IGood;
    // closeGoodCard(_preview: string): IGood;