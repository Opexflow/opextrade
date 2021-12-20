import React from 'react'
import { useIntl } from '../../hooks-utils/useIntl'
import styled, { css } from 'styled-components'
import HeaderLayout from '../../components/layout/HeaderLayout'
import Image from 'next/image'
import Link from 'next/link'

const Main = styled.main`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Authentication = styled.h1`
  font-weight: bold;
  font-size: 60px;
  color: #0b074b;
  line-height: 90px;
  border-bottom: 5px solid #d11000;
  @media (max-width: 1044px) {
    display: none;
  }
`

const AuthWithLink = styled.a`
  margin-top: 40px;
  padding: 0 10px;
  background: #f3f3f3;
  border-radius: 16px;
  width: 90%;
  height: 70px;
  display: flex;
  align-items: center;
  max-width: 580px;
  font-weight: bold;
  font-size: 28px;
  color: #0b074b;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
`
const BankTitle = styled.h4`
  margin-left: 10px;
`

function Auth() {
  const { f } = useIntl()
  return (
    <>
      <HeaderLayout />
      <Main>
        <Authentication>{f('auth')}</Authentication>
        <Link passHref href="/auth/finam">
          <AuthWithLink>
            <Image width="70" height="70" src="/images/finam.png" alt="Finam" />
            <BankTitle>Finam</BankTitle>
          </AuthWithLink>
        </Link>
        <Link passHref href="/auth/tinkoff">
          <AuthWithLink>
            <Image
              width="70"
              height="70"
              src="/images/tinkoff.png"
              alt="Tinkoff"
            />
            <BankTitle>Tinkoff</BankTitle>
          </AuthWithLink>
        </Link>
        {/* <Link passHref href="/auth/Ib"> */}
        <AuthWithLink disabled>
          <Image width="70" height="70" src="/images/ib.png" alt="Ib" />
          <BankTitle>IB</BankTitle>
        </AuthWithLink>
        {/* </Link> */}
      </Main>
    </>
  )
}

export default Auth
