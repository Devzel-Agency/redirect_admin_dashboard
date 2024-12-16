"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Halfarrow from "@/public/icons/halfarrow";

import Logout from "@/public/icons/logout";
import logout from "@/api/logout";
import { useUser } from "@/redux/userContext";
import { Skeleton } from "./ui/skeleton";
import clsx from "clsx";

const Profilebar = () => {
  const [open, setOpen] = useState(false);
  const easing = [0, 0.99, 1, 1];
  const { state } = useUser()
  const user = state.user
  return (
    <>
     <div onClick={()=>{ setOpen(false);}} className={clsx(" w-[100vw] h-[100vh] fixed top-0 left-0 bg-black/25 z-40",open?"":"hidden")}>

</div>
    <div className="  relative hidden md:flex  bg-white z-50 items-center gap-5 border-[1px] border-[#E2E4E8] rounded-full    ">
     
      <div
        className="  flex items-center gap-5 relative z-50 cursor-pointer pl-2 pr-4 py-2 "
        onClick={() => {
          if(user){

            setOpen(!open);
          }
        }}
      >
        <div className=" flex items-center gap-3 ">
          <div className=" h-[2.5rem] w-[2.5rem]  flex justify-center items-center  font-Circular uppercase text-white rounded-full overflow-hidden bg-black ">
         
           {user.name.split("")[0]}
            {/* <Image src={img} className=" object-cover h-full w-full " /> */}
          </div>
          <div className=" h-full transition-all duration-300 flex flex-col gap-1 justify-between  ">
            <div className=" font-Helvatica tracking-tight text-[1rem] text-[#000000] leading-none   ">
              {user? user.name :<Skeleton  className={" h-3 w-20"}/>}
             
            </div>
            <div className=" font-Helvatica tracking-tight text-[0.9rem] text-[#868C92] leading-none   ">
            {user? user.email :<Skeleton  className={" h-3 w-40"}/>}
            </div>
          </div>
        </div>
        <motion.div
          initial={{
            rotate: "0deg",
          }}
          animate={{
            rotate: open ? "180deg" : "0deg",
            // paddingTop: open ? "12px" : 0,
          }}
          transition={{
            ease: easing,
          }}
        >
          <Halfarrow height={"16"} color={"#292D32"} />
        </motion.div>
      </div>

      <motion.div
        className=" absolute top-16 left-0  z-50  w-full overflow-hidden  "
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
    </div>
    </>
  );
};

export default Profilebar;
