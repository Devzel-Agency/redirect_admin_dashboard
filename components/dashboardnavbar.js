"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";

import { useRouter } from "next/navigation";
import Logo from "@/public/icons/logo";


import { usePathname } from "next/navigation";

import Profilebar from "./profilebar";


import { Skeleton } from "./ui/skeleton";
import { useUser } from "@/redux/userContext";
import getToken from "@/api/getToken";

const Dashboardnavbar = () => {
  const { state } = useUser();
  const user = state.user;
  const route = useRouter();
  const [menu, setmenu] = useState(false);

  const params = usePathname();
const [pageload,setpageload]=useState(true)
const [isScrolling, setIsScrolling] = useState(false);

  const [isactive, setactive] = useState(0);
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      //console.log(isScrolling)
      const currentScrollPos = window.pageYOffset;
      setIsScrolling(currentScrollPos > prevScrollPos && currentScrollPos >100);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (params.includes("chat")) {
      setactive(4);
    }
  }, []);
  useEffect(()=>{
    const token=getToken()
    if(user){
      setpageload(false)
    }
    if(!user && !token){
      route.push("/")
    }
  },[user])
  if(pageload){

    return (
      <div className={clsx(" sticky top-0 flex flex-col duration-300  z-[200] pt-2 lg:pt-0 bg-[#FBFBFB]",isScrolling?" translate-y-[-100%]":" translate-y-0")}>
        <div className="bg-[#FBFBFB] w-full z-[99]">
          <div className="flex px-[1rem]  md:px-[2rem] lg:px-[3rem] py-2 justify-between border-b-[1px] border-[#D5D9DE]">
            <div className="flex items-center h-[44px] gap-10 font-Circular text-[1.25rem] py-2">
            <Logo />
             
            </div>
            <div className="lg:flex items-center hidden gap-4">
               
  
              <div className="flex items-center gap-2">
              <Skeleton className="h-[2.5rem] w-[2.5rem] rounded-full   bg-black/10" />
  
            
              </div>
            </div>
          </div>
         
          <div className="px-[1rem] md:px-[2rem]    py-2 items-center  lg:px-[3rem] font-Circular border-b border-b-[#E4EAF0] text-[#62676D] hidden md:flex justify-between">
            <div className="flex gap-10 md:py-3 lg:py-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-[1.5rem] w-[5rem] rounded-xl  bg-black/10" />
              ))}
            </div>
           
          </div>
        </div>
        
       
      </div>
    );
  }
  return (
    <div className={clsx(" sticky top-0 hidden md:flex flex-col z-[200] duration-300  pt-2 lg:pt-0 bg-[#FBFBFB]",isScrolling?" translate-y-[-100%]":" translate-y-0")}>
     
      <div className="  bg-[#FBFBFB] w-full z-[99]">
        <div
          className={`flex  px-[1rem] md:px-[2rem] lg:px-[3rem] py-2 justify-between ${
            menu ? " bg-white " : "border-b-[1px]"
          }  border-[#D5D9DE]`}
        >
          <div className=" flex items-center gap-10  font-Circular text-[1.25rem]   ">
            <Logo />
           
          </div>
          <div className=" flex items-center gap-4 ">
            <Profilebar />
           
          </div>
        </div>
        
        <div className=" px-[1rem] md:px-[2rem] lg:px-[3rem]    font-Circular border-b border-b-[#E4EAF0] text-[#62676D] hidden md:flex justify-between ">
          <div className=" flex gap-10">
            <Link href={"/dashboard"}>
              <div
                onClick={() => setactive(0)}
                className={clsx(
                  " py-6  leading-none translate-y-[1px] cursor-pointer duration-300 relative ",
                  isactive == 0 ? "text-[#1A1B1D]   " : "text-[#60636C] "
                )}
              >
                Overview
                {isactive == 0 && (
                  <motion.div
                    layoutId="tab"
                    className=" absolute h-[1px] w-full bottom-0 bg-[#1A1B1D] "
                  ></motion.div>
                )}
              </div>
            </Link>
            <Link href={"/dashboard/create"}>
              <div
                className={clsx(
                  " py-6  leading-none translate-y-[1px] cursor-pointer duration-300 relative ",
                  isactive == 1 ? "text-[#1A1B1D]   " : "text-[#60636C] "
                )}
                onClick={() => setactive(1)}
              >
                Create
                {isactive == 1 && (
                  <motion.div
                    layoutId="tab"
                    className=" absolute h-[1px] w-full bottom-0 bg-[#1A1B1D] "
                  ></motion.div>
                )}
              </div>
            </Link>
          
            <Link href={"/dashboard/manage"}>
              <div
                onClick={() => setactive(3)}
                className={clsx(
                  " py-6  leading-none translate-y-[1px] relative cursor-pointer duration-300 ",
                  isactive == 3 ? "text-[#1A1B1D]   " : "text-[#60636C] "
                )}
              >
                Manage
                {isactive == 3 && (
                  <motion.div
                    layoutId="tab"
                    className=" absolute h-[1px] w-full bottom-0 bg-[#1A1B1D] "
                  ></motion.div>
                )}
              </div>
            </Link>
           
          </div>
         
        </div>
      </div>

 
      
    </div>
  );
};

export default Dashboardnavbar;
