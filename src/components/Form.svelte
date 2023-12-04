<script lang="ts">
    import {toast} from "@/store/store"
    import {ErrorMessages, FORBIDDEN_WORD, MIN_LENGTH_INPUT} from "@/data/data";
    import {fetchGitHubUsers} from "@/mixins/fetch";

    $: username = ""
    $: isDisabledSubmit = (username?.length === 0)

    async function submitForm(): Promise<void> {
        username = username.trim()
        if (username.length < MIN_LENGTH_INPUT || username.toLowerCase().includes(FORBIDDEN_WORD)) {

            if (username.length < MIN_LENGTH_INPUT) {
                toast.update((toast)=> {
                    toast.show = true
                    toast.messages.push(ErrorMessages.MinLength)
                    return toast
                })
            } else {
                toast.update((toast)=> {
                    toast.show = true
                    toast.messages.push(ErrorMessages.ForbiddenWord)
                    return toast
                })
            }
        } else {
            await fetchGitHubUsers(username)
            username = ""
        }
    }

</script>

<form on:submit|preventDefault class="form">
    <div class="input">
        <label class="input__label">
            <input type="text" autocomplete="off" bind:value={username} placeholder="Buscar usuarios...">
        </label>
    </div>
    <button
            class="button button--primary form__submit"
            type="submit"
            on:click={submitForm}
            disabled="{isDisabledSubmit}"
            title="Buscar usuarios"
    >
        <i class="icon-search" aria-hidden="true" />
    </button>
</form>
