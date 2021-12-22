import React from "react";
import { Breadcrumb } from "antd";
import { useHistory } from "react-router-dom";

import * as S from "./styles";

const TopWrapper = ({ titlePage, breadcrumb = [] }) => {
  const history = useHistory();

  const redirectPage = (e, path) => {
    e.preventDefault();
    history.push(path);
  };

  const renderBreadcrumb = () => {
    return breadcrumb.map((breadcrumbItem, breadcrumbIndex) => {
      return (
        <Breadcrumb.Item
          key={`breadcrumb-${breadcrumbIndex}`}
          {...(breadcrumbIndex !== breadcrumb.length - 1 && {
            href: "#",
          })}
          onClick={(e) => redirectPage(e, breadcrumbItem.path)}
        >
          {breadcrumbItem.icon && breadcrumbItem.icon}
          <span>{breadcrumbItem.title}</span>
        </Breadcrumb.Item>
      );
    });
  };

  return (
    <S.TopContainer>
      <Breadcrumb>{renderBreadcrumb()}</Breadcrumb>
      <S.TopTitle>{titlePage}</S.TopTitle>
    </S.TopContainer>
  );
};

export default TopWrapper;
