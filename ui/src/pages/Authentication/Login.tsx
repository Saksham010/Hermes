import {hermesLoginImage} from "../../utils/images.ts";
import { Link } from "react-router-dom";

export default function Login(){

    return(
        <>
            <div className="flex justify-between">
                <div className="flex-1 ">
                    <div className="flex flex-col px-8 justify-center h-screen ">
                        <div>
                            <h1 className="font-cinzel text-3xl font-semibold text-center">Prove Thou Shall Worthy</h1>
                        </div>
                        
                        <div className="pt-4"></div>
                        <div>
                            <h1 className="font-cinzel text-xl font-medium">EMAIL</h1>
                            <div>
                                <input placeholder="Place your email" type="email" className="border-2 w-full p-2 border-black focus:outline-none text-sm font-cinzel font-medium text-zinc-500"></input>
                            </div>
                        </div>
                        <div className="pt-4"></div>
                        <div>
                            <h1 className="font-cinzel text-xl font-medium">PASSWORD</h1>
                            <div>
                                <input placeholder="place your password" type="password" className="border-2 w-full p-2 border-black focus:outline-none text-sm font-cinzel font-medium text-zinc-500"></input>
                            </div>
                        </div>
                        <div className="pt-4"></div>

                        <div className="bg-[#d4c8b8] text-center hover:opacity-90 cursor-pointer">
                            <button className="font-cinzel text-xl font-medium pt-2 font-medium hover:opacity-90 cursor-pointer">LOGIN</button>
                        </div>
                        <div className="pt-2"></div>
                        <div>
                            <h1 className="font-cinzel text-md font-medium underline underline-offset-4	hover:opacity-85 cursor-pointer"><a>Forgot Password</a></h1>
                        </div>
                        <div className="pt-2"></div>
                        <div>
                            <h1 className="font-cinzel text-center font-medium">Art thou new here ? <Link to='/signup'><a className="underline underline-offset-4 hover:opacity-85 cursor-pointer">join us</a></Link></h1>
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