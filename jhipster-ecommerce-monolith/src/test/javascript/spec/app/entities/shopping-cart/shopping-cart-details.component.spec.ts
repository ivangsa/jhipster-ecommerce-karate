/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ShoppingCartDetailComponent from '@/entities/shopping-cart/shopping-cart-details.vue';
import ShoppingCartClass from '@/entities/shopping-cart/shopping-cart-details.component';
import ShoppingCartService from '@/entities/shopping-cart/shopping-cart.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ShoppingCart Management Detail Component', () => {
    let wrapper: Wrapper<ShoppingCartClass>;
    let comp: ShoppingCartClass;
    let shoppingCartServiceStub: SinonStubbedInstance<ShoppingCartService>;

    beforeEach(() => {
      shoppingCartServiceStub = sinon.createStubInstance<ShoppingCartService>(ShoppingCartService);

      wrapper = shallowMount<ShoppingCartClass>(ShoppingCartDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { shoppingCartService: () => shoppingCartServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundShoppingCart = { id: 123 };
        shoppingCartServiceStub.find.resolves(foundShoppingCart);

        // WHEN
        comp.retrieveShoppingCart(123);
        await comp.$nextTick();

        // THEN
        expect(comp.shoppingCart).toBe(foundShoppingCart);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundShoppingCart = { id: 123 };
        shoppingCartServiceStub.find.resolves(foundShoppingCart);

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
