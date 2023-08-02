<template>
  <div class="chat-bubble" :class="{ 'user': isUserMessage }">
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
import { defineProps } from 'vue';

export default {
  props: {
    message: String,
    isUserMessage: Boolean,
  },
  setup(props) {
    return defineProps(props);
  },
};
</script>

<style scoped>
.chat-bubble {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #f1f1f1;
}

.chat-bubble.user {
  justify-content: flex-end;
  background-color: #007bff;
  color: #fff;
}

.message {
  font-size: 14px;
  line-height: 1.4;
}
</style>
