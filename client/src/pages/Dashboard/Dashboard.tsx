import axios from "axios";
import { SERVER_BASEURL } from "../../utils/constant.ts";
import { useEffect,useState } from "react";

export default  function Dashboard(){
    const [firstname,setFName] = useState('');
    const [lastname,setLName] = useState('');
    const [email,setEmail] = useState('');
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.get(SERVER_BASEURL + '/dashboard',{
                withCredentials:true
            });
            console.log("Response: ",res);
            setFName(res.data.data.firstname);
            setLName(res.data.data.lastname);
            setEmail(res.data.data.email);
        } 
        fetchData();
    },[])
    return(
        <>
            <h1>Dashboard</h1>
            <h1>Hello {firstname} {lastname}</h1>
            <h1>Your email is: {email}</h1>
        </>
    )

}