import {CommonRequest} from './ApiCall';
import {BASE_URL} from './Helper';


// Register user data
export const RegisterFunction = async(data,header)=>{
    return await CommonRequest("POST",`${BASE_URL}/user/register`,data,header);
}


// Get all users data
export const GetUserData = async(search,gender,status,sort,page)=>{
    // console.log("gender",gender);
    return await CommonRequest("GET",`${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,"");
}


// Get single user profile data
export const getSingleUserFunction = async(id)=>{
    //console.log("getSingleUserFunction",id)
    return await CommonRequest("GET",`${BASE_URL}/user/${id}`,"");
}

// update user profile data
export const editFunction = async(id,data,header)=>{
    return await CommonRequest("PUT",`${BASE_URL}/user/edit/${id}`,data,header);
}


// Delete user profile data
export const deleteUserFunction = async(id)=>{
    return await CommonRequest("DELETE",`${BASE_URL}/user/delete/${id}`,{});
}



// Update Status
export const UpdateStatusFunction = async(id,status)=>{
    //console.log("Update status",id ,"status : ",status);
    return await CommonRequest("PUT",`${BASE_URL}/user/status/${id}`,{status});
}


// Export to csv file
export const exportToCsvFunction = async()=>{
    return await CommonRequest("GET",`${BASE_URL}/userexport`,"");
}