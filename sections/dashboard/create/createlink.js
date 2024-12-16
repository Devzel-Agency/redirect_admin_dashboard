"use client"
import React, { useRef, useState } from "react";
import Padding from "@/components/padding";
import clsx from "clsx";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Createnewlink from "@/api/createlink";



const Createlink = () => {
    const nameref = useRef();
    const urlref = useRef();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setloading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(0);

    const handleEnterKeyPress = (e, nextInputRef) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            nextInputRef.current.focus();
        }
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };
    const handleSubmit = async () => {
        if (loading) return;

        if (
            nameref.current.value.trim() === "" ||
            urlref.current.value.trim() === ""
        ) {
            setIsEmpty(true)
        }
        if (!name) {
            toast({
                title: "Invalid Name",
                variant: "destructive",
                description: "Please provide a Name for the url",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        } else if (!isValidUrl(url)) {
            toast({
                title: "Invalid Url",
                description: "Please provide a valid Url.",
                variant: "destructive",

                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
        else {
         

            try {
                setloading(true);
                const   link = await Createnewlink(name, url);
if(link.message) {
    toast({
        title: "Link added successfully",
       
       
    });
    setUrl("")
    setName("")
    setloading(false);
 
}
else{
    toast({
        title: "Uh oh! Something went wrong.",
       
        variant: "destructive",
        action: (
            <ToastAction altText="Try again">

                <div >
                    Try again
                </div>

            </ToastAction>
        ),
    });
}
            } catch (error) {
                toast({
                    title: "Uh oh! Something went wrong.",
                   
                    variant: "destructive",
                    action: (
                        <ToastAction altText="Try again">

                            <div >
                                Try again
                            </div>

                        </ToastAction>
                    ),
                });
            }
        }
    }



    return (
        <div>
            <Padding className={"py-20"}>
                <div className="bg-[#FBFBFB] border-[1px] border-[#D5D9DE] rounded-3xl p-6">
                    <div className="text-[1.6rem] pb-6 font-bold leading-tight  text-[#2F3B50]">
                        Create New Link
                    </div>
                    <div className="text-[0.85rem] font-Circular flex flex-col gap-4 xl:gap-6 pb-6">
                        <div>
                            <div className="text-[#1D1F21] font-Circular pb-2 pl-1">Name</div>
                            <input
                                ref={nameref}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyPress={(e) => handleEnterKeyPress(e, urlref)}
                                type="email"
                                className={clsx(
                                    "text-[#858585] text-[14px] font-Helvatica px-3 outline-none border-[1px] duration-300 active:border-[1px] focus:border-[1px] focus:border-[#000] w-full rounded-xl leading-none pt-4 bg-[#e0e0e0] pb-[1rem]",
                                    isEmpty && nameref.current.value.trim() === "" ? "border-[#F42F4E]" : "border-[#EDEEF4]"
                                )}
                                placeholder="Email"
                            />

                        </div>
                        <div>
                            <div className="text-[#1D1F21] font-Circular pb-2 pl-1">URL</div>
                            <input
                                ref={urlref}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                type="url"
                                className={clsx(
                                    "text-[#858585] text-[14px] font-Helvatica px-3 outline-none border-[1px] duration-300 active:border-[1px] focus:border-[1px] focus:border-[#000] w-full rounded-xl leading-none pt-4 bg-[#e0e0e0] pb-[1rem]",
                                    isEmpty && urlref.current.value.trim() === "" ? "border-[#F42F4E]" : "border-[#EDEEF4]"
                                )}
                                placeholder="Enter URL"
                            />

                        </div>
                        <div
                            className=" text-[0.9rem] bg-[#205FFF] w-full   font-Circular cursor-pointer justify-center mt-2 text-white    font-medium py-4 rounded-full flex gap-3 items-center min-h-[60px]"
                            onClick={handleSubmit}
                        >
                            <div className={clsx("", loading ? "hidden" : "")}>Continue</div>
                            <div className={clsx("", loading ? "" : "hidden")}>
                                <div className=" loader   " />
                            </div>
                        </div>
                    </div>
                </div>
            </Padding>
        </div>
    );
};

export default Createlink;
