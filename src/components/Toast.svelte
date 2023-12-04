<script>
    import {fly} from "svelte/transition"
    import {toast} from "@/store/store"
</script>

{#if $toast.show}
<article class="toast" transition:fly={{ duration: 800, x: 600, opacity: 0.5 }}>
    <ul>
        {#each $toast.messages as errorMessage}
            <li>{ errorMessage }</li>
        {/each}
    </ul>
</article>
{/if}
