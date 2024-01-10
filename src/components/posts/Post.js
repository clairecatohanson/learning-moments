import { Link } from "react-router-dom"

export const Post = ({ post }) => {
    return (
        <div className="post">
            <h2 className="post-title">
                <Link to={`/posts/${post.id}`} className="title-link">
                    {post.title}
                </Link>
            </h2>
            <div className="post-topic">{post.topic.name}</div>
            <div className="post-likes like-info">
                <span className="like-icon">
                    <i className="fa-regular fa-heart"></i>
                </span>
                <span className="like-count">{post.likes}</span>
            </div>
        </div>
    )
}
