'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn,signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';


const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: ''
      },
    })
   
    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      setIsLoading(true);

      try {
        // Sign up with Appwrite & create plaid token
        
        if(type === 'sign-up') {
          const userData = {
            firstName: data.firstName!,
            lastName: data.lastName!,
            address1: data.address1!,
            city: data.city!,
            state: data.state!,
            postalCode: data.postalCode!,
            dateOfBirth: data.dateOfBirth!,
            ssn: data.ssn!,
            email: data.email,
            password: data.password
          }

          const newUser = await signUp(userData);

          setUser(newUser);
        }

        if(type === 'sign-in') {
          const response = await signIn({
            email: data.email,
            password: data.password,
          })

          if(response) router.push('/')
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <section className="auth-form">
      <header className='flex flex-col gap-5 md:gap-8'>
          <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image 
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="App logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">App</h1>
          </Link>

          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user 
                ? 'Cuenta enlazada'
                : type === 'sign-in'
                  ? 'Iniciar sesión'
                  : 'Registrarse'
              }
              <p className="text-16 font-normal text-gray-600">
                {user 
                  ? 'Enlaza tu cuenta para iniciar'
                  : 'Llena todo el formulario por favor'
                }
              </p>  
            </h1>
          </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" /> 
        </div>
      ): (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='firstName' label="Nombre" placeholder='Ingresa tu nombre' />
                    <CustomInput control={form.control} name='lastName' label="Apellidos" placeholder='Ingresa tus apellidos' />
                  </div>
                  <CustomInput control={form.control} name='address1' label="Dirección" placeholder='Ingresa tu dirección específica' />
                  <CustomInput control={form.control} name='city' label="Ciudad" placeholder='Ingresa tu ciudad' />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='state' label="Estado" placeholder='Ejemplo: NL' />
                    <CustomInput control={form.control} name='postalCode' label="Código postal" placeholder='Ejemplo: 11101' />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='dateOfBirth' label="Cumpleaños" placeholder='YYYY-MM-DD' />
                    <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Ejemplo: 1234' />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name='email' label="Email" placeholder='Ingresa tu email' />

              <CustomInput control={form.control} name='password' label="Contraseña" placeholder='Ingresa tu contraseña' />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Cargando...
                    </>
                  ) : type === 'sign-in' 
                    ? 'Iniciar sesión' : 'Registrarse'}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
              ? "¿No tienes cuenta?"
              : "¿Ya tienes cuenta?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Registrarse' : 'Iniciar sesión'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm