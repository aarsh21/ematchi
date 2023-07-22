<script lang="ts">
	import Grid from './Grid.svelte';
	import { levels } from './levels';
	import type { Level } from './levels';

	const level = levels[0];

	let size: number = level.size;
	let grid: string[] = createGrid(level);
	let found: string[] = [];

	function createGrid(level: Level) {
		const copy = level.emojis.slice();
		const pairs: string[] = [];

		for (let i = 0; i < (size * size) / 2; i += 1) {
			const index = Math.floor(Math.random() * copy.length);
			const emoji = copy[index];
			copy.splice(index, 1);
			pairs.push(emoji);
		}

		pairs.push(...pairs);

		return pairs;
	}
</script>

<div class="game">
	<div class="info" />
	<div class="grid-container">
		<Grid
			{grid}
			on:found={(e) => {
				found = [...found, e.detail.emoji];
			}}
			{found}
		/>
	</div>
	<div class="info" />
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: min(1vmin, 0.3rem);
	}
	.info {
		width: 80em;
		height: 10em;
		background-color: purple;
	}
	.grid-container {
		width: 80em;
		height: 80em;
		background: teal;
	}
</style>