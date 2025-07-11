"use client"
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { AllUsers } from '@/actions/useractions'
import Link from 'next/link'

const Page = () => {
    const [Artists, setArtists] = useState([])
    const [query, setQuery] = useState('')
    useEffect(() => {
        getAllArtist();

    }, [])

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query == '') {
                getAllArtist();
                return
            } else {
                const filtered = Artists.filter(item =>
                    item.name.toLowerCase().includes(query.toLowerCase())
                );
                setArtists(filtered);
            }
        }, 300); // debounce for 300ms

        return () => clearTimeout(delayDebounce); // cleanup for debounce

    }, [query]);

    const getAllArtist = async () => {
        const val = await AllUsers("Artists & Illustrators");
        // const temp = await val.json()
        console.log(val);
        setArtists(val);
    }



    return (
        <div>
            <div className='h-32 bg-purple-600 flex justify-center text-center text-lg items-center md:text-2xl font-light'>
                Discover & Support India’s Most Creative Minds — One Chai at a Time!
            </div>

            <div className='flex justify-end w-full pr-10'>

                <div className="flex text-xs rounded-full m-4 w-fit border-gray-200 right-0 mr-0 justify-end items-end overflow-hidden ">
                    <input
                        type="text"
                        className="px-4 py-2 w-42 bg-black focus:outline-none"
                        placeholder="Search..."
                        onChange={(e) => { setQuery(e.target.value) }}
                        value={query}

                    />
                    <button
                        className="bg-purple-600 text-white px-4 py-2 hover:bg-purple-700 transition"

                    >
                        Search
                    </button>
                </div>
            </div>


            <div className='flex p-10  gap-10  m-auto justify-center flex-wrap items-center overflow-visible'>



                {Artists && Artists.map((item, i) => {
                    return <Link key={i} href={item.username}>

                        <Card title={item.name} Bio={item.Bio} thumbnail={item.thumbnail ? item.thumbnail : "/Thumbnail.png"} funds={item.category} />
                    </Link>

                })
                }

            </div>





        </div>
    )
}

export default Page