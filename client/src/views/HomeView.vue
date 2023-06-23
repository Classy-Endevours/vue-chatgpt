<template>
  <div id="app">
    <div class="chat-window">
      <div class="chat-log">
        <ChatBubble
          v-for="message in messages"
          :key="message.id"
          :message="message.text"
          :isUserMessage="message.isUserMessage"
        />
      </div>
      <div class="input-container">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
          autofocus
        />
        <button @click="sendMessage">Send</button>
      </div>
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
    };
  },
  methods: {
    sendMessage() {
      const messageText = this.newMessage.trim();
      if (messageText !== '') {
        this.messages.push({
          id: this.messages.length,
          text: messageText,
          isUserMessage: true,
        });
        this.newMessage = '';
        this.replyWithGPT(messageText);
      }
    },
    replyWithGPT(messageText) {
      // Perform API call or GPT processing to generate a reply
      // For simplicity, we'll use a dummy response here
      setTimeout(() => {
        const replyText = `You said: "${messageText}". GPT-generated reply.`;
        this.messages.push({
          id: this.messages.length,
          text: replyText,
          isUserMessage: false,
        });
      }, 500);
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
</style>
