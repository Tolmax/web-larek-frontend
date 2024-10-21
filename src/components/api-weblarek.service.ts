import { API_URL } from '../utils/constants';
import { Api } from './base/api';
import { IApiResponseCreateOrder, IApiResponseGetProductList, IOrder, IProduct } from '../types'

export class ApiWeblarekService extends Api {
    constructor() {
        super(API_URL); 
    }

    public getProductList(): Promise<IApiResponseGetProductList> {
        return this.get<IApiResponseGetProductList>(`product`);
    }

    public getProduct(id: string): Promise<IProduct> {
        return this.get<IProduct>(`product/${id}`);
    }

    public sendOrder(order: IOrder): Promise<IApiResponseCreateOrder> {
        return this.post<IApiResponseCreateOrder>(`order`, order);
    }
}