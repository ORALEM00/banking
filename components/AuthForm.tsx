'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const AuthForm = ({ type }: { type: string }) =>  {
  const [user, setUser] = useState(null)
  return (
    <section className="auth-form">
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className="cursor-pointer flex items-center gap-1">
                <Image 
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Horizon logo"
                />
                <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">App</h1>
          </Link>
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user 
                ? 'Link Account'
                : type === 'sign-in'
                  ? 'Iniciar sesión'
                  : 'Registrarse'
              }
              <p className="text-16 font-normal text-gray-600">
                {user 
                  ? 'Liga tu cuenta para empezar'
                  : 'Por favor introduce tu datos'
                }
              </p>
            </h1>
          </div>
        </header>
        {user ? (
          <div className="flex flex-col gap-4">
              {/* PalidLink */}
          </div>
        ):(
          <>
            {/* form */}
          </>
        )}
    </section>
  )
}

export default AuthForm