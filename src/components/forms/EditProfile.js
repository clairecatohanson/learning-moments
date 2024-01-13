import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getUserById, updateUser } from "../../services/userService"

export const EditProfile = ({ currentUser }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})

    useEffect(() => {
        currentUser.id &&
            getUserById(currentUser.id).then((userObj) => setUser(userObj))
    }, [currentUser])

    const handleInputChange = (event) => {
        const userCopy = { ...user }
        userCopy[event.target.name] = event.target.value
        setUser(userCopy)
    }

    const handleSave = (event) => {
        event.preventDefault()

        const updatedUser = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            cohort: parseInt(user.cohort),
        }

        updateUser(updatedUser).then(() => {
            navigate(`/profile/${user.id}`)
        })
    }

    return (
        <div className="form-container">
            <h2 className="page-heading">Edit Your Profile</h2>
            <form id="edit-profile-form">
                <div className="form-group">
                    <label className="form-label" htmlFor="form-fullName">
                        Name
                    </label>
                    <input
                        autoComplete="off"
                        id="form-fullName"
                        className="form-input"
                        name="fullName"
                        required
                        type="text"
                        value={user.fullName ? user.fullName : ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="form-cohort">
                        Cohort #
                    </label>
                    <input
                        autoComplete="off"
                        id="form-cohort"
                        className="form-input"
                        name="cohort"
                        required
                        type="text"
                        value={user.cohort ? user.cohort : ""}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-btns">
                    <button className="save-btn" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}
