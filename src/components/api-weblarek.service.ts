import { API_URL } from '../utils/constants';
import { Api } from './base/api';
import { IApiResponseCreateOrder, IApiResponseGetProductList, IGood, IOrder } from '../types'

export class ApiWeblarekService extends Api {
    constructor() {
        super(API_URL); 
    }

    public getProductList(): Promise<IApiResponseGetProductList> {
        return this.get<IApiResponseGetProductList>(`product`);
    }

    public getProduct(id: string): Promise<IGood> {
        return this.get<IGood>(`product/${id}`);
    }

    public sendOrder(order: IOrder): Promise<IApiResponseCreateOrder> {
        return this.post<IApiResponseCreateOrder>(`order`, order);
    }
}