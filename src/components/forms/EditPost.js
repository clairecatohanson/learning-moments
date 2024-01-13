import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
    getAllTopics,
    getPostById,
    updatePost,
} from "../../services/postService"
import "./Forms.css"

export const EditPost = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const [currentPost, setCurrentPost] = useState({})
    const [allTopics, setAllTopics] = useState([])

    useEffect(() => {
        getAllTopics().then((topicsArray) => {
            setAllTopics(topicsArray)
        })
    }, [])

    useEffect(() => {
        getPostById(postId).then((postObj) => {
            setCurrentPost(postObj)
        })
    }, [postId])

    const handleInputChange = (event) => {
        const postCopy = { ...currentPost }
        if (event.target.name === "title" || event.target.name === "body") {
            postCopy[event.target.name] = event.target.value
        } else if (event.target.name === "topicId") {
            postCopy[event.target.name] = parseInt(event.target.value)
        }
        setCurrentPost(postCopy)
    }

    const handleSave = (event) => {
        event.preventDefault()

        const updatedDate = new Date()
        const updatedPost = {
            id: currentPost.id,
            title: currentPost.title,
            body: currentPost.body,
            date: updatedDate,
            likes: currentPost.likes,
            userId: currentPost.userId,
            topicId: currentPost.topicId,
        }

        updatePost(updatedPost).then(() => {
            navigate("/my-posts")
        })
    }

    return (
        <>
            <div className="form-container">
                <h2 className="page-heading">Edit Your Post</h2>
                <form id="edit-post-form">
                    <div className="form-group">
                        <label className="form-label" htmlFor="form-title">
                            Title
                        </label>
                        <input
                            id="form-title"
                            className="form-input"
                            name="title"
                            required
                            type="text"
                            value={currentPost.title ? currentPost.title : ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="form-body">
                            Body
                        </label>
                        <textarea
                            id="form-body"
                            className="form-input"
                            name="body"
                            required
                            rows="6"
                            value={currentPost.body ? currentPost.body : ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="form-topic">
                            Topic
                        </label>
                        <select
                            id="form-topic"
                            className="form-input"
                            name="topicId"
                            required
                            value={
                                currentPost.topicId ? currentPost.topicId : 0
                            }
                            onChange={handleInputChange}
                        >
                            {allTopics.map((topic) => {
                                return (
                                    <option value={topic.id} key={topic.id}>
                                        {topic.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-btns">
                        <button className="save-btn" onClick={handleSave}>
                            Save Post
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
