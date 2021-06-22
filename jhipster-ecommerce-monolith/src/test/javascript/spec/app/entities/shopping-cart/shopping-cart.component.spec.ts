/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ShoppingCartComponent from '@/entities/shopping-cart/shopping-cart.vue';
import ShoppingCartClass from '@/entities/shopping-cart/shopping-cart.component';
import ShoppingCartService from '@/entities/shopping-cart/shopping-cart.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
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
  describe('ShoppingCart Management Component', () => {
    let wrapper: Wrapper<ShoppingCartClass>;
    let comp: ShoppingCartClass;
    let shoppingCartServiceStub: SinonStubbedInstance<ShoppingCartService>;

    beforeEach(() => {
      shoppingCartServiceStub = sinon.createStubInstance<ShoppingCartService>(ShoppingCartService);
      shoppingCartServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ShoppingCartClass>(ShoppingCartComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          shoppingCartService: () => shoppingCartServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      shoppingCartServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllShoppingCarts();
      await comp.$nextTick();

      // THEN
      expect(shoppingCartServiceStub.retrieve.called).toBeTruthy();
      expect(comp.shoppingCarts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      shoppingCartServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeShoppingCart();
      await comp.$nextTick();

      // THEN
      expect(shoppingCartServiceStub.delete.called).toBeTruthy();
      expect(shoppingCartServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
