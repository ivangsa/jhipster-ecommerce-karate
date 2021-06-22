import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import UserService from '@/admin/user-management/user-management.service';

import ShoppingCartService from '@/entities/shopping-cart/shopping-cart.service';
import { IShoppingCart } from '@/shared/model/shopping-cart.model';

import { ICustomerDetails, CustomerDetails } from '@/shared/model/customer-details.model';
import CustomerDetailsService from './customer-details.service';

const validations: any = {
  customerDetails: {
    gender: {
      required,
    },
    phone: {
      required,
    },
    addressLine1: {
      required,
    },
    addressLine2: {},
    city: {
      required,
    },
    country: {
      required,
    },
    user: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class CustomerDetailsUpdate extends Vue {
  @Inject('customerDetailsService') private customerDetailsService: () => CustomerDetailsService;
  public customerDetails: ICustomerDetails = new CustomerDetails();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('shoppingCartService') private shoppingCartService: () => ShoppingCartService;

  public shoppingCarts: IShoppingCart[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.customerDetailsId) {
        vm.retrieveCustomerDetails(to.params.customerDetailsId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.customerDetails.id) {
      this.customerDetailsService()
        .update(this.customerDetails)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.customerDetails.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.customerDetailsService()
        .create(this.customerDetails)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.customerDetails.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    }
  }

  public retrieveCustomerDetails(customerDetailsId): void {
    this.customerDetailsService()
      .find(customerDetailsId)
      .then(res => {
        this.customerDetails = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.shoppingCartService()
      .retrieve()
      .then(res => {
        this.shoppingCarts = res.data;
      });
  }
}
