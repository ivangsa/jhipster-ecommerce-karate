<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="customerDetails">
        <h2 class="jh-entity-heading" data-cy="customerDetailsDetailsHeading">
          <span v-text="$t('storeApp.customerDetails.detail.title')">CustomerDetails</span> {{ customerDetails.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('storeApp.customerDetails.gender')">Gender</span>
          </dt>
          <dd>
            <span v-text="$t('storeApp.Gender.' + customerDetails.gender)">{{ customerDetails.gender }}</span>
          </dd>
          <dt>
            <span v-text="$t('storeApp.customerDetails.phone')">Phone</span>
          </dt>
          <dd>
            <span>{{ customerDetails.phone }}</span>
          </dd>
          <dt>
            <span v-text="$t('storeApp.customerDetails.addressLine1')">Address Line 1</span>
          </dt>
          <dd>
            <span>{{ customerDetails.addressLine1 }}</span>
          </dd>
          <dt>
            <span v-text="$t('storeApp.customerDetails.addressLine2')">Address Line 2</span>
          </dt>
          <dd>
            <span>{{ customerDetails.addressLine2 }}</span>
          </dd>
          <dt>
            <span v-text="$t('storeApp.customerDetails.city')">City</span>
          </dt>
          <dd>
            <span>{{ customerDetails.city }}</span>
          </dd>
          <dt>
            <span v-text="$t('storeApp.customerDetails.country')">Country</span>
          </dt>
          <dd>
            <span>{{ customerDetails.country }}</span>
          </dd>
          <dt>
            <span v-text="$t('storeApp.customerDetails.user')">User</span>
          </dt>
          <dd>
            {{ customerDetails.user ? customerDetails.user.login : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="customerDetails.id"
          :to="{ name: 'CustomerDetailsEdit', params: { customerDetailsId: customerDetails.id } }"
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

<script lang="ts" src="./customer-details-details.component.ts"></script>
