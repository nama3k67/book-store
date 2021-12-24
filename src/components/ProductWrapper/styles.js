import styled from "styled-components";

export const AvailableAmount = styled.div`
  font-size: 13px;
  margin: 0;

  @media screen and (min-width: 1200px) {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 14px;
  }
`;

export const ProductTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 44px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: 1200px) {
    font-size: 14px;
  }
`;

export const PriceProduct = styled.strong`
  color: #ea7a7a;
  font-size: 16px;

  @media screen and (max-width: 575px) {
    font-size: 13px;
  }
`;

export const TagWrapper = styled.div`
  @media screen and (max-width: 575px) {
    font-size: 12px;
  }
`;
