import { IProductOrder } from '@/shared/model/product-order.model';
import { ICustomerDetails } from '@/shared/model/customer-details.model';

import { OrderStatus } from '@/shared/model/enumerations/order-status.model';
import { PaymentMethod } from '@/shared/model/enumerations/payment-method.model';
export interface IShoppingCart {
  id?: number;
  placedDate?: Date;
  status?: OrderStatus;
  totalPrice?: number;
  paymentMethod?: PaymentMethod;
  paymentReference?: string | null;
  orders?: IProductOrder[] | null;
  customerDetails?: ICustomerDetails;
}

export class ShoppingCart implements IShoppingCart {
  constructor(
    public id?: number,
    public placedDate?: Date,
    public status?: OrderStatus,
    public totalPrice?: number,
    public paymentMethod?: PaymentMethod,
    public paymentReference?: string | null,
    public orders?: IProductOrder[] | null,
    public customerDetails?: ICustomerDetails
  ) {}
}
