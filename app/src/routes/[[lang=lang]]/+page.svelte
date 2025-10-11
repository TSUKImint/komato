<script lang="ts">
import { useQuery } from "@sanity/svelte-loader";
import CardGrid from "$lib/components/CardGrid.svelte";
import TextCard from "$lib/components/TextCard.svelte";
import type { PageData } from "./$types";
import { urlFor } from "$lib/sanity/image";
import { devicePixelRatio } from "svelte/reactivity/window";

let dpr = $derived(Math.ceil(devicePixelRatio.current ?? 1));

interface Props {
	data: PageData;
}

let { data }: Props = $props();
const q = useQuery(data);

let { data: posts } = $derived($q);
console.log('Posts data:', posts);
</script>

<svelte:head>
	<title>komato.world</title>
	<meta property="og:title" content="komato.world" />
	<meta
		property="og:description"
		content="The homepage of Hajar R., an artist & designer in Antwerp, Belgium.."
	/>
	<meta
		property="description"
		content="The homepage of Hajar R., an artist & designer in Antwerp, Belgium.."
	/>
	<meta
		property="og:image"
		content="https://komato.world/android-chrome-512x512.png"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://komato.world/" />
	<meta property="og:site_name" content="komato.world" />
</svelte:head>

<article>
	<section>
		<h1>
			<!-- <a href="/">komato.world</a> is under construction. -->
			{#if data.params.lang === "jp"}
				ボク<a href="about">hajar rahimi</a>です。アントワープ出身のアーティストです。
			{:else}
				i’m <a href="about">hajar rahimi</a>, an artist & designer in antwerp, belgium.
			{/if}
		</h1>
		<!-- <h2>
			(current version: <a href="https://v1.komato.world" target="_blank"
				>v1.komato.world</a
			>)
		</h2> -->
	</section>

	<section>
		<h3>
			<a 
  class="button" 
  style="pointer-events: none; cursor: default; user-select: none;"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
    <path d="M16.05 10.966a5 2.5 0 0 1-8.1 0"/>
    <path d="m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04"/>
    <path d="M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z"/>
    <path d="M9.194 6.57a5 2.5 0 0 0 5.61 0"/>
  </svg>
				WIP</a
			>
		</h3>
	</section>

	{#if data.options.initial.data.length}
		<section data-sveltekit-preload-data="hover">
			<h2>
				{#if data.params.lang === "jp"}
					ポートフォリオ
				{:else}
					portfolio
				{/if}
			</h2>

			{#await data.options.initial then posts}
				<CardGrid
					items={posts.data}
					baseURL={data.params.lang === "en" ? "" : data.params.lang}
				/>
			{/await}
		</section>
	{/if}

	{#if data.blogPosts.data.length}
		<section>
			<h2>
				{#if data.params.lang === "jp"}
					<a href="/jp/blog#">ブログ…</a>
				{:else}
					<a href="/blog#">blog…</a>
				{/if}
			</h2>
			<div class="blog-grid">
				{#await data.blogPosts then blogPosts}
					{#each blogPosts.data as blogPost}
						<TextCard
							item={blogPost}
							baseURL={data.params.lang === "en"
								? "/blog"
								: `/${data.params.lang}/blog`}
						/>
					{/each}
				{/await}
			</div>
		</section>
	{/if}

	{#if data.artworks.data.length}
		<section>
			<h2>
				{#if data.params.lang === "jp"}
					<a href="/jp/art#">ギャラリー…</a>
				{:else}
					<a href="/art#">gallery…</a>
				{/if}
			</h2>
			<div class="thumbs" data-sveltekit-preload-data="hover">
				{#await data.artworks then artworks}
					{#each artworks.data as artwork}
						<div class="thumb">
							<a
								href={data.params.lang === "en"
									? `art/${artwork.year}/${artwork.slug.current}`
									: `/${data.params.lang}/art/${artwork.year}/${artwork.slug.current}`}
								class="clean"
							>
								<img
									src={urlFor(artwork.mainImage)
										.format("webp")
										.quality(50)
										.auto("format")
										.bg("ffff")
										.width(64)
										.height(64)
										.fit("max")
										.blur(artwork.nsfw ? 32 * dpr : 1)
										.dpr(dpr)
										.url()}
									width="96px"
									height="96px"
									style="aspect-ratio: 1 / 1;"
									title={artwork.nsfw
										? `${artwork.title} (NSFW)`
										: artwork.title}
								/>
							</a>
						</div>
					{/each}
				{/await}
			</div>
		</section>
	{/if}

	<section>
		<h2>
			{#if data.params.lang === "jp"}
				<a href="/jp/type#">書体デザイン…</a>
			{:else}
				<a href="/type#">type design…</a>
			{/if}
		</h2>
	</section>
</article>

<style>
article {
	max-width: 100%;
	/* margin: 0 auto; */
}
.thumbs {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(calc(37.5px + 0.5rem), 1fr));
	/* gap: 0.5rem; */
}
.thumb {
	margin: 0;
	padding: 0;
	line-height: 0;
}
.thumb:hover {
	opacity: 0.5;
}
</style>
