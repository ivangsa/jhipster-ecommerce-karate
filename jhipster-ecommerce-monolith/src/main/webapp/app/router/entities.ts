import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Product = () => import('@/entities/product/product.vue');
// prettier-ignore
const ProductUpdate = () => import('@/entities/product/product-update.vue');
// prettier-ignore
const ProductDetails = () => import('@/entities/product/product-details.vue');
// prettier-ignore
const ProductCategory = () => import('@/entities/product-category/product-category.vue');
// prettier-ignore
const ProductCategoryUpdate = () => import('@/entities/product-category/product-category-update.vue');
// prettier-ignore
const ProductCategoryDetails = () => import('@/entities/product-category/product-category-details.vue');
// prettier-ignore
const CustomerDetails = () => import('@/entities/customer-details/customer-details.vue');
// prettier-ignore
const CustomerDetailsUpdate = () => import('@/entities/customer-details/customer-details-update.vue');
// prettier-ignore
const CustomerDetailsDetails = () => import('@/entities/customer-details/customer-details-details.vue');
// prettier-ignore
const ShoppingCart = () => import('@/entities/shopping-cart/shopping-cart.vue');
// prettier-ignore
const ShoppingCartUpdate = () => import('@/entities/shopping-cart/shopping-cart-update.vue');
// prettier-ignore
const ShoppingCartDetails = () => import('@/entities/shopping-cart/shopping-cart-details.vue');
// prettier-ignore
const ProductOrder = () => import('@/entities/product-order/product-order.vue');
// prettier-ignore
const ProductOrderUpdate = () => import('@/entities/product-order/product-order-update.vue');
// prettier-ignore
const ProductOrderDetails = () => import('@/entities/product-order/product-order-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/new',
    name: 'ProductCreate',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/edit',
    name: 'ProductEdit',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/view',
    name: 'ProductView',
    component: ProductDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-category',
    name: 'ProductCategory',
    component: ProductCategory,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-category/new',
    name: 'ProductCategoryCreate',
    component: ProductCategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-category/:productCategoryId/edit',
    name: 'ProductCategoryEdit',
    component: ProductCategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-category/:productCategoryId/view',
    name: 'ProductCategoryView',
    component: ProductCategoryDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer-details',
    name: 'CustomerDetails',
    component: CustomerDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer-details/new',
    name: 'CustomerDetailsCreate',
    component: CustomerDetailsUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer-details/:customerDetailsId/edit',
    name: 'CustomerDetailsEdit',
    component: CustomerDetailsUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer-details/:customerDetailsId/view',
    name: 'CustomerDetailsView',
    component: CustomerDetailsDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/shopping-cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/shopping-cart/new',
    name: 'ShoppingCartCreate',
    component: ShoppingCartUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/shopping-cart/:shoppingCartId/edit',
    name: 'ShoppingCartEdit',
    component: ShoppingCartUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/shopping-cart/:shoppingCartId/view',
    name: 'ShoppingCartView',
    component: ShoppingCartDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order',
    name: 'ProductOrder',
    component: ProductOrder,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order/new',
    name: 'ProductOrderCreate',
    component: ProductOrderUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order/:productOrderId/edit',
    name: 'ProductOrderEdit',
    component: ProductOrderUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order/:productOrderId/view',
    name: 'ProductOrderView',
    component: ProductOrderDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
