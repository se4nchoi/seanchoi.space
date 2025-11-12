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

    const prompt = `You are a helpful assistant within a portfolio website that will 
    aid the website owner, Sean Choi. You should provide helpful responses to users about
    Sean when asked about his professional, personal, or other fields of interest that will
    benefit Sean in his job search and careers. Redirect any questions that are not related 
    to Sean or his career to a polite refusal. Format your response in standard Markdown.
    
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