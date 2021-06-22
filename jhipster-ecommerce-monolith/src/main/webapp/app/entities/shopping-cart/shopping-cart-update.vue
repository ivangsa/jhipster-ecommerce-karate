<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="storeApp.shoppingCart.home.createOrEditLabel"
          data-cy="ShoppingCartCreateUpdateHeading"
          v-text="$t('storeApp.shoppingCart.home.createOrEditLabel')"
        >
          Create or edit a ShoppingCart
        </h2>
        <div>
          <div class="form-group" v-if="shoppingCart.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="shoppingCart.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.shoppingCart.placedDate')" for="shopping-cart-placedDate"
              >Placed Date</label
            >
            <div class="d-flex">
              <input
                id="shopping-cart-placedDate"
                data-cy="placedDate"
                type="datetime-local"
                class="form-control"
                name="placedDate"
                :class="{ valid: !$v.shoppingCart.placedDate.$invalid, invalid: $v.shoppingCart.placedDate.$invalid }"
                required
                :value="convertDateTimeFromServer($v.shoppingCart.placedDate.$model)"
                @change="updateInstantField('placedDate', $event)"
              />
            </div>
            <div v-if="$v.shoppingCart.placedDate.$anyDirty && $v.shoppingCart.placedDate.$invalid">
              <small class="form-text text-danger" v-if="!$v.shoppingCart.placedDate.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.shoppingCart.placedDate.ZonedDateTimelocal"
                v-text="$t('entity.validation.ZonedDateTimelocal')"
              >
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.shoppingCart.status')" for="shopping-cart-status">Status</label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.shoppingCart.status.$invalid, invalid: $v.shoppingCart.status.$invalid }"
              v-model="$v.shoppingCart.status.$model"
              id="shopping-cart-status"
              data-cy="status"
              required
            >
              <option value="COMPLETED" v-bind:label="$t('storeApp.OrderStatus.COMPLETED')">COMPLETED</option>
              <option value="PAID" v-bind:label="$t('storeApp.OrderStatus.PAID')">PAID</option>
              <option value="PENDING" v-bind:label="$t('storeApp.OrderStatus.PENDING')">PENDING</option>
              <option value="CANCELLED" v-bind:label="$t('storeApp.OrderStatus.CANCELLED')">CANCELLED</option>
              <option value="REFUNDED" v-bind:label="$t('storeApp.OrderStatus.REFUNDED')">REFUNDED</option>
            </select>
            <div v-if="$v.shoppingCart.status.$anyDirty && $v.shoppingCart.status.$invalid">
              <small class="form-text text-danger" v-if="!$v.shoppingCart.status.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.shoppingCart.totalPrice')" for="shopping-cart-totalPrice"
              >Total Price</label
            >
            <input
              type="number"
              class="form-control"
              name="totalPrice"
              id="shopping-cart-totalPrice"
              data-cy="totalPrice"
              :class="{ valid: !$v.shoppingCart.totalPrice.$invalid, invalid: $v.shoppingCart.totalPrice.$invalid }"
              v-model.number="$v.shoppingCart.totalPrice.$model"
              required
            />
            <div v-if="$v.shoppingCart.totalPrice.$anyDirty && $v.shoppingCart.totalPrice.$invalid">
              <small class="form-text text-danger" v-if="!$v.shoppingCart.totalPrice.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.shoppingCart.totalPrice.min" v-text="$t('entity.validation.min', { min: 0 })">
                This field should be at least 0.
              </small>
              <small class="form-text text-danger" v-if="!$v.shoppingCart.totalPrice.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.shoppingCart.paymentMethod')" for="shopping-cart-paymentMethod"
              >Payment Method</label
            >
            <select
              class="form-control"
              name="paymentMethod"
              :class="{ valid: !$v.shoppingCart.paymentMethod.$invalid, invalid: $v.shoppingCart.paymentMethod.$invalid }"
              v-model="$v.shoppingCart.paymentMethod.$model"
              id="shopping-cart-paymentMethod"
              data-cy="paymentMethod"
              required
            >
              <option value="CREDIT_CARD" v-bind:label="$t('storeApp.PaymentMethod.CREDIT_CARD')">card</option>
              <option value="IDEAL" v-bind:label="$t('storeApp.PaymentMethod.IDEAL')">ideal</option>
            </select>
            <div v-if="$v.shoppingCart.paymentMethod.$anyDirty && $v.shoppingCart.paymentMethod.$invalid">
              <small class="form-text text-danger" v-if="!$v.shoppingCart.paymentMethod.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.shoppingCart.paymentReference')" for="shopping-cart-paymentReference"
              >Payment Reference</label
            >
            <input
              type="text"
              class="form-control"
              name="paymentReference"
              id="shopping-cart-paymentReference"
              data-cy="paymentReference"
              :class="{ valid: !$v.shoppingCart.paymentReference.$invalid, invalid: $v.shoppingCart.paymentReference.$invalid }"
              v-model="$v.shoppingCart.paymentReference.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.shoppingCart.customerDetails')" for="shopping-cart-customerDetails"
              >Customer Details</label
            >
            <select
              class="form-control"
              id="shopping-cart-customerDetails"
              data-cy="customerDetails"
              name="customerDetails"
              v-model="shoppingCart.customerDetails"
              required
            >
              <option v-if="!shoppingCart.customerDetails" v-bind:value="null" selected></option>
              <option
                v-bind:value="
                  shoppingCart.customerDetails && customerDetailsOption.id === shoppingCart.customerDetails.id
                    ? shoppingCart.customerDetails
                    : customerDetailsOption
                "
                v-for="customerDetailsOption in customerDetails"
                :key="customerDetailsOption.id"
              >
                {{ customerDetailsOption.id }}
              </option>
            </select>
          </div>
          <div v-if="$v.shoppingCart.customerDetails.$anyDirty && $v.shoppingCart.customerDetails.$invalid">
            <small class="form-text text-danger" v-if="!$v.shoppingCart.customerDetails.required" v-text="$t('entity.validation.required')">
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
            :disabled="$v.shoppingCart.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./shopping-cart-update.component.ts"></script>
