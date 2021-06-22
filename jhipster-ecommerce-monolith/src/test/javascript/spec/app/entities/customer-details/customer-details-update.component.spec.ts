/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import CustomerDetailsUpdateComponent from '@/entities/customer-details/customer-details-update.vue';
import CustomerDetailsClass from '@/entities/customer-details/customer-details-update.component';
import CustomerDetailsService from '@/entities/customer-details/customer-details.service';

import UserService from '@/admin/user-management/user-management.service';

import ShoppingCartService from '@/entities/shopping-cart/shopping-cart.service';

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
  describe('CustomerDetails Management Update Component', () => {
    let wrapper: Wrapper<CustomerDetailsClass>;
    let comp: CustomerDetailsClass;
    let customerDetailsServiceStub: SinonStubbedInstance<CustomerDetailsService>;

    beforeEach(() => {
      customerDetailsServiceStub = sinon.createStubInstance<CustomerDetailsService>(CustomerDetailsService);

      wrapper = shallowMount<CustomerDetailsClass>(CustomerDetailsUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          customerDetailsService: () => customerDetailsServiceStub,

          userService: () => new UserService(),

          shoppingCartService: () => new ShoppingCartService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.customerDetails = entity;
        customerDetailsServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(customerDetailsServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.customerDetails = entity;
        customerDetailsServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(customerDetailsServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCustomerDetails = { id: 123 };
        customerDetailsServiceStub.find.resolves(foundCustomerDetails);
        customerDetailsServiceStub.retrieve.resolves([foundCustomerDetails]);

        // WHEN
        comp.beforeRouteEnter({ params: { customerDetailsId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.customerDetails).toBe(foundCustomerDetails);
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
