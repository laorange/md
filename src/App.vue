<script setup lang="ts">
import MarkdownParser from "./pages/MarkdownParser.vue";
import "github-fork-ribbon-css/gh-fork-ribbon.css";

</script>

<template>
  <main class="min-h-[90vh] mx-8 my-2 flex flex-col justify-center justify-items-center">
    <h1 class="text-center my-8">Markdown解析器</h1>
    <div class="text-center text-xs mb-8 md:hidden">source code：github.com/laorange/md</div>
    <MarkdownParser/>
  </main>

  <a class="github-fork-ribbon hidden md:block"
     href="https://github.com/laorange/md"
     target="_blank"
     data-ribbon="View code on GitHub"/>
</template>

<style>
.github-fork-ribbon:before {
  @apply bg-green-600
}
</style>
