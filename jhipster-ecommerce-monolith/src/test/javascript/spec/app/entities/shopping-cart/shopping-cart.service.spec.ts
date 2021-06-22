/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import ShoppingCartService from '@/entities/shopping-cart/shopping-cart.service';
import { ShoppingCart } from '@/shared/model/shopping-cart.model';
import { OrderStatus } from '@/shared/model/enumerations/order-status.model';
import { PaymentMethod } from '@/shared/model/enumerations/payment-method.model';

const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
  put: sinon.stub(axios, 'put'),
  patch: sinon.stub(axios, 'patch'),
  delete: sinon.stub(axios, 'delete'),
};

describe('Service Tests', () => {
  describe('ShoppingCart Service', () => {
    let service: ShoppingCartService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new ShoppingCartService();
      currentDate = new Date();
      elemDefault = new ShoppingCart(0, currentDate, OrderStatus.COMPLETED, 0, PaymentMethod.CREDIT_CARD, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            placedDate: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        axiosStub.get.resolves({ data: returnedFromService });

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        axiosStub.get.rejects(error);
        return service
          .find(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a ShoppingCart', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            placedDate: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            placedDate: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a ShoppingCart', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a ShoppingCart', async () => {
        const returnedFromService = Object.assign(
          {
            placedDate: dayjs(currentDate).format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            totalPrice: 1,
            paymentMethod: 'BBBBBB',
            paymentReference: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            placedDate: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a ShoppingCart', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a ShoppingCart', async () => {
        const patchObject = Object.assign(
          {
            placedDate: dayjs(currentDate).format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            paymentMethod: 'BBBBBB',
            paymentReference: 'BBBBBB',
          },
          new ShoppingCart()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            placedDate: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a ShoppingCart', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of ShoppingCart', async () => {
        const returnedFromService = Object.assign(
          {
            placedDate: dayjs(currentDate).format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            totalPrice: 1,
            paymentMethod: 'BBBBBB',
            paymentReference: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            placedDate: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of ShoppingCart', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a ShoppingCart', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a ShoppingCart', async () => {
        axiosStub.delete.rejects(error);

        return service
          .delete(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
