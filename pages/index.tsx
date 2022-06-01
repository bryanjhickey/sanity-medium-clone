import type { NextPage } from 'next'
import { sanityClient, urlFor } from '../sanity';
import Head from 'next/head'
import Link from 'next/link'
import { Post } from '../types'
import Image from 'next/image';
import Banner from '../components/banner';

interface Props {
  posts: [Post];
}

export default function Home({posts}: Props) {
  return (
    <>
      <Head>
        <title>Medium Blog | 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Banner />
        {/* posts */}
        <section className="container py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-4">
            {posts.map((post) => (
              <Link href={`/post/${post.slug.current}`} key={post._id}>
                <div className="group cursor-pointer rounded-lg overflow-hidden border">
                  <Image
                    className="h-60 w-full object-cover group-hover:scale-105 transition-transform ease-in-out"
                    src={urlFor(post.mainImage).url()!}
                    alt={post.title}
                    layout="responsive"
                    priority={true}
                    width={1920}
                    height={860}
                  />
                  <aside className="flex justify-between p-5 bg-white">
                    <div>
                      <h3 className="font-bold">{post.title}</h3>
                      <p className="text-xs">
                        {post.description} by {post.author.name}
                      </p>
                    </div>

                    <div className="h-12 w-12 mx-2 ">
                      <Image
                        className="rounded-full"
                        src={urlFor(post.author.image).url()!}
                        alt={post.author.name}
                        layout="fixed"
                        priority={true}
                        width={48}
                        height={48}
                      />
                    </div>
                  </aside>
                </div>
              </Link>
            ))}
          </div>
        </section>
    </>
  )
}

export const getServerSideProps = async () => {
  const query =
    `*[_type == "post"]
    {
      _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug
    }
  `;

  const posts = await sanityClient.fetch(query);

return {
  props: {
      posts,
    }
  }
}
