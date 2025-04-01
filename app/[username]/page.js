"use client"

import React, { useEffect } from 'react'
import PaymentPage from '@/components/PaymentPage'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const MyApp = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  // login ni he to vapis bhej d login pe sale ko
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login')
    }
  }, [status, router])

  if (status === "loading") {
    return <div className="text-center text-white">Loading...</div>
  }

  // username ko session se payment page me bhejo
  const username = session?.user?.name

  return (
    <PaymentPage username={username} />
  )
}

export default MyApp

