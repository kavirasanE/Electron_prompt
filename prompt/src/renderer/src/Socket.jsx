// import React, { useEffect } from 'react'

// const Socket = () => {
//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:4000')

//     ws.onopen = () => {
//       console.log('WebSocket connection opened')
//     }

//     ws.onmessage = (event) => {
//       console.log('Message from server:', event.data)
//     }

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error)
//     }

//     ws.onclose = () => {
//       console.log('WebSocket connection closed')
//     }

//     return () => {
//       ws.close()
//     }
//   }, [])

//   return (
//     <div>
//       <h1 className='font-bold text-white'>WebSocket Clientds,mvndljvbdjvbdljn</h1>
//       {/* Your component UI */}
//     </div>
//   )
// }

// export default Socket
