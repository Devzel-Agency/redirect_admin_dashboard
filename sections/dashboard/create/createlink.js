"use client";
import React, { useRef, useState } from "react";
import Padding from "@/components/padding";
import clsx from "clsx";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Createnewlink from "@/api/createlink";
import { BACKEND, BASE_URL } from "@/api/variables";

const Createlink = () => {
  // Existing refs and states
  const nameref = useRef();
  const urlref = useRef();
  const promoCodeRef = useRef();
  const titleRef = useRef();

  // New states for additional fields
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const [loading, setloading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(0);
  const [popup, setPopup] = useState(false);
  const [slug, setslug] = useState("");

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

    // Validate all fields
    let hasError = false;

    // Name validation
    if (!name) {
      toast({
        title: "Invalid Name",
        variant: "destructive",
        description: "Please provide a Name for the url",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      hasError = true;
    }

    // URL validation
    if (!url || !isValidUrl(url)) {
      toast({
        title: "Invalid Url",
        description: "Please provide a valid Url.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      hasError = true;
    }

    // Promo Code validation
    if (!promoCode) {
      toast({
        title: "Invalid Promo Code",
        description: "Please provide a Promo Code",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      hasError = true;
    }

    // Title validation
    if (!title) {
      toast({
        title: "Invalid Title",
        description: "Please provide a Title",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      hasError = true;
    }

    // Type validation
    if (!type) {
      toast({
        title: "Invalid Type",
        description: "Please select a Type",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      hasError = true;
    }

    // If any validation fails, stop submission
    if (hasError) return;

    try {
      setloading(true);
      // Modify API call to include new fields
      const link = await Createnewlink(name, url, type, title, promoCode);

      if (link.message) {
        toast({
          title: "Link added successfully",
        });
        setPopup(true);
        setloading(false);
        setslug(link.link.slug);
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          variant: "destructive",
          action: (
            <ToastAction altText="Try again">
              <div>Try again</div>
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
            <div>Try again</div>
          </ToastAction>
        ),
      });
    }
  };

  return (
    <div>
      <Padding className={"py-20"}>
        <div className="bg-[#FBFBFB] border-[1px] border-[#D5D9DE] rounded-3xl p-6">
          <div className="text-[1.6rem] pb-6 font-bold leading-tight text-[#000000]">
            Create New Link
          </div>
          <div className="text-[0.85rem] font-Circular flex flex-col gap-4 xl:gap-6 pb-6">
            {/* Existing Name Input */}
            <div>
              <div className="text-[#1D1F21] font-Circular pb-2 pl-1">Name</div>
              <input
                ref={nameref}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => handleEnterKeyPress(e, urlref)}
                type="text"
                className={clsx(
                  "text-[#858585] text-[14px] font-Helvatica px-3 outline-none border-[1px] duration-300 active:border-[1px] focus:border-[1px] focus:border-[#000] w-full rounded-xl leading-none pt-4 bg-[#e0e0e0] pb-[1rem]",
                  isEmpty && nameref.current.value.trim() === ""
                    ? "border-[#F42F4E]"
                    : "border-[#EDEEF4]"
                )}
                placeholder="Name"
              />
            </div>

            {/* Existing URL Input */}
            <div>
              <div className="text-[#1D1F21] font-Circular pb-2 pl-1">URL</div>
              <input
                ref={urlref}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="url"
                className={clsx(
                  "text-[#858585] text-[14px] font-Helvatica px-3 outline-none border-[1px] duration-300 active:border-[1px] focus:border-[1px] focus:border-[#000] w-full rounded-xl leading-none pt-4 bg-[#e0e0e0] pb-[1rem]",
                  isEmpty && urlref.current.value.trim() === ""
                    ? "border-[#F42F4E]"
                    : "border-[#EDEEF4]"
                )}
                placeholder="Enter URL"
              />
            </div>

            {/* New Promo Code Input */}
            <div>
              <div className="text-[#1D1F21] font-Circular pb-2 pl-1">
                Promo Code
              </div>
              <input
                ref={promoCodeRef}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                onKeyPress={(e) => handleEnterKeyPress(e, titleRef)}
                type="text"
                className={clsx(
                  "text-[#858585] text-[14px] font-Helvatica px-3 outline-none border-[1px] duration-300 active:border-[1px] focus:border-[1px] focus:border-[#000] w-full rounded-xl leading-none pt-4 bg-[#e0e0e0] pb-[1rem]",
                  isEmpty && promoCodeRef.current.value.trim() === ""
                    ? "border-[#F42F4E]"
                    : "border-[#EDEEF4]"
                )}
                placeholder="Enter Promo Code"
              />
            </div>

            {/* New Title Input */}
            <div>
              <div className="text-[#1D1F21] font-Circular pb-2 pl-1">
                Title
              </div>
              <input
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className={clsx(
                  "text-[#858585] text-[14px] font-Helvatica px-3 outline-none border-[1px] duration-300 active:border-[1px] focus:border-[1px] focus:border-[#000] w-full rounded-xl leading-none pt-4 bg-[#e0e0e0] pb-[1rem]",
                  isEmpty && titleRef.current.value.trim() === ""
                    ? "border-[#F42F4E]"
                    : "border-[#EDEEF4]"
                )}
                placeholder="Enter Title"
              />
            </div>

            {/* New Type Select */}
            <div>
              <div className="text-[#1D1F21] font-Circular pb-2 pl-1">Type</div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={clsx(
                  "text-[#858585] text-[14px] font-Helvatica px-3 outline-none border-[1px] duration-300 active:border-[1px] focus:border-[1px] focus:border-[#000] w-full rounded-xl leading-none pt-4 bg-[#e0e0e0] pb-[1rem]"
                )}
              >
                <option value="">Select Type</option>
                <option value="sport">Sport</option>
                <option value="game">Game</option>
              </select>
            </div>

            {/* Submit Button */}
            <div
              className="text-[0.9rem] bg-[#205FFF] w-full font-Circular cursor-pointer justify-center mt-2 text-white font-medium py-4 rounded-full flex gap-3 items-center min-h-[60px]"
              onClick={handleSubmit}
            >
              <div className={clsx("", loading ? "hidden" : "")}>Continue</div>
              <div className={clsx("", loading ? "" : "hidden")}>
                <div className="loader" />
              </div>
            </div>
          </div>
        </div>
      </Padding>

      {/* Existing Popup Component */}
      {popup && (
        <div
          onClick={() =>
            setPopup(false) &
            setUrl("") &
            setName("") &
            setPromoCode("") &
            setTitle("") &
            setType("")
          }
          className="h-screen w-screen fixed top-0 z-[100] left-0 backdrop-blur-sm flex justify-center items-center bg-black/20"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-[300px] min-w-[300px] w-full rounded-xl flex items-center max-w-[600px] bg-white"
          >
            <div className="bg-gray-300 w-max flex gap-4 justify-between items-center mx-auto rounded-full px-4 py-3">
              {BACKEND + slug}
              <div
                onClick={() =>
                  navigator.clipboard.writeText(BACKEND + slug) &
                  toast({
                    title: "Link copied to clipboard",
                  })
                }
                className="cursor-pointer w-[32px] rounded-full bg-black p-2"
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 3H14.6C16.8402 3 17.9603 3 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C21 6.03969 21 7.15979 21 9.4V16.5M6.2 21H14.3C15.4201 21 15.9802 21 16.408 20.782C16.7843 20.5903 17.0903 20.2843 17.282 19.908C17.5 19.4802 17.5 18.9201 17.5 17.8V9.7C17.5 8.57989 17.5 8.01984 17.282 7.59202C17.0903 7.21569 16.7843 6.90973 16.408 6.71799C15.9802 6.5 15.4201 6.5 14.3 6.5H6.2C5.0799 6.5 4.51984 6.5 4.09202 6.71799C3.71569 6.90973 3.40973 7.21569 3.21799 7.59202C3 8.01984 3 8.57989 3 9.7V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Createlink;
