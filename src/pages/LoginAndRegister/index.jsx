import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col } from "antd";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import { ROUTER } from "../../constants/router";

import * as S from "./styles";

const LoginAndRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  if (isLogin) {
    document.title = "Đăng nhập";
  } else {
    document.title = "Đăng ký";
  }
  const history = useHistory();

  return (
    <S.LoginContainer>
      <S.LoginBackground xs={0} sm={0} lg={12} xl={14} />
      <Col
        xs={24}
        sm={24}
        lg={12}
        xl={10}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <S.LoginForm>
          <S.FormHeader>
            <S.HomeIcon onClick={() => history.push(ROUTER.USER.HOME)} />
            <S.TitleWrapper>
              <S.LoginTitle active={isLogin} onClick={() => setIsLogin(true)}>
                Đăng nhập
              </S.LoginTitle>
              <S.LoginTitle active={!isLogin} onClick={() => setIsLogin(false)}>
                Đăng ký
              </S.LoginTitle>
            </S.TitleWrapper>
          </S.FormHeader>

          {isLogin ? (
            <LoginForm setIsLogin={setIsLogin} />
          ) : (
            <RegisterForm setIsLogin={setIsLogin} />
          )}
        </S.LoginForm>
      </Col>
    </S.LoginContainer>
  );
};

export default LoginAndRegisterPage;
