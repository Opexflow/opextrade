import React from 'react'
import styled from 'styled-components'

const CheckboxStyled = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  input {
    display: none;
    &:checked + div {
      background-color: #f4847c;

      &:after {
        top: 0;
      }
    }
  }
  div {
    width: 30px;
    height: 30px;
    @media (min-width: 1044px) {
      width: 45px;
      height: 45px;
      &:after {
        border-left: 7.5px solid;
        border-bottom: 7.5px solid;
      }
    }
    transition: all 1.1s cubic-bezier(0.19, 1, 0.22, 1);
    border-radius: 10px;
    background-color: white;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background-color: #f3f3f3;
    &:after {
      width: 50%;
      height: 20%;
      content: '';
      position: absolute;
      @media (min-width: 1044px) {
        border-left: 7.5px solid;
        border-bottom: 7.5px solid;
        border-color: #d11000;
      }
      border-left: 5.5px solid;
      border-bottom: 5.5px solid;
      border-color: #d11000;
      transform: rotate(-45deg) translate3d(0, 0, 0);
      transform-origin: center center;
      transition: all 1.1s cubic-bezier(0.19, 1, 0.22, 1);
      left: 0;
      right: 0;
      top: 200%;
      bottom: 5%;
      margin: auto;
    }
  }
  p {
    font-size: 20px;
    margin-left: 10px;
    font-weight: bold;
  }
`
function Checkbox({ children, handleOnChange, checkedBox }) {
  return (
    <CheckboxStyled>
      <input
        type="checkbox"
        onChange={() => handleOnChange(children)}
        checked={checkedBox}
      />
      <div />
      <p>{children}</p>
    </CheckboxStyled>
  )
}

export default Checkbox
