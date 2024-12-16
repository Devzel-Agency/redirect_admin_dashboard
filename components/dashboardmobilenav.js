"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { useUser } from '@/redux/userContext';

import Logout from '@/public/icons/logout';
import logout from '@/api/logout';

const Dashboardmobilenav = () => {
    const tabRefs = useRef([]);
    const [activeTab, setActiveTab] = useState(1);
    const [open, setOpen] = useState(false);
    const easing = [0, 0.99, 1, 1];
    const { state } = useUser()
    const user = state.user
    useEffect(() => {
      if (tabRefs.current[activeTab]) {
        tabRefs.current[activeTab].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest' // Ensure it scrolls vertically as minimally as possible
        });
      }
    }, [activeTab]);
    useEffect(() => {
        const originalOverflow = window.getComputedStyle(document.body).overflow;
    
        if (open) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = originalOverflow;
        }
    
        return () => {
          // Clean up: restore original overflow when component unmounts
          document.body.style.overflow = originalOverflow;
        };
      }, [open]); 
  return (
    <div className=' w-full '>
        {open &&
        
        <div onClick={()=>{setOpen(false)}} className=' h-[100vh] w-[100vw] bg-black/25 fixed top-0 left-0'></div>
        }
          <motion.div
        className=" absolute   bottom-[60px]    z-50  w-[95%]   left-1/2 translate-x-[-50%] overflow-hidden  "
        initial={{
          height: 0,
        }}
        animate={{
          height: open ? "fit-content" : 0,
          // paddingTop: open ? "12px" : 0,
        }}
      >
        <div className=" bg-[#FFFFFF] border-[1px] border-[#E2E4E8] rounded-2xl  pl-5 flex flex-col gap-5 w-full py-4   ">
        
         
          <div onClick={() => { logout() }} className=" cursor-pointer flex items-center gap-3 ">
            <Logout />
            <div className=" font-Circular text-[#EE5454] text-[0.9rem] leading-none ">
              Log out
            </div>
          </div>
        </div>
      </motion.div>
      <div className=' w-full flex justify-center'>

    <div className='flex pr-1 border-[1px] border-[#E2E4E8] relative lg:px-1 items-center lg:py-1 rounded-full gap-2 bg-[#F2F4F4] w-max max-w-[95%] mt-4 '>
   
    <div className="flex px-1 shadow-[0_0px_5px_-15px_rgba(0,0,0,0.3)]  md:px-1.5  md:py-1.5 py-1 lg:px-1 lg:py-1 rounded-full gap-0 md:gap-0 xl:gap-4 bg-[#F2F4F4] w-full overflow-x-scroll  md:hidden">
        <Link href={"/dashboard"}>
        
    <div
      ref={(el) => (tabRefs.current[1] = el)}
      className={clsx(
        "py-3 px-5 md:px-6 cursor-pointer relative z-50 rounded-full transition-all text-[0.85rem] md:text-[0.9rem] duration-1000",
        activeTab == 1 ? "text-black" : ""
      )}
      onClick={() => setActiveTab(1)}
    >
      {activeTab == 1 && (
        <motion.span
          layoutId="tabs1"
          className="bg-[#ffffff] absolute top-[2.5px] rounded-full left-0 w-full h-[90%] -z-10 text-[#000000]"
        />
      )}
      <span className="font-Circular font-medium">Overview</span>
    </div>
        </Link>
        <Link href={"/dashboard/create"}>
        
    <div
      ref={(el) => (tabRefs.current[2] = el)}
      className={clsx(
        "py-3 px-3 md:px-6 cursor-pointer relative z-50 rounded-full text-[0.85rem] md:text-[0.9rem] transition-all duration-1000",
        activeTab == 2 ? "text-black" : ""
      )}
      onClick={() => setActiveTab(2)}
    >
      {activeTab == 2 && (
        <motion.span
          layoutId="tabs1"
          className="bg-[#ffffff] absolute top-0 rounded-full left-0 w-full h-full -z-10 text-[#000000]"
        />
      )}
      <span className="font-Circular font-medium">Create</span>
    </div>
        </Link>
        <Link href={"/dashboard/manage"}>
        
    <div
      ref={(el) => (tabRefs.current[3] = el)}
      className={clsx(
        "py-3 px-3 md:px-6 cursor-pointer relative z-50 rounded-full text-[0.85rem] md:text-[0.9rem] transition-all duration-1000",
        activeTab == 3 ? "text-black" : ""
      )}
      onClick={() => setActiveTab(3)}
    >
      {activeTab == 3 && (
        <motion.span
          layoutId="tabs1"
          className="bg-[#ffffff] absolute top-0 rounded-full left-0 w-full h-full -z-10 text-[#000000]"
        />
      )}
      <span className="font-Circular font-medium">Manage</span>
    </div>
        </Link>
        <div className=' opacity-10'>
        
 
        </div>
    
   
  </div>
  <div onClick={()=>{setOpen(!open)}}>

  <Avatar >
  <AvatarImage src={user?.profilePic} />
  <AvatarFallback className=" bg-white uppercase">{user?.name.split("")[0]}</AvatarFallback>
</Avatar>
  </div>

    </div>
      </div>
    </div>
  )
}

export default Dashboardmobilenav
