import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import HeaderLayout from '../../components/layout/HeaderLayout'
import { ButtonStyled } from '../../styled/Buttons'
import { AuthenticationTitle, LinkStyled } from '../../styled/Texts'
import { AuthInput, AuthForm } from '../../styled/inputs'
import Checkbox from '../../components/checkbox/Checkbox'
import Tconnector from '../../tconnector-sdk/tconnector'
import useInputOnChange from '../../hooks-utils/useInputOnChange'
import ChangePassFinam from '../../components/changePassword/finamChangePass'
import { useRouter } from 'next/dist/client/router'

const Main = styled.main`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CheckboxesWrapper = styled.div`
  width: 85%;
  max-width: 600px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`

const ChangePassLinkStyled = styled(LinkStyled)`
  margin-left: auto;
  margin-top: 10px;
`
function FinamAuth() {
  const [isHFT, seetIsHFT] = useState(false)
  const [loginValue, loginOnChange] = useInputOnChange()
  const [passValue, passOnChange] = useInputOnChange()
  const [addresValue, addresOnChange] = useInputOnChange('tr1.finam.ru:3900')
  const [changePassPage, setChangePassPage] = useState(false)
  const { push } = useRouter()
  const changePage = () => setChangePassPage((prev) => !prev)
  const handleOnHFTchange = () => {
    seetIsHFT((prev) => !prev)
  }

  const handleOnSubmit = async () => {
    const [host, port] = addresValue.split(':')
    const tconnector = await Tconnector.getTc({
      isHFT,
      host: '176.124.99.109',
      port: '12345',
    })

    const res = await tconnector.api.connect({
      login: loginValue,
      password: passValue,
      host,
      port,
    })
    console.log(res)
    if (!res.error) push('/')
  }
  if (changePassPage) return <ChangePassFinam changePage={changePage} />
  return (
    <>
      <HeaderLayout />
      <Main>
        <AuthenticationTitle>Finam</AuthenticationTitle>
        <AuthForm onSubmit={handleOnSubmit}>
          <AuthInput
            placeholder="Login"
            value={loginValue}
            onChange={loginOnChange}
          />
          <AuthInput
            placeholder="Passowrd"
            value={passValue}
            onChange={passOnChange}
          />
          <AuthInput
            placeholder="Addres and port"
            value={addresValue}
            onChange={addresOnChange}
          />
          <ChangePassLinkStyled onClick={changePage}>
            change pass
          </ChangePassLinkStyled>
          <CheckboxesWrapper>
            <Checkbox handleOnChange={handleOnHFTchange} checkedBox={isHFT}>
              HFT
            </Checkbox>
            <Checkbox handleOnChange={handleOnHFTchange} checkedBox={!isHFT}>
              NoHFT
            </Checkbox>
          </CheckboxesWrapper>
        </AuthForm>
        <ButtonStyled onClick={handleOnSubmit}>Submit</ButtonStyled>
      </Main>
    </>
  )
}

export default FinamAuth
