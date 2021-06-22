<template>
  <div>
    <h2 id="page-heading" data-cy="CustomerDetailsHeading">
      <span v-text="$t('storeApp.customerDetails.home.title')" id="customer-details-heading">Customer Details</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('storeApp.customerDetails.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CustomerDetailsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-customer-details"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('storeApp.customerDetails.home.createLabel')"> Create a new Customer Details </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && customerDetails && customerDetails.length === 0">
      <span v-text="$t('storeApp.customerDetails.home.notFound')">No customerDetails found</span>
    </div>
    <div class="table-responsive" v-if="customerDetails && customerDetails.length > 0">
      <table class="table table-striped" aria-describedby="customerDetails">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('gender')">
              <span v-text="$t('storeApp.customerDetails.gender')">Gender</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'gender'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('phone')">
              <span v-text="$t('storeApp.customerDetails.phone')">Phone</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'phone'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('addressLine1')">
              <span v-text="$t('storeApp.customerDetails.addressLine1')">Address Line 1</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'addressLine1'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('addressLine2')">
              <span v-text="$t('storeApp.customerDetails.addressLine2')">Address Line 2</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'addressLine2'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('city')">
              <span v-text="$t('storeApp.customerDetails.city')">City</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'city'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('country')">
              <span v-text="$t('storeApp.customerDetails.country')">Country</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'country'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('user.login')">
              <span v-text="$t('storeApp.customerDetails.user')">User</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'user.login'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customerDetails in customerDetails" :key="customerDetails.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CustomerDetailsView', params: { customerDetailsId: customerDetails.id } }">{{
                customerDetails.id
              }}</router-link>
            </td>
            <td v-text="$t('storeApp.Gender.' + customerDetails.gender)">{{ customerDetails.gender }}</td>
            <td>{{ customerDetails.phone }}</td>
            <td>{{ customerDetails.addressLine1 }}</td>
            <td>{{ customerDetails.addressLine2 }}</td>
            <td>{{ customerDetails.city }}</td>
            <td>{{ customerDetails.country }}</td>
            <td>
              {{ customerDetails.user ? customerDetails.user.login : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'CustomerDetailsView', params: { customerDetailsId: customerDetails.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'CustomerDetailsEdit', params: { customerDetailsId: customerDetails.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(customerDetails)"
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
        ><span id="storeApp.customerDetails.delete.question" data-cy="customerDetailsDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-customerDetails-heading" v-text="$t('storeApp.customerDetails.delete.question', { id: removeId })">
          Are you sure you want to delete this Customer Details?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-customerDetails"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCustomerDetails()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="customerDetails && customerDetails.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./customer-details.component.ts"></script>
