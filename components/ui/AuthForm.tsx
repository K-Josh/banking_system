"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const AuthForm = ({type}: {type: string}) => {
    const [user, setUser] = useState(null)
  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='flex cursor-pointer items-center gap-1'>
                <Image
                 src="/icons/logo2.svg"
                 alt='NextGen'
                 width={34}
                 height={34}
                />
                <h1 className='text-26 text-black-1 font-bold font-ibm-plex-serif'>NewGen</h1>
            </Link>

            <div className='flex flex-col gap-1 '>
                <h1 className='text-24 font-semibold text-gray-900 lg:text-36'>
                    {user ? 'Link Account' 
                    : type === 'sign-in'
                      ? 'Sign In'
                      : 'Sign Up'
                }
                </h1>
                <p className='text-16 text-gray-600 font-normal'>
                   {user
                    ? 'Link your Account to get started'
                    : 'Please enter your details'  
                   }
                </p>
            </div>
      </header> 
      {user ? (
        <div>
            {/* PlaidLink */}
        </div>
      ) : (
        <>
         FORM
        </>
      )} 
    </section>
  )
}

export default AuthForm