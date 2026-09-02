import "dotenv/config";
import { generateText, type ModelMessage } from "ai";
import { google } from "@ai-sdk/google"
import { tools } from "./tools/index.ts"
import { executeTool } from "./executeTools.ts";
import { SYSTEM_PROMPT } from "./system/prompt.ts";
import { Laminar , getTracer } from '@lmnr-ai/lmnr';

import type { AgentCallbacks } from "../types.ts";

const MODEL_NAME = "gemini-3.5-flash";

Laminar.initialize({
  projectApiKey:process.env.LMNR_API_KEY
});

export async function runAgent(
  userMessage: string,
  conversationHistory: ModelMessage[],
  callbacks: AgentCallbacks,
): Promise<any> {
  const {  } = await generateText({
    model: google(MODEL_NAME),
    prompt: userMessage,
    system: SYSTEM_PROMPT,
    tools, 
    experimental_telemetry: {
        isEnabled: true,
        tracer: getTracer(),
      },
  });

  
  // console.log(text , toolCalls);

  // toolCalls.forEach(async(tc)=>{
  //   console.log( await executeTool(tc.toolName , tc.input));
  // })
}


