import { useParams } from "react-router-dom"
import {
    addToFavorites,
    getPostById,
    removeFromFavorites,
    updatePost,
} from "../../services/postService"
import { useState, useEffect } from "react"
import { getUserById } from "../../services/userService"
import { Link } from "react-router-dom"

export const PostDetails = ({ currentUser }) => {
    const { postId } = useParams()
    const [currentPost, setCurrentPost] = useState({})
    const [currentUserObj, setCurrentUserObj] = useState({})
    const [currentUserFavorites, setCurrentUserFavorites] = useState([])

    const getAndSetPost = (postId) => {
        getPostById(postId).then((postObj) => setCurrentPost(postObj))
    }

    const getAndSetUser = (currentUser) => {
        if (currentUser.id) {
            getUserById(currentUser.id).then((userObj) => {
                setCurrentUserObj(userObj)
                setCurrentUserFavorites(userObj.favorites)
            })
        }
    }

    useEffect(() => {
        getAndSetPost(postId)
        getAndSetUser(currentUser)
    }, [postId, currentUser])

    const formatDate = () => {
        const dateObj = new Date(currentPost.date)
        const formattedDate = `${
            dateObj.getMonth() + 1
        }/${dateObj.getDate()}/${dateObj.getFullYear()}`
        return formattedDate
    }

    const handleAddLike = () => {
        const newFavorite = {
            postId: currentPost.id,
            userId: currentUserObj.id,
        }
        const updatedPostObj = {
            id: currentPost.id,
            title: currentPost.title,
            body: currentPost.body,
            date: currentPost.date,
            likes: currentPost.likes + 1,
            userId: currentPost.userId,
            topicId: currentPost.topicId,
        }

        updatePost(updatedPostObj).then(() => getAndSetPost(postId))
        addToFavorites(newFavorite).then(() => getAndSetUser(currentUser))
    }

    const handleRemoveLike = () => {
        const favoriteId = currentPost.favorites[0].id
        const updatedPostObj = {
            id: currentPost.id,
            title: currentPost.title,
            body: currentPost.body,
            date: currentPost.date,
            likes: currentPost.likes - 1,
            userId: currentPost.userId,
            topicId: currentPost.topicId,
        }
        updatePost(updatedPostObj).then(() => getAndSetPost(postId))
        removeFromFavorites(favoriteId).then(() => getAndSetUser(currentUser))
    }

    const renderLikeOrEditBtns = () => {
        if (currentPost.userId !== currentUser.id) {
            if (
                !currentUserFavorites.find(
                    (favorite) => favorite.postId === currentPost.id
                )
            ) {
                return (
                    <button
                        className="add-like-btn btn-left"
                        onClick={handleAddLike}
                    >
                        <Link
                            to={`/favorites/userId-${currentUser.id}`}
                            className="add-btn-link add-like-btn"
                        >
                            Add Like
                        </Link>
                    </button>
                )
            } else {
                return (
                    <button
                        className="remove-like-btn btn-left"
                        onClick={handleRemoveLike}
                    >
                        <Link to="" className="remove-btn-link">
                            Remove Like
                        </Link>
                    </button>
                )
            }
        } else {
            return (
                <button className="edit-post-btn btn-right">
                    <Link
                        to={`/edit/postId-${currentPost.id}`}
                        className="edit-btn-link"
                    >
                        Edit Post
                    </Link>
                </button>
            )
        }
    }

    return (
        <section className="post full-page-post">
            <div className="post-details">
                <div className="page-heading">{currentPost.title}</div>
                <div className="post-metadata-container">
                    <div className="post-data">
                        <div className="post-author">
                            <div className="author-avatar">
                                <i className="fa-regular fa-user"></i>
                            </div>
                            <div className="author-name">
                                <Link
                                    to={`/profiles/${currentPost.userId}`}
                                    className="author-link"
                                >
                                    {currentPost.user?.fullName}
                                </Link>
                            </div>
                        </div>
                        <div className="post-topic">
                            {currentPost.topic?.name}
                        </div>
                    </div>
                    <div className="post-date">Posted on {formatDate()}</div>
                </div>
            </div>
            <div className="post-body">{currentPost.body}</div>
            <div className="like-info post-likes">
                <span className="like-icon">
                    <i className="fa-regular fa-heart"></i>
                </span>
                <span className="like-count">{currentPost.likes}</span>
            </div>
            <div className="post-actions">
                <div className="btns-container">{renderLikeOrEditBtns()}</div>
            </div>
        </section>
    )
}
