"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Card = ({ title, Bio, thumbnail, funds }) => {
    // const datemodify = date.split('T')[0].split('-')[2];



    return (

        <div className="bg-gray-100  shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer   w-72 h-56 rounded-md">
            <div className="relative w-full h-[150px]">
                {thumbnail &&
                    <Image unoptimized src={thumbnail} className="object-cover bg-purple-300 w-full h-full" width={62} height={40} alt="Customer Validation Event" />}
            </div>
            <div className=" px-3 flex items-center justify-between h-[calc(100%-150px)]">
                <div className="text-sm max-w-[80%] h-fit font-semibold text-gray-900 mb-1 text-left ">
                    <div>
                        {title}
                    </div>
                    <div className='text-gray-700 text-xs'>
                        {Bio}
                    </div>

                </div>
                <div className='flex gap-2'>

                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-medium bg-purple-100 text-purple-500">
                        <i className="fas fa-users mr-1"></i>{funds}
                    </span>

                </div>

            </div>


        </div>
    )
}

export default Card
