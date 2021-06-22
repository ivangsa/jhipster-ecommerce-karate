import { Component, Vue, Inject } from 'vue-property-decorator';

import { IShoppingCart } from '@/shared/model/shopping-cart.model';
import ShoppingCartService from './shopping-cart.service';

@Component
export default class ShoppingCartDetails extends Vue {
  @Inject('shoppingCartService') private shoppingCartService: () => ShoppingCartService;
  public shoppingCart: IShoppingCart = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.shoppingCartId) {
        vm.retrieveShoppingCart(to.params.shoppingCartId);
      }
    });
  }

  public retrieveShoppingCart(shoppingCartId) {
    this.shoppingCartService()
      .find(shoppingCartId)
      .then(res => {
        this.shoppingCart = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
