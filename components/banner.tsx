import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

const Banner = () => {
 return (
   <section className="bg-purple-400 border-y border-black py-12">
     <div className="container">
       <div className="flex justify-between items-center">
         <div>
           <h1 className="font-serif">
             <span className="text-5xl underline block mb-4">bjh.dev</span>{' '}
             I&apos;m a freelance designer and developer based in Melbourne,
             Australia. I&apos;ve worked in web development, brand identity and
             digital marketing since 2006. I&apos;m currently focused on
             building fast, performance-driven scalable websites with React,
             Gatsby, Next and (occasionally, Vue).
           </h1>
         </div>
         <div className="hidden md:inline-flex">
           <Image
             src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
             alt=""
             layout="intrinsic"
             priority={true}
             width={500}
             height={500}
           />
         </div>
       </div>
     </div>
   </section>
 )
}

export default Banner
