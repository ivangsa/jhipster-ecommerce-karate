<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="storeApp.customerDetails.home.createOrEditLabel"
          data-cy="CustomerDetailsCreateUpdateHeading"
          v-text="$t('storeApp.customerDetails.home.createOrEditLabel')"
        >
          Create or edit a CustomerDetails
        </h2>
        <div>
          <div class="form-group" v-if="customerDetails.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="customerDetails.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.customerDetails.gender')" for="customer-details-gender">Gender</label>
            <select
              class="form-control"
              name="gender"
              :class="{ valid: !$v.customerDetails.gender.$invalid, invalid: $v.customerDetails.gender.$invalid }"
              v-model="$v.customerDetails.gender.$model"
              id="customer-details-gender"
              data-cy="gender"
              required
            >
              <option value="MALE" v-bind:label="$t('storeApp.Gender.MALE')">MALE</option>
              <option value="FEMALE" v-bind:label="$t('storeApp.Gender.FEMALE')">FEMALE</option>
              <option value="OTHER" v-bind:label="$t('storeApp.Gender.OTHER')">OTHER</option>
            </select>
            <div v-if="$v.customerDetails.gender.$anyDirty && $v.customerDetails.gender.$invalid">
              <small class="form-text text-danger" v-if="!$v.customerDetails.gender.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.customerDetails.phone')" for="customer-details-phone">Phone</label>
            <input
              type="text"
              class="form-control"
              name="phone"
              id="customer-details-phone"
              data-cy="phone"
              :class="{ valid: !$v.customerDetails.phone.$invalid, invalid: $v.customerDetails.phone.$invalid }"
              v-model="$v.customerDetails.phone.$model"
              required
            />
            <div v-if="$v.customerDetails.phone.$anyDirty && $v.customerDetails.phone.$invalid">
              <small class="form-text text-danger" v-if="!$v.customerDetails.phone.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.customerDetails.addressLine1')" for="customer-details-addressLine1"
              >Address Line 1</label
            >
            <input
              type="text"
              class="form-control"
              name="addressLine1"
              id="customer-details-addressLine1"
              data-cy="addressLine1"
              :class="{ valid: !$v.customerDetails.addressLine1.$invalid, invalid: $v.customerDetails.addressLine1.$invalid }"
              v-model="$v.customerDetails.addressLine1.$model"
              required
            />
            <div v-if="$v.customerDetails.addressLine1.$anyDirty && $v.customerDetails.addressLine1.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.customerDetails.addressLine1.required"
                v-text="$t('entity.validation.required')"
              >
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.customerDetails.addressLine2')" for="customer-details-addressLine2"
              >Address Line 2</label
            >
            <input
              type="text"
              class="form-control"
              name="addressLine2"
              id="customer-details-addressLine2"
              data-cy="addressLine2"
              :class="{ valid: !$v.customerDetails.addressLine2.$invalid, invalid: $v.customerDetails.addressLine2.$invalid }"
              v-model="$v.customerDetails.addressLine2.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.customerDetails.city')" for="customer-details-city">City</label>
            <input
              type="text"
              class="form-control"
              name="city"
              id="customer-details-city"
              data-cy="city"
              :class="{ valid: !$v.customerDetails.city.$invalid, invalid: $v.customerDetails.city.$invalid }"
              v-model="$v.customerDetails.city.$model"
              required
            />
            <div v-if="$v.customerDetails.city.$anyDirty && $v.customerDetails.city.$invalid">
              <small class="form-text text-danger" v-if="!$v.customerDetails.city.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.customerDetails.country')" for="customer-details-country">Country</label>
            <input
              type="text"
              class="form-control"
              name="country"
              id="customer-details-country"
              data-cy="country"
              :class="{ valid: !$v.customerDetails.country.$invalid, invalid: $v.customerDetails.country.$invalid }"
              v-model="$v.customerDetails.country.$model"
              required
            />
            <div v-if="$v.customerDetails.country.$anyDirty && $v.customerDetails.country.$invalid">
              <small class="form-text text-danger" v-if="!$v.customerDetails.country.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('storeApp.customerDetails.user')" for="customer-details-user">User</label>
            <select class="form-control" id="customer-details-user" data-cy="user" name="user" v-model="customerDetails.user" required>
              <option v-if="!customerDetails.user" v-bind:value="null" selected></option>
              <option
                v-bind:value="customerDetails.user && userOption.id === customerDetails.user.id ? customerDetails.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.login }}
              </option>
            </select>
          </div>
          <div v-if="$v.customerDetails.user.$anyDirty && $v.customerDetails.user.$invalid">
            <small class="form-text text-danger" v-if="!$v.customerDetails.user.required" v-text="$t('entity.validation.required')">
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
            :disabled="$v.customerDetails.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./customer-details-update.component.ts"></script>
