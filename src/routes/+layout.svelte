<script lang="ts">
    // Dependency Imports
    import '../app.css';

    // Component Imports
    import Navbar from '$lib/components/Navbar.svelte';
    import Drawer from '$lib/components/Drawer.svelte';

    // Controls Nav Drawer
    let hidden = true;
    function toggleDrawer(event: CustomEvent<{value: boolean}>) {
        hidden = event.detail.value;
    }

</script>

<div class="page">
    <Drawer {hidden} on:hide={(event) => hidden = event.detail.value}/>
    <Navbar drawerHidden={hidden} on:toggleDrawer={toggleDrawer}/>
    <slot />
</div>
