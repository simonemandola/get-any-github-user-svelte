<script lang="ts">
    import {blur} from "svelte/transition"
    import {showModal, singleUserData} from "@/store/store"
    import Avatar from "@/components/Avatar.svelte"
    import {formatDate} from "@/mixins/date"
    import {getLatestPublicEvents} from "@/mixins/fetch"
    import SocialList from "@/components/SocialList.svelte"
    import type {SingleUserData} from "@/data/types"
    import imgUrl404 from "@/assets/img/404.webp"

    $: singleUserDataTyped = $singleUserData as SingleUserData
    $: showModal.set(Object.keys($singleUserData || {}).length > 0)
    $: if ($showModal) {
        document.body.classList.add("block-scroll")
        window.onclick = (event: MouseEvent)=> {
            if (event.target !== modal && (event.target as HTMLElement).contains(modal as Node)) {
                closeModal()
            }
        }
    } else {
        document.body.classList.remove("block-scroll")
    }

    let modal: HTMLElement

    function formatRepoName(repoName: string): string {
        return repoName.split("/")[1]
    }

    function closeModal(): void {
        singleUserData.set({})
    }

    window.onkeyup = (event)=> {
      if ($showModal) {
        if (event.code === "Escape")
          closeModal()
      }
    }


</script>

{#if $showModal}
    <article class="modal">
        <main class="modal__content" bind:this={modal} transition:blur={{duration: 500, amount: 2}}>
            <button
                    type="button"
                    class="modal__content__close"
                    title="Cerrar"
                    on:click={closeModal}
            >
                <i class="icon-cancel" aria-hidden="true" />
            </button>
            <section class="modal__content__main">
                <div class="modal__content__main__header">
                    <Avatar avatarUrl={singleUserDataTyped.avatar_url} avatarName={singleUserDataTyped.login} />
                    {#if singleUserDataTyped.login}
                      <SocialList userUrl={singleUserDataTyped.url} />
                      <h1 class="modal__content__main__header__name text--title-sm">{singleUserDataTyped.login}</h1>
                    {/if}
                </div>
                <div class="modal__content__main__body">
                    {#if singleUserDataTyped.avatar_url}
                        <ul class="modal__content__main__body__contact-info">
                            <li>
                                <i class="icon-mail" aria-hidden="true" />
                                {#if singleUserDataTyped.email}
                                    <span title="{singleUserDataTyped.email}">{singleUserDataTyped.email}</span>
                                {:else}
                                    <span>n/d</span>
                                {/if}
                            </li>
                            <li>
                                <i class="icon-link" aria-hidden="true" />
                                {#if singleUserDataTyped.blog}
                                    <span title="{singleUserDataTyped.blog}">{singleUserDataTyped.blog}</span>
                                {:else}
                                    <span>n/d</span>
                                {/if}
                            </li>
                        </ul>
                        {#if singleUserDataTyped.bio}
                            <h2 class="text--title-xs">Bio</h2>
                            <p class="modal__content__main__body__bio">{singleUserDataTyped.bio}</p>
                        {/if}
                        {#if singleUserDataTyped.company}
                            <h2 class="text--title-xs">Compañía</h2>
                            <p class="modal__content__main__body__company">
                                <i class="icon-building" aria-hidden="true" />
                                    {singleUserDataTyped.company}
                            </p>
                        {/if}
                        <div class="modal__content__main__body__repos-and-followers">
                            <div>
                                <h2 class="text--small">
                                    <i class="icon-book" aria-hidden="true" /> Repos públicos
                                </h2>
                                <p class="text--title-sm">{singleUserDataTyped.public_repos}</p>
                            </div>
                            <div>
                                <h2 class="text--small">
                                    <i class="icon-group" aria-hidden="true" /> Seguidores
                                </h2>
                                <p class="text--title-sm">{singleUserDataTyped.followers}</p>
                            </div>
                            <div>
                                <h2 class="text--small">
                                    <i class="icon-group" aria-hidden="true" /> Siguiendo
                                </h2>
                                <p class="text--title-sm">{singleUserDataTyped.following}</p>
                            </div>
                        </div>
                        {#if singleUserDataTyped.location}
                            <p class="modal__content__main__body__location">
                                <i class="icon-location" aria-hidden="true" />
                                <span>{singleUserDataTyped.location}</span>
                            </p>
                        {/if}
                        {#await getLatestPublicEvents(singleUserDataTyped.login) then latestCommitsData}
                            {#if latestCommitsData.length > 0}
                                <div class="modal__content__main__body__last-commit-info">
                                    <h2 class="text--title-xs">Último commit</h2>
                                    <ul class="modal__content__main__body__last-commit-info__list">
                                        <li>{formatDate(latestCommitsData[0].created_at)}</li>
                                        <li>
                                            <span class="text--bold">Nombre: </span>
                                            {latestCommitsData[0].payload.commits[0].message}
                                        </li>
                                        <li>
                                            <span class="text--bold">Repo: </span>
                                            {formatRepoName(latestCommitsData[0].repo.name)}
                                        </li>
                                    </ul>
                                </div>
                            {/if}
                        {/await}
                        <div class="modal__content__main__body__footer">
                            <p class="modal__content__main__body__footer__created text--small">
                                <span class="text--bold">Usuario desde:</span>
                                <span>{formatDate(singleUserDataTyped.created_at)}</span>
                            </p>
                            <a
                                    href={singleUserDataTyped.html_url}
                                    target="_blank"
                                    class="button button--secondary modal__content__main__body__footer__profile-link"
                            >
                                Ver perfil
                                <i class="icon-link-ext" aria-hidden="true" />
                            </a>
                        </div>
                        {:else}
                        <section class="modal__content__main__body__not-found">
                            <h1 class="text--title-xs modal__content__main__body__not-found__title">
                                Parece que este usuario ya no existe
                            </h1>
                            <img
                                    class="modal__content__main__body__not-found__img"
                                    src={imgUrl404}
                                    alt="Usuario no encontrado"
                            >
                        </section>
                    {/if}
                </div>
            </section>
        </main>
    </article>
{/if}
