import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
import { DEFAULT_PRICE_FILTER } from "../../pages/user/ProductList/constants";

function* getProductListSaga(action) {
  try {
    const {
      limit,
      page,
      language,
      categoryFilter,
      authorFilter,
      coverFilter,
      publisherFilter,
      priceFilter,
      keyword,
      sortFilter,
      more,
    } = action.payload;
    let categoryParam = "";
    if (categoryFilter) {
      categoryFilter.forEach((filterItem, filterIndex) => {
        const paramAnd = filterIndex === 0 ? "" : "&";
        categoryParam += `${paramAnd}categoryId=${filterItem.id}`;
      });
    }
    let authorParam = "";
    if (authorFilter) {
      authorFilter.forEach((filterItem, filterIndex) => {
        const paramAnd = filterIndex === 0 ? "" : "&";
        authorParam += `${paramAnd}authorId=${filterItem.id}`;
      });
    }
    let coverParam = "";
    if (coverFilter) {
      coverFilter.forEach((filterItem, filterIndex) => {
        const paramAnd = filterIndex === 0 ? "" : "&";
        coverParam += `${paramAnd}coverId=${filterItem.id}`;
      });
    }
    let publisherParam = "";
    if (publisherFilter) {
      publisherFilter.forEach((filterItem, filterIndex) => {
        const paramAnd = filterIndex === 0 ? "" : "&";
        publisherParam += `${paramAnd}publisherId=${filterItem.id}`;
      });
    }
    const embedParam = "_embed=images&_embed=comments&";
    let bestseller = false;
    if (language === "bestseller") {
      bestseller = true;
    }

    const result = yield axios.get(
      `https://book-store-fe19-api.herokuapp.com/products?${embedParam}${categoryParam}${authorParam}${coverParam}${publisherParam}`,
      {
        params: {
          ...(limit && { _limit: limit }),
          ...(page && { _page: page }),
          ...(language && !bestseller && { language }),
          _expand: "category",
          ...(priceFilter &&
            (priceFilter[0] !== DEFAULT_PRICE_FILTER[0] ||
              priceFilter[1] !== DEFAULT_PRICE_FILTER) && {
              price_gte: priceFilter[0],
              price_lte: priceFilter[1],
            }),
          ...(keyword && { q: keyword }),
          ...(sortFilter && { _sort: "price", _order: sortFilter }),
        },
      }
    );
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        bestseller,
        meta: {
          page,
          total: parseInt(result.headers["x-total-count"]),
        },
        more,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: { error: e.message },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id, callback } = action.payload;
    const result = yield axios.get(
      `https://book-store-fe19-api.herokuapp.com/products/${id}?_expand=publisher&_expand=category&_expand=author&_expand=cover`,
      {
        params: { _embed: "images" },
      }
    );

    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: { data: result.data },
    });
    if (callback) {
      yield callback.getRelatedProductList();
    }
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: { error: "Lỗi khi lấy dữ liệu" },
    });
  }
}

export default function* productSaga() {
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST), getProductListSaga);
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
}
