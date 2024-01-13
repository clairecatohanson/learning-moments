import { Routes, Route, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { AllPosts } from "../components/posts/AllPosts"
import { NavBar } from "../components/navbar/NavBar"
import { PostDetails } from "../components/posts/PostDetails"
import { NewPost } from "../components/forms/NewPost"
import { MyPosts } from "../components/posts/MyPosts"
import { EditPost } from "../components/forms/EditPost"
import { Favorites } from "../components/posts/Favorites"
import { Profile } from "../components/profile/Profile"
import { EditProfile } from "../components/forms/EditProfile"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObject)
    }, [])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar currentUser={currentUser} />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<AllPosts />} />
                <Route
                    path="/my-posts"
                    element={<MyPosts currentUser={currentUser} />}
                />
                <Route
                    path="favorites"
                    element={<Favorites currentUser={currentUser} />}
                />
                <Route path="posts/:postId">
                    <Route
                        index
                        element={<PostDetails currentUser={currentUser} />}
                    />
                    <Route path="edit" element={<EditPost />} />
                </Route>
                <Route
                    path="new-post"
                    element={<NewPost currentUser={currentUser} />}
                />
                <Route path="profile">
                    <Route
                        path=":userId"
                        element={<Profile currentUser={currentUser} />}
                    />
                    <Route
                        path="edit"
                        element={<EditProfile currentUser={currentUser} />}
                    />
                </Route>
            </Route>
        </Routes>
    )
}
