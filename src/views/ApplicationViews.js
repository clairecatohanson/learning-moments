import { Routes, Route, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { AllPosts } from "../components/posts/AllPosts"
import { NavBar } from "../components/navbar/NavBar"
import { PostDetails } from "../components/posts/PostDetails"
import { NewPost } from "../components/forms/NewPost"
import { MyPosts } from "../components/posts/MyPosts"

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
                        <NavBar />
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
                    path="posts/:postId"
                    element={<PostDetails currentUser={currentUser} />}
                />
                <Route
                    path="new-post"
                    element={<NewPost currentUser={currentUser} />}
                />
            </Route>
        </Routes>
    )
}
