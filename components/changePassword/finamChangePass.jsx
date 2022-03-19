import styled from 'styled-components'
import HeaderLayout from '../layout/HeaderLayout'
import { ButtonStyled,InputError,AuthMessage,LoadingStyled } from '../../styled/Buttons'
import { AuthenticationTitle, LinkStyled } from '../../styled/Texts'
import { AuthInput, AuthForm } from '../../styled/inputs'
import useInputOnChange from '../../hooks-utils/useInputOnChange'
import Tconnector from '../../tconnector-sdk/tconnector'
import { useRouter } from 'next/dist/client/router'
import{useState,useEffect} from 'react'
import Link from 'next/link'
import {socketio} from '../../pages/socketio';
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
function ChangePassFinam() {

  const [isSubmit,setIsSubmit]=useState(false)
  const [isNotCorrect,setIsNotCorrect]=useState('')
  const [isLoading,setIsLoading]=useState(false)
  const [oldpass, oldpassOnChange] = useInputOnChange()
  const [newpass, newpassOnChange] = useInputOnChange()
  const { push } = useRouter()
  
  useEffect(() => {
    socketio().on("password-change-error", async (res) => {
      setIsNotCorrect(res)
      console.log(`inside ${res}`)
    })

   return ()=>{
     console.log("unmount")
    socketio().off("password-change-error")
  }
   }, [socketio(),isNotCorrect]);

  const handleOnSubmit =async() => {
    setIsLoading(true)
    setIsSubmit(true)
    setIsNotCorrect('')
  if(oldpass&&newpass)
  {
    const tconnector = Tconnector.getTc({
      isHFT: false,
      host: '127.0.0.1',
      port: '12345',
    })
    // console.log({ oldpass, newpass })
    const res = await tconnector.api.change_pass({ oldpass, newpass })
    console.log({ res })
  
  }
  setIsLoading(false)
  console.log(`our state ${isNotCorrect}`)
  console.log('pro')
}
  return (
    <>
      <HeaderLayout />
      <Main>
        <AuthenticationTitle>Change Passowrd</AuthenticationTitle>
        <AuthForm onSubmit={handleOnSubmit}>
        {(!oldpass || !newpass) && isSubmit && <InputError>Please fill all required fields</InputError>}
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
          {isNotCorrect&&<AuthMessage>{isNotCorrect}</AuthMessage>}
          <Link href='/finam'>
          <ChangePassLinkStyled>
            Sign in
          </ChangePassLinkStyled>
          </Link>
        </AuthForm>
        {!isLoading &&<ButtonStyled onClick={handleOnSubmit}>Submit</ButtonStyled>}
        {isLoading && <LoadingStyled>Loding....</LoadingStyled>}
      </Main>
    </>
  )
}

export default ChangePassFinam
