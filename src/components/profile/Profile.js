import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getUserById } from "../../services/userService"
import "./Profile.css"

export const Profile = ({ currentUser }) => {
    const { userId } = useParams()
    const [profile, setProfile] = useState({})

    useEffect(() => {
        getUserById(userId).then((userObj) => {
            setProfile(userObj)
        })
    }, [userId])

    return (
        <div className="profile-container">
            <section className="user">
                <div className="user-info">
                    <div className="user-avatar">
                        <i className="fa-regular fa-user"></i>
                    </div>
                    <div className="user-details">
                        <div className="user-name">{profile.fullName}</div>
                        <div className="user-cohort">
                            Cohort #{profile.cohort}
                        </div>
                    </div>
                </div>
                <div className="post-info">
                    <div className="post-count">{profile.posts?.length}</div>
                    <div className="post-label">posts written</div>
                </div>
            </section>
            {currentUser.id === parseInt(userId) ? (
                <section className="btns-container">
                    <button className="edit-btn">
                        <Link to="/profile/edit" className="btn-link">
                            Edit
                        </Link>
                    </button>
                </section>
            ) : (
                ""
            )}
        </div>
    )
}
