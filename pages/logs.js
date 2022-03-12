import React, {useState } from 'react'
import styled from 'styled-components'
import HeaderLayout from '../components/layout/HeaderLayout'
import SideNav from '../components/common/SideNav'
import { Logs} from '../styled/Texts'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from "react";
import {socketio} from './socketio';
const Container=styled.div`
display:flex;
justify-content: start;
align-items:baseline;
`
const Main = styled.div`
@media (min-width: 667px) {
  margin-bottom:45px;
  margin-left:170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius:4px;
  max-height:400px;
}
margin-left:100px;

 
`
const List = styled.div`
  width: 85%;
  max-width: 600px;
  padding:4px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
const Timestamp = styled.div`
  margin: auto;
  margin-top: 10px;
  font-size: 22px;
`
const Source = styled.div`
  margin: auto;
  margin-top: 10px;
  font-size: 25px;
`
const Title = styled.div`
  margin: auto;
  margin-top: 10px;
  font-size: 18px;
`

function FinamLog() {
  const [logs, setLogs] = useState([])
  const [isIncoming, setIsincoming] = useState(false)
  const { push } = useRouter()

  useEffect(() => {
    socketio().on("show-logs", async (res) => {
      console.log(res)
    setLogs((prev)=>{return [...prev,res]})
    setIsincoming(true)
    setTimeout(()=>{
      console.log("to false")
      setIsincoming(false)
      
    },3000)
    })
    console.log("reach")
    
    return ()=>{
    
     socketio().off("show-logs")
   }
  }
  , [socketio()]);
  return (
    <>
     <HeaderLayout />
     <Container>
     <SideNav blink={isIncoming}></SideNav>
      <Main>
        <Logs>Logs</Logs>
        {logs.map(log=><List key={log.news_header.id}><Timestamp>{log.news_header.timestamp}</Timestamp><Source>{log.news_header.source}</Source><Title>{log.news_header.title}</Title></List>)}
      </Main>
      </Container>
    </>
  )
}

export default FinamLog
