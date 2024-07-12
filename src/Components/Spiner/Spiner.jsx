import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
const Spiner = () => {
  return (
    <>
    <div className='d-flex align-items-center justify-content-center' style={{width:"100%",height:"50vh", columnGap:"5px"}}>
      <Spinner animation="border" variant="info" /> &nbsp;
      <span>Loading</span>
      <div style={{columnGap:"15px"}}>
      <Spinner animation="grow" variant="success" style={{width:"4px",height:"4px"}} />
      <Spinner animation="grow" variant="success" style={{width:"4px",height:"4px"}} />
      <Spinner animation="grow" variant="success" style={{width:"4px",height:"4px"}} />
      </div>
    </div>
    </>
  )
}

export default Spiner