# Micro-Agent-Project

A micro-agent API that generates three-point business strategy summaries for any given topic. Built with Next.js, TypeScript, and OpenAI.

 **Live Demo:** [https://micro-agent-project-f8elcupid-jomaris-projects-778441b5.vercel.app/](https://micro-agent-project-f8elcupid-jomaris-projects-778441b5.vercel.app/)

 **Repository:** [https://github.com/JomariHinayon/Micro-Agent-Project](https://github.com/JomariHinayon/Micro-Agent-Project)

## Overview

This project implements a single POST API endpoint that accepts a topic and returns a three-point business strategy summary. The application uses OpenAI's API to generate strategic insights based on the provided topic.

## Requirements

- Node.js 18 or higher
- npm or yarn package manager
- OpenAI API key

## Local Setup

1. Clone the repository to your local machine and navigate to the project directory:
   ```bash
   git clone https://github.com/JomariHinayon/Micro-Agent-Project.git
   cd Micro-Agent-Project
   ```

2. Install all required dependencies:
   ```bash
   npm install
   ```

3. Create a file named `.env.local` in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The API endpoint will be available at `http://localhost:3000/api/summarize` and the web interface at `http://localhost:3000`.

## How It Works

The application provides two ways to interact with the micro-agent:

**Web Interface:**
Visit the home page in your browser to use a simple form interface. Enter any business topic in the input field and click the generate button. Once generated, the **real AI-generated strategy points will appear at the top of the page** in a green box. The example response shown in the API documentation section below is just a template to illustrate the response format - the actual generated content is real data from OpenAI's API.

**API Endpoint:**
The application exposes a POST endpoint that accepts JSON requests. You send a request with a topic field containing your business topic, and the API returns a JSON response with a summary array containing exactly three business strategy points.

**Example Request:**
```json
{
  "topic": "direct-to-consumer coffee brands"
}
```

**Example Response (Template - actual responses contain real generated content):**
```json
{
  "summary": [
    "Develop a strong online presence and e-commerce platform to reach customers directly, cutting out middlemen and increasing profit margins.",
    "Offer personalized subscription services to drive customer loyalty and recurring revenue, focusing on convenience and customization to enhance the customer experience.",
    "Focus on product quality and customer service to differentiate your brand in a competitive market, emphasizing transparency in sourcing, roasting techniques, and sustainable practices to appeal to eco-conscious consumers."
  ]
}
```

**Note:** The example above is just a template showing the response format. When you actually use the API or web interface, you'll receive **real, AI-generated strategy points** based on your specific topic. The generated content appears at the top of the page in a green box when using the web interface.

The application works by taking your topic, sending it to OpenAI's API with instructions to generate business strategy insights, and then formatting the AI's response into three distinct, actionable strategy points that are returned to you.

## Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` as an environment variable in Vercel's project settings
4. Vercel will automatically build and deploy your application

**Note:** You don't need to run `npm run build` locally before deploying. Vercel automatically runs the build process during deployment.
