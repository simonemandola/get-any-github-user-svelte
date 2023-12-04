<script lang="ts">
    import {fetchMoreUserDetails} from "@/mixins/fetch"

    export let userUrl = ""

    function getSocialProvider(provider: string, url: string): string {
        if (provider !== "generic")
            return provider

        if (url.includes("https://www.")) {
            return url.split(".")[1]
        } else {
            return url.split("//")[1].split(".")[1]
        }
    }

</script>

{#await fetchMoreUserDetails(userUrl + '/social_accounts') then accountsData }
    {#if accountsData.data.length > 0}
        <ul class="social-list">
            {#each accountsData.data as account}
                <li class="social-list__item" title={getSocialProvider(account.provider, account.url)}>
                    <a href={account.url} target="_blank">
                        <i class={`icon-${getSocialProvider(account.provider, account.url)}`} aria-hidden="true" />
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
{/await}
