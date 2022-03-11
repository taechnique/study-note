import { Octokit, App } from "octokit"

const octokit = new Octokit({ auth: `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`})

const {
    data: { login },
} = await octokit.rest.users.getAuthenticated()

console.log("Successfully Logged in with [ %s ]", login)

