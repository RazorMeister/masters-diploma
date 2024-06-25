<template>
  <div class="post-form">
    <h4>Post something</h4>

    <div class="errors" v-if="errors.length">
      <div v-for="error in errors" :key="error">{{ error }}</div>
    </div>

    <input type="text" v-model="title" placeholder="Title">
    <textarea v-model="content" placeholder="Content"/>
    <button @click="save" :disabled="isLoading">Send</button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {postsApi} from "@/axiosSetup.js";

const emit = defineEmits(["posted"])

const errors = ref([])
const title = ref("");
const content = ref("");
const isLoading = ref(false);

const save = async () => {
  const newErrors = [];

  if (title.value.length < 5) {
    newErrors.push("Title must be at least 5 characters long")
  }
  if (title.value.length > 250) {
    newErrors.push("Title cannot be longer than 250 characters")
  }

  if (content.value.length < 5) {
    newErrors.push("Content must be at least 5 characters long")
  }
  if (content.value.length > 2000) {
    newErrors.push("Content cannot be longer than 2000 characters")
  }

  if (newErrors.length) {
    errors.value = newErrors
    return;
  }

  errors.value = [];
  isLoading.value = true;

  await postsApi.post(`api/posts/`, {
    title: title.value,
    content: content.value
  })

  title.value = "";
  content.value = "";

  emit("posted");
  isLoading.value = false;
}

</script>

<style scoped>

</style>
