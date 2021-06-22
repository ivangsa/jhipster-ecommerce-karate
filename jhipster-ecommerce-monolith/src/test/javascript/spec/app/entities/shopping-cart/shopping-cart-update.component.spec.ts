/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import ShoppingCartUpdateComponent from '@/entities/shopping-cart/shopping-cart-update.vue';
import ShoppingCartClass from '@/entities/shopping-cart/shopping-cart-update.component';
import ShoppingCartService from '@/entities/shopping-cart/shopping-cart.service';

import ProductOrderService from '@/entities/product-order/product-order.service';

import CustomerDetailsService from '@/entities/customer-details/customer-details.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('ShoppingCart Management Update Component', () => {
    let wrapper: Wrapper<ShoppingCartClass>;
    let comp: ShoppingCartClass;
    let shoppingCartServiceStub: SinonStubbedInstance<ShoppingCartService>;

    beforeEach(() => {
      shoppingCartServiceStub = sinon.createStubInstance<ShoppingCartService>(ShoppingCartService);

      wrapper = shallowMount<ShoppingCartClass>(ShoppingCartUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          shoppingCartService: () => shoppingCartServiceStub,

          productOrderService: () => new ProductOrderService(),

          customerDetailsService: () => new CustomerDetailsService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.shoppingCart = entity;
        shoppingCartServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(shoppingCartServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.shoppingCart = entity;
        shoppingCartServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(shoppingCartServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundShoppingCart = { id: 123 };
        shoppingCartServiceStub.find.resolves(foundShoppingCart);
        shoppingCartServiceStub.retrieve.resolves([foundShoppingCart]);

        // WHEN
        comp.beforeRouteEnter({ params: { shoppingCartId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.shoppingCart).toBe(foundShoppingCart);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
