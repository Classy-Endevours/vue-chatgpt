<template>
  <div id="app">
    <div class="input-container" v-if="!hasInitialPromptSet">
      <input v-model="initialPrompt" placeholder="Set initial prompt" />
      <button @click="setInitialPrompt">Set</button>
    </div>
    <div class="chat-window">
      <div class="chat-log">
        <ChatBubble
          v-for="message in messages"
          :key="message.id"
          :message="message.content"
          :isUserMessage="message.role === 'user'"
        />
      </div>
      <div class="input-container">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
          autofocus
        />
        <button @click="sendMessage" :disabled="isProcessing">
          <span v-if="isProcessing">Loading...</span>
          <span v-else>Send</span>
        </button>
      </div>
    </div>
    <div class="toast" v-if="showError">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ChatBubble from '../components/ChatBubble.vue';

export default {
  components: {
    ChatBubble,
  },
  setup() {
    const messages = ref([]);
    const newMessage = ref('');
    const isProcessing = ref(false);
    const showError = ref(false);
    const errorMessage = ref('');
    const apiUrl = 'http://localhost:3000'; // Update with your API URL
    const initialPrompt = ref('');
    const hasInitialPromptSet = ref(false);

    const sendMessage = () => {
      const messageText = newMessage.value.trim();
      if (messageText !== '') {
        messages.value.push({
          id: messages.value.length,
          content: messageText,
          role: 'user',
        });
        newMessage.value = '';
        isProcessing.value = true;
        replyWithGPT(messageText);
      }
    };

    const replyWithGPT = (messageText) => {
      const requestBody = {
        messages: messages.value,
      };
      showError.value = false;

      // Perform API call to your endpoint with the requestBody
      fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          const replyText = data.message;
          messages.value.push({
            id: messages.value.length,
            content: replyText,
            role: 'assistant',
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          showError.value = true;
          errorMessage.value = 'API call failed. Please try again.';
        })
        .finally(() => {
          isProcessing.value = false;
        });
    };

    const setInitialPrompt = () => {
      if (initialPrompt.value !== '') {
        messages.value.push({
          id: messages.value.length,
          content: initialPrompt.value,
          role: 'assistant',
        });
        isProcessing.value = true;
        replyWithGPT(initialPrompt.value);
        hasInitialPromptSet.value = true;
      }
    };

    onMounted(setInitialPrompt);

    return {
      messages,
      newMessage,
      isProcessing,
      showError,
      errorMessage,
      initialPrompt,
      hasInitialPromptSet,
      sendMessage,
      setInitialPrompt,
    };
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;  
}

.chat-window {
  max-width: 400px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
}

.chat-log {
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  justify-content: center;
}

input {
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 16px;
  background-color: #ff5249;
  color: #fff;
  border-radius: 4px;
  z-index: 9999;
}
</style>
