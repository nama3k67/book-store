import React, { useEffect, useMemo, useState } from "react";
import { useHistory, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Pagination, Button, Input, Select } from "antd";
import moment from "moment";

import {
  getBlogListAction,
  getFeatureBlogListAction,
} from "../../../redux/actions";

import TopWrapper from "../../../components/TopWrapper";

import { BREADCRUMB } from "./constants";
import { PAGE_SIZE } from "../../../constants/pagination";
import { ROUTER } from "../../../constants/router";

import * as S from "./styles";

const Blogs = () => {
  const { blogList, featureBlogList } = useSelector(
    (state) => state.blogReducer
  );

  useEffect(() => {
    dispatch(
      getBlogListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        sortFilter: "desc",
      })
    );
    dispatch(getFeatureBlogListAction());
  }, []);

  const [keywordFilter, setKeywordFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("desc");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearchKeyword = (e) => {
    setKeywordFilter(e.target.value);
    dispatch(
      getBlogListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        keyword: e.target.value,
        sortFilter,
      })
    );
  };

  const handleChangeSort = (value) => {
    setSortFilter(value);
    dispatch(
      getBlogListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
        keyword: keywordFilter,
        sortFilter: value,
      })
    );
  };

  const redirectToDetail = (id) =>
    history.push(generatePath(ROUTER.USER.BLOG_DETAIL, { id }));

  const renderBlogList = useMemo(() => {
    return blogList.data.map((blog) => (
      <S.BlogWrapper key={blog.id}>
        <img
          src={blog.image}
          alt={blog.name}
          onClick={() => redirectToDetail(blog.id)}
        />
        <S.BlogInfoWrapper>
          <h5 onClick={() => redirectToDetail(blog.id)}>{blog.name}</h5>
          <time>{moment(blog.createdAt).format("lll")}</time>
          <p>{blog.introduction}...</p>
          <Button type="primary" onClick={() => redirectToDetail(blog.id)}>
            Xem thêm
          </Button>
        </S.BlogInfoWrapper>
      </S.BlogWrapper>
    ));
  }, [blogList.data]);

  const renderFeatureBlogList = useMemo(() => {
    return featureBlogList.data.slice(0, 2).map((blog) => (
      <S.FeatureBlogWrapper key={blog.id}>
        <img
          src={blog.image}
          alt={blog.name}
          onClick={() => redirectToDetail(blog.id)}
        />
        <S.InfoFeatureBlogWrapper>
          <h5 onClick={() => redirectToDetail(blog.id)}>{blog.name}</h5>
          <p>{moment(blog.createdAt).format("lll")}</p>
          <p style={{ fontSize: 15, marginBottom: 0 }}>
            {blog.introduction}...
          </p>
        </S.InfoFeatureBlogWrapper>
      </S.FeatureBlogWrapper>
    ));
  }, [featureBlogList.data]);

  const renderRecentBlogList = useMemo(() => {
    const recentBlogList = [...featureBlogList.data].reverse();

    return recentBlogList?.slice(0, 2).map((blog) => (
      <S.FeatureBlogWrapper key={blog.id}>
        <img
          src={blog.image}
          alt={blog.name}
          onClick={() => redirectToDetail(blog.id)}
        />
        <S.InfoFeatureBlogWrapper>
          <h5 onClick={() => redirectToDetail(blog.id)}>{blog.name}</h5>
          <p>{moment(blog.createdAt).format("lll")}</p>
          <p style={{ fontSize: 15, marginBottom: 0 }}>
            {blog.introduction}...
          </p>
        </S.InfoFeatureBlogWrapper>
      </S.FeatureBlogWrapper>
    ));
  }, [featureBlogList.data]);

  return (
    <>
      <TopWrapper breadcrumb={[...BREADCRUMB]} titlePage="Bài viết" />
      <S.BlogsContainer>
        <S.BlogsWrapper>
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} lg={17}>
              <Row gutter={[8, 8]}>
                <Col xs={{ span: 24, order: 2 }} sm={{ span: 6, order: 1 }}>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Sắp xếp theo"
                    allowClear
                    size="large"
                    defaultValue="desc"
                    onChange={(value) => handleChangeSort(value)}
                  >
                    <Select.Option value="desc">
                      Bài viết mới nhất
                    </Select.Option>
                    <Select.Option value="asc">Bài viết cũ nhất</Select.Option>
                  </Select>
                </Col>
                <Col xs={{ span: 24, order: 1 }} sm={{ span: 18, order: 2 }}>
                  <Input
                    placeholder="Tìm kiếm"
                    size="large"
                    value={keywordFilter}
                    onChange={(e) => handleSearchKeyword(e)}
                  />
                </Col>
              </Row>
              <S.LeftSideWrapper>
                {renderBlogList}
                <Pagination
                  current={blogList.meta.page}
                  total={blogList.meta.total}
                  defaultPageSize={PAGE_SIZE.USER_PRODUCT}
                  onChange={(page) =>
                    dispatch(
                      getBlogListAction({
                        limit: PAGE_SIZE.USER_PRODUCT,
                        page,
                        sortFilter,
                        keywordFilter,
                      })
                    )
                  }
                  style={{ marginBottom: 16 }}
                />
              </S.LeftSideWrapper>
            </Col>
            <Col xs={24} sm={24} lg={7}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={24}>
                  <S.SectionLabelWrapper>
                    <S.SectionTitle>Nổi bật</S.SectionTitle>
                  </S.SectionLabelWrapper>
                  <S.RightSideWrapper>
                    {renderFeatureBlogList}
                  </S.RightSideWrapper>
                </Col>
                <Col xs={24} sm={12} lg={24}>
                  <S.SectionLabelWrapper>
                    <S.SectionTitle>Gần đây</S.SectionTitle>
                  </S.SectionLabelWrapper>
                  <S.RightSideWrapper>
                    {renderRecentBlogList}
                  </S.RightSideWrapper>
                </Col>
              </Row>
            </Col>
          </Row>
        </S.BlogsWrapper>
      </S.BlogsContainer>
    </>
  );
};

export default Blogs;
