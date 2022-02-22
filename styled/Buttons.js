import styled from 'styled-components'

export const ButtonStyled = styled.button`
  background-color: #c63f35;
  color: white;
  font-size: 25px;
  padding: 15px 50px;
  border-radius: 18px;
  @media (min-width: 1044px) {
    font-size: 35px;
    border-radius: 23px;
  }
`
export const LoadingStyled = styled.div`
  color: brown;
  font-size: 25px;
`
export const SocketInfo = styled.div`
  color: brown;
  font-size: 25px;
`
export const WrongLogin = styled.div`
  color: brown;
  padding-top:10px;
  padding-bottom:7px;
  font-size: 25px;
`
export const InputError = styled.div`
  color: red;
  font-size: 14px;
  position: absolute;
  padding-top: 4px
`
