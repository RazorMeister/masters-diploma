<template>
  <div class="comment">
    <div class="comment-content">
      <p>{{ comment.content }}</p>
    </div>

    <div class="comment-footer">
      <strong>{{ createdAt }}</strong>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {DateTime} from "luxon";

const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
});

const createdAt = computed(() => DateTime.fromISO(props.comment.createdAt).toFormat("dd-MM-yyyy HH:mm"))
</script>

<style scoped>
.comment {
  width: calc(100% - 15px);
  padding: 10px;
  background-color: #282828;
  border-radius: 5px;
  color: #fff;
  margin-right: 15px;
}

.comment .comment-footer {
  font-size: 0.8rem;
  font-style: italic;
  text-align: right;
}
</style>
