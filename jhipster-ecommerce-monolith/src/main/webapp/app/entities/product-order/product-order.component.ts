import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IProductOrder } from '@/shared/model/product-order.model';

import ProductOrderService from './product-order.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ProductOrder extends Vue {
  @Inject('productOrderService') private productOrderService: () => ProductOrderService;
  private removeId: number = null;

  public productOrders: IProductOrder[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllProductOrders();
  }

  public clear(): void {
    this.retrieveAllProductOrders();
  }

  public retrieveAllProductOrders(): void {
    this.isFetching = true;

    this.productOrderService()
      .retrieve()
      .then(
        res => {
          this.productOrders = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IProductOrder): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeProductOrder(): void {
    this.productOrderService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('storeApp.productOrder.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllProductOrders();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
