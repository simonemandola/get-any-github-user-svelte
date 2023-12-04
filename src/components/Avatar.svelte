<script lang="ts">
    export let avatarUrl = ""
    export let avatarName = ""
</script>

{#if avatarUrl}
    <img
            class="avatar--img"
            src={avatarUrl}
            alt={avatarName}
            loading="lazy"
    >
{:else }
    <i class="icon-user avatar--placeholder" />
{/if}
