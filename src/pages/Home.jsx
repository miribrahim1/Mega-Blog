import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'


function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className='py-8 w-full mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='w-full p-2'>
                            <h2 className='text-2xl font-bold hover:text-gray-500'>
                                Login to read posts
                            </h2>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='py-8 w-full'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home