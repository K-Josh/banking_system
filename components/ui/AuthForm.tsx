"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, } from "react-hook-form"
import { authFormSchema } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { Form } from './form'
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SignIn, SignUp } from '@/lib/actions/user.actions'


const AuthForm = ({type}: {type: string}) => {
    const [user, setUser] = useState()
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter();

    const formSchema = authFormSchema(type);

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>
  ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => 
    {
      setisLoading(true)
      
    try {
      if(type === 'sign-up') {
        const newUser = await SignUp(data);

        setUser(newUser);
      } 
      
      if(type === 'sign-in') {
        const res = await SignIn({
          email: data.email,
          password: data.password,
        })

        if(res) router.push('/')
      } 
    } catch (error) {
      console.log(error)
      
    } finally {
      setisLoading(false)
    }
   }

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
           <h1 className='text-24 font-semibold text-blue-600 lg:text-36'>
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
        <div className='flex flex-col'>
            {/* PlaidLink */}
        </div>
      ) : (
        <>
         <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === 'sign-up' && (
              <>
                 <div className='flex gap-4'>
                    <CustomInput 
                    control={form.control}
                    name='firstName'
                    label='first Name'
                    placeholder='Enter your first name'
                  />
                    <CustomInput 
                    control={form.control}
                    name='lastName'
                    label='Last Name'
                    placeholder='ex: Hila'
                  />
                 </div>
                <CustomInput 
                control={form.control}
                name='address1'
                label='Address'
                placeholder='Enter your specific address'
              />
                <CustomInput 
                  control={form.control}
                  name='city'
                  label='City'
                  placeholder='Enter your City'
                />
               <div className='flex gap-4'>
                  <CustomInput 
                  control={form.control}
                  name='region'
                  label='Region'
                  placeholder='Enter your Region'
                />
                  <CustomInput 
                  control={form.control}
                  name='postalCode'
                  label='Postal Code'
                  placeholder='example: 2302'
                />
               </div>
               <div className='flex gap-4'>
                  <CustomInput 
                  control={form.control}
                  name='dateOfBirth'
                  label='Date of Birth'
                  placeholder='YYYY-MM-DD '
                />
                  <CustomInput 
                  control={form.control}
                  name='ssn'
                  label='SSN'
                  placeholder='example: 59380'
                />
               </div>
            </>
            )}
            <CustomInput 
              control={form.control}
              name='email'
              label='Email'
              placeholder='Enter your email'
             />
            <CustomInput 
              control={form.control}
              name='password'
              label='Password'
              placeholder='******'
             />

             <div className='flex flex-col gap-4'>
              <Button className='form-btn' disabled={isLoading} type="submit">
                {isLoading ? (
                   <>
                   <Loader2 size={20} className='animate-spin' /> &nbsp;Loading...
                  </>
                ) : type === 'sign In' ? 'sign In' : 'sign Up'}
              </Button>
             </div>
          </form>
        </Form>

        <footer className='flex items-center justify-center gap-1'>
        <p>
          {type === 'sign-in' ? "Don't have an account?" : "Already got an account?"}
        </p>
        <Link className='form-link' href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
          {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
        </Link>
       </footer>
      </>
      )} 
    </section>
  )
}

export default AuthForm