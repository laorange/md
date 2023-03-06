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
const result = computed(() => markdownIt.render(inputText.value ?? ""));
const expandedName = ref<string>("1");

function clearInputText() {
  inputText.value = "";
  nextTick(() => textInputArea.value?.focus());
}

function reset() {
  inputText.value = "";
  expandedName.value = "1";
  nextTick(() => textInputArea.value?.focus());
}
</script>

<template>
  <div class="markdown-parser w-full">
    <n-collapse v-model:expanded-names="expandedName" accordion display-directive="show">
      <n-collapse-item title="输入文本" name="1" :disabled="!inputText">
        <n-input ref="textInputArea"
                 type="textarea"
                 :show-count="true"
                 placeholder="在这里输入文本"
                 size="large"
                 autofocus
                 :autosize="{minRows: 5}"
                 v-model:value.lazy="inputText"/>

        <div class="w-full flex justify-center mt-2 space-x-8">
          <n-button size="large" :disabled="!result" @click="expandedName = '2'" type="success">输出</n-button>
          <n-button size="large" :disabled="!result" @click="clearInputText" type="warning">清空</n-button>
        </div>
      </n-collapse-item>
      <n-collapse-item v-if="result" title="输出结果" name="2">
        <div class="flex-[1] border-[1px] rounded-sm min-h-[140px] px-4 py-2">
          <div class="markdown-body">
            <div v-html="result"/>
          </div>
        </div>

        <div class="w-full flex justify-center mt-2 space-x-8">
          <n-button size="large" :disabled="!result" @click="reset" type="warning">重新输入</n-button>
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<style scoped>

</style>
