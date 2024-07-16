import axios from "axios";
import { SERVER_BASEURL } from "../../utils/constant.ts";
import { useEffect,useState } from "react";

export default  function Dashboard(){
    const [firstname,setFName] = useState('');
    const [lastname,setLName] = useState('');
    const [email,setEmail] = useState('');
    const [apiData,setApiData] = useState([]);
    
    console.log("Apidata: ",apiData);
    
    //Send request to create a new api key
    const createApiKey = async ()=>{
        try{
            console.log("Server url: ",SERVER_BASEURL);
            const apiName = "Shadow";
            const choosenChainList = ['Ethereum Sepolia', 'Ethereum Mainnet', 'Arbitrum Mainnet'];

            const res = await axios.post(SERVER_BASEURL + '/dashboard/create-api-key' ,{
                apiName,
                choosenChainList
            },{
                withCredentials:true
            });

            const createdAPIKey = res?.data?.data;

            //Update api data
            setApiData((arr)=>{
                return [...arr, {
                    ...createdAPIKey
                }]
            })
            console.log("Response: ",res);
            
        }catch(err){
            console.log("Error creating api key: ",err);
        }

    }

    //Fetch api data
    const fetchAPIData = async ()=>{

        try{
            console.log("Server url: ",SERVER_BASEURL);

            const res = await axios.get(SERVER_BASEURL + '/dashboard/fetch-api-detail' ,{
                withCredentials:true
            });

            const apiDataList = res?.data?.data;
            //If there are no keys
            if(apiDataList.length !== 0){
    
                //Update api data
                setApiData(()=>{
                    return [...apiDataList]
                })

            }
            console.log("Response: ",res);
            
        }catch(err){
            console.log("Error creating api key: ",err);
        }

    }


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
        fetchAPIData();
    },[])

    const apiElements = ()=>{
        return apiData.map((obj,index)=>{
            const btmBorderStyle = apiData.length == index + 1 ? '':'border-b-2' 
            return(
                <>
                    <div className={`flex justify-between font-cinzel text-md ${btmBorderStyle} py-2`}>
                        <div><h1>{obj.apiName}</h1></div>
                        <div><h1>{obj.dateCreated}</h1></div>
                        <div><h1>{obj.apiKey}</h1></div>
                    </div>
                </>
            )
        })
    }

    return(
        <>
            <div className="font-cinzel text-xl">
                <h1>Dashboard</h1>
                <h1>Hello {firstname} {lastname}</h1>
                <h1>Your email is: {email}</h1>
            </div>
            <div className="flex justify-between">
                <div className="bg-[#d4c8b8] text-center hover:opacity-90 cursor-pointer inline-block">
                    <button onClick={createApiKey} className="font-cinzel text-xl font-medium py-2 px-4 font-medium hover:opacity-90 cursor-pointer">Create new API Key</button>
                </div>

                <div className="bg-[#d4c8b8] text-center hover:opacity-90 cursor-pointer inline-block">
                    <button onClick={fetchAPIData} className="font-cinzel text-xl font-medium py-2 px-4 font-medium hover:opacity-90 cursor-pointer">Refresh</button>
                </div>

            </div>

            <div className="border border-2 border-[#d4c8b8] p-2">
                {apiData.length == 0?'':apiElements()}
            </div>
        </>
    )

}