import { useNavigate } from "react-router-dom"
import { addNewPost, getAllTopics } from "../../services/postService"
import { useState, useEffect } from "react"

export const NewPost = ({ currentUser }) => {
    const navigate = useNavigate()

    const [allTopics, setAllTopics] = useState([])
    const [title, setTitle] = useState("")
    const [postBody, setPostBody] = useState("")
    const [topicSelection, setTopicSelection] = useState(0)

    useEffect(() => {
        getAllTopics().then((topicsArr) => {
            setAllTopics(topicsArr)
        })
    }, [])

    const handleSavePost = (event) => {
        event.preventDefault()

        const newPost = {
            title: title,
            body: postBody,
            date: new Date(),
            likes: 0,
            userId: currentUser.id,
            topicId: parseInt(topicSelection),
        }
        addNewPost(newPost).then(() => {
            navigate("/my-posts")
        })
    }

    return (
        <>
            <div className="form-container">
                <h2 className="page-heading">New Post</h2>
                <form id="new-post-form">
                    <div>
                        <label htmlFor="form-title">Title</label>
                        <input
                            autoComplete="off"
                            autoFocus
                            id="form-title"
                            name="new-post-title"
                            placeholder="Enter title..."
                            required
                            type="text"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="form-body">Body</label>
                        <textarea
                            id="form-body"
                            name="new-post-body"
                            placeholder="Enter post..."
                            required
                            rows="5"
                            value={postBody}
                            onChange={(event) => {
                                setPostBody(event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="form-topic">Topic</label>
                        <select
                            id="form-topic"
                            required
                            value={topicSelection}
                            onChange={(event) => {
                                setTopicSelection(event.target.value)
                            }}
                        >
                            <option value="0">Select topic...</option>
                            {allTopics.map((topic) => {
                                return (
                                    <option value={topic.id} key={topic.id}>
                                        {topic.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <button onClick={handleSavePost}>Save Post</button>
                    </div>
                </form>
            </div>
        </>
    )
}
