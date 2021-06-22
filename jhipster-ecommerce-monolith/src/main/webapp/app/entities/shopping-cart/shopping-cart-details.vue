<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="shoppingCart">
        <h2 class="jh-entity-heading" data-cy="shoppingCartDetailsHeading">
          <span v-text="$t('storeApp.shoppingCart.detail.title')">ShoppingCart</span> {{ shoppingCart.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('storeApp.shoppingCart.placedDate')">Placed Date</span>
          </dt>
          <dd>
            <span v-if="shoppingCart.placedDate">{{ $d(Date.parse(shoppingCart.placedDate), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('storeApp.shoppingCart.status')">Status</span>
          </dt>
          <dd>
            <span v-text="$t('storeApp.OrderStatus.' + shoppingCart.status)">{{ shoppingCart.status }}</span>
          </dd>
          <dt>
            <span v-text="$t('storeApp.shoppingCart.totalPrice')">Total Price</span>
          </dt>
          <dd>
            <span>{{ shoppingCart.totalPrice }}</span>
          </dd>
          <dt>
            <span v-text="$t('storeApp.shoppingCart.paymentMethod')">Payment Method</span>
          </dt>
          <dd>
            <span v-text="$t('storeApp.PaymentMethod.' + shoppingCart.paymentMethod)">{{ shoppingCart.paymentMethod }}</span>
          </dd>
          <dt>
            <span v-text="$t('storeApp.shoppingCart.paymentReference')">Payment Reference</span>
          </dt>
          <dd>
            <span>{{ shoppingCart.paymentReference }}</span>
          </dd>
          <dt>
            <span v-text="$t('storeApp.shoppingCart.customerDetails')">Customer Details</span>
          </dt>
          <dd>
            <div v-if="shoppingCart.customerDetails">
              <router-link :to="{ name: 'CustomerDetailsView', params: { customerDetailsId: shoppingCart.customerDetails.id } }">{{
                shoppingCart.customerDetails.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="shoppingCart.id"
          :to="{ name: 'ShoppingCartEdit', params: { shoppingCartId: shoppingCart.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./shopping-cart-details.component.ts"></script>
