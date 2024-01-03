import { useState, useEffect } from "react"
import { getAllPosts, getAllTopics } from "../../services/postService"
import { Post } from "./Post"
import "./Posts.css"
import { FilterBar } from "./FilterBar"

export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [singleFilteredPosts, setSingleFilteredPosts] = useState([])
    const [doubleFilteredPosts, setDoubleFilteredPosts] = useState([])
    const [topicDropdownSelection, setTopicDropdownSelection] = useState(0)
    const [searchbarInput, setSearchbarInput] = useState("")

    useEffect(() => {
        getAllPosts().then((res) => setAllPosts(res))
        getAllTopics().then((res) => setAllTopics(res))
    }, [])

    useEffect(() => {
        if (parseInt(topicDropdownSelection) === 0) {
            setSingleFilteredPosts(allPosts)
        } else {
            const postsByDropdown = allPosts.filter(
                (post) =>
                    parseInt(post.topic.id) === parseInt(topicDropdownSelection)
            )
            setSingleFilteredPosts(postsByDropdown)
        }
    }, [searchbarInput, topicDropdownSelection, allPosts])

    useEffect(() => {
        const postsBySearchbar = singleFilteredPosts.filter((post) =>
            post.title.toLowerCase().includes(searchbarInput.toLowerCase())
        )
        setDoubleFilteredPosts(postsBySearchbar)
    }, [searchbarInput, singleFilteredPosts])

    return (
        <>
            <FilterBar
                allTopics={allTopics}
                setSearchbarInput={setSearchbarInput}
                setTopicDropdownSelection={setTopicDropdownSelection}
            />
            <section className="page-heading">All Posts</section>
            <section className="posts">
                {doubleFilteredPosts.map((post) => {
                    return <Post post={post} key={post.id} />
                })}
            </section>
        </>
    )
}
