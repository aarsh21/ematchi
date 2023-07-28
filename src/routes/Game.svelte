<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Countdown from './Countdown.svelte';
	import Found from './Found.svelte';
	import Grid from './Grid.svelte';

	import type { Level } from './levels';
	import { shuffle } from './utils';

	const dispatch = createEventDispatcher();

	let size: number;
	let grid: string[] = [];
	let found: string[] = [];
	let remaining: number = 0;
	let duration: number = 0;
	let playing: boolean = false;

	export function start(level: Level) {
		size = level.size;
		remaining = duration = level.duration;

		grid = createGrid(level);
		resume();
	}

	export function resume() {
		playing = true;
		countdown();
		dispatch('play');
	}

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
		found = [];

		return shuffle(pairs);
	}

	function countdown() {
		const start = Date.now();
		let remainingAtStart = remaining;

		function loop() {
			if (!playing) return;
			requestAnimationFrame(loop);
			remaining = remainingAtStart - (Date.now() - start);

			if (remaining <= 0) {
				dispatch('lose');
				playing = false;
			}
		}
		loop();
	}
</script>

<div class="game" style="--size:{size}">
	<div class="info">
		{#if playing}
			<Countdown
				{remaining}
				{duration}
				on:click={() => {
					playing = false;
					dispatch('pause');
				}}
			/>
		{/if}
	</div>
	<div class="grid-container">
		{#key grid}
			<Grid
				{grid}
				on:found={(event) => {
					found = [...found, event.detail.emoji];

					if (found.length === (size * size) / 2) {
						playing = false;
						setTimeout(() => {
							playing = false;
							dispatch('win');
						}, 1000);
					}
				}}
				{found}
			/>
		{/key}
	</div>
	<div class="info">
		<Found {found} />
	</div>
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
	}
	.grid-container {
		width: 80em;
		height: 80em;
	}
</style>
