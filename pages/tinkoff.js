import styled from 'styled-components'
import HeaderLayout from '../../components/layout/HeaderLayout'
import { ButtonStyled } from '../../styled/Buttons'
import { AuthenticationTitle } from '../../styled/Texts'
import { AuthInput, AuthForm } from '../../styled/inputs'

const Main = styled.main`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

function TinkoffAuth() {
  return (
    <>
      <HeaderLayout />
      <Main>
        <AuthenticationTitle>Tinkoff</AuthenticationTitle>
        <AuthForm>
          <AuthInput placeholder="secret token" />
        </AuthForm>
        <ButtonStyled>Submit</ButtonStyled>
      </Main>
    </>
  )
}

// const brokers = ['Finam', 'Tinkoff']
// const apiURL = 'https://api-invest.tinkoff.ru/openapi/sandbox' // Для Production-окружения будет https://api-invest.tinkoff.ru/openapi
// const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws'
// const secretToken = process.env.secretToken // токен для сандбокса

// export const getServerSideProps = ({ query }) => {
//   const api = new OpenAPI({ apiURL, secretToken, socketURL })
//   !(async function run() {
//     console.log(api, secretToken)
//     const { figi } = await api.searchOne({ ticker: 'AAPL' })
//     console.log({ figi })
//     // const { commission, orderId } = await api.limitOrder({
//     //   operation: 'Buy',
//     //   figi,
//     //   lots: 1,
//     //   price: 100,
//     // }) // Покупаем AAPL
//     // console.log(commission) // Комиссия за сделку
//     // await api.cancelOrder({ orderId }) // Отменяем заявку
//   })()
//   let returnedObj = {
//     props: {},
//   }
//   if (!brokers.includes(query.with)) {
//     returnedObj.redirect = {
//       permanent: false,
//       destination: '/',
//     }
//   }
//   return returnedObj
// }
export default TinkoffAuth
