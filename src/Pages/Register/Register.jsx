import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import profile_image from '../../Assets/image/profile_icons.gif'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import toast  from "react-hot-toast";
import Spiner from '../../Components/Spiner/Spiner';
import { useNavigate } from 'react-router-dom';
import './Register.css'

import {RegisterFunction} from '../../Services/Api_Service';


const Register = () => {
  const [showSpinner , setShowSpinner] = useState(true)

  const [inputData, setInputData] = useState({
    fname:'',
    lname:'',
    email:'',
    mobile:'',
    gender:'',
    location:'',
  })

  const [status ,setStatus]=useState("Active");
  const [image,setImage] = useState("");
  const [preview,setPreview] = useState("");

  const navigate = useNavigate();

  //Status Options
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  
  
  // Set Input Value
  const setInputValue = (e) =>{
    const {name,value}=e.target;
    setInputData({...inputData,[name]:value})
  }
  //console.log(inputData);

  
  
  //Set Status Value (if we use react-select then there is no need to write e.target.value)
  const setStatusValue = (e) =>{
    setStatus(e.value);
  }
  // console.log(status);


  //Set Profile image
  const setProfile = (e) =>{
    setImage(e.target.files[0]);
  }

  // Submit User Data
  const submitUserData = async(e) =>{
      e.preventDefault();
      const{fname, lname, email, mobile, gender, location}=inputData;

      if(fname===""){
        toast.error("Please Enter First Name !");
      }else if(lname===""){
        toast.error("Please Enter Last Name !");
      }else if(email===""){
        toast.error("Please Enter Email Id !");
      }else if(!email.includes("@")){
        toast.error(" Invalid Email Id!");
      }else if(mobile===""){
        toast.error("Please Enter Mobile Number !");
      }else if(mobile.length>10){
        toast.error("Mobile Number not more then 10 digit!");
      }else if(mobile.length<10){
        toast.error("Mobile number not less then 10 digit!");
      }else if(location===""){
        toast.error("Please Enter Location !");
      }else if(gender===""){
        toast.error("Please Select Gender !");
      }else if(status===""){
        toast.error("Please Select Status !");
      }else{

        // Api Call and sent data to the server
        const formData = new FormData();

        formData.append("fname",fname);
        formData.append("lname",lname);
        formData.append("email",email);
        formData.append("mobile",mobile);
        formData.append("gender",gender);
        formData.append("location",location);
        formData.append("status",status);
        formData.append("user_profile_image",image);

        const header = {
          "Content-Type": "multipart/form-data"
        }

       const response = await RegisterFunction(formData,header)
       //console.log(response);     

       if(response.status === 200){
         setInputData({
          ...inputData,
           fname:'',
           lname:'',
           email:'',
           mobile:'',
           gender:'',
           location:'',
         })
         setStatus("");
         setImage("");
         setPreview("");
         navigate('/');
         toast.success("User Registered Successfully!");
       }else{
        toast.error("Something went wrong, please try again !")
       }
      }
  }





  useEffect(()=>{
    if(image){
      setPreview(URL.createObjectURL(image))
    }
    setTimeout(() => {
      setShowSpinner(false);
    }, 1200);
  },[image])
  return (
      <>
      {showSpinner ? <Spiner/> :
        <div className='container'>
            <h2 className='text-center mt-1'>Register Your Details</h2>
            <Card className='shadow mt-3 p-3 '>
                <div className='profile_div text-center'>
                    <img src={preview ? preview : profile_image}/>
                </div>

                <Form>
                <Row>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name='fname' value={inputData.fname} onChange={setInputValue} placeholder='Enter First Name' />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name='lname' value={inputData.lname} onChange={setInputValue} placeholder='Enter Last Name'/>
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' value={inputData.email} onChange={setInputValue} placeholder='Enter Email Id'/>
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" name='mobile' value={inputData.mobile} onChange={setInputValue} placeholder='Enter Mobile Number'/>
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Select Your Gender</Form.Label>
                    <Form.Check 
                        type={"radio"}
                        label={'Male'}
                        name={'gender'}
                        value={'Male'}
                        onChange={setInputValue}
                    />

                      <Form.Check 
                        type={"radio"}
                        label={'Female'}
                        name={'gender'}
                        value={'Female'}
                        onChange={setInputValue}
                    />
                  </Form.Group>


                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Select Your Status</Form.Label>
                      <Select
                          options={options}
                          onChange={setStatusValue}
                      />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Select Your Profile Image</Form.Label>
                    <Form.Control type="file" name='user_profile_image' onChange={setProfile}/>
                  </Form.Group>


                  
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Your Loaction</Form.Label>
                    <Form.Control type="text" name='location' value={inputData.location} onChange={setInputValue} placeholder='Enter Your Loaction'/>
                  </Form.Group>
               
                  <Button variant="primary" type="submit" onClick={submitUserData}>
                    Submit
                  </Button>
              </Row>
              </Form>

            </Card>
        </div>
      }
      </>
  )
}

export default Register