<script>
    // Dependency Imports
    import '../app.css';

    // Component Imports
    import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="page">
    <Navbar />
    <slot />
</div>
