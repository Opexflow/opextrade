import styled from 'styled-components'
import HeaderLayout from '../layout/HeaderLayout'
import { ButtonStyled } from '../../styled/Buttons'
import { AuthenticationTitle, LinkStyled } from '../../styled/Texts'
import { AuthInput, AuthForm } from '../../styled/inputs'
import useInputOnChange from '../../hooks-utils/useInputOnChange'
import Tconnector from '../../tconnector-sdk/tconnector'
import { useRouter } from 'next/dist/client/router'
const Main = styled.main`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ChangePassLinkStyled = styled(LinkStyled)`
  margin-left: auto;
  margin-top: 10px;
`
function ChangePassFinam({ changePage }) {
  const [oldpass, oldpassOnChange] = useInputOnChange()
  const [newpass, newpassOnChange] = useInputOnChange()
  const { push } = useRouter()
  const handleOnSubmit = async () => {
    const tconnector = Tconnector.getTc({
      isHFT: false,
      host: '176.124.99.109',
      port: '12345',
    })
    // console.log({ oldpass, newpass })
    const res = await tconnector.api.change_pass({ oldpass, newpass })
    console.log({ res })
    if (!res.error) push('/')
  }
  return (
    <>
      <HeaderLayout />
      <Main>
        <AuthenticationTitle>Change Passowrd</AuthenticationTitle>
        <AuthForm onSubmit={handleOnSubmit}>
          <AuthInput
            value={oldpass}
            onChange={oldpassOnChange}
            placeholder="old password"
          />
          <AuthInput
            value={newpass}
            onChange={newpassOnChange}
            placeholder="new password"
          />
          <ChangePassLinkStyled onClick={changePage}>
            Sign in
          </ChangePassLinkStyled>
        </AuthForm>
        <ButtonStyled onClick={handleOnSubmit}>Submit</ButtonStyled>
      </Main>
    </>
  )
}

export default ChangePassFinam
