import React from "react";
import { useHistory } from "react-router-dom";

import { ROUTER } from "../../constants/router";
import logoImage from "../../assets/images/logo.png";

import * as S from "./styles";

const LogoContainer = () => {
  const history = useHistory();
  return (
    <S.LogoContainer onClick={() => history.push(ROUTER.USER.HOME)}>
      <S.ImageLogo src={logoImage} alt="logo" />
      <S.LogoTitle>
        BOOK
        <br />
        WORM
      </S.LogoTitle>
    </S.LogoContainer>
  );
};

export default LogoContainer;
