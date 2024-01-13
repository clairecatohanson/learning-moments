export const getAllPosts = async () => {
    const response = await fetch("http://localhost:8088/posts?_expand=topic")
    const allPosts = await response.json()
    return allPosts
}

export const getAllTopics = async () => {
    const response = await fetch("http://localhost:8088/topics")
    const allTopics = await response.json()
    return allTopics
}

export const getPostById = async (postId) => {
    const response = await fetch(
        `http://localhost:8088/posts/${postId}?_expand=user&_expand=topic&_embed=favorites`
    )
    const fetchedPost = await response.json()
    return fetchedPost
}

export const getFavoritesByUserId = async (userId) => {
    const response = await fetch(
        `http://localhost:8088/favorites?userId=${userId}&_expand=post`
    )
    return await response.json()
}

export const addToFavorites = async (newFavoriteObj) => {
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFavoriteObj),
    }

    return await fetch("http://localhost:8088/favorites", postOptions)
}

export const removeFromFavorites = async (postId) => {
    const deleteOptions = {
        method: "DELETE",
    }

    return await fetch(
        `http://localhost:8088/favorites/${postId}`,
        deleteOptions
    )
}

export const updatePost = async (updatedPostObj) => {
    const putOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPostObj),
    }

    return await fetch(
        `http://localhost:8088/posts/${updatedPostObj.id}`,
        putOptions
    )
}

export const addNewPost = async (newPostObj) => {
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPostObj),
    }

    return await fetch("http://localhost:8088/posts", postOptions)
}

export const deletePost = async (id) => {
    const deleteOptions = {
        method: "DELETE",
    }

    return await fetch(`http://localhost:8088/posts/${id}`, deleteOptions)
}
