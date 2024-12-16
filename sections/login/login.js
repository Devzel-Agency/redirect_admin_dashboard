"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'



import { useRouter} from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import clsx from 'clsx'
import Eye from '@/public/icons/eye'
import Eyeslash from '@/public/icons/eyeslash'
import { ToastAction } from '@/components/ui/toast'
import userlogin from '@/api/loginuser'
import getToken from '@/api/getToken'
import { useUser } from '@/redux/userContext'
import Pageload from '@/components/pageload'


const Login = () => {
    const { dispatch, state } = useUser();
    const user = state.user;
    const { toast, handleToastClick } = useToast();
    const [isEmpty, setIsEmpty] = useState(0);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [loading, setloading] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [pageLoad, setPageLoad] = useState(true);

    // const token = params.get("tkn123");
    useEffect(() => {
        const token=getToken()
      if(!user && !token)
        {
setPageLoad(false)
      }
      else{
        router.push("/dashboard")
      }
    }, [user]);
    const handleEnterKeyPress = (e, nextInputRef) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            nextInputRef.current.focus();
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    const validatePassword = (password) => {
        // Example: Check if password length is at least 6 characters
        return password?.length >= 6;
    };
    const handleSignup = async () => {
        if (loading) return;

        if (
            emailRef.current.value.trim() === "" ||
            passwordRef.current.value.trim() === ""
        ) {
           setIsEmpty(true)
        } 
         if (!validateEmail(email)) {
            toast({
                title: "Invalid Email",
                variant: "destructive",
                description: "Please provide a valid email address.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        } else if (!validatePassword(password)) {
            toast({
                title: "Invalid Password",
                description: "Please provide a valid password.",
                variant: "destructive",

                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        } else {
            let user;
            try {
                setloading(true);
                user = await userlogin(email, password);

                //console.log(user, "user111");
                if (user.error) {
                setloading(false);

                    toast({
                        title: "Uh oh! Something went wrong.",
                        description: user.error.error,
                        variant: "destructive",
                        action: (
                            <ToastAction altText="Try again">
                         
                                    <div >
                                    Try again
                                    </div>
                               
                            </ToastAction>
                        ),
                    });
                 
                } else {
                    console.log(user)
                    dispatch({ type: "SET_USER", payload: user });
                  
                    router.push("/dashboard");
                }
            } catch (error) {
                if (error.message) {
                    //console.log(error.message, "Error probbaly");
                }
            } 
        }
    };

    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default behavior (e.g., adding a newline)
            handleSignup();
        }
    };
    if (pageLoad) {
        return (
            <Pageload/>
        );
    }
    return (
        <div className=' max-h-[100vh] min-h-[100vh] bg-black overflow-hidden   relative w-full '>
            
            <Link href={"/"}>
            
            <div className=' bg-transparent z-50 absolute top-6 left-4 md:left-8 md:top-10 '>
                {/* <Logo color={"#fff"} /> */}
            </div>
            </Link>
           
            <div className='max-h-[100svh] min-h-[100svh] flex justify-center items-center md:items-start md:pt-[8rem] lg:pt-0 lg:items-center'>
               
                <div className='w-[90%] rounded-3xl pb-5 py-4 md:max-w-[500px] md:min-w-[500px] bg-white  lg:flex border-[#EDEDED] lg:border-[1px]  lg:justify-center lg:items-center relative   z-10'>

                    <div className=" w-full  pt-[1rem]     h-max    rounded-3xl px-[1rem] md:px-[2rem]  ">
                        <div className=' flex flex-col leading-none  pb-8  lg:pb-8  gap-8'>

                            <div className=' flex flex-col gap-4'>

                                <div className=' font-Circular font-[700] text-[#8C8C8C]  tracking-[-4%] text-[1.3rem] text-center'>Hey, there</div>
                                <div className=' font-Circular font-[700] text-[#1D1F21]  tracking-[-4%] text-[1.5rem] text-center'>Let’s get you onboard</div>
                            </div>


                           
                        </div>
                        <div className=" text-[0.85rem]  font-Circular  flex flex-col gap-4 xl:gap-8 pb-6">
                            <div>
                                <div className=' text-[#1D1F21] font-Circular pb-2 pl-1'>Email</div>
                                <input
                                    onClick={() => {
                                        setIsEmpty(0);
                                    }}
                                    ref={emailRef}
                                    onChange={(e) => setemail(e.target.value)}
                                    onKeyPress={(e) => handleEnterKeyPress(e, passwordRef)}
                                    type="email"
                                    className={clsx(
                                        " text-[#858585]  text-[14px] font-Helvatica px-3 outline-none border-[1px] duration-300   active:border-[1px] focus:border-[1px] focus:border-[#000] w-full rounded-xl leading-none pt-4 bg-[#e0e0e0]  pb-[1rem] ",
                                        isEmpty &&  emailRef.current.value.trim() === ""
                                            ? "border-[#F42F4E]"
                                            : "border-[#EDEEF4]"
                                    )}
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <div>
                                    <div className=' text-[#1D1F21] flex justify-between font-Circular pb-2 px-1'>
                                        <div>Password</div>
                                        
                                    </div>
                                    <div className="relative">

                                        <input
                                            ref={passwordRef}
                                            onClick={() => {
                                                setIsEmpty(0);
                                            }}
                                            onChange={(e) => setpassword(e.target.value)}
                                            type={showPassword ? "text" : "password"}
                                            onKeyDown={handleInputKeyDown}
                                            className={clsx(
                                                "text-[#858585]  text-[14px]  px-3 outline-none font-Helvatica border-[1px]  duration-300  active:border-[1px] focus:border-[1px] focus:border-[#000] w-full rounded-xl pt-4 bg-[#e0e0e0]  pb-[1rem] flex  leading-none ",
                                                isEmpty &&  passwordRef.current.value.trim() === ""
                                                    ? "border-[#F42F4E]"
                                                    : "border-[#EDEEF4]"
                                            )}
                                            placeholder="Password"
                                        />
                                        <div
                                            onClick={togglePasswordVisibility}
                                            className="absolute top-[50%] -translate-y-[50%]  right-3 cursor-pointer"
                                        >
                                            {/* Replace with actual SVG path for eye open or closed */}
                                            {showPassword ? <Eye /> : <Eyeslash />}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div
                            className=" text-[0.9rem] bg-[#205FFF] w-full   font-Circular cursor-pointer justify-center mt-2 text-white    font-medium py-4 rounded-full flex gap-3 items-center min-h-[60px]"
                            onClick={handleSignup}
                        >
                            <div className={clsx("", loading ? "hidden" : "")}>Continue</div>
                            <div className={clsx("", loading ? "" : "hidden")}>
                                <div className=" loader   " />
                            </div>
                        </div>
                       


                    </div>
                </div>
              
            </div>


        </div>
    )
}

export default Login
