
export interface UserData {
    total_count: number,
    items: {
        login: string,
        avatar_url: string,
        html_url: string,
        url: string,
        repos_url: string,
        followers_url: string,
    }[]
}

export interface SingleUserData {
    created_at: string,
    avatar_url: string,
    url: string,
    login: string,
    email: string,
    blog: string,
    bio: string,
    company: string,
    public_repos: number,
    followers: number,
    following: number,
    location: string,
    html_url: string,
}

export interface latestCommitData {
    created_at: string,
    repo: {
        name: string,
    },
    payload: {
        commits: {
            message: string,
        }[]
    }
}

export interface ReposData {
    hasMore: boolean,
    data: any
}

export interface FollowersData extends Pick<ReposData, "hasMore"> {
    data: {
        login: string,
        avatar_url: string,
    }
}

export interface Paginator {
    first?: string,
    prev?: string,
    next?: string,
    last?: string,
}

