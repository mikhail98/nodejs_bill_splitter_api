
//User creation
const cannotCreateUser = createError(101, "Cannot create user")
const userExits = createError(102, "This user also exists")

//Not found
const noSuchUser = createError(201, "No such user")

//Auth
const tokenRequired = createError(301, "Token is required")
const invalidToken = createError(302, "Invalid token")
const accessDenied = createError(303, "Access denied")

//Google
const invalidGoogleToken = createError(401, "Invalid Google token")

function createError(code, msg) {
    return {
        errorCode: code,
        errorMessage: msg
    }
}

module.exports = {
    cannotCreateUser,
    userExits,

    noSuchUser,

    tokenRequired,
    invalidToken,
    accessDenied,

    invalidGoogleToken
}
