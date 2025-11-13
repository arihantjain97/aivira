// ECT Types - Ported from aivira-ect-main
export interface FormData {
  // Project Overview
  primaryGoal: string;
  projectDescription: string;
  estimatedBudget: string;
  startTimeline: string;
  
  // Overseas Expansion (conditional)
  targetMarkets: string;
  previousSales: string;
  
  // Business Eligibility
  singaporeRegistered: string;
  localShareholding: string;
  employeeCount: string;
  financialViability: string;
  
  // Pre-check
  vendorDeposit: string;
  
  // Support Needs
  hasConsultant: string;
  needVendorHelp: string;
  supportNeeds: string[];
  
  // Consent
  consentSharing: boolean;
  
  // Contact Info
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
}

export interface AIEnrichment {
  suggestions: string[];
  reasoning: string;
}

export interface ReportData {
  score: number;
  confidence: string;
  matchedCategory: string;
  grantType: string; // Add the actual grant type (MRA, PSG, EDG)
  aiSummary: string;
  reasonsForFit: string[];
  aiEnrichment: AIEnrichment;
  snapshot: {
    primaryGoal: string;
    estimatedBudget: string;
    startTimeline: string;
    projectDescription: string;
  };
  identity: {
    name: string;
    companyName: string;
    email: string;
  };
  metadata: {
    createdAt: string;
    reportId: string;
  };
}

export interface DatabaseRecord {
  id: string;
  report_data: ReportData;
  form_data: FormData;
  created_at: string;
  updated_at: string;
}

// Grant types
export type GrantType = 'MRA' | 'PSG' | 'EDG';

// Scoring result interface
export interface GrantScore {
  grantType: GrantType;
  score: number;
  disqualifiers: string[];
  breakdown: {
    component: string;
    points: number;
    maxPoints: number;
    reason: string;
  }[];
}
