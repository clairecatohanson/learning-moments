import "./NavBar.css"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav>
            <ul className="navbar">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">
                        All Posts
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/my-posts" className="navbar-link">
                        My Posts
                    </Link>
                </li>
                <li className="navbar-item">Favorites</li>
                <li className="navbar-item">
                    <Link to="/new-post" className="navbar-link">
                        New Post
                    </Link>
                </li>
                {localStorage.getItem("learning_user") ? (
                    <li className="navbar-item navbar-logout">
                        <Link
                            to=""
                            onClick={() => {
                                localStorage.removeItem("learning_user")
                                navigate("/login", { replace: true })
                            }}
                            className="navbar-link"
                        >
                            Logout
                        </Link>
                    </li>
                ) : (
                    ""
                )}
            </ul>
        </nav>
    )
}
