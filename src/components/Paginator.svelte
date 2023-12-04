<script lang="ts">
    import {paginator, currentPage} from "@/store/store"
    import {fetchGitHubUsers} from "@/mixins/fetch"

    $: existPages = Object.keys($paginator || {}).length > 0

</script>

{#if existPages}
    <ul class="container paginator">
        <li class="paginator__item">
            <button
                    class="button button--primary"
                    type="button"
                    on:click={()=> fetchGitHubUsers("", $paginator.first)}
                    disabled={!$paginator.first}
                    title="Primera"
            >
                <i class="icon-angle-double-left" aria-hidden="true" />
            </button>
        </li>
        <li class="paginator__item">
            <button
                    class="button button--primary"
                    type="button"
                    on:click={()=> fetchGitHubUsers("", $paginator.prev)}
                    disabled={!$paginator.prev}
                    title="Anterior"
            >
                <i class="icon-angle-left" aria-hidden="true" />
            </button>
        </li>
        <li>
            <p>{$currentPage}</p>
        </li>
        <li class="paginator__item">
            <button
                    class="button button--primary"
                    type="button"
                    on:click={()=> fetchGitHubUsers("", $paginator.next)}
                    disabled={!$paginator.next}
                    title="Siguiente"
            >
                <i class="icon-angle-right" aria-hidden="true" />
            </button>
        </li>
        <li class="paginator__item">
            <button
                    class="button button--primary"
                    type="button"
                    on:click={()=> fetchGitHubUsers("", $paginator.last)}
                    disabled={!$paginator.last}
                    title="Última"
            >
                <i class="icon-angle-double-right" aria-hidden="true" />
            </button>
        </li>
    </ul>
{/if}