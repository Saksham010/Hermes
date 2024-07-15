import {hermesLoginImage} from "../../utils/images.ts";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {SERVER_BASEURL} from "../../utils/constant.ts";
import { redirect } from "react-router-dom";

export default function Signup(){

    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [validationError,setValidationError] = useState([]);

    const submitForm = async ()=>{


        if(fname == '' || lname == '' || email == '' || password == ''){
            return alert("Please fill the form completely");
        }else{

            console.log("Server url: ",SERVER_BASEURL);

            try{
                const res = await axios.post(SERVER_BASEURL + '/auth/register' ,{
                    fname,
                    lname,
                    email,
                    password
                });
                console.log("Response: ",res);

                //If registration successful
                if(res?.response?.status === 200){
                    //Redirect to login page
                    redirect('/login');
                }

            }catch(err){
                if(err?.response?.status == 400 && err?.response?.data?.msg == "Validation error"){
                    // alert("Validation error");
                    setValidationError(err.response.data.errors);
                    return console.log("Validation error: ", err.response.data.errors);
                }
                console.log("Error: ",err);
                alert("Error occured");

            }

        }

    }
    

    return(
        <>
            <div className="flex justify-between">
                <div className="flex-1 ">
                    <div className="flex flex-col px-8 justify-center h-screen ">
                        <div>
                            <h1 className="font-cinzel text-3xl font-semibold text-center">Enroll thyself</h1>
                        </div>
                        <div className="pt-4"></div>
                        <div>
                            <h1 className="font-cinzel text-xl font-medium">FIRST NAME</h1>
                            <div>
                                <input onChange={(e)=>{setFname(e.target.value)}} value={fname} placeholder="Place your first name" type="text" className="border-2 w-full p-2 border-black focus:outline-none text-sm font-cinzel font-medium text-zinc-500"></input>
                            </div>
                        </div>
                        <div className="pt-4"></div>
                        <div>
                            <h1 className="font-cinzel text-xl font-medium">LAST NAME</h1>
                            <div>
                                <input onChange={(e)=>{setLname(e.target.value)}} value={lname}  placeholder="Place your last name" type="text" className="border-2 w-full p-2 border-black focus:outline-none text-sm font-cinzel font-medium text-zinc-500"></input>
                            </div>
                        </div>
                        
                        <div className="pt-4"></div>
                        <div>
                            <h1 className="font-cinzel text-xl font-medium">EMAIL</h1>
                            <div>
                                <input onChange={(e)=>{setEmail(e.target.value)}} value={email}  placeholder="Place your email" type="email" className="border-2 w-full p-2 border-black focus:outline-none text-sm font-cinzel font-medium text-zinc-500"></input>
                            </div>
                        </div>
                        <div className="pt-4"></div>
                        <div>
                            <h1 className="font-cinzel text-xl font-medium">PASSWORD</h1>
                            <div>
                                <input onChange={(e)=>{setPassword(e.target.value)}} value={password}  placeholder="place your password" type="password" className="border-2 w-full p-2 border-black focus:outline-none text-sm font-cinzel font-medium text-zinc-500"></input>
                            </div>
                        </div>
                        <div className="pt-4"></div>
                        <div className={validationError.length == 0?'hidden':'block' + 'border border-2 border-[#d4c8b8] p-2' }>{
                            validationError.map((err)=>{
                                return (
                                    <>
                                        <ul className="list-disc list-outside pl-4">
                                            <li className="font-cinzel text-sm">{err?.msg}</li>
                                        </ul>
                                    </>
                                )
                            })}
                        </div>
                        <div className={validationError.length == 0?'hidden':'block' +"pt-4"}></div>

                        <div className={validationError.length==0?'':'pt-4'}>
                            <div className="bg-[#d4c8b8] text-center hover:opacity-90 cursor-pointer">
                                <button onClick={submitForm} className="font-cinzel text-xl font-medium pt-2 font-medium hover:opacity-90 cursor-pointer">Signup</button>
                            </div>
                        </div>    
                        <div className="pt-2"></div>
                        <div>
                            <h1 className="font-cinzel text-center font-medium">Thou hast already an account ? <Link to='/login'><a className="underline underline-offset-4 hover:opacity-85 cursor-pointer">prove thyself</a></Link></h1>
                        </div>
                    </div>

                </div>
                <div className="">
                    <img src={hermesLoginImage} className="object-contain h-screen w-full"></img>
                </div>


            </div>
        
        </>
    )
}