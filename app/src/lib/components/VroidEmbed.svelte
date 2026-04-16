<script>
  let { portableText } = $props();
</script>

{#if portableText.value.url}
  <iframe
    src={portableText.value.url}
    width="100%"
    height="600"
    style="border: none; border-radius: 12px;"
    title="VRoid 3D Model Viewer"
    allow="fullscreen"
  />
{/if}