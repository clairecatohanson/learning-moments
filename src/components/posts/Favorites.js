import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
    getFavoritesByUserId,
    removeFromFavorites,
    updatePost,
} from "../../services/postService"

export const Favorites = ({ currentUser }) => {
    const [userFavorites, setUserFavorites] = useState([])

    const getAndSetFavorites = () => {
        getFavoritesByUserId(currentUser.id).then((favoritesArray) => {
            setUserFavorites(favoritesArray)
        })
    }

    useEffect(() => {
        currentUser.id && getAndSetFavorites()
    }, [currentUser])

    const handleRemoveLike = (event) => {
        const favoriteId = parseInt(event.target.id)
        const currentFavorite = userFavorites.find(
            (favorite) => favorite.id === favoriteId
        )

        const updatedPost = {
            id: currentFavorite.post.id,
            title: currentFavorite.post.title,
            body: currentFavorite.post.body,
            date: currentFavorite.post.date,
            likes: currentFavorite.post.likes - 1,
            userId: currentFavorite.post.userId,
            topicId: currentFavorite.post.topicId,
        }

        updatePost(updatedPost).then(() => {
            removeFromFavorites(favoriteId).then(() => {
                getAndSetFavorites()
            })
        })
    }

    return (
        <>
            <h2 className="page-heading">My Favorites</h2>
            <div className="favorites-container">
                {userFavorites.map((favoriteObj) => {
                    return (
                        <div key={favoriteObj.id} className="post-full-width">
                            <div className="post-title">
                                <Link
                                    to={`/posts/${favoriteObj.post.id}`}
                                    className="title-link"
                                >
                                    {favoriteObj.post.title}
                                </Link>
                            </div>
                            <button
                                id={favoriteObj.id}
                                className="unlike-post-btn light-bg-btn"
                                onClick={handleRemoveLike}
                            >
                                Remove Like
                            </button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
