import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
const HeaderStyled = styled.header`
  padding-top: 15px;
`
const ImageWrppaer = styled.div`
  position: relative;
  width: 130px;
  height: 38px;
  margin-left: 20px;
  @media (min-width: 667px) {
    width: 240px;
    height: 50px;
  }
`

function HeaderLayout() {
  return (
    <HeaderStyled>
      <ImageWrppaer>
        <Link href="/">
          <a>
            <Image
              width="1000"
              height="200"
              src="/images/logo.svg"
              alt="opexflow"
            />
          </a>
        </Link>
      </ImageWrppaer>
    </HeaderStyled>
  )
}

export default HeaderLayout
