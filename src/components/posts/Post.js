export const Post = ({ post }) => {
    return (
        <div className="post">
            <div className="post-info">
                <h2 className="post-title">{post.title}</h2>
                <div className="post-topic">{post.topic.name}</div>
            </div>
            <div className="post-likes">
                <button className="like-btn">
                    <i className="fa-solid fa-heart"></i>
                </button>
                <span className="like-count">{post.likes}</span>
            </div>
        </div>
    )
}
