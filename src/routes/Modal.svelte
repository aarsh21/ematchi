<script>
	import Button from './Button.svelte';
</script>

<div class="modal-background">
	<div class="modal">
		<slot />
		<Button>dark-mode</Button>
	</div>
</div>

<style>
	:global(body) {
		background-color: #ffffff;
		color: #000000;
		transition: background-color 0.3s;
	}
	:global(body.dark-mode) {
		background-color: #000000;
		color: rgb(0, 0, 0);
	}
	.modal-background {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(250px);
		display: grid;
		place-items: center;
		z-index: 999;
	}
</style>
