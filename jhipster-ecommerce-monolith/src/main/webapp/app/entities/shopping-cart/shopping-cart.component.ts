import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IShoppingCart } from '@/shared/model/shopping-cart.model';

import ShoppingCartService from './shopping-cart.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ShoppingCart extends Vue {
  @Inject('shoppingCartService') private shoppingCartService: () => ShoppingCartService;
  private removeId: number = null;

  public shoppingCarts: IShoppingCart[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllShoppingCarts();
  }

  public clear(): void {
    this.retrieveAllShoppingCarts();
  }

  public retrieveAllShoppingCarts(): void {
    this.isFetching = true;

    this.shoppingCartService()
      .retrieve()
      .then(
        res => {
          this.shoppingCarts = res.data;
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

  public prepareRemove(instance: IShoppingCart): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeShoppingCart(): void {
    this.shoppingCartService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('storeApp.shoppingCart.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllShoppingCarts();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
