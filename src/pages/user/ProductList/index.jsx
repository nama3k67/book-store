import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FilterOutlined } from "@ant-design/icons";
import {
  Button,
  Row,
  Col,
  Checkbox,
  Input,
  Space,
  Tag,
  Slider,
  Select,
  Collapse,
} from "antd";

import TopWrapper from "../../../components/TopWrapper";
import ProductWrapper from "../../../components/ProductWrapper";

import { PAGE_SIZE } from "../../../constants/pagination";
import { ROUTER } from "../../../constants/router";
import { BREADCRUMB, DEFAULT_PRICE_FILTER, MARKS } from "./constants";

import {
  getCategoryListAction,
  getAuthorListAction,
  getCoverListAction,
  getPublisherListAction,
  getProductListAction,
} from "../../../redux/actions";

import * as S from "./styles";

const ProductListPage = () => {
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [authorFilter, setAuthorFilter] = useState([]);
  const [coverFilter, setCoverFilter] = useState([]);
  const [publisherFilter, setPublisherFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState(DEFAULT_PRICE_FILTER);
  const [keywordFilter, setKeywordFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [language, setLanguage] = useState("");
  const [breadcrumb, setBreadcrumb] = useState({
    titlePage: "",
    breadcrumb: [],
  });

  const location = useLocation();
  const { Panel } = Collapse;

  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { authorList } = useSelector((state) => state.authorReducer);
  const { coverList } = useSelector((state) => state.coverReducer);
  const { publisherList } = useSelector((state) => state.publisherReducer);
  const { productList } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getAuthorListAction());
    dispatch(getPublisherListAction());
    dispatch(getCoverListAction());
  }, []);

  useEffect(() => {
    setCategoryFilter([]);
    setAuthorFilter([]);
    setCoverFilter([]);
    setPublisherFilter([]);
    setPriceFilter(DEFAULT_PRICE_FILTER);
    setKeywordFilter("");
    setSortFilter("");

    switch (location.pathname) {
      case ROUTER.USER.PRODUCTS_LIST:
        setLanguage("");
        setBreadcrumb({ titlePage: "Tủ sách", breadcrumb: BREADCRUMB });
        break;
      case ROUTER.USER.PRODUCTS_LIST_DOMESTIC:
        setLanguage("Tiếng Việt");
        setBreadcrumb({
          titlePage: "Sách trong nước",
          breadcrumb: [
            ...BREADCRUMB,
            {
              title: "Sách trong nước",
              path: ROUTER.USER.PRODUCTS_LIST_DOMESTIC,
            },
          ],
        });
        break;
      case ROUTER.USER.PRODUCTS_LIST_FOREIGN:
        setLanguage("Tiếng Anh");
        setBreadcrumb({
          titlePage: "Sách nước ngoài",
          breadcrumb: [
            ...BREADCRUMB,
            {
              title: "Sách nước ngoài",
              path: ROUTER.USER.PRODUCTS_LIST_FOREIGN,
            },
          ],
        });
        break;
      case ROUTER.USER.PRODUCTS_LIST_BESTSELLER:
        setLanguage("bestseller");
        setBreadcrumb({
          titlePage: "Sách bán chạy",
          breadcrumb: [
            ...BREADCRUMB,
            {
              title: "Sách bán chạy",
              path: ROUTER.USER.PRODUCTS_LIST_BESTSELLER,
            },
          ],
        });
        break;
      default:
        break;
    }
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
      })
    );
  }, [location.pathname, language]);

  const handleSelectCategoryFilter = (e) => {
    const { value, checked } = e.target;
    const newCategoryFilter = checked
      ? [...categoryFilter, value]
      : categoryFilter.filter((filterItem) => filterItem.id !== value.id);

    setCategoryFilter(newCategoryFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter: newCategoryFilter,
        authorFilter,
        coverFilter,
        publisherFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleClearCategoryFilter = (categoryFilterItem) => {
    const newCategoryFilter = categoryFilter.filter(
      (filterItem) => filterItem.id !== categoryFilterItem.id
    );
    setCategoryFilter(newCategoryFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter: newCategoryFilter,
        authorFilter,
        coverFilter,
        publisherFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleSelectAuthorFilter = (e) => {
    const { value, checked } = e.target;
    const newAuthorFilter = checked
      ? [...authorFilter, value]
      : authorFilter.filter((filterItem) => filterItem.id !== value.id);

    setAuthorFilter(newAuthorFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter: newAuthorFilter,
        coverFilter,
        publisherFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleClearAuthorFilter = (authorFilterItem) => {
    const newAuthorFilter = authorFilter.filter(
      (filterItem) => filterItem.id !== authorFilterItem.id
    );
    setAuthorFilter(newAuthorFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter: newAuthorFilter,
        coverFilter,
        publisherFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleSelectCoverFilter = (e) => {
    const { value, checked } = e.target;
    const newCoverFilter = checked
      ? [...coverFilter, value]
      : coverFilter.filter((filterItem) => filterItem.id !== value.id);

    setCoverFilter(newCoverFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter,
        coverFilter: newCoverFilter,
        publisherFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleClearCoverFilter = (coverFilterItem) => {
    const newCoverFilter = coverFilter.filter(
      (filterItem) => filterItem.id !== coverFilterItem.id
    );
    setCoverFilter(newCoverFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter,
        coverFilter: newCoverFilter,
        publisherFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleSelectPublisherFilter = (e) => {
    const { value, checked } = e.target;
    const newPublisherFilter = checked
      ? [...publisherFilter, value]
      : publisherFilter.filter((filterItem) => filterItem.id !== value.id);

    setPublisherFilter(newPublisherFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter,
        coverFilter,
        publisherFilter: newPublisherFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleClearPublisherFilter = (publisherFilterItem) => {
    const newPublisherFilter = publisherFilter.filter(
      (filterItem) => filterItem.id !== publisherFilterItem.id
    );
    setPublisherFilter(newPublisherFilter);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter,
        coverFilter,
        publisherFilter: newPublisherFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleChangePriceFilter = (value) => {
    setPriceFilter(value);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter,
        coverFilter,
        publisherFilter,
        priceFilter: value,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleClearPriceFilter = () => {
    setPriceFilter(DEFAULT_PRICE_FILTER);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter,
        coverFilter,
        publisherFilter,
        priceFilter: DEFAULT_PRICE_FILTER,
        keyword: keywordFilter,
        sortFilter,
      })
    );
  };

  const handleSearchKeyword = (e) => {
    setKeywordFilter(e.target.value);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter,
        coverFilter,
        publisherFilter,
        priceFilter,
        keyword: e.target.value,
        sortFilter,
      })
    );
  };

  const handleClearKeyword = () => {
    setKeywordFilter("");
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter,
        coverFilter,
        publisherFilter,
        priceFilter,
        keyword: "",
        sortFilter,
      })
    );
  };

  const handleChangeSort = (value) => {
    setSortFilter(value);
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter,
        coverFilter,
        publisherFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter: value,
      })
    );
  };

  const handleClearSort = () => {
    setSortFilter("");
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        language,
        categoryFilter,
        authorFilter,
        coverFilter,
        publisherFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter: "",
      })
    );
  };

  const handleLoadMore = (e) => {
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: productList.meta.page + 1,
        language,
        categoryFilter,
        authorFilter,
        coverFilter,
        publisherFilter,
        priceFilter,
        keyword: keywordFilter,
        sortFilter,
        more: true,
      })
    );
  };

  const renderCategoryList = useMemo(() => {
    return categoryList.data.map((categoryItem, categoryIndex) => {
      const checked =
        categoryFilter.findIndex(
          (filterItem) => filterItem.id === categoryItem.id
        ) !== -1;

      return (
        <S.FilterItem key={categoryItem.id}>
          <Checkbox
            value={categoryItem}
            checked={checked}
            onChange={(e) => handleSelectCategoryFilter(e)}
          >
            {categoryItem.name}
          </Checkbox>
        </S.FilterItem>
      );
    });
  }, [categoryList.data, categoryFilter, language]);

  const renderAuthorList = useMemo(() => {
    return authorList.data.map((authorItem, authorIndex) => {
      const checked =
        authorFilter.findIndex(
          (filterItem) => filterItem.id === authorItem.id
        ) !== -1;

      return (
        <S.FilterItem key={authorItem.id}>
          <Checkbox
            value={authorItem}
            checked={checked}
            onChange={(e) => handleSelectAuthorFilter(e)}
          >
            {authorItem.name}
          </Checkbox>
        </S.FilterItem>
      );
    });
  }, [authorList.data, authorFilter, language]);

  const renderCoverList = useMemo(() => {
    return coverList.data.map((coverItem, coverIndex) => {
      const checked =
        coverFilter.findIndex(
          (filterItem) => filterItem.id === coverItem.id
        ) !== -1;

      return (
        <S.FilterItem key={coverItem.id}>
          <Checkbox
            value={coverItem}
            checked={checked}
            onChange={(e) => handleSelectCoverFilter(e)}
          >
            {coverItem.name}
          </Checkbox>
        </S.FilterItem>
      );
    });
  }, [coverList.data, coverFilter, location]);

  const renderPublisherList = useMemo(() => {
    return publisherList.data.map((publisherItem, publisherIndex) => {
      const checked =
        publisherFilter.findIndex(
          (filterItem) => filterItem.id === publisherItem.id
        ) !== -1;

      return (
        <S.FilterItem key={publisherItem.id}>
          <Checkbox
            value={publisherItem}
            checked={checked}
            onChange={(e) => handleSelectPublisherFilter(e)}
          >
            {publisherItem.name}
          </Checkbox>
        </S.FilterItem>
      );
    });
  }, [publisherList.data, publisherFilter, language]);

  const renderCategoryFilterTags = useMemo(() => {
    return categoryFilter.map((categoryFilterItem, categoryFilterIndex) => (
      <Tag
        key={categoryFilterItem.id}
        closable
        onClose={() => handleClearCategoryFilter(categoryFilterItem)}
      >
        {categoryFilterItem.name}
      </Tag>
    ));
  }, [categoryFilter]);

  const renderAuthorFilterTags = useMemo(() => {
    return authorFilter.map((authorFilterItem, authorFilterIndex) => (
      <Tag
        key={authorFilterItem.id}
        closable
        onClose={() => handleClearAuthorFilter(authorFilterItem)}
      >
        {authorFilterItem.name}
      </Tag>
    ));
  }, [authorFilter]);

  const renderPublisherFilterTags = useMemo(() => {
    return publisherFilter.map((publisherFilterItem, publisherFilterIndex) => (
      <Tag
        key={publisherFilterItem.id}
        closable
        onClose={() => handleClearPublisherFilter(publisherFilterItem)}
      >
        {publisherFilterItem.name}
      </Tag>
    ));
  }, [publisherFilter]);

  const renderCoverFilterTags = useMemo(() => {
    return coverFilter.map((coverFilterItem, coverFilterIndex) => (
      <Tag
        key={coverFilterItem.id}
        closable
        onClose={() => handleClearCoverFilter(coverFilterItem)}
      >
        {coverFilterItem.name}
      </Tag>
    ));
  }, [coverFilter]);

  const renderProductList = useMemo(() => {
    return productList.data.map((productItem) => (
      <Col xs={12} sm={8} md={12} lg={8} xl={6} key={productItem.id}>
        <ProductWrapper productItem={productItem} />
      </Col>
    ));
  }, [productList.data, location.pathname, language]);

  return (
    <>
      <TopWrapper
        titlePage={breadcrumb.titlePage}
        breadcrumb={breadcrumb.breadcrumb}
      />
      <S.ProductListContainer>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={6}>
            <S.FilterTitleWrapper>
              <S.FilterTitle>
                <FilterOutlined /> &nbsp;
                <p>Lọc theo</p>
              </S.FilterTitle>
            </S.FilterTitleWrapper>

            <Collapse expandIconPosition="right">
              <Panel
                header={<S.FilterTypeTitle>Thể loại</S.FilterTypeTitle>}
                key="1"
              >
                {renderCategoryList}
              </Panel>
              <Panel
                header={<S.FilterTypeTitle>Nhà xuất bản</S.FilterTypeTitle>}
                key="2"
              >
                {renderPublisherList}
              </Panel>
              <Panel
                header={<S.FilterTypeTitle>Loại bìa</S.FilterTypeTitle>}
                key="3"
              >
                {renderCoverList}
              </Panel>
              <Panel
                header={<S.FilterTypeTitle>Tác giả</S.FilterTypeTitle>}
                key="4"
              >
                {renderAuthorList}
              </Panel>
              <Panel
                header={<S.FilterTypeTitle>Giá</S.FilterTypeTitle>}
                key="5"
              >
                <div style={{ padding: "0 8px" }}>
                  <Slider
                    range
                    marks={MARKS}
                    min={DEFAULT_PRICE_FILTER[0]}
                    max={DEFAULT_PRICE_FILTER[1]}
                    step={10000}
                    value={priceFilter}
                    tipFormatter={(value) => value.toLocaleString()}
                    onChange={(value) => handleChangePriceFilter(value)}
                  />
                </div>
              </Panel>
            </Collapse>
          </Col>
          <Col xs={24} sm={24} md={16} lg={18}>
            <Row gutter={[16, 16]}>
              <Col
                xs={{ order: 2, span: 24 }}
                sm={{ order: 1, span: 16 }}
                lg={18}
              >
                <Input
                  placeholder="Tìm kiếm"
                  value={keywordFilter}
                  onChange={(e) => handleSearchKeyword(e)}
                />
              </Col>
              <Col
                xs={{ order: 1, span: 24 }}
                sm={{ order: 2, span: 8 }}
                lg={6}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Sắp xếp theo"
                  allowClear
                  onChange={(value) => handleChangeSort(value)}
                >
                  <Select.Option value="asc">Giá thấp đến cao</Select.Option>
                  <Select.Option value="desc">Giá cao đến thấp</Select.Option>
                </Select>
              </Col>
            </Row>
            <p style={{ marginTop: 8, fontSize: 16 }}>
              Hiện thị{" "}
              {productList.data.length >= 8
                ? productList.meta?.page * PAGE_SIZE.USER_PRODUCT
                : productList.data.length}{" "}
              trên {productList.meta?.total} kết quả
            </p>
            <Space style={{ marginTop: 16 }}>
              {categoryFilter.length > 0 && renderCategoryFilterTags}
              {publisherFilter.length > 0 && renderPublisherFilterTags}
              {coverFilter.length > 0 && renderCoverFilterTags}
              {authorFilter.length > 0 && renderAuthorFilterTags}
              {keywordFilter && (
                <Tag closable onClose={() => handleClearKeyword()}>
                  Từ khóa: {keywordFilter}
                </Tag>
              )}
              {(priceFilter[0] !== DEFAULT_PRICE_FILTER[0] ||
                priceFilter[1] !== DEFAULT_PRICE_FILTER[1]) && (
                <Tag closable onClose={() => handleClearPriceFilter()}>
                  {`Giá từ: ${priceFilter[0].toLocaleString()} - ${priceFilter[1].toLocaleString()}`}
                </Tag>
              )}
              {sortFilter && (
                <Tag closable onClose={() => handleClearSort()}>
                  {`Sắp xếp theo ${
                    sortFilter === "asc" ? "Tăng dần" : "Giảm dần"
                  }`}
                </Tag>
              )}
            </Space>
            <Row gutter={[8, 16]} style={{ marginTop: 16 }}>
              {renderProductList}
            </Row>
            {productList.meta.total !== productList.data.length && (
              <Row justify="center" style={{ style: 16, marginTop: 10 }}>
                <Button onClick={() => handleLoadMore()}>Hiển thị thêm</Button>
              </Row>
            )}
          </Col>
        </Row>
      </S.ProductListContainer>
    </>
  );
};

export default ProductListPage;
