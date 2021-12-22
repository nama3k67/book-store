import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  MailOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import Lightbox from "react-image-lightbox";
import Slider from "react-slick";
import {
  Row,
  Col,
  Rate,
  Tooltip,
  Button,
  Space,
  Descriptions,
  Form,
  Input,
  List,
  Comment,
  Avatar,
  notification,
  Tag,
} from "antd";

import TopWrapper from "../../../components/TopWrapper";
import ProductWrapper from "../../../components/ProductWrapper";

import { BREADCRUMB, SETTING_SLICK } from "./constants";

import {
  getProductDetailAction,
  getProductListAction,
  getCommentListAction,
  postCommentAction,
  addToCardAction,
  updateCartProductAction,
  addToWishlistAction,
} from "../../../redux/actions";

import * as S from "./styles";

const ProductDetailPage = ({ match, ...props }) => {
  const id = match.params?.id;
  const [commentForm] = Form.useForm();
  const contentElement = useRef(null);
  const loadMoreElement = useRef(null);

  const [imageIndex, setImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [isDescribed, setIsDescribed] = useState(true);

  const { userInfo } = useSelector((state) => state.authReducer);
  const { productDetail } = useSelector((state) => state.productReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const { commentList } = useSelector((state) => state.commentReducer);
  const { cartList } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProductDetailAction({ id }));
      dispatch(getCommentListAction({ productId: id }));
    }
  }, [id]);

  useEffect(() => {
    dispatch(
      getProductListAction({
        categoryFilter: [productDetail.data?.category],
      })
    );

    const current = contentElement?.current;
    if (current) {
      if (current.children[0].clientHeight <= 500) {
        current.children[1].style.display = "none";
        current.style.height = "fit-content";
        loadMoreElement.current.style.display = "none";
      } else {
        current.children[1].style.display = "block";
        current.style.height = "500px";
        loadMoreElement.current.style.display = "block";
      }
    }
  }, [productDetail.data, isDescribed]);

  const handleAddToCart = () => {
    if (userInfo.data.id) {
      const existCartProduct = cartList.data.find(
        (item) => item.productId === parseInt(id)
      );
      if (existCartProduct) {
        dispatch(
          updateCartProductAction({
            data: {
              id: existCartProduct.id,
              quantity: existCartProduct.quantity + productQuantity,
            },
            callback: {
              showSuccess: () =>
                notification.success({
                  message: "Thêm vào giỏ hàng thành công!",
                }),
            },
          })
        );
      } else {
        dispatch(
          addToCardAction({
            quantity: productQuantity,
            productId: parseInt(id),
            userId: userInfo.data.id,
            productImage: imagesList[0]?.path,
          })
        );
      }
    } else {
      notification.warning({
        message: "Chưa đăng nhập",
        description: "Bạn cần đăng nhập để thêm vào giỏ hàng!",
      });
    }
  };

  const handleSubmitComment = (values) => {
    const isExist =
      commentList.data.findIndex((item) => item.userId === userInfo.data.id) !==
      -1;
    if (isExist) {
      notification.warning({ message: "Bạn đã bình luận rồi!" });
    } else {
      dispatch(
        postCommentAction({
          ...values,
          productId: parseInt(id),
          userId: userInfo.data.id,
        })
      );
    }
    commentForm.resetFields();
  };

  const renderProductRate = () => {
    let total = 0;
    commentList.data.forEach((item) => {
      total += item.rate;
    });

    return total / commentList.data.length;
  };

  const imagesList = productDetail.data.images || [];
  const renderImageList = useMemo(() => {
    return imagesList.map((imageItem, index) => (
      <S.ImageItem
        key={index}
        src={imageItem.path}
        alt={index}
        active={index === imageIndex}
        onClick={() => {
          setImageIndex(index);
        }}
      />
    ));
  }, [productDetail.data, imageIndex]);

  const renderRelatedProductsList = useMemo(() => {
    const relatedProductList = productList.data.filter(
      (item) => item.id !== productDetail.data.id
    );

    return relatedProductList.map((productItem) => (
      <S.RelatedProduct key={productItem.id}>
        <ProductWrapper productItem={productItem} />
      </S.RelatedProduct>
    ));
  }, [productList.data]);

  const handleAddWishlist = () => {
    if (userInfo.data.id) {
      const newWishList = [...userInfo.data.wishlist, productDetail.data];
      dispatch(
        addToWishlistAction({
          id: userInfo.data.id,
          data: { ...userInfo.data, wishlist: newWishList },
        })
      );
    } else {
      notification.warning({
        message: "Chưa đăng nhập",
        description: "Bạn cần đăng nhập để thêm vào yêu thích",
      });
    }
  };

  const handleDeleteWishlist = () => {
    const index = userInfo.data.wishlist?.findIndex(
      (item) => item.id === productDetail.data.id
    );
    const newWishList = [...userInfo.data.wishlist];
    newWishList.splice(index, 1);
    dispatch(
      addToWishlistAction({
        id: userInfo.data.id,
        data: { ...userInfo.data, wishlist: newWishList },
      })
    );
  };

  return (
    <>
      <TopWrapper
        breadcrumb={[...BREADCRUMB, { title: productDetail.data.name }]}
        titlePage="Chi tiết sản phẩm"
      />
      <S.ProductDetailContainer>
        <S.ProductDetailWrapper>
          <Row gutter={[32, 0]} style={{ height: "100%" }}>
            <Col
              xs={24}
              sm={24}
              md={10}
              style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
            >
              <Row justify="center" gutter={[0, 8]} style={{ width: "100%" }}>
                <Col xs={{ order: 1, span: 24 }} xl={{ order: 2, span: 20 }}>
                  <S.ProductImageWrapper>
                    <S.ProductImage
                      src={imagesList[imageIndex]?.path}
                      alt={productDetail.data.name + "_" + imageIndex}
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    />
                    {isOpen && (
                      <Lightbox
                        mainSrc={imagesList[imageIndex]?.path}
                        nextSrc={
                          imagesList[(imageIndex + 1) % imagesList.length]?.path
                        }
                        prevSrc={
                          imagesList[
                            (imageIndex + imagesList.length - 1) %
                              imagesList.length
                          ]?.path
                        }
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                          setImageIndex(
                            (imageIndex + imagesList.length - 1) %
                              imagesList.length
                          )
                        }
                        onMoveNextRequest={() =>
                          setImageIndex((imageIndex + 1) % imagesList.length)
                        }
                      />
                    )}
                  </S.ProductImageWrapper>
                </Col>
                <Col xs={{ order: 2, span: 24 }} xl={{ order: 1, span: 4 }}>
                  <S.ImageListWrapper>{renderImageList}</S.ImageListWrapper>
                </Col>
              </Row>
            </Col>
            <Col sm={24} md={14}>
              <h1>{productDetail.data.name}</h1>
              <Row>
                <Col xs={24} sm={16} md={24} lg={16}>
                  <p>
                    Tác giả: <b>{productDetail.data?.author?.name}</b>
                  </p>
                  <p>
                    Thể loại: <b>{productDetail.data?.category?.name}</b>
                  </p>
                </Col>
                <Col xs={24} sm={8} md={24} lg={8}>
                  <p>
                    Nhà xuất bản: <b>{productDetail.data?.publisher?.name}</b>
                  </p>
                  <p>
                    Sẵn có: <b>{productDetail.data?.amount}</b>
                  </p>
                </Col>
                <Col span={24} style={{ marginTop: 5 }}>
                  <Row align="bottom">
                    <Rate value={renderProductRate()} allowHalf disabled />
                    <span style={{ color: "#FBC687" }}>
                      ({commentList.data.length} khách hàng đánh giá)
                    </span>
                  </Row>

                  <Row align="bottom">
                    <S.PriceItem>
                      {productDetail.data.price?.toLocaleString()}&nbsp;<u>đ</u>
                    </S.PriceItem>
                    {productDetail.data.discount !== 0 && (
                      <>
                        <p
                          style={{
                            fontSize: 15,
                            color: "rgb(128, 128, 137)",
                            textDecoration: "line-through",
                            margin: "0 4px 3px 8px",
                          }}
                        >
                          {parseInt(
                            productDetail.data.price /
                              (1 - productDetail.data.discount)
                          ).toLocaleString()}
                          <u>đ</u>
                        </p>
                        <Tag
                          color="error"
                          style={{
                            height: "fit-content",
                            width: "fit-content",
                            marginBottom: 4,
                          }}
                        >
                          -{productDetail.data.discount * 100}%
                        </Tag>
                      </>
                    )}
                  </Row>
                  <br />
                  <Row>
                    <Col xs={24} sm={24} xl={16}>
                      <Space align="center" style={{ marginBottom: 5 }}>
                        <span
                          style={{
                            width: "fit-content",
                            fontSize: 16,
                            fontWeight: 500,
                          }}
                        >
                          Số lượng:
                        </span>
                        <S.QuantityWrapper>
                          <S.QuantityButton
                            disabled={productQuantity <= 1}
                            style={{ borderLeft: "none" }}
                            onClick={() =>
                              setProductQuantity(productQuantity - 1)
                            }
                          >
                            <S.QuantityImage
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                              alt="remove-icon"
                            />
                          </S.QuantityButton>
                          <Input
                            style={{
                              width: 40,
                              height: "100%",
                              border: "none",
                              textAlign: "center",
                            }}
                            value={productQuantity}
                          />
                          <S.QuantityButton
                            disabled={
                              productQuantity >= productDetail.data?.amount
                            }
                            style={{ borderRight: "none" }}
                            onClick={() =>
                              setProductQuantity(productQuantity + 1)
                            }
                          >
                            <S.QuantityImage
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                              alt="add-icon"
                            />
                          </S.QuantityButton>
                        </S.QuantityWrapper>
                      </Space>

                      <br />
                      <Row
                        gutter={[8, 8]}
                        style={{ marginBottom: 16, marginTop: 8 }}
                      >
                        <Col>
                          <Button
                            style={{ display: "block" }}
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => handleAddToCart()}
                          >
                            Thêm vào giỏ hàng
                          </Button>
                        </Col>
                        <Col>
                          {userInfo.data.id &&
                          userInfo.data?.wishlist?.findIndex(
                            (item) => item.id === productDetail.data.id
                          ) !== -1 ? (
                            <Button
                              style={{ display: "inline" }}
                              loading={userInfo.loading}
                              type="danger"
                              size="large"
                              icon={<HeartOutlined />}
                              onClick={() => handleDeleteWishlist()}
                            >
                              Đã yêu thích
                            </Button>
                          ) : (
                            <Button
                              style={{ display: "inline" }}
                              loading={userInfo.loading}
                              type="danger"
                              size="large"
                              icon={<HeartOutlined />}
                              ghost
                              onClick={() => handleAddWishlist()}
                            >
                              Yêu thích
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={24} sm={24} xl={8}>
                      <Space>
                        <span style={{ fontSize: 16, fontWeight: 500 }}>
                          Chia sẻ:
                        </span>
                        <Button shape="circle" icon={<FacebookOutlined />} />
                        <Button shape="circle" icon={<MailOutlined />} />
                        <Button shape="circle" icon={<TwitterOutlined />} />
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </S.ProductDetailWrapper>

        <S.ProductInfoWrapper>
          <S.LeftSection sm={24} lg={16} style={{ width: "100%" }}>
            <S.SectionLabelWrapper style={{ width: "100%", cursor: "pointer" }}>
              <S.SectionTitle
                tab={true}
                active={isDescribed}
                onClick={() => setIsDescribed(true)}
              >
                Mô tả sản phẩm
              </S.SectionTitle>
              <S.SectionTitle
                tab={true}
                active={!isDescribed}
                onClick={() => setIsDescribed(false)}
                style={{ marginRight: 0 }}
              >
                Đánh giá và bình luận
              </S.SectionTitle>
            </S.SectionLabelWrapper>
            {isDescribed ? (
              <S.DescriptionSection>
                <S.ContentSection ref={contentElement}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: productDetail.data.description,
                    }}
                  />
                  <S.GradientSection />
                </S.ContentSection>

                <Button
                  type="primary"
                  ghost
                  ref={loadMoreElement}
                  onClick={() => {
                    const current = contentElement.current;
                    if (current.clientHeight > 500) {
                      current.style.height = "500px";
                      current.children[1].style.display = "block";
                      loadMoreElement.current.innerText = "Xem thêm nội dung";
                    } else {
                      current.style.height = "fit-content";
                      current.children[1].style.display = "none";
                      loadMoreElement.current.innerText = "Thu gọn";
                    }
                  }}
                >
                  Xem thêm thông tin
                </Button>
              </S.DescriptionSection>
            ) : (
              <S.ProductDetailWrapper style={{ width: "100%" }}>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "0.5rem",
                    width: "100%",
                  }}
                >
                  {userInfo.data.id && (
                    <Comment
                      avatar={
                        <Avatar
                          src="https://taimeme.com/public/upload/memes/avatar-vit-vang-deo-kinh-den-ra-dang-tay-anh-chi.jpg"
                          alt="Avatar"
                        />
                      }
                      content={
                        <Form
                          form={commentForm}
                          layout="vertical"
                          initialValues={{ rate: 0, content: "" }}
                          onFinish={(values) => handleSubmitComment(values)}
                        >
                          <Form.Item
                            label="Đánh giá sản phẩm"
                            name="rate"
                            rules={[
                              {
                                required: true,
                                message: "Bạn chưa gửi đánh giá!",
                              },
                            ]}
                          >
                            <Rate allowHalf />
                          </Form.Item>
                          <Form.Item
                            label="Bình luận"
                            name="content"
                            rules={[
                              {
                                required: true,
                                message: "Bạn chưa gửi bình luận!",
                              },
                            ]}
                          >
                            <Input.TextArea
                              placeholder="Nhận xét của bạn về sản phẩm"
                              autoSize={{ minRows: 3, maxRows: 4 }}
                            />
                          </Form.Item>
                          <Button htmlType="submit" type="primary">
                            Gửi đánh giá
                          </Button>
                        </Form>
                      }
                    />
                  )}
                  <List
                    className="comment-list"
                    header={<h3>{commentList.data.length} Bình luận </h3>}
                    itemLayout="horizontal"
                    dataSource={commentList.data}
                    renderItem={(item) => (
                      <li>
                        <Comment
                          author={item.user?.name}
                          avatar={
                            <Avatar
                              src="https://taimeme.com/public/upload/memes/avatar-vit-vang-deo-kinh-den-ra-dang-tay-anh-chi.jpg"
                              alt="Avatar"
                            />
                          }
                          content={
                            <div>
                              <Rate
                                disabled
                                value={item.rate}
                                allowHalf
                                style={{ fontSize: 14 }}
                              />
                              <p>{item.content}</p>
                            </div>
                          }
                          datetime={
                            <Tooltip
                              title={moment(item.createdAt).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            >
                              <span>{moment(item.createdAt).fromNow()}</span>
                            </Tooltip>
                          }
                        />
                      </li>
                    )}
                  />
                </div>
              </S.ProductDetailWrapper>
            )}
          </S.LeftSection>
          <Col sm={24} md={16} lg={8} style={{ width: "100%" }}>
            <S.SectionLabelWrapper style={{ width: "100%" }}>
              <S.SectionTitle>Thông tin chi tiết</S.SectionTitle>
            </S.SectionLabelWrapper>
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.1)",
                borderBottomRightRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            >
              <Descriptions bordered size="small">
                <Descriptions.Item label="Tên sản phẩm" span={3}>
                  {productDetail.data.name}
                </Descriptions.Item>
                <Descriptions.Item label="Tác giả" span={3}>
                  {productDetail.data.author?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Số trang" span={3}>
                  {productDetail.data.pageNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Trọng lượng" span={3}>
                  {productDetail.data.weight}&nbsp;(g)
                </Descriptions.Item>
                <Descriptions.Item label="Loại bìa" span={3}>
                  {productDetail.data.cover?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Ngôn ngữ" span={3}>
                  {productDetail.data.language}
                </Descriptions.Item>
                <Descriptions.Item label="Nhà xuất bản" span={3}>
                  {productDetail.data.publisher?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Thể loại" span={3}>
                  {productDetail.data.category?.name}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Col>
        </S.ProductInfoWrapper>
        <S.SectionLabelWrapper>
          <S.SectionTitle>Sản phẩm liên quan</S.SectionTitle>
        </S.SectionLabelWrapper>
        <S.ProductDetailWrapper
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
          <Slider {...SETTING_SLICK}>{renderRelatedProductsList}</Slider>
        </S.ProductDetailWrapper>
      </S.ProductDetailContainer>
    </>
  );
};

export default ProductDetailPage;
