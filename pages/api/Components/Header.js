import React from 'react'
import Link from 'next/link'
const Headerr = () => {
  return (
    <>
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">My App</div>
          <ul className="flex space-x-4">
            <li className="text-white">Home</li>
          <Link href="/User/User"className="text-white">Users</Link>
          <Link href="/User/Address"className="text-white">Address</Link>
            <li className="text-white">Services</li>
            <li className="text-white">Contact</li>
          </ul>
        </div>
      </div>
    </nav>
    </>
    
  )
}

export default Headerr



