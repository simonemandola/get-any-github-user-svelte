<script lang="ts">
    import {onMount} from "svelte"
    import {usersData} from "@/store/store"
    import {fetchMoreUserDetails, getSingleUser} from "@/mixins/fetch"
    import Avatar from "@/components/Avatar.svelte"
    import SocialList from "@/components/SocialList.svelte";

    let logoPositionX: number

    function handleGetSingleUser(event: MouseEvent, username: string): void {
        event.stopPropagation()
        getSingleUser(username)
    }

    function handleCardKeyUpEvent(event: KeyboardEvent, username: string): void {
        if (event.code === "Enter") {
            event.stopPropagation()
            getSingleUser(username)
        }
    }

    function onResize(): void {
        logoPositionX = (document.querySelector("#logo") as HTMLElement).getBoundingClientRect().x
    }

    onMount(() => {
        onResize()
   		window.addEventListener("resize", onResize)
   		return () => window.removeEventListener("resize", onResize)
   	})

</script>

<p class="container result__total-count">
    <span class="text--bold">{$usersData.total_count}</span>
    <span>{$usersData.total_count > 1 ? 'usuarios encontrados' : 'usuario encontrado'}</span>
</p>
<div class="result__list-container">
    <ul class="result__list">
        {#each $usersData.items as user}
            <li class="result__list__item">
                <div
                        role="button"
                        tabindex="0"
                        class="result__list__item__card"
                        style:transform="{`translateX(${logoPositionX}px)`}"
                        on:click={(event)=> handleGetSingleUser(event, user.login)}
                        on:keyup={(event)=> handleCardKeyUpEvent(event, user.login)}
                >
                    <div class="result__list__item__card__inner-wrap">
                        <Avatar avatarUrl={user.avatar_url} avatarName={user.login} />
                        <div>
                            <a href={user.html_url} target="_blank" class="result__list__item__card__inner-wrap__username" on:click={(event)=> event.stopPropagation()}>
                                <span class="text--bold">{ user.login }</span>
                                <i class="icon-link-ext result__list__item__card__inner-wrap__username__icon-link" aria-hidden="true" />
                            </a>
                            <SocialList userUrl={user.url} />
                        </div>
                        <div class="result__list__item__card__inner-wrap__details">
                            {#await fetchMoreUserDetails(user.repos_url) then reposData }
                                {#if reposData?.data.length > 0}
                                    <p title="Repositorios">
                                        <i class="icon-book" aria-hidden="true" />
                                        { reposData?.hasMore ? '+' : '' }{ reposData?.data.length }
                                    </p>
                                {:else}
                                    <p title="Repositorios">
                                        <i class="icon-book" aria-hidden="true" />
                                        <span>{ reposData?.data.length ?? 0 }</span>
                                    </p>
                                {/if}
                            {/await}
                            {#await fetchMoreUserDetails(user.followers_url) then followersData }
                                {#if followersData.data.length > 0}
                                    <p title="Seguidores">
                                        <i class="icon-group" aria-hidden="true" />
                                        <span>{ followersData.hasMore ? '+' : '' }{ followersData.data.length }</span>
                                    </p>
                                    <ul class="result__list__item__card__inner-wrap__details__followers__list">
                                        {#each followersData.data as follower}
                                            <li
                                                    class="result__list__item__card__inner-wrap__details__followers__list__item"
                                                    title={follower.login}
                                            >
                                                <div
                                                        role="button"
                                                        tabindex="0"
                                                        on:click={(event)=> handleGetSingleUser(event, follower.login)}
                                                        on:keyup={(event)=> handleCardKeyUpEvent(event, follower.login)}
                                                >
                                                    <Avatar avatarUrl={follower.avatar_url} avatarName={follower.login} />
                                                </div>
                                            </li>
                                        {/each}
                                    </ul>
                                {:else}
                                    <p title="Seguidores">
                                        <i class="icon-group" aria-hidden="true" />
                                        <span>{ followersData.data.length ?? 0 }</span>
                                    </p>
                                {/if}
                            {/await}
                        </div>
                    </div>
                </div>
            </li>
        {/each}
    </ul>
</div>
