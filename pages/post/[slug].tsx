import * as React from 'react';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../types';
import { GetStaticPaths, GetStaticProps } from 'next'
import PortableText from 'react-portable-text';
import Image from 'next/image';
import {useForm, SubmitHandler } from 'react-hook-form';
import { CheckCircleIcon } from '@heroicons/react/solid'

interface Props {
  post: Post;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string
}

function Post({post}: Props){

  const [ submitted, setSubmitted ] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors},
   } = useForm<IFormInput>();

   const onSubmit: SubmitHandler<IFormInput> =
    async (data) => {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_DOMAIN}api/createComment`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then(() => {
          console.log(data)
          setSubmitted(true)
        })
        .catch((err) => {
          console.log(err)
          setSubmitted(false)
        })
   }
 return (
   <>
     <Image
       src={urlFor(post.mainImage).url()!}
       alt={post.title}
       layout="responsive"
       priority={true}
       width={1920}
       height={860}
     />
     <article className="container prose mx-auto">
       <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
       <h3 className="text-xl font-light">{post.description}</h3>
       <div className="flex items-center space-x-2">
         <Image
           className="h-12 w-12 m-2 rounded-full"
           src={urlFor(post.author.image).url()!}
           alt={post.author.name}
           width={48}
           height={48}
         />
         <p className="font-extralight text-sm">
           Post by <span className="text-green-600">{post.author.name}</span> -
           Published on {new Date(post._createdAt).toLocaleDateString()}
         </p>
       </div>
       <div>
         <PortableText content={post.body || []} />
       </div>
     </article>

     <hr className="w-1/2 mx-auto border border-purple-600 my-12" />

     <div className="container prose">
       {submitted ? (
         <div className="rounded-md bg-purple-50 p-4 mb-24">
           <div className="flex">
             <div className="flex-shrink-0 mt-1">
               <CheckCircleIcon
                 className="h-5 w-5 text-purple-400"
                 aria-hidden="true"
               />
             </div>
             <div className="ml-3">
               <h3 className="text-xl font-medium text-purple-800 m-0">
                 Comment Submitted
               </h3>
               <div className="mt-2 text-sm text-purple-700 m-0">
                 <p>
                   {' '}
                   Comments are held for moderation. Once approved your comment
                   will appear below.
                 </p>
               </div>
             </div>
           </div>
         </div>
       ) : (
         <form
           onSubmit={handleSubmit(onSubmit)}
           className="flex flex-col py-6 mb-12"
         >
           <input
             {...register('_id')}
             type="hidden"
             name="_id"
             value={post._id}
           />

           <h3 className="text-sm text-purple-600">Enjoy the article?</h3>
           <h4 className="text-3xl font-bold">Leave a comment below.</h4>
           <hr className="py-3 mt-2 mb-0" />
           <div className="my-2 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-purple-600 focus-within:border-purple-600">
             <label
               htmlFor="name"
               className="block text-xs font-medium text-gray-900"
             >
               Name
             </label>
             <input
               type="text"
               {...register('name', { required: true })}
               id="name"
               className="block w-full border-0 p-0 text-gray-900 placeholder-gray-4 00 focus:ring-0 sm:text-sm"
               placeholder="Jane Smith"
             />
           </div>

           <div className="my-2 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-purple-600 focus-within:border-purple-600">
             <label
               htmlFor="email"
               className="block text-xs font-medium text-gray-900"
             >
               Email
             </label>
             <input
               type="email"
               {...register('email', { required: true })}
               id="email"
               className="block w-full border-0 p-0 text-gray-900 placeholder-gray-4 00 focus:ring-0 sm:text-sm"
               placeholder="jane.smith@example.com"
             />
           </div>
           <div className="my-2 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-purple-600 focus-within:border-purple-600">
             <label
               htmlFor="comment"
               className="block text-xs font-medium text-gray-900"
             >
               Comment
             </label>
             <textarea
               rows={8}
               {...register('comment', { required: true })}
               id="comment"
               className="block w-full border-0 p-0 text-gray-900 placeholder-gray-4 00 focus:ring-0 sm:text-sm"
               placeholder="Your comment here..."
             />
           </div>
           <div>
             <button
               type="submit"
               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
             >
               Leave a comment
             </button>
           </div>
           {/* errors will return when field validation fails */}
           <div className="flex flex-col gap-y-2">
             {errors.name && (
               <span className="text-red-600">The Name field is required</span>
             )}
             {errors.email && (
               <span className="text-red-600">The Email field is required</span>
             )}
             {errors.comment && (
               <span className="text-red-600">
                 The Comment field is required
               </span>
             )}
           </div>
         </form>
       )}
     </div>
     {/* Show Comments */}
     {post.comments ? (
       <div className="container prose mb-12">
         <div className="shadow-md shadow-purple-200 p-4 rounded-md bg-gray-50">
           <h4 className="text-xl m-0 mb-2">Comments.</h4>
           <hr className="my-2" />
           <div className="flex flex-col gap-y-2">
             {post.comments.map((comment) => (
               <div key={comment._id} className="text-xs">
                 <p className="m-0">
                   <span className="text-purple-600 mr-2">
                     {comment.name} said:
                   </span>
                   {comment.comment}
                 </p>
               </div>
             ))}
           </div>
         </div>
       </div>
     ) : ''}
   </>
 )
}

export default Post

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      author -> {
        name,
        image
      },
      'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
      description,
      mainImage,
      slug,
      body
    }
  `

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}


export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}
