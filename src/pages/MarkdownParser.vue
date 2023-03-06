<script setup lang="ts">
// @ts-ignore
import MarkdownIt from "markdown-it";
import {computed, nextTick, ref} from "vue";
import "github-markdown-css/github-markdown.css";

const inputText = ref<string | null>(null);

const markdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false,
  breaks: false,
});

const textInputArea = ref<any>();
const outputText = computed(() => markdownIt.render(inputText.value ?? ""));
const expandedName = ref<string>("1");

function clearInputText() {
  inputText.value = "";
  expandedName.value = "1";
  nextTick(() => textInputArea.value?.focus());
}

function seeOutputText() {
  expandedName.value = "2";
}

function editInputText() {
  expandedName.value = "1";
  nextTick(() => textInputArea.value?.focus());
}
</script>

<template>
  <div class="markdown-parser w-full">
    <n-collapse v-model:expanded-names="expandedName" accordion display-directive="show">
      <n-collapse-item title="输入文本" name="1" :disabled="!inputText">
        <div class="-mx-2">
          <n-input ref="textInputArea"
                   type="textarea"
                   :show-count="true"
                   placeholder="在这里输入文本"
                   size="large"
                   autofocus
                   :autosize="{minRows: 5}"
                   v-model:value.lazy="inputText"/>
        </div>

        <div class="absolute-button-group">
          <n-button size="large" :disabled="!outputText" @click="seeOutputText" type="success">输出</n-button>
          <n-button size="large" :disabled="!outputText" @click="clearInputText" type="warning">清空</n-button>
        </div>
      </n-collapse-item>

      <n-collapse-item v-if="outputText" title="输出结果" name="2">
        <div class="flex-[1] px-4 py-2 -mx-2 pb-16 md:pb-32 lg:pb-48">
          <div class="markdown-body">
            <div v-html="outputText"/>
          </div>
        </div>

        <div class="absolute-button-group">
          <n-button size="large" :disabled="!outputText" @click="editInputText" type="info">编辑内容</n-button>
          <n-button size="large" :disabled="!outputText" @click="clearInputText" type="warning">重新输入</n-button>
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<style scoped>
.markdown-body {
  @apply bg-transparent;
}

.absolute-button-group {
  @apply fixed;
  @apply bottom-8;
  @apply md:bottom-24;
  @apply lg:bottom-32;
  @apply left-0;
  @apply w-full;
  @apply justify-center;
  @apply flex;
  @apply space-x-8;
}
</style>
