"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Padding from '@/components/padding';
import Pageload from '@/components/pageload';
import Getalllinks from '@/api/getalllinks';
import { BASE_URL } from '@/api/variables';
import { toast } from '@/hooks/use-toast';

const Managelink = () => {
  const [allLinks, setAllLinks] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getlinks = async () => {
      const data = await Getalllinks()
      console.log(data)
      setAllLinks(data)
      setLoading(false);
    }
    getlinks()
  }, [])
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]

  return (
    <Padding className={" font-Helvatica"}>
      {loading ?
        <Pageload />
        :
        <div className=' py-10'>

        <Table>
          
          <TableHeader>
            <TableRow>
              <TableHead className="">S.no</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Original_Url</TableHead>
              <TableHead className="text-center">Slug</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allLinks.map((link,index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index+1}</TableCell>
                <TableCell className="font-medium">{link.name}</TableCell>
                <TableCell>{link.original_url}</TableCell>
                <TableCell className="text-center"><span className=' cursor-pointer' onClick={()=>{
                  navigator.clipboard.writeText(`${BASE_URL.replace("/api/v1", "")}${link.slug}`); toast({
                    title: "Link copied successfully",
                    
                });
                }}>{BASE_URL.replace("/api/v1","")}{link.slug}</span></TableCell>
                <TableCell className="text-right">{link.clicks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      
        </Table>
        </div>
      }


    </Padding>

  );
};

export default Managelink;
