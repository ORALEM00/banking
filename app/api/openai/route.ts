import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Parse the JSON body of the request
    const { messages } = await req.json();

    // Verify the API key
    console.log('API Key:', process.env.OPENAI_API_KEY);

    // Create a chat completion request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Tu trabajo es hacer planes financieron en cuanto el usuario te ponga hola, le vas a hacer preguntas sobre salario, gastos, objetivos y similaras para hacerle un plan financiero a su medida`,
          },
          ...messages,
        ],
        stream: true,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Create a readable stream from the response
    const stream = new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder();
        const reader = response.body?.getReader();

        while (true) {
          const { done, value } = await reader?.read() || {};
          if (done) break;

          // Decode and enqueue chunks
          const chunk = decoder.decode(value, { stream: true });
          controller.enqueue(new TextEncoder().encode(chunk));
        }

        controller.close();
      },
    });

    // Return the stream as a response
    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream' },
    });

  } catch (error) {
    console.error('Error in POST handler:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}