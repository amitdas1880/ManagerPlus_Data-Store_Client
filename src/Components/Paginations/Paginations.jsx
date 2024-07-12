import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
const Paginations = ({page,pageCount,setPage,handlePreviousPage,handleNextPage}) => {
  return (
    <>{pageCount > 0 ?
    <div className='pagination_div d-flex justify-content-end mx-5'>
        <Pagination>
            <Pagination.First onClick={()=>handlePreviousPage()}/>
            {Array(pageCount).fill(null).map((items,index)=>{
              return(<>
                  <Pagination.Item active={page==index+1 ? true : false} onClick={()=>setPage(index+1)}>{index+1}</Pagination.Item>
              </>)
            })}
            <Pagination.Last onClick={()=>handleNextPage()}/>
        </Pagination>
    </div>
    :""}
    </>
  )
}

export default Paginations