import axios from "axios";
import { SERVER_BASEURL } from "../../utils/constant.ts";
import { useEffect,useState,useMemo } from "react";
import Modal from 'react-modal';
import bevmLogo from "../../assets/bevm.png";
import QueryChart from "../../components/Dashboard/QueryChart.tsx";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');


export default  function Dashboard(){
    const [firstname,setFName] = useState('');
    const [lastname,setLName] = useState('');
    const [email,setEmail] = useState('');
    const [apiData,setApiData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(true);
    const [newProject,setNewProject] = useState('');
    
    
    console.log("Apidata: ",apiData);

    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    
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


            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                shouldCloseOnOverlayClick={false}
                contentLabel="Give a name to your project"
            >
                <h2 className="font-cinzel text-xl">Give a name to your project</h2>
                <div className="flex justify-between py-2 relative">
                    <div>
                        <input onChange={(e)=>setNewProject(e.target.value)} value={newProject} placeholder="Project name" type="text" className="border-2 w-full p-2 border-black focus:outline-none text-sm font-cinzel font-medium text-zinc-500"></input>
                    </div>

                    {/* <div>
                        <img src={bevmLogo}></img>
                    </div> */}
                    <div className="bg-[#d4c8b8] text-center hover:opacity-90 ">
                        <h1 className="font-cinzel text-md font-medium py-2 px-4 font-medium hover:opacity-90 ">BEVM</h1>
                    </div>

                </div>

                <div className="flex justify-between pt-2">
                    <div className="bg-[#d4c8b8] text-center hover:opacity-90 cursor-pointer inline-block ">
                        <button onClick={closeModal} className="font-cinzel text-md font-medium py-2 px-4 font-medium hover:opacity-90 cursor-pointer">CANCEL</button>
                    </div>

                    <div className="bg-[#d4c8b8] text-center hover:opacity-90 cursor-pointer inline-block ">
                        <button onClick={closeModal} className="font-cinzel text-md font-medium py-2 px-4 font-medium hover:opacity-90 cursor-pointer">CREATE</button>
                    </div>
                </div>

            </Modal>
            <QueryChart/>
        </>
    )

}
