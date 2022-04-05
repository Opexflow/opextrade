import { IBApi, EventName } from '@stoqey/ib'
import { useEffect } from 'react'

function Ib() {
  return <div>hii</div>
}
export const getServerSideProps = () => {
  const ib = new IBApi({
    clientId: 0,
    host: '127.0.0.1',
    port: 7497,
  })

  // register event handler

  let positionsCount = 0

  ib.on(EventName.error, (err, code, reqId) => {
    console.error(`${err.message} - code: ${code} - reqId: ${reqId}`)
  })
    .on(EventName.position, (account, contract, pos, avgCost) => {
      console.log(`${account}: ${pos} x ${contract.symbol} @ ${avgCost}`)
      positionsCount++
    })
    .once(EventName.positionEnd, () => {
      console.log(`Total: ${positionsCount} positions.`)
      ib.disconnect()
    })

  // call API functions

  ib.connect()
  ib.reqPositions()

  return {
    props: {},
  }
}
export default Ib
