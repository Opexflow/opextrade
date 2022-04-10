import styled from "styled-components";
import HeaderLayout from "../components/layout/HeaderLayout";
import { ButtonStyled } from "../styled/Buttons";
import { AuthenticationTitle, LinkStyled } from "../styled/Texts";
import { AuthInput, AuthForm } from "../styled/inputs";
import { useState } from "react";
import Link from "next/link";
import Checkbox from "../components/checkbox/Checkbox";

const Main = styled.main`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ChangePassLinkStyled = styled(LinkStyled)`
  margin-left: auto;
  margin-top: 10px;
`;

const CheckboxesWrapper = styled.div`
  width: 85%;
  max-width: 600px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

function TinkoffAuth() {
  const [isSecretToken, setIsSecretToken] = useState(false);

  const handleOnSecretTokenChange = () => {
    setIsSecretToken((prev) => !prev);
  };

  return (
    <>
      <HeaderLayout />
      <Main>
        <AuthenticationTitle>Tinkoff</AuthenticationTitle>
        <AuthForm>
          <AuthInput placeholder="Login"></AuthInput>
          <AuthInput placeholder="Password"></AuthInput>
          <AuthInput placeholder="Adress and Port"></AuthInput>
          <Link href="changepassword">
            <ChangePassLinkStyled>change pass</ChangePassLinkStyled>
          </Link>
          <CheckboxesWrapper>
            <Checkbox
              handleOnChange={handleOnSecretTokenChange}
              checkedBox={isSecretToken}
            >
              Secret Token
            </Checkbox>
            <Checkbox
              handleOnChange={handleOnSecretTokenChange}
              checkedBox={!isSecretToken}
            >
              Sandbox Token
            </Checkbox>
          </CheckboxesWrapper>
        </AuthForm>
        <ButtonStyled>Submit</ButtonStyled>
      </Main>
    </>
  );
}

// const brokers = ["Finam", "Tinkoff"];
// const apiURL = "https://api-invest.tinkoff.ru/openapi/sandbox"; // Для Production-окружения будет https://api-invest.tinkoff.ru/openapi
// const socketURL = "wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws";
// const secretToken = process.env.secretToken; // токен для сандбокса

// export const getServerSideProps = ({ query }) => {
//   const api = new OpenAPI({ apiURL, secretToken, socketURL });
//   !(async function run() {
//     console.log(api, secretToken);
//     const { figi } = await api.searchOne({ ticker: "AAPL" });
//     console.log({ figi });
//     const { commission, orderId } = await api.limitOrder({
//       operation: 'Buy',
//       figi,
//       lots: 1,
//       price: 100,
//     }) // Покупаем AAPL
//     console.log(commission) // Комиссия за сделку
//     await api.cancelOrder({ orderId }) // Отменяем заявку
//   })();
//   let returnedObj = {
//     props: {},
//   };
//   if (!brokers.includes(query.with)) {
//     returnedObj.redirect = {
//       permanent: false,
//       destination: "/",
//     };
//   }
//   return returnedObj;
// };
export default TinkoffAuth;
