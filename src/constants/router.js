export const ROUTER = {
  USER: {
    HOME: "/",
    PRODUCTS_LIST: "/books",
    PRODUCTS_LIST_DOMESTIC: "/books/domestic",
    PRODUCTS_LIST_FOREIGN: "/books/foreign",
    PRODUCTS_LIST_BESTSELLER: "/books/bestseller",
    PRODUCT_DETAIL: "/book/:id",
    ABOUT_US: "/about",
    CONTACT: "/contact",
    CART: "/cart",
    CHECKOUT: "/checkout",
    PROFILE: "/profile/:page",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PRODUCTS_LIST: "/admin/books",
    CREATE_PRODUCT: "/admin/books/create",
    UPDATE_PRODUCT: "/admin/books/:id/update",
  },
  LOGIN: "/login",
  NOT_FOUND: "/not-found",
};
