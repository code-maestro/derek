
// import { Configuration, OpenAIApi } from "openai";
// import readline from "readline";

// const configuration = new Configuration({
//   organization: "org-CjoTlbO9bvCo707NB8arW3qP",
//   apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// userInterface.prompt();

// userInterface.on("line", async (input) => {
//   await openai
//     .createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: input }],
//     })
//     .then((res) => {
//       console.log(res.data.choices[0].message.content);
//       userInterface.prompt();
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// });


// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// const completion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [{role: "user", content: "Hello world"}],
// });

// console.log(completion.data.choices[0].message);


// const configuration = new Configuration({
//   organization: "org-CjoTlbO9bvCo707NB8arW3qP",
//   apiKey: "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",
// });

// const openai = new OpenAIApi(configuration);
// const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Say this is a test",
//   max_tokens: 7,
//   temperature: 0,
// });


// console.log(response.data);


const { BardAPI } = require('bard-api-node');

async function testAssistant() {
  try {

    const assistant = new BardAPI();

    // Set session information for authentication
    await assistant.setSession('__Secure-1PSID', 'XQhk1CwSqdl4KV4t1bCFntzyy7TNtrhoDzlCeRHGQehKDCc6ai3jGGZ2NTMq1RisZ5M2sQ.'); // or '__Secure-3PSID'

    // Send a query to Bard
    const response = await assistant.getBardResponse('Hello, how are you?');
    console.log('Bard:', response.content);

  } catch (error) {

    console.log(error);

  }
}

testAssistant();

