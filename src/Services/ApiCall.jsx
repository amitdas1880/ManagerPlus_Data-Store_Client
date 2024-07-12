import axios from "axios";

export const CommonRequest = async(methods,url,body,header) =>{
    let config = {
        method:methods,
        url:url,
        data:body,
        headers:header ? header : {
            "Content-Type":"application/json"
        }

    }

    // axios instance
    return axios(config).then((data)=> {
        return data
    }).catch((error)=> {
        return error
    });
}
