import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Spiner from '../../Components/Spiner/Spiner';
import {BASE_URL} from '../../Services/Helper';
import {getSingleUserFunction} from '../../Services/Api_Service';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './Profile.css'


const Profile = () => {
    const [showSpinner , setShowSpinner] = useState(true)



    const [userprofile , setUserProfile] = useState({});
    const {id} = useParams();
    console.log(id)

    const getProfileData = async(id) =>{
        const response = await getSingleUserFunction(id);
       
        if(response.status === 200){
            setUserProfile(response.data)
        }
    }

    useEffect(()=>{
        getProfileData(id);
        setTimeout(() => {
            setShowSpinner(false);
        }, 1200);
    },[])
  return (
    <> {showSpinner ? <Spiner/> :
        <div className='container'>
            <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
                <Card.Body>
                      <Row>
                          <div className='col'>
                              <div className='card-profile-stats d-flex justify-content-center'>
                                  <img src={`${BASE_URL}/uploads/${userprofile.image}`} alt=''/>
                              </div>
                          </div>
                      </Row>
                      <div className='text-start'>
                          <h4>Name &nbsp;:- <span>{userprofile.fname + " "+ userprofile.lname}</span></h4>
                          <h5>Email Id &nbsp;:- <span>{userprofile.email}</span></h5>
                          <h5>Mobile &nbsp;:- <span>{userprofile.mobile}</span></h5>
                          <h5>Gender &nbsp;:- <span>{userprofile.gender}</span></h5>
                          <h5>Location &nbsp;:- <span>{userprofile.location}</span></h5>
                          <h5>Status &nbsp;:- <span>{userprofile.status}</span></h5>
                          <h5>Date Created &nbsp;:- <span>{moment(userprofile.dateCreated).format("DD-MM-YYYY : hh:mm:ss")}</span></h5>
                          <h5>Date Updated &nbsp;:- <span>{moment(userprofile.dateUpdated).format("DD-MM-YYYY : hh:mm:ss")}</span></h5>
                      </div>
                </Card.Body>
            </Card>
        </div>
    }
    </>
  )
}

export default Profile