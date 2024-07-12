import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaPlus } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaSort } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Tables from '../../Components/Tables/Tables';
import Spiner from '../../Components/Spiner/Spiner';
import {GetUserData, deleteUserFunction,UpdateStatusFunction,exportToCsvFunction} from '../../Services/Api_Service';
import toast  from "react-hot-toast";
import './Home.css'

const Home = () => {
  const [showSpinner , setShowSpinner] = useState(true);
  const [UserData , setUserData] = useState([]);
  const navigate = useNavigate();

  const adduser = () => {
    navigate('/register');
  }

  
  


  //search, filter and sort users
  const [search, setSearch] = useState("");
  const [searchBtn, setSearchBtn] = useState("");
  const [genderFilter, setGenderFilter] = useState("All")
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");

  // Get user data
  const userget = async() => {
      const response = await GetUserData(searchBtn,genderFilter,status,sort,page);
      //console.log(response);
      if(response.status === 200) {
        setUserData(response.data.All_userData);
        setPageCount(response.data.Pagination.pageCount);
        //console.log(UserData);
      }
  }
  // Delete user data
  const deleteUser = async(id) => {
    const response = await deleteUserFunction(id);
    if(response.status === 200){
      toast.success("User Deleted Successfully");
      userget();
    }
  }

// Update Status
  const updateStatusInfo=async(id,status)=>{
    const response = await UpdateStatusFunction(id,status);
    if(response.status==200){
      toast.success("Status Updated Successfully");
      userget();
    }
  }


  //Export CSV
  const exportuser = async() => {
    const response = await exportToCsvFunction();
    if(response.status === 200) {
        window.open(response.data.downloadUrl,"blank")
        console.log(response);
    }
  }

  //Pagination
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const handlePreviousPage =() => {
    setPage(()=>{
      if(page === 1){
        return page;
      }else{
        return page - 1;
      }
    })
  }


  const handleNextPage =() => {
    setPage(()=>{
      if(page === pageCount){
        return page;
      } else{
        return page + 1;
      }
    })
  }

  useEffect(()=>{
    setTimeout(() => {
      setShowSpinner(false);
    }, 1200);
    userget();
  },[searchBtn,genderFilter,status,sort,page]);



  return (
    <>
      <div className='container'>
          <div className='main_div'>
              {/* Search Add Button */}
              <div className='search_add mt-4 d-flex justify-content-between'>
                  <div className='search col-lg-4'>
                  <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    <Button variant="success" onClick={()=>setSearchBtn(search)} >Search</Button>
                  </Form>
                  </div>
                  <div className='add_btn'>
                     <Button variant="primary" onClick={adduser}><FaPlus className='plus'/>&nbsp;Add User</Button>
                  </div>                 
              </div>


              {/* Export , Gender,Status */}
              <div className='filter_div mt-5 d-flex justify-content-between flex-wrap'>
                  <div className='export_csv'>
                      <Button className='export_btn' onClick={exportuser}>Export to csv</Button>
                  </div>
                  <div className='filter_gender'>
                      <div className='filter'>
                        <h3>Filter By Gender</h3>
                        <div className='gender d-flex justify-content-around'>
                        <Form.Check 
                        type={"radio"}
                        label={'All'}
                        name={'gender'}
                        value={'All'}
                        defaultChecked
                        onChange={(e) => setGenderFilter(e.target.value)}
                        />
                        <Form.Check 
                        type={"radio"}
                        label={'Male'}
                        name={'gender'}
                        value={'Male'}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        />
                        <Form.Check 
                        type={"radio"}
                        label={'Female'}
                        name={'gender'}
                        value={'Female'}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        />
                        </div>
                      </div>
                  </div>

                  {/* Short by Value */}
                  <div className='filter_newold'>
                    <h3>Sort By Value</h3>
                      <Dropdown className='text-center'>
                        <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                           <FaSort/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item  onClick={()=>setSort("new")}>New</Dropdown.Item>
                          <Dropdown.Item  onClick={()=>setSort("old")}>Old</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                  </div>


                  {/* Filter By Status */}
                  <div className='filter_status'>
                      <div className='status'>
                          <h3>Filter by Status</h3>
                          <div className='status_radio d-flex justify-content-around flex-wrap'>
                          <Form.Check 
                            type={"radio"}
                            label={'All'}
                            name={'status'}
                            value={'All'}
                            defaultChecked
                            onChange={(e) => setStatus(e.target.value)}
                          />
                          <Form.Check 
                            type={"radio"}
                            label={'Active'}
                            name={'status'}
                            value={'Active'}
                            onChange={(e) => setStatus(e.target.value)}
                           />
                          <Form.Check 
                            type={"radio"}
                            label={'InActive'}
                            name={'status'}
                            value={'InActive'}
                            onChange={(e) => setStatus(e.target.value)}
                          />
                          </div>
                      </div>

                  </div>
              </div>
          </div>
          {
            showSpinner? <Spiner/> : <Tables 
                                      UserData={UserData}  
                                      deleteUser={deleteUser} 
                                      updateStatusInfo={updateStatusInfo}
                                      page={page} 
                                      pageCount={pageCount} 
                                      setPage={setPage}
                                      handlePreviousPage={handlePreviousPage} 
                                      handleNextPage={handleNextPage}
                                      />
          }
      </div>
    </>
  )
}

export default Home