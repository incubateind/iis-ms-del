import React from 'react'
import './Loading.css'
export default function Loading() {
  return (
    
      <div style={{alignSelf: 'center'}}>
        <video src={require('../../constants/police-light.mp4')} type="application/mp4" autoPlay loop/>
      </div>
    
  )
}



// <div className="lds-ring"><div></div><div></div><div></div><div></div></div>