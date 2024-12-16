"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Skeleton } from '@/components/ui/skeleton';


const Managelink = () => {
  const [allLinks, setAllLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('/api/links'); // Your backend API endpoint
        const data = await response.json();
        setAllLinks(data.links);
      } catch (error) {
        console.error('Error fetching links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  // Filtered links based on search input
  const filteredLinks = allLinks.filter((link) =>
    link.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-[1rem] w-full overflow-x-scroll md:px-[2rem] h-full py-10 lg:px-[3rem]">
      <div className="border-[#E5EAF0] relative rounded-3xl border-[1px] max-w-[100%] overflow-x-scroll">
        <div className="px-[1rem] sticky left-0 w-[100%] z-50 py-6 lg:px-6 flex justify-between">
          <div className="font-Helvatica text-[1.5rem] font-medium">
            All Links
            <span className="text-[#62676D] text-[0.8rem]"> /{filteredLinks.length}</span>
          </div>
          <div className="flex gap-4">
            <div className="hidden md:block w-max relative">
              <div className="absolute -translate-y-1/2 top-1/2 right-4">
                {/* <Search height={20} color={"#8C8C8C"} width={20} /> Add your search icon */}
              </div>
              <input
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none font-Circular px-4 py-2.5 w-[300px] rounded-full focus:border-[#236DEA] border-[#E2E4E8] border-[1px]"
              />
            </div>
          </div>
        </div>

        <div className="w-full min-h-full relative">
          <div className="border-y-[1px] text-[0.9rem] lg:text-[1rem] border-[#EAEAEA] w-[35rem] md:w-full flex font-Helvatica text-[#000000] font-medium px-4 py-4">
            <div className="w-[10%]">S.No</div>
            <div className="w-[45%] md:w-[35%] lg:w-[25%] xl:w-[35%]">Name</div>
            <div className="w-[35%] lg:w-[25%] xl:w-[30%]">Clicks</div>
            <div className="w-[20%] xl:w-[10%] flex justify-center">URL</div>
          </div>

          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  className={clsx(
                    "w-[35rem] md:w-full flex font-Helvetica text-[#000000] font-medium px-4 py-4",
                    index === 9 ? "" : "border-b-[1px] border-[#EAEAEA]"
                  )}
                >
                  <div className="hidden md:block w-[10%]">
                    <Skeleton className="h-6 bg-gray-200 w-[80%]" />
                  </div>
                  <div className="w-[45%] md:w-[35%] lg:w-[25%]">
                    <Skeleton className="h-6 bg-gray-200 w-[80%]" />
                  </div>
                  <div className="w-[35%] lg:w-[25%]">
                    <Skeleton className="h-6 bg-gray-200 w-[80%]" />
                  </div>
                  <div className="hidden lg:block w-[20%]">
                    <Skeleton className="h-6 bg-gray-200 w-[80%]" />
                  </div>
                  <div className="w-[20%]">
                    <Skeleton className="h-10 bg-gray-200 w-[80%] rounded-full" />
                  </div>
                </div>
              ))
            : filteredLinks.map((link, index) => (
                <Link
                  href={`/dashboard/links/${link.slug}`}
                  className={clsx(
                    "w-[35rem] md:w-full gap-2 flex cursor-pointer text-[0.8rem] lg:text-[0.9rem] font-Helvatica text-[#717678] font-medium px-4 lg:px-6 py-4",
                    index + 1 === filteredLinks.length
                      ? "rounded-b-3xl"
                      : "border-b-[1px] border-[#EAEAEA]",
                    index % 2 === 0 ? "bg-[#FBFBFB]" : ""
                  )}
                  key={link.slug}
                >
                  <div className="hidden md:block w-[10%]">{index + 1}</div>
                  <div className="w-[45%] md:w-[35%] lg:w-[25%] xl:w-[35%] line-clamp-1">
                    {link.name}
                  </div>
                  <div className="w-[35%] lg:w-[25%] line-clamp-1 xl:w-[30%]">
                    {link.clicks}
                  </div>
                  <div className="w-[20%] xl:w-[10%] flex justify-center">
                    {link.original_url}
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Managelink;
