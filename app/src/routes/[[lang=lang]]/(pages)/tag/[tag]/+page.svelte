<script lang="ts">
import { useQuery } from "@sanity/svelte-loader";
import type { PageData } from "./$types";
export let data: PageData;
import Card from "$lib/components/Card.svelte";
import CardGrid from "$lib/components/CardGrid.svelte";
import TextCard from "$lib/components/TextCard.svelte";
import { urlFor } from "$lib/sanity/image";

const q = useQuery(data);

$: ({ data: tags } = $q);
console.log(data.blogPosts.data);
</script>

<svelte:head>
	<title>#{data.params.tag} | komato</title>
	<meta property="og:title" content="#{data.params.tag} | komato" />
	<meta
		property="og:description"
		content="pages tagged #{data.params.tag} on komato"
	/>
	<meta
		property="description"
		content="pages tagged #{data.params.tag} on komato"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://komato{data.currentURL}" />
	<meta property="og:site_name" content="komato" />
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content="{data.params.tag} | komato" />
	<meta
		property="twitter:description"
		content="pages tagged #{data.params.tag} on komato"
	/>
	<meta property="twitter:url" content="https://komato{data.currentURL}" />
	<meta property="twitter:creator" content="@ncb0_" />
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
		<h1>tagged: #{data.params.tag}</h1>

		<!-- <CardGrid items={tags} baseURL={""} /> -->
	</section>
	{#if tags.length}
		<section>
			<h2>work</h2>
			<div class="card-grid">
				{#each tags as tag}
					<Card item={tag} />
				{/each}
			</div>
		</section>
	{/if}
	{#if data.blogPosts.data.length}
		<section>
			<h2>blog</h2>
			<div class="blog-grid">
				{#each data.blogPosts.data as tag}
					<TextCard item={tag} baseURL="/blog" />
				{/each}
			</div>
		</section>
	{/if}
</article>

<style>
article {
	max-width: 100%;
	/* margin: 0 auto; */
}
</style>
