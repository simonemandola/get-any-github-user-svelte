import {currentPage, paginator, showLoading, singleUserData, toast, usersData} from "@/store/store"
import {ErrorMessages} from "@/data/data"
import type {FollowersData, latestCommitData, ReposData} from "@/data/types";

const BASE_URL = "https://api.github.com"

export const headers = {
    Authorization: import.meta.env.VITE_GITHUB_TOKEN,
    accept: "application/vnd.github+json"
}

function pushMessageToToast(message: string): void {
    toast.update((toast)=> {
        toast.show = true
        toast.messages.push(message)
        return toast
    })
}

export function parseResponseHeadersLinks(headersLinks: string | null): object {
    if (headersLinks === null)
        return {}

    const links = {}

    headersLinks.split(",").forEach((link: string): void => {

        const url: string = /<([^>]+)/g.exec(link)![1]
        const rel: string = /rel="([^"]+)/g.exec(link)![1]

        Object.assign(links, {[rel]: url})

    })
    return links
}

export async function fetchGitHubUsers(username: string, url?: string): Promise<void> {
    showLoading.set(true)
    try {

        if (url) {
            currentPage.set(parseInt(url?.split(/&page=/)[1]))
        } else {
            currentPage.set(1)
        }

        const urlToFetch: string = url
            ? url
            : `${BASE_URL}/search/users?q=${username}+in:login&per_page=10`

        const response = await fetch( urlToFetch, { headers })
        paginator.set(parseResponseHeadersLinks(response.headers.get("link")))

        const dataJson = await response.json()

        if (dataJson.items.length === 0) {
            pushMessageToToast(ErrorMessages.NotFound)
        } else {
            usersData.set(dataJson)
        }
    } catch (error) {
        pushMessageToToast(ErrorMessages.General)
        console.error(error)
    } finally {
        showLoading.set(false)
    }
}

export async function getSingleUser(username: string): Promise<void> {
    showLoading.set(true)
    try {
        const response = await fetch( `${BASE_URL}/users/${username}`, { headers })
        const data = await response.json()
        singleUserData.set(data)
    } catch (error) {
        pushMessageToToast(ErrorMessages.General)
        console.error(error)
    } finally {
        showLoading.set(false)
    }
}

export async function getLatestPublicEvents(username: string): Promise<latestCommitData[]> {
    showLoading.set(true)
    try {
        const response = await fetch(`${BASE_URL}/users/${username}/events/public`, { headers })
        const data = await response.json()
        return data.filter((repoEvent: {type: string})=> {
            return repoEvent.type === "PushEvent";
        })
    } catch (error) {
        pushMessageToToast(ErrorMessages.General)
        console.error(error)
        return []
    } finally {
        showLoading.set(false)
    }
}

export async function fetchMoreUserDetails(url: string): Promise<ReposData | FollowersData> {
    try {
        const response = await fetch(url, { headers })
        return {
            hasMore: !!(response.headers.get("link")),
            data: await response.json(),
        }
    } catch (error) {
        console.error(error)
        return {} as ReposData | FollowersData
    }
}
