import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICustomerDetails } from '@/shared/model/customer-details.model';
import CustomerDetailsService from './customer-details.service';

@Component
export default class CustomerDetailsDetails extends Vue {
  @Inject('customerDetailsService') private customerDetailsService: () => CustomerDetailsService;
  public customerDetails: ICustomerDetails = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.customerDetailsId) {
        vm.retrieveCustomerDetails(to.params.customerDetailsId);
      }
    });
  }

  public retrieveCustomerDetails(customerDetailsId) {
    this.customerDetailsService()
      .find(customerDetailsId)
      .then(res => {
        this.customerDetails = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
