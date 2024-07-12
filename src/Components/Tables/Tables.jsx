import React from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaAngleDown } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {BASE_URL} from '../../Services/Helper';
import { NavLink } from 'react-router-dom';
import Paginations from '../Paginations/Paginations';
import './Tables.css';


const Tables = ({UserData, deleteUser,updateStatusInfo,page,pageCount,setPage,handlePreviousPage,handleNextPage}) => {
  // console.log(UserData);

//  const updateStatusInfo=async(id,status)=>{
//       const response = await UpdateStatusFunction(id,status);
//       if(response.status==200){
//         toast.success("Status Updated Successfully");
//       }
//  }

  return (
  
  <>
    <div className='container'>
      <Row>
        <div className='col mt-2'>
            <Card className='shadow'>
                <Table className='align-align-items-center' responsive="sm">
                  <thead className='thead-dark'>
                      <tr className='table-dark'>
                          <th>ID</th>
                          <th>FullName</th>
                          <th>Email</th>
                          <th>Gender</th>
                          <th>Status</th>
                          <th>Profile</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                  {UserData.length > 0 && UserData.map((ele,idx)=>{
                    return(
                      <>                   
                        <tr>
                          <td>{idx+1+(page-1)*4}</td>         
                          <td>{ele.fname+" "+ele.lname}</td>
                          <td>{ele.email}</td>
                          <td>{ele.gender}</td>
                          <td className='d-flex align-items-center'>
                            <Dropdown className='text-center'>
                              <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                <Badge bg={ele.status=="Active"?"primary":"danger"}>
                                    {ele.status} <FaAngleDown/>
                                </Badge>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>updateStatusInfo(ele._id,"Active")}>Active</Dropdown.Item>
                                <Dropdown.Item onClick={()=>updateStatusInfo(ele._id,"InActive")}>InActive</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td className='img_parent'>
                            <img src={`${BASE_URL}/uploads/${ele.image}`} alt=''/>
                          </td>
                          <td>
                            <Dropdown >
                                <Dropdown.Toggle variant="light" className="action" id="dropdown-basic">
                                  <PiDotsThreeOutlineVerticalLight/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink to={`/userprofile/${ele._id}`} className='text-decoration-none'>
                                      <FaEye style={{color:"green", marginRight:"5px"}}/>
                                      <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink to={`/edit/${ele._id}`} className='text-decoration-none'>
                                      <FaRegEdit style={{color:"blue", fontSize:"15px", marginRight:"5px"}}/>
                                      <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  
                                  <Dropdown.Item>
                                      <div onClick={()=>deleteUser(ele._id)}>
                                        <MdDelete style={{color:"red",fontSize:"18px", marginRight:"5px"}}/>
                                        <span>Delete</span>
                                      </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>  
                          </td>
                        </tr>
                    </>
                    )
                  })
                  }
                  </tbody>
                </Table>
                    <Paginations
                        page={page} 
                        pageCount={pageCount} 
                        setPage={setPage}
                        handlePreviousPage={handlePreviousPage} 
                        handleNextPage={handleNextPage}
                    />
            </Card>
        </div>
      </Row>
    </div>
  </>
  )
}

export default Tables