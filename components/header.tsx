/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import * as React from 'react';


const Header = () => {
 return (
   <header className="fixed bg-white z-50 w-full shadow-md">
     <div className="container">
       <div className="flex justify-between h-16">
         <nav className="flex items-center space-x-5">
           <Link href="/">
             <img
               className="w-28 h-auto cursor-pointer"
               src="/logo.svg"
               alt=""
             />
           </Link>
           <div className="hidden lg:inline-flex items-center text-xs space-x-5">
             <Link href="/">About</Link>
             <Link href="/">Contact</Link>
             <Link href="/" passHref>
               <a className="rounded-full bg-purple-600 text-white px-4 py-1">
                 Follow
               </a>
             </Link>
           </div>
         </nav>
         <div className="inline-flex space-x-5 text-purple-600 items-center text-xs">
           <h3>Sign In</h3>
           <h3 className="border px-2 py-1 rounded-full border-purple-600">
             Get Started
           </h3>
         </div>
       </div>
     </div>
   </header>
 )
}

export default Header
