import "dotenv/config";
import { generateText, type ModelMessage } from "ai";
import { GoogleGenAI } from "@google/genai";
import { google } from "@ai-sdk/google"
import { tools } from "./tools/index.ts"
import { executeTool } from "./executeTools.ts";
import { SYSTEM_PROMPT } from "./system/prompt.ts";

import type { AgentCallbacks } from "../types.ts";

const MODEL_NAME = "gemini-3.5-flash";


export async function runAgent(
  userMessage: string,
  conversationHistory: ModelMessage[],
  callbacks: AgentCallbacks,
): Promise<any> {
  const { text , toolCalls } = await generateText({
    model: google(MODEL_NAME),
    prompt: userMessage,
    system: SYSTEM_PROMPT,
    tools
  });

  console.log(text , toolCalls);

  toolCalls.forEach(async(tc)=>{
    console.log( await executeTool(tc.toolName , tc.input));
  })
}

runAgent("hello my name is ekagra , what is the current date and time ");
