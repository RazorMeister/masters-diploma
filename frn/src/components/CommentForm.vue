<template>
  <div class="comment-form">
    <div class="errors" v-if="errors.length">
      <span v-for="error in errors" :key="error">{{ error }}</span>
    </div>

    <input v-model="content" type="text" placeholder="Type something...">
    <button @click="save" :disabled="isLoading">Send</button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {commentsApi} from "@/axiosSetup.js";

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['comment-saved'])

const errors = ref([])
const content = ref("")
const isLoading = ref(false)

const save = async () => {
  const newErrors = [];

  if (content.value.length < 5) {
    newErrors.push("Comment must be at least 5 characters long")
  }

  if (content.value.length > 250) {
    newErrors.push("Comment cannot be longer than 250 characters")
  }

  if (newErrors.length) {
    errors.value = newErrors
    return;
  }

  errors.value = [];
  isLoading.value = true;

  await commentsApi.post(`api/posts/${props.post.id}/comments`, {
    content: content.value
  });

  content.value = "";

  emit('comment-saved')
  isLoading.value = false;
}

</script>

<style scoped>
.comment-form {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.comment-form .errors {
  margin-right: 6px;
}

.comment-form input {
  padding: 6px 10px;
}
.comment-form button {
  padding: 4px 14px;
  margin: 8px 4px;
}
</style>
