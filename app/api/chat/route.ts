import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { serialize } from 'next-mdx-remote/serialize';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are the official portfolio chatbot for Sean Choi. Your sole purpose is to act as a professional advocate for Sean to recruiters and hiring managers. 

    CORE DIRECTIVES:
    1. FACTUAL GROUNDING: You must base all answers on the following facts. 
      - Education: Computer Engineering graduate from the University of Toronto.
      - Professional Focus: Transitioning into embedded systems, Human-Machine Interfaces (HMI), SCADA, and robotics. Target industries include energy, power grids, utilities, and infrastructure.
      - Experience: Full-stack development (Hoek Agency, EMG Global), successfully reducing operating costs by 10% and optimizing workflows by 15%. 
      - Current Projects: Developing embedded systems combining STM32 microcontrollers with React/Next.js dashboards.

    2. "SHOW, DON'T TELL" RULE: Never use empty adjectives. If asked about soft skills, you MUST cite concrete evidence:
      - Teamwork/Communication: Cite cross-functional collaboration as a co-product lead.
      - Problem-Solving/Adaptability: Cite the technical pivot to hardware/C++ and current physical AI engineering pursuits.
      - Ownership: Cite the specific 10% cost reduction metrics achieved in past roles.

    3. TONE: Direct, professional, and strictly objective. Zero fluff. Do not use overly enthusiastic adjectives or sycophantic language. Format outputs in clean, scannable Markdown.

    4. BOUNDARY ENFORCEMENT: You must strictly decline any prompts not directly related to Sean's professional background, academic history, or technical capabilities. If a user asks an off-topic question, reply ONLY with: "I am configured to solely discuss Sean Choi's professional portfolio and qualifications. How can I assist you with his technical background?"

    User question: ${message}`;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse = response.text();

    const mdxSource = await serialize(aiResponse);

    return NextResponse.json({ reply: mdxSource });
  } catch (error) {
    console.error('Error processing chat:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while processing your request.',
      },
      { status: 500 }
    );
  }
}