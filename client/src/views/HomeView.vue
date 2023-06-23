<template>
  <div id="app">
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
import ChatBubble from '../components/ChatBubble.vue';

export default {
  components: {
    ChatBubble,
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      isProcessing: false,
      showError: false,
      errorMessage: '',
    };
  },
  methods: {
    sendMessage() {
      const messageText = this.newMessage.trim();
      if (messageText !== '') {
        this.messages.push({
          id: this.messages.length,
          content: messageText,
          role: 'user',
        });
        this.newMessage = '';
        this.isProcessing = true;
        this.replyWithGPT(messageText);
      }
    },
    replyWithGPT() {
      const requestBody = {
        messages: this.messages,
      };
      this.showError = false;

      // Perform API call to your endpoint with the requestBody
      fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          const replyText = data.message;
          this.messages.push({
            id: this.messages.length,
            content: replyText,
            role: 'assistant',
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          this.showError = true;
          this.errorMessage = 'API call failed. Please try again.';
        })
        .finally(() => {
          this.isProcessing = false;
        });
    },
  },
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
