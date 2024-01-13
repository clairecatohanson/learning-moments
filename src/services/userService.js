export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
        res.json()
    )
}

export const createUser = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then((res) => res.json())
}

export const getUserById = (currentUserId) => {
    return fetch(
        `http://localhost:8088/users/${currentUserId}?_embed=favorites&_embed=posts`
    ).then((userObj) => userObj.json())
}

export const updateUser = async (updatedUserObj) => {
    const putOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserObj),
    }

    return await fetch(
        `http://localhost:8088/users/${updatedUserObj.id}`,
        putOptions
    )
}
