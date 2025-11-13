// ECT Prompt Builder - Adapted from aivira-ect-main
// Builds prompts for the edge function instead of direct OpenAI calls

import type { FormData, AIEnrichment } from './types';

// Grant-specific context and examples
function getGrantContext(grantType: string) {
  switch (grantType) {
    case 'MRA':
      return {
        description: `MRA (Market Readiness Assistance) focuses on overseas market expansion and international growth. Solutions should help businesses enter new markets, establish presence, and build international capabilities.`,
        examples: `Examples:
        - If goal is "expand overseas" + description mentions "e-commerce": "Deploy localized e-commerce platform with multi-currency support and regional payment gateways for target markets"
        - If goal is "expand overseas" + description mentions "customer service": "Implement multilingual customer support system with local market knowledge and cultural adaptation"`
      };
    case 'PSG':
      return {
        description: `PSG (Productivity Solutions Grant) focuses on IT adoption, automation, and productivity improvements. Solutions should leverage pre-approved IT solutions and technology to enhance business efficiency.`,
        examples: `Examples:
        - If goal is "automate ops" + description mentions "CRM": "Implement Salesforce CRM with automated lead scoring and pipeline management to streamline sales processes"
        - If goal is "improve internal processes" + description mentions "accounting": "Deploy Xero accounting software with automated invoice processing and financial reporting workflows"`
      };
    case 'EDG':
      return {
        description: `EDG (Enterprise Development Grant) focuses on business transformation and capability development. Solutions should address strategic business challenges and enhance long-term competitiveness.`,
        examples: `Examples:
        - If goal is "improve internal processes" + description mentions "strategy": "Develop comprehensive business transformation roadmap with change management framework and performance metrics"
        - If goal is "automate ops" + description mentions "innovation": "Implement enterprise-wide digital transformation initiative with advanced analytics and process optimization"`
      };
    default:
      return {
        description: `Provide implementation solutions that address the project's specific goals and requirements.`,
        examples: `Examples:
        - Focus on practical, implementable solutions within the specified budget and timeline
        - Address the specific business challenges mentioned in the project description`
      };
  }
}

// Grant-specific fallback data
function getGrantSpecificFallback(grantType: string): AIEnrichment {
  switch (grantType) {
    case 'MRA':
      return {
        suggestions: [
          "Develop localized marketing strategy and market entry plan for target overseas markets",
          "Implement multilingual customer support system with local market knowledge",
          "Establish partnerships with local distributors and service providers in target markets"
        ],
        reasoning: "These solutions directly address overseas market expansion through market research, localization, and partnership building that can be funded via MRA grants."
      };
    case 'PSG':
      return {
        suggestions: [
          "Implement Salesforce CRM with automated lead scoring and pipeline management to streamline sales processes",
          "Deploy Microsoft Power BI for real-time business intelligence and data-driven decision making",
          "Integrate Zapier automation workflows to connect existing systems and eliminate manual data entry"
        ],
        reasoning: "These solutions directly address productivity improvement through specific technology implementations that can be funded via PSG grants."
      };
    case 'EDG':
      return {
        suggestions: [
          "Develop comprehensive business transformation roadmap with change management framework",
          "Implement enterprise-wide digital transformation initiative with advanced analytics",
          "Establish strategic partnerships and capability development programs for long-term growth"
        ],
        reasoning: "These solutions directly address business transformation and capability development through strategic initiatives that can be funded via EDG grants."
      };
    default:
      return {
        suggestions: [
          "Consider documenting your project timeline and milestones clearly",
          "Ensure your budget breakdown aligns with grant requirements",
          "Prepare detailed success metrics for your project outcomes"
        ],
        reasoning: "These suggestions focus on common grant application requirements."
      };
  }
}

export function buildEnrichmentPrompt(formData: FormData, grantType: string): string {
  // Grant-specific context and examples
  const grantContext = getGrantContext(grantType);
  
  return `
    You are a Singapore ${grantType} expert. Based on this SME's project data, provide 3 specific, actionable implementation solutions that can be funded through ${grantType} grants.
    
    Form Data:
    - Primary Goal: ${formData.primaryGoal}
    - Budget: ${formData.estimatedBudget}
    - Project Description: ${formData.projectDescription}
    - Company Size: ${formData.employeeCount}
    - Financial Viability: ${formData.financialViability}
    - Singapore Registered: ${formData.singaporeRegistered}
    - Local Shareholding: ${formData.localShareholding}
    - Start Timeline: ${formData.startTimeline}
    
    ${grantContext.description}
    
    Focus on providing 3 actual implementation solutions that:
    1. Directly address their specific project goal and description
    2. Are practical and implementable within their budget and timeline
    3. Solve real business problems they're facing
    4. Can be funded specifically through ${grantType} grants
    
    ${grantContext.examples}
    
    Return exactly 3 implementation solutions, each 1-2 sentences, focused on specific tools, technologies, or processes they can implement using ${grantType} funding.
    Format as JSON: {"suggestions": ["solution1", "solution2", "solution3"], "reasoning": "brief explanation of how these solutions address their specific project needs and align with ${grantType} requirements"}
  `;
}

export async function enrichFormData(formData: FormData, grantType: string): Promise<AIEnrichment> {
  const prompt = buildEnrichmentPrompt(formData, grantType);

  try {
    // Call Supabase Edge Function instead of OpenAI directly
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/ect_submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        email: formData.email,
        consentPurpose: 'Grant matching & contact',
        prompt,
        formData: {
          ...formData,
          // Add typed fields for the database schema
          uen: null, // Will be filled by user later
          primary_goal: formData.primaryGoal,
          budget_band: formData.estimatedBudget,
          timeline: formData.startTimeline
        },
        ectVersion: 1
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.enrichment) {
      // Handle both JSON and text responses from AI
      if (typeof data.enrichment === 'string') {
        return {
          suggestions: [
            "Consider documenting your project timeline and milestones clearly",
            "Ensure your budget breakdown aligns with grant requirements",
            "Prepare detailed success metrics for your project outcomes"
          ],
          reasoning: data.enrichment
        };
      }
      return data.enrichment;
    }
    
    return getGrantSpecificFallback(grantType);
  } catch (error) {
    console.error('Failed to enrich form data:', error);
    // Return grant-specific fallback data if API fails
    return getGrantSpecificFallback(grantType);
  }
}
