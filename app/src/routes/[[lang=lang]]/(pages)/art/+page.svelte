<script lang="ts">
import CardGrid from "$lib/components/CardGrid.svelte";
import Card from "$lib/components/Card.svelte";
import { useQuery } from "@sanity/svelte-loader";
import type { PageData } from "./$types";
import { queryParamsState } from "kit-query-params";

import type { Tag } from "$lib/sanity/queries";

interface Props {
	data: PageData;
}

let { data }: Props = $props();

let p = queryParamsState({
	schema: {
		character: ["string"],
		media: ["string"],
		year: ["number"],
		cw: ["string"],
	},
	shallow: true,
});

// let { data: artworks } = $derived($q);

let selectedCharacters: Tag[] = [];
let selectedMedia: Tag[] = [];
let selectedCW: Tag[] = [];
let selectedYear: Number[] = [];

const params = $state({
	selectedCharacters,
	selectedMedia,
	selectedCW,
	selectedYear,
});

const checkCharacterMatch = (artwork) => {
	return (
		p.character?.length === 0 ||
		(artwork.characters &&
			artwork.characters.some((character) => {
				return p.character?.includes(character._key);
			}))
	);
};

const checkMediaMatch = (artwork) => {
	return (
		p.media?.length === 0 ||
		(artwork.media &&
			artwork.media.some((media) => {
				return p.media?.includes(media._key);
			}))
	);
};

const checkCWMatch = (artwork) => {
	return (
		p.cw?.length === 0 ||
		(artwork.cw &&
			artwork.cw.some((cw) => {
				return p.cw?.includes(cw._key);
			}))
	);
};

const checkYearMatch = (artwork) => {
	return (
		p.year?.length === 0 ||
		(Array.isArray(artwork.year) &&
			artwork.year.some((year) => {
				return p.year?.includes(year);
			})) ||
		(!Array.isArray(artwork.year) && p.year?.includes(artwork.year))
	);
};

const filterArtworks = (artworks) => {
	return artworks.filter((artwork) => {
		return (
			checkCharacterMatch(artwork) &&
			checkMediaMatch(artwork) &&
			checkYearMatch(artwork) &&
			checkCWMatch(artwork)
		);
	});
};
</script>

<svelte:head>
	<title>gallery | komato</title>
	<meta property="og:title" content="gallery | komato" />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="Art by Hajar R." />
	<meta property="og:description" content="Art by Hajar R." />
	<meta property="og:url" content="https://komato/{data.currentURL}" />
	<meta property="og:site_name" content="komato" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="gallery | komato" />
	<meta name="twitter:description" content="Art by Hajar R." />
	<meta name="twitter:description" content="Art by Hajar R." />
	<meta name="twitter:url" content="https://komato/{data.currentURL}" />
	<meta name="twitter:site" content="@ncb0_" />
	<meta name="twitter:creator" content="@ncb0_" />
	<meta
		property="og:image"
		content="https://komato/android-chrome-512x512.png"
	/>
	<meta
		property="twitter:image"
		content="https://komato/android-chrome-512x512.png"
	/>
</svelte:head>

<article>
	<section>
		<h1>gallery</h1>
	</section>
	
	<section data-sveltekit-preload-data="hover">
		<div class="card-grid">
			{#await data.options.initial}
				<p>loading…</p>
			{:then artworks}
				{#each artworks.data as artwork}
					{#if checkYearMatch(artwork) && checkCharacterMatch(artwork) && checkMediaMatch(artwork) && checkCWMatch(artwork)}
						{#if artwork.nsfw == true}
							<Card
								item={artwork}
								baseURL="art/{artwork.year}"
								text="false"
								nsfw="true"
							/>
						{:else}
							<Card item={artwork} baseURL="art/{artwork.year}" text="false" />
						{/if}
					{/if}
				{/each}
			{/await}
		</div>
	</section>
</article>

<style>
article {
	max-width: 100%;
	/* margin: 0 auto; */
}
.options {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	/* grid-auto-flow: column; */
	gap: 0.5rem;
}
label {
	font-size: 1.5rem;
	line-height: 1.75ex;
	font-family: var(--font-sans);
	font-weight: 700;
}
select {
	font-family: var(--font-mono) !important;
	background: rgb(var(--bg-color));
	border: 1px solid rgb(var(--text-color), 0.3);
	/* border: none; */
	padding: 0;
	color: rgb(var(--text-color));
	border-radius: 0;
	display: block;
	width: 100%;
	font-size: 1rem;
}
select option:disabled {
	color: rgba(var(--text-color), 0.4);
	display: none;
}
select option:hover {
	background: rgb(var(--text-color), 0.2);
	color: rgb(var(--text-color));
}

select[multiple]:focus option:checked {
	background: rgb(var(--text-color))
		linear-gradient(
			0deg,
			rgb(var(--text-color)) 0%,
			rgb(var(--text-color)) 100%
		);
	color: rgb(var(--bg-color)) !important;
}
select option:checked,
select option:focus,
select option:active select,
option[selected] {
	background: rgb(var(--text-color), 1);
	color: rgb(var(--bg-color));
	font-weight: 700;
}
</style>
