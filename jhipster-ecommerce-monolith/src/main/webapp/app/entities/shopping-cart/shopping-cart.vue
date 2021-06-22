<template>
  <div>
    <h2 id="page-heading" data-cy="ShoppingCartHeading">
      <span v-text="$t('storeApp.shoppingCart.home.title')" id="shopping-cart-heading">Shopping Carts</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('storeApp.shoppingCart.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ShoppingCartCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-shopping-cart"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('storeApp.shoppingCart.home.createLabel')"> Create a new Shopping Cart </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && shoppingCarts && shoppingCarts.length === 0">
      <span v-text="$t('storeApp.shoppingCart.home.notFound')">No shoppingCarts found</span>
    </div>
    <div class="table-responsive" v-if="shoppingCarts && shoppingCarts.length > 0">
      <table class="table table-striped" aria-describedby="shoppingCarts">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('storeApp.shoppingCart.placedDate')">Placed Date</span></th>
            <th scope="row"><span v-text="$t('storeApp.shoppingCart.status')">Status</span></th>
            <th scope="row"><span v-text="$t('storeApp.shoppingCart.totalPrice')">Total Price</span></th>
            <th scope="row"><span v-text="$t('storeApp.shoppingCart.paymentMethod')">Payment Method</span></th>
            <th scope="row"><span v-text="$t('storeApp.shoppingCart.paymentReference')">Payment Reference</span></th>
            <th scope="row"><span v-text="$t('storeApp.shoppingCart.customerDetails')">Customer Details</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shoppingCart in shoppingCarts" :key="shoppingCart.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ShoppingCartView', params: { shoppingCartId: shoppingCart.id } }">{{
                shoppingCart.id
              }}</router-link>
            </td>
            <td>{{ shoppingCart.placedDate ? $d(Date.parse(shoppingCart.placedDate), 'short') : '' }}</td>
            <td v-text="$t('storeApp.OrderStatus.' + shoppingCart.status)">{{ shoppingCart.status }}</td>
            <td>{{ shoppingCart.totalPrice }}</td>
            <td v-text="$t('storeApp.PaymentMethod.' + shoppingCart.paymentMethod)">{{ shoppingCart.paymentMethod }}</td>
            <td>{{ shoppingCart.paymentReference }}</td>
            <td>
              <div v-if="shoppingCart.customerDetails">
                <router-link :to="{ name: 'CustomerDetailsView', params: { customerDetailsId: shoppingCart.customerDetails.id } }">{{
                  shoppingCart.customerDetails.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ShoppingCartView', params: { shoppingCartId: shoppingCart.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ShoppingCartEdit', params: { shoppingCartId: shoppingCart.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(shoppingCart)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="storeApp.shoppingCart.delete.question" data-cy="shoppingCartDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-shoppingCart-heading" v-text="$t('storeApp.shoppingCart.delete.question', { id: removeId })">
          Are you sure you want to delete this Shopping Cart?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-shoppingCart"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeShoppingCart()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./shopping-cart.component.ts"></script>
