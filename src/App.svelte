<script lang="ts">
  import {mousePosition, usersData} from "@/store/store"
  import Form from "@/components/Form.svelte"
  import Toast from "@/components/Toast.svelte"
  import Results from "@/components/Results.svelte"
  import Loading from "@/components/Loading.svelte"
  import Paginator from "@/components/Paginator.svelte"
  import NoResults from "@/components/NoResults.svelte"
  import Header from "@/components/Header.svelte"
  import Modal from "@/components/Modal.svelte"
  import type {UserData} from "@/data/types";

  $: existUsers = ($usersData as UserData).items?.length > 0
  $: mouseX = 0
  $: mouseY = 0
  $: if (!existUsers) {
    mouseX = ($mousePosition.x / window.innerWidth) * 2 -1
    mouseY = ($mousePosition.y / window.innerHeight) * 2 + 1
  }

</script>

<Header />
<main
        class="home"
        class:container={!existUsers}
        class:showing-results={existUsers}
        style={`--mousex: ${mouseX}%; --mousey: ${mouseY}%`}
>
  {#if existUsers}
    <section class="result">
      <Form />
      <Results />
      <Paginator />
    </section>
    {:else}
    <section class="no-results">
      <NoResults />
      <Form />
    </section>
  {/if}
</main>
<Modal />
<Toast />
<Loading />
