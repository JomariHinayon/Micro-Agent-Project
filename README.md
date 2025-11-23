# Micro-Agent-Project

A micro-agent API that generates three-point business strategy summaries for any given topic. Built with Next.js, TypeScript, and OpenAI.

## Overview

This project implements a single POST API endpoint that accepts a topic and returns a three-point business strategy summary. The application uses OpenAI's API to generate strategic insights based on the provided topic.

## Requirements

- Node.js 18 or higher
- npm or yarn package manager
- OpenAI API key

## Local Setup

1. Clone the repository to your local machine and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd Micro-Agent-Project
   ```

2. Install all required dependencies:
   ```bash
   npm install
   ```

3. Create a file named `.env.local` in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-3.5-turbo
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The API endpoint will be available at `http://localhost:3000/api/summarize` and the web interface at `http://localhost:3000`.

## How It Works

The application provides two ways to interact with the micro-agent:

**Web Interface:**
Visit the home page in your browser to use a simple form interface. Enter any business topic in the input field and click the generate button. The application will display three strategic business points related to your topic.

**API Endpoint:**
The application exposes a POST endpoint that accepts JSON requests. You send a request with a topic field containing your business topic, and the API returns a JSON response with a summary array containing exactly three business strategy points.

The application works by taking your topic, sending it to OpenAI's API with instructions to generate business strategy insights, and then formatting the AI's response into three distinct, actionable strategy points that are returned to you.
