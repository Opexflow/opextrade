import styled from 'styled-components'

export const AuthInput = styled.input`
  width: 100%;
  margin-top: 20px;
  padding: 15px;
  font-size: 25px;
  height: 45px;
  background: #f3f3f3;
  border-radius: 16px;
  @media (max-width: 667px) {
    height: 45px;
    font-size: 20px;
  }
`
export const AuthForm = styled.form`
  width: 85%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`
