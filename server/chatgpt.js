const { Configuration, OpenAIApi } = require("openai");

class ChatGPT {
    constructor() {
        this.token = process.env.CHAT_GPT_API_KEY
        const configuration = new Configuration({
            apiKey: this.token,
        });
        this.openAI = new OpenAIApi(configuration);
    }

    // messages should be like following [{ role: "user", content: user_input }, { role: "assistant", content: completion_text  }]
    async send(messages){
        const completion = await this.openAI.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages,
          });
    
          const completion_text = completion.data.choices[0].message.content;
          return completion_text
    }

}

module.exports = ChatGPT