<script lang="ts">
	export let data;
</script>

<div class="xl:mx-80 mx-4 flex flex-col gap-6 md:gap-8">
	{#if data.author}
		<h1>{data.author.name}</h1>
		{#if data.author.description}
			<p>{data.author.description}</p>
		{/if}
	{:else}
		<p>Author not found.</p>
	{/if}
</div>
