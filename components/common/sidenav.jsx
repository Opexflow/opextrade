import React, {useState } from 'react'
import styled from 'styled-components'
import Blink from './blink'
import Link from 'next/link'

const Sidebar = styled.div`
margin-left:40px;
margin-top:60px;
`
const Content = styled.h1`
  min-width: 50%;
  margin-top:15px;
  font-weight: bold;
  font-size: 30px;
  line-height: 50px;
  color: #0b074b;
  @media (min-width: 667px) {
    line-height: 50px;
    font-size: 35px;
  }
`
function SideNav(props) {
  const blink=props.blink
  console.log(blink)
  console.log("log")
  return (
    <>
<Sidebar>
<Link href="demo">
<Content>Home</Content>
</Link>
<Link href="logs">
<Content>Logs </Content>
</Link>
{blink &&<Blink></Blink>}
<Link href="settings">
<Content>Settings</Content>
</Link>
<Link href="/">
<Content>Exit</Content>
</Link>
    </Sidebar>
    </>
  )
}

export default SideNav
