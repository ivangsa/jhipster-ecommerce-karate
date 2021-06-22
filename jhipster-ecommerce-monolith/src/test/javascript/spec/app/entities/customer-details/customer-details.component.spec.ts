/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import CustomerDetailsComponent from '@/entities/customer-details/customer-details.vue';
import CustomerDetailsClass from '@/entities/customer-details/customer-details.component';
import CustomerDetailsService from '@/entities/customer-details/customer-details.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.component('jhi-sort-indicator', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('CustomerDetails Management Component', () => {
    let wrapper: Wrapper<CustomerDetailsClass>;
    let comp: CustomerDetailsClass;
    let customerDetailsServiceStub: SinonStubbedInstance<CustomerDetailsService>;

    beforeEach(() => {
      customerDetailsServiceStub = sinon.createStubInstance<CustomerDetailsService>(CustomerDetailsService);
      customerDetailsServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CustomerDetailsClass>(CustomerDetailsComponent, {
        store,
        i18n,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          customerDetailsService: () => customerDetailsServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      customerDetailsServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCustomerDetailss();
      await comp.$nextTick();

      // THEN
      expect(customerDetailsServiceStub.retrieve.called).toBeTruthy();
      expect(comp.customerDetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      customerDetailsServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(customerDetailsServiceStub.retrieve.called).toBeTruthy();
      expect(comp.customerDetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      customerDetailsServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(customerDetailsServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      customerDetailsServiceStub.retrieve.reset();
      customerDetailsServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(customerDetailsServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.customerDetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      customerDetailsServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeCustomerDetails();
      await comp.$nextTick();

      // THEN
      expect(customerDetailsServiceStub.delete.called).toBeTruthy();
      expect(customerDetailsServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
