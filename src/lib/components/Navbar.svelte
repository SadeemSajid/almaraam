<script lang="ts">
    import { onMount } from "svelte";

    // OS Theme Preference
    let darkMode = false;
    onMount(() => {
        // TODO: have system theme preference react to change as well (it does for me)
        darkMode = window.matchMedia('prefers-color-scheme: dark').matches;
    });

    // TODO: Theme persistence
    // TODO: Menu drawer

</script>

<div class="flex justify-between px-4 md:px-24 md:pt-16 pt-8 pb-24">
    <div class="flex gap-4">
        <button class="btn btn-circle btn-sm btn-secondary"></button>
        <a href="/"><button class="btn btn-circle btn-sm btn-accent"></button></a>
    </div>
    <input type="checkbox" checked={darkMode} value="light" class="theme-btn" on:click={() => darkMode = false}/>
</div>