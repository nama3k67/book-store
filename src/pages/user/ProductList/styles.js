import styled, { css } from "styled-components";

export const ProductListContainer = styled.div`
  margin: 16px auto;
  max-width: 1280px;
  width: 90%;
  background-color: white;
  @media screen and (max-width: 991px) {
    width: 95%;
  }
`;

export const FilterContainer = styled.div`
  margin-bottom: 16px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #d9d9d9;
  overflow: hidden;
`;

export const FilterTitleWrapper = styled.div`
  margin: 0 auto 4px;
  max-width: 1280px;
  border-bottom: 3px solid #99a799;
`;

export const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  height: 36px;
  width: fit-content;
  color: rgba(67, 113, 93, 1);
  font-size: 20px;
  font-weight: 600;
  /* background-color: #99a799; */
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5px;
  height: 28px;
  /* border-top: 1px solid #f0f0f0; */
  cursor: pointer;
`;

export const ProductTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 50.275px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FilterTypeTitle = styled.div`
  padding-left: 4px;
  font-size: 17px;
  font-weight: 500;
`;
