import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, generatePath } from "react-router-dom";
import { Row, Col } from "antd";
import moment from "moment";

import {
  getBlogDetail,
  getFeatureBlogListAction,
} from "../../../redux/actions";

import TopWrapper from "../../../components/TopWrapper";
import { BREADCRUMB } from "./constants";
import { ROUTER } from "../../../constants/router";

import * as S from "./styles";

const BlogDetail = ({ match, ...props }) => {
  document.title = "Chi tiết bài viết";
  const id = match.params?.id;

  const { blogDetail, featureBlogList } = useSelector(
    (state) => state.blogReducer
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      dispatch(getBlogDetail({ id }));
    }
    dispatch(getFeatureBlogListAction());
  }, [id]);

  const redirectToDetail = (id) =>
    history.push(generatePath(ROUTER.USER.BLOG_DETAIL, { id }));

  const renderFeatureBlogList = useMemo(() => {
    return featureBlogList.data.slice(0, 5).map((blog) => (
      <S.FeatureBlogWrapper key={blog.id}>
        <img
          src={blog.image}
          alt={blog.name}
          onClick={() => redirectToDetail(blog.id)}
        />
        <S.InfoFeatureBlogWrapper>
          <h5 onClick={() => redirectToDetail(blog.id)}>{blog.name}</h5>
          <p>{moment(blog.createdAt).format("lll")}</p>
        </S.InfoFeatureBlogWrapper>
      </S.FeatureBlogWrapper>
    ));
  }, [featureBlogList.data]);

  const renderRecentBlogList = useMemo(() => {
    const recentBlogList = [...featureBlogList.data].reverse();

    return recentBlogList?.slice(0, 5).map((blog) => (
      <S.FeatureBlogWrapper key={blog.id}>
        <img
          src={blog.image}
          alt={blog.name}
          onClick={() => redirectToDetail(blog.id)}
        />
        <S.InfoFeatureBlogWrapper>
          <h5 onClick={() => redirectToDetail(blog.id)}>{blog.name}</h5>
          <p>{moment(blog.createdAt).format("lll")}</p>
        </S.InfoFeatureBlogWrapper>
      </S.FeatureBlogWrapper>
    ));
  }, [featureBlogList.data]);

  const renderContent = useMemo(() => {
    return (
      <S.ContentWrapper
        dangerouslySetInnerHTML={{ __html: blogDetail.data.content }}
      />
    );
  }, [blogDetail.data]);
  return (
    <>
      <TopWrapper breadcrumb={[...BREADCRUMB]} titlePage="Chi tiết bài viết" />
      <S.BlogsContainer>
        <S.BlogsWrapper>
          <S.BlogTitle>{blogDetail.data.name}</S.BlogTitle>
          <Row gutter={[32, 0]}>
            <Col xs={24} sm={24} lg={16}>
              {renderContent}
            </Col>
            <Col xs={24} sm={24} lg={8}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={24}>
                  <S.SectionLabelWrapper>
                    <S.SectionTitle>Nổi bật</S.SectionTitle>
                  </S.SectionLabelWrapper>

                  {renderFeatureBlogList}
                </Col>
                <Col xs={24} sm={12} lg={24}>
                  <S.SectionLabelWrapper>
                    <S.SectionTitle>Gần đây</S.SectionTitle>
                  </S.SectionLabelWrapper>

                  {renderRecentBlogList}
                </Col>
              </Row>
            </Col>
          </Row>
        </S.BlogsWrapper>
      </S.BlogsContainer>
    </>
  );
};

export default BlogDetail;
