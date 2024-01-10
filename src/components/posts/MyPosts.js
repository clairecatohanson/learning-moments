import { useEffect, useState } from "react"
import { deletePost, getAllPosts } from "../../services/postService"
import { Link } from "react-router-dom"

export const MyPosts = ({ currentUser }) => {
    const [currentUserPosts, setCurrentUserPosts] = useState([])

    const getAndSetUserPosts = () => {
        getAllPosts().then((allPostsArray) => {
            const filteredPosts = allPostsArray.filter(
                (post) => post.userId === currentUser.id
            )
            setCurrentUserPosts(filteredPosts)
        })
    }

    useEffect(() => {
        getAndSetUserPosts()
    }, [currentUser])

    const handleDeletePost = (event) => {
        deletePost(event.target.id).then(() => {
            getAndSetUserPosts()
        })
    }

    return (
        <>
            <h2 className="page-heading">My Posts</h2>
            <div className="my-posts-container">
                {currentUserPosts.map((postObj) => {
                    return (
                        <div key={postObj.id} className="post-full-width">
                            <div className="post-title">
                                <Link
                                    to={`/posts/${postObj.id}`}
                                    className="title-link"
                                >
                                    {postObj.title}
                                </Link>
                            </div>
                            <button
                                id={postObj.id}
                                className="delete-post-btn light-bg-btn"
                                onClick={handleDeletePost}
                            >
                                Delete Post
                            </button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
