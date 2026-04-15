<script lang="ts">
import { PortableText } from "@portabletext/svelte";
import { useQuery } from "@sanity/svelte-loader";
import { formatDate } from "$lib/utils";
import { urlFor } from "$lib/sanity/image";
import type { PageData } from "./$types";
import Image from "$lib/components/Image.svelte";
import ImageGrid from "$lib/components/ImageGrid.svelte";
import ImageRow from "$lib/components/ImageRow.svelte";
import Break from "$lib/components/Break.svelte";

import CardGrid from "$lib/components/CardGrid.svelte";
import Button from "$lib/components/Button.svelte";

interface Props {
	data: PageData;
}

let { data }: Props = $props();
let q = $derived(useQuery(data));
let { data: post } = $derived($q);
</script>

<svelte:head>
	<title>{post.shortTitle} | komato</title>
	<meta property="og:title" content="{post.title} | komato" />
	<meta
		property="og:description"
		content={post.excerpt ? post.excerpt : "komato"}
	/>
	<meta
		property="description"
		content={post.excerpt ? post.excerpt : "komato"}
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://komato{data.currentURL}" />
	<meta
		property="og:image"
		content={urlFor(post.mainImage).width(512).height(512).url()}
	/>
	<meta property="og:site_name" content="komato" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@ncb0_" />
	<meta name="twitter:title" content="{post.title} | komato" />
	<meta name="twitter:description" content={post.excerpt} />
	<meta
		name="twitter:image"
		content={urlFor(post.mainImage).width(512).height(512).url()}
	/>
</svelte:head>

<article class="narrow">
	<h1>{post.title}</h1>

	{#if post.body}
		<PortableText
			components={{
				types: {
					image: Image,
					gallery: ImageGrid,
					imagerow: ImageRow,
					break: Break,
					button: Button,
				},
			}}
			value={post.body}
		/>
	{/if}

	{#if data.children.data.length > 0}
		<hr />
		<h2>subpages</h2>
		<CardGrid items={data.children.data} baseURL={""} />
	{/if}
</article>
