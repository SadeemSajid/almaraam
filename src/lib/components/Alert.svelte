<script lang="ts">
	import CrossIcon from '~icons/material-symbols-light/cancel-rounded';
	import { createEventDispatcher } from 'svelte';

	export let message = '';
	export let error = false;

	const dispatch = createEventDispatcher();

	const closeAlert = () => {
		dispatch('close');
	};
</script>

<div
	class="flex w-screen h-screen absolute left-0 top-0 bg-primary bg-opacity-50 backdrop-blur-sm justify-center"
>
	<div
		role="alert"
		class="alert w-fit rounded-none bg-{error
			? 'error'
			: 'primary'} h-28 flex justify-between mt-40 border-0"
	>
		<p>{message}</p>
		<button class="btn m-0 p-0 border-0" on:click={closeAlert}>
			<CrossIcon class="text-secondary w-12 h-12" />
		</button>
	</div>
</div>
