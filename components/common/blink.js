import styled from 'styled-components'

const SVG=styled.svg`
position: absolute;
top: 160px;
left: 95px;
@media (min-width: 667px) {
top: 175px;
left: 105px;
  }
`
function Blink() {
  return (
    <>
  <SVG>
  <svg>
  <circle fill="#0000ffe6" stroke="none" cx="60" cy="60" r="12">
    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="4" begin="0.1" />
  </circle>
  </svg>
</SVG>
    </>
  )
}

export default Blink
