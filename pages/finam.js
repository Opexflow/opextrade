import React, {useState } from 'react'
import styled from 'styled-components'
import HeaderLayout from '../components/layout/HeaderLayout'
import { ButtonStyled,LoadingStyled,SocketInfo,InputError,WrongLogin } from '../styled/Buttons'
import { AuthenticationTitle, LinkStyled } from '../styled/Texts'
import { AuthInput, AuthForm } from '../styled/inputs'
import Checkbox from '../components/checkbox/Checkbox'
import Tconnector from '../tconnector-sdk/tconnector'
import useInputOnChange from '../hooks-utils/useInputOnChange'
import ChangePassFinam from '../components/changePassword/finamChangePass'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from "react";
import {socketio,initiateSocketConnection,disconnectSocket,getUpdate,getUpdate2,sendData,passwordChangeError} from '../pages/socketio';
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
  const [isLoading,setIsLoading]=useState(false)
  const [islogincorrect,setIslogincorrect]=useState('')
  const [isSubmit,setIsSubmit]=useState(false)
  const [loginValue, loginOnChange] = useInputOnChange()
  const [passValue, passOnChange] = useInputOnChange()
  const [addresValue, addresOnChange] = useInputOnChange('tr1.finam.ru:3900')
  const [changePassPage, setChangePassPage] = useState(false)
  const { push } = useRouter()

  
  const changePage = () => setChangePassPage((prev) => !prev)
  const handleOnHFTchange = () => {
    seetIsHFT((prev) => !prev)
  }
  useEffect(() => {
    socketio().on("login-error", async (res) => {
      setIslogincorrect(res)
    })
    return ()=>{
     socketio().off("login-error")
   }
  }
  , [socketio(),islogincorrect]);
//subscribe to event


  const handleOnSubmit = async () => {
  getUpdate2()
  setIsSubmit(true)
  if(loginValue&&passValue)
  {
   setIsLoading(true)
    const [host, port] = addresValue.split(':')
    const tconnector = Tconnector.getTc({
      isHFT,
      host: 'localhost',
      port: '12345',
    })

    const res = await tconnector.api.connect({
      login: loginValue,
      password: passValue,
      host,
      port,
    })
    // socket.on('another',message=>{
    //   console.log(message)
    // })
    setIsLoading(false)
    // if (!res.error) push('/')
  }
  return;
}
  if (changePassPage) return <ChangePassFinam  changePage={changePage} />
  return (
    <>
      <HeaderLayout />
      <Main>
        <AuthenticationTitle>Finam</AuthenticationTitle>
        {/* <SocketInfo>{before}</SocketInfo> */}
        <AuthForm onSubmit={handleOnSubmit}>
        {(!loginValue || !passValue) && isSubmit && <InputError>Please fill all required fields</InputError>}
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
          {<WrongLogin></WrongLogin>}
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
        {islogincorrect&&<WrongLogin>{islogincorrect}</WrongLogin>}
        {!isLoading &&<ButtonStyled onClick={handleOnSubmit}>Submit</ButtonStyled>}
        {isLoading && <LoadingStyled>Loding....</LoadingStyled>}
      </Main>
    </>
  )
}

export default FinamAuth
