<script lang="ts">
	import { receive } from './transitions';
	import { getTwemojiUrl } from './utils';

	export let found: string[];
</script>

<div class="found">
	{#each found as emoji (emoji)}
		<div class="pair">
			<img in:receive={{ key: `${emoji}:a` }} src={getTwemojiUrl(emoji)} alt={emoji} />
			<img in:receive={{ key: `${emoji}:b` }} src={getTwemojiUrl(emoji)} alt={emoji} />
		</div>
	{/each}
</div>

<style>
	.found {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		height: 100%;
		filter: drop-shadow(
			rgba(9, 30, 66, 0.25) 3px 4px 8px -2px,
			rgba(9, 30, 66, 0.08) 0px 0px 0px 1px
		);
	}

	.pair {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 8em;
		height: 8em;
		background: #bdb9b9;
		padding: 1em;
		border-radius: 50%;
		filter: drop-shadow(
			rgba(9, 30, 66, 0.25) 3px 4px 8px -2px,
			rgba(9, 30, 66, 0.08) 0px 0px 0px 1px
		);
	}

	img {
		position: absolute;
		width: 4em;
		height: 4em;
	}
</style>
