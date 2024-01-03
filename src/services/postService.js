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
