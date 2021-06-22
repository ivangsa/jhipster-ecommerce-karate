<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="storeApp.productOrder.home.createOrEditLabel"
          data-cy="ProductOrderCreateUpdateHeading"
          v-text="$t('storeApp.productOrder.home.createOrEditLabel')"
        >
          Create or edit a ProductOrder
        </h2>
        <div>
          <div class="form-group" v-if="productOrder.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productOrder.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.productOrder.quantity')" for="product-order-quantity">Quantity</label>
            <input
              type="number"
              class="form-control"
              name="quantity"
              id="product-order-quantity"
              data-cy="quantity"
              :class="{ valid: !$v.productOrder.quantity.$invalid, invalid: $v.productOrder.quantity.$invalid }"
              v-model.number="$v.productOrder.quantity.$model"
              required
            />
            <div v-if="$v.productOrder.quantity.$anyDirty && $v.productOrder.quantity.$invalid">
              <small class="form-text text-danger" v-if="!$v.productOrder.quantity.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.productOrder.quantity.min" v-text="$t('entity.validation.min', { min: 0 })">
                This field should be at least 0.
              </small>
              <small class="form-text text-danger" v-if="!$v.productOrder.quantity.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.productOrder.totalPrice')" for="product-order-totalPrice"
              >Total Price</label
            >
            <input
              type="number"
              class="form-control"
              name="totalPrice"
              id="product-order-totalPrice"
              data-cy="totalPrice"
              :class="{ valid: !$v.productOrder.totalPrice.$invalid, invalid: $v.productOrder.totalPrice.$invalid }"
              v-model.number="$v.productOrder.totalPrice.$model"
              required
            />
            <div v-if="$v.productOrder.totalPrice.$anyDirty && $v.productOrder.totalPrice.$invalid">
              <small class="form-text text-danger" v-if="!$v.productOrder.totalPrice.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.productOrder.totalPrice.min" v-text="$t('entity.validation.min', { min: 0 })">
                This field should be at least 0.
              </small>
              <small class="form-text text-danger" v-if="!$v.productOrder.totalPrice.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.productOrder.product')" for="product-order-product">Product</label>
            <select
              class="form-control"
              id="product-order-product"
              data-cy="product"
              name="product"
              v-model="productOrder.product"
              required
            >
              <option v-if="!productOrder.product" v-bind:value="null" selected></option>
              <option
                v-bind:value="productOrder.product && productOption.id === productOrder.product.id ? productOrder.product : productOption"
                v-for="productOption in products"
                :key="productOption.id"
              >
                {{ productOption.name }}
              </option>
            </select>
          </div>
          <div v-if="$v.productOrder.product.$anyDirty && $v.productOrder.product.$invalid">
            <small class="form-text text-danger" v-if="!$v.productOrder.product.required" v-text="$t('entity.validation.required')">
              This field is required.
            </small>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.productOrder.cart')" for="product-order-cart">Cart</label>
            <select class="form-control" id="product-order-cart" data-cy="cart" name="cart" v-model="productOrder.cart" required>
              <option v-if="!productOrder.cart" v-bind:value="null" selected></option>
              <option
                v-bind:value="productOrder.cart && shoppingCartOption.id === productOrder.cart.id ? productOrder.cart : shoppingCartOption"
                v-for="shoppingCartOption in shoppingCarts"
                :key="shoppingCartOption.id"
              >
                {{ shoppingCartOption.id }}
              </option>
            </select>
          </div>
          <div v-if="$v.productOrder.cart.$anyDirty && $v.productOrder.cart.$invalid">
            <small class="form-text text-danger" v-if="!$v.productOrder.cart.required" v-text="$t('entity.validation.required')">
              This field is required.
            </small>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.productOrder.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-order-update.component.ts"></script>
