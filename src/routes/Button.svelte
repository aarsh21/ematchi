<script>
	function toggle() {
		window.document.body.classList.toggle('dark-mode');
	}
</script>

<button on:click={toggle}>
	<slot />
</button>

<style>
	button {
		position: fixed;
		top: 1em;
		right: 2em;
		background-color: rgb(0, 0, 0);
		color: rgb(255, 255, 255);
		border: none;
		border-radius: 4px;
		padding: 0.5rem;
		text-transform: uppercase;
	}
	:global(body.dark-mode) button {
		background-color: #ffffff;
		color: hsl(180, 13%, 24%);
	}
</style>
