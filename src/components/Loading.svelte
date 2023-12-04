<script lang="ts">
    import {showLoading} from "@/store/store"
    import {blur} from "svelte/transition"
</script>

{#if $showLoading}
    <article class="loading" transition:blur={{duration: 500, amount: 10}}>
        <main>
            <p>
                <i class="icon-spin animation--spinner"></i>
                Cargando...
            </p>
        </main>
    </article>
{/if}