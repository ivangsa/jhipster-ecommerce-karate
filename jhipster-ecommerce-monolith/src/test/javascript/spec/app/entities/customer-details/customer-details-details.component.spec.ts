/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CustomerDetailsDetailComponent from '@/entities/customer-details/customer-details-details.vue';
import CustomerDetailsClass from '@/entities/customer-details/customer-details-details.component';
import CustomerDetailsService from '@/entities/customer-details/customer-details.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('CustomerDetails Management Detail Component', () => {
    let wrapper: Wrapper<CustomerDetailsClass>;
    let comp: CustomerDetailsClass;
    let customerDetailsServiceStub: SinonStubbedInstance<CustomerDetailsService>;

    beforeEach(() => {
      customerDetailsServiceStub = sinon.createStubInstance<CustomerDetailsService>(CustomerDetailsService);

      wrapper = shallowMount<CustomerDetailsClass>(CustomerDetailsDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { customerDetailsService: () => customerDetailsServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCustomerDetails = { id: 123 };
        customerDetailsServiceStub.find.resolves(foundCustomerDetails);

        // WHEN
        comp.retrieveCustomerDetails(123);
        await comp.$nextTick();

        // THEN
        expect(comp.customerDetails).toBe(foundCustomerDetails);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCustomerDetails = { id: 123 };
        customerDetailsServiceStub.find.resolves(foundCustomerDetails);

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
