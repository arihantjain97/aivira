'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CheckCircle2, Circle, HelpCircle, Briefcase, Bot, Lightbulb, TrendingUp, ChevronLeft, ChevronRight, ChevronDown, Mail, Download, User, Building, Phone, Loader2, FileText, Search, Handshake, MessageSquare, RefreshCw, Sparkles, X, ShieldCheck, Save, Trash2, Sun, Moon, Info, Target, Globe, Shield, Users, Zap } from 'lucide-react';
import { calculateGrantScores, getDetailedScoring } from './scoring';
import { enrichFormData } from './prompt';
import type { FormData, ReportData } from './types';

// Validation interface
interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Validation function
const validateFormData = (formData: FormData): ValidationResult => {
  const errors: ValidationError[] = [];

  // Email validation - Most critical for the edge function
  if (!formData.email.trim()) {
    errors.push({ field: 'email', message: 'Email address is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
  }

  // Required fields validation
  if (!formData.name.trim()) {
    errors.push({ field: 'name', message: 'Full name is required' });
  }

  if (!formData.companyName.trim()) {
    errors.push({ field: 'companyName', message: 'Company name is required' });
  }

  if (!formData.primaryGoal.trim()) {
    errors.push({ field: 'primaryGoal', message: 'Primary goal is required' });
  }

  if (!formData.projectDescription.trim()) {
    errors.push({ field: 'projectDescription', message: 'Project description is required' });
  }

  if (!formData.estimatedBudget.trim()) {
    errors.push({ field: 'estimatedBudget', message: 'Estimated budget is required' });
  }

  if (!formData.startTimeline.trim()) {
    errors.push({ field: 'startTimeline', message: 'Start timeline is required' });
  }

  // Business eligibility validation
  if (!formData.singaporeRegistered.trim()) {
    errors.push({ field: 'singaporeRegistered', message: 'Singapore registration status is required' });
  }

  if (!formData.localShareholding.trim()) {
    errors.push({ field: 'localShareholding', message: 'Local shareholding status is required' });
  }

  if (!formData.employeeCount.trim()) {
    errors.push({ field: 'employeeCount', message: 'Employee count is required' });
  }

  if (!formData.financialViability.trim()) {
    errors.push({ field: 'financialViability', message: 'Financial viability status is required' });
  }

  // Pre-check validation
  if (!formData.vendorDeposit.trim()) {
    errors.push({ field: 'vendorDeposit', message: 'Vendor deposit status is required' });
  }

  // Support needs validation
  if (!formData.hasConsultant.trim()) {
    errors.push({ field: 'hasConsultant', message: 'Consultant status is required' });
  }

  if (!formData.needVendorHelp.trim()) {
    errors.push({ field: 'needVendorHelp', message: 'Vendor help status is required' });
  }

  if (!formData.supportNeeds || formData.supportNeeds.length === 0) {
    errors.push({ field: 'supportNeeds', message: 'At least one support need must be selected' });
  }

  // Overseas expansion validation (conditional)
  if (formData.primaryGoal === 'Expand into new markets overseas') {
    if (!formData.targetMarkets.trim()) {
      errors.push({ field: 'targetMarkets', message: 'Target markets are required for overseas expansion' });
    }
    if (!formData.previousSales.trim()) {
      errors.push({ field: 'previousSales', message: 'Previous sales status is required for overseas expansion' });
    }
  }

  // Consent validation
  if (!formData.consentSharing) {
    errors.push({ field: 'consentSharing', message: 'Consent to share project details is required' });
  }

  // Data type validation
  if (typeof formData.consentSharing !== 'boolean') {
    errors.push({ field: 'consentSharing', message: 'Consent must be a valid boolean value' });
  }

  if (!Array.isArray(formData.supportNeeds)) {
    errors.push({ field: 'supportNeeds', message: 'Support needs must be an array' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Import the fallback function from openAI.ts
const getGrantSpecificFallback = (grantType: string) => {
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
};



const App = () => {
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState('light');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  
  const initialFormData: FormData = {
    primaryGoal: '',
    projectDescription: '',
    estimatedBudget: '',
    startTimeline: '',
    targetMarkets: '',
    previousSales: '',
    singaporeRegistered: '',
    localShareholding: '',
    employeeCount: '',
    financialViability: '',
    vendorDeposit: '',
    hasConsultant: '',
    needVendorHelp: '',
    supportNeeds: [],
    consentSharing: false,
    name: '',
    email: '',
    companyName: '',
    phoneNumber: ''
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  // User credits simulation
  const [userCredits] = useState({ standard: 488, premium: 15 });

  useEffect(() => {
    // Light mode only - no theme switching needed
  }, [theme]);

  useEffect(() => {
    const savedData = localStorage.getItem('grantDnaFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    const savedTheme = localStorage.getItem('grantDnaTheme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    // Expose test functions globally for development
    if (typeof window !== 'undefined') {
      (window as any).testCurrentFormData = () => getDetailedScoring(formData);
    }
  }, [formData]);

  const toggleTheme = () => {
    // Light mode only - no theme switching
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const restart = () => {
    setStep(1);
    setFormData(initialFormData);
    setReportData(null);
    localStorage.removeItem('grantDnaFormData');
  };

  const handleChange = useCallback((input: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({ ...prev, [input]: value }));
    
    // Clear validation errors for this field when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors(prev => prev.filter(error => error.field !== input));
    }
  }, [validationErrors]);

  const handleMultiSelectChange = (value: string) => {
    setFormData(prev => {
      const newSupportNeeds = prev.supportNeeds.includes(value)
        ? prev.supportNeeds.filter(item => item !== value)
        : [...prev.supportNeeds, value];
      return { ...prev, supportNeeds: newSupportNeeds };
    });
    
    // Clear validation errors for supportNeeds when user makes changes
    if (validationErrors.length > 0) {
      setValidationErrors(prev => prev.filter(error => error.field !== 'supportNeeds'));
    }
  };

  const handleSave = () => {
    localStorage.setItem('grantDnaFormData', JSON.stringify(formData));
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 3000);
  };

  // Generate reasons for fit based on the best matching grant
  const generateReasonsForFit = (formData: FormData, bestMatch: any) => {
    const reasons = [];
    
    // Add grant-specific reasons
    switch (bestMatch.grantType) {
      case 'MRA':
        reasons.push(
          `Your **overseas expansion** project directly aligns with MRA's focus on market access and international growth.`,
          `Your **${formData.estimatedBudget}** budget is well-suited for market entry activities supported by MRA.`,
          `Your **new market entry** approach qualifies for MRA's specialized overseas market assistance.`
        );
        break;
      case 'PSG':
        reasons.push(
          `Your **automation/IT adoption** project perfectly matches PSG's focus on productivity solutions and technology implementation.`,
          `Your **${formData.estimatedBudget}** budget aligns with PSG's preferred project scope and funding levels.`,
          `Your **vendor engagement needs** qualify for PSG's pre-approved solution provider network.`
        );
        break;
      case 'EDG':
        reasons.push(
          `Your **business transformation** project directly aligns with EDG's goal of enhancing business strategy and capabilities.`,
          `Your **${formData.estimatedBudget}** budget is well-suited for a transformational project of this scope.`,
          `Your **capability development** focus qualifies for EDG's comprehensive business enhancement support.`
        );
        break;
    }
    
    return reasons;
  };

  const generateReport = async () => {
    setIsLoading(true);
    
    try {
      console.log('🚀 Starting report generation...');
      
      // Step 0: Validate form data before proceeding
      console.log('🔍 Validating form data...');
      const validation = validateFormData(formData);
      
      if (!validation.isValid) {
        console.error('❌ Form validation failed:', validation.errors);
        setIsLoading(false);
        
        // Set validation errors to show in UI
        setValidationErrors(validation.errors);
        return;
      }
      
      // Clear any previous validation errors
      setValidationErrors([]);
      
      console.log('✅ Form validation passed');
      
      // Step 0.5: Prepare form data for edge function compatibility
      const edgeFunctionFormData = {
        ...formData,
        // Map field names to match edge function expectations
        primary_goal: formData.primaryGoal,
        budget_band: formData.estimatedBudget,
        timeline: formData.startTimeline,
        // Add UEN field (optional in form, required by edge function)
        uen: null
      };
      
      // Step 1: Calculate grant scores using the new scoring logic
      console.log('🎯 Calculating grant scores...');
      const grantScoring = calculateGrantScores(formData);
      console.log('✅ Grant scoring completed:', grantScoring);
      
      // Step 2: Enrich form data with AI (using the matched grant type)
      console.log('🤖 Enriching form data with AI...');
      const aiEnrichment = await enrichFormData(formData, grantScoring.bestMatch.grantType);
      console.log('✅ AI enrichment completed:', aiEnrichment);

      const aiSummary = `The project aims to ${formData.primaryGoal.toLowerCase()} with a budget of ${formData.estimatedBudget}. The key objective is to ${formData.projectDescription.toLowerCase()} and achieve measurable outcomes within the ${formData.startTimeline.replace('In ', '')} timeframe.`;

      // Generate reasons for fit based on the best matching grant
      const reasonsForFit = generateReasonsForFit(formData, grantScoring.bestMatch);

      // Step 3: Create complete report data with AI enrichment
      const completeReportData: ReportData = {
        score: grantScoring.bestMatch.score,
        confidence: grantScoring.bestMatch.score >= 80 ? "High Confidence" : grantScoring.bestMatch.score >= 60 ? "Medium Confidence" : "Low Confidence",
        matchedCategory: grantScoring.category,
        grantType: grantScoring.bestMatch.grantType, // Add the actual grant type
        aiSummary,
        reasonsForFit,
        aiEnrichment, // Add AI suggestions
        snapshot: {
          primaryGoal: formData.primaryGoal,
          estimatedBudget: formData.estimatedBudget,
          startTimeline: formData.startTimeline,
          projectDescription: formData.projectDescription
        },
        identity: {
          name: formData.name,
          companyName: formData.companyName,
          email: formData.email
        },
        metadata: {
          createdAt: new Date().toISOString(),
          reportId: crypto.randomUUID()
        }
      };

      // Step 4: Save to Supabase database via edge function
      console.log('💾 Saving report to database...');
      console.log('📤 Prepared form data for edge function:', edgeFunctionFormData);
      
      // TODO: Make API call to edge function here
      // const response = await fetch('/api/ect_submit', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     consentPurpose: "Grant matching & contact",
      //     prompt: "AI prompt here",
      //     formData: edgeFunctionFormData,
      //     ectVersion: 1
      //   })
      // });
      
      console.log('✅ Report will be saved via edge function');

      // Step 5: Update UI with complete report data
      setReportData(completeReportData);
      setIsLoading(false);
      nextStep();
      
    } catch (error) {
      console.error('❌ Report generation failed:', error);
      
      // Fallback: Generate basic report without AI enrichment
      console.log('⚠️ Using fallback scoring due to error...');
      const fallbackScoring = calculateGrantScores(formData);
      const fallbackReasons = generateReasonsForFit(formData, fallbackScoring.bestMatch);
      
      const aiSummary = `The project aims to ${formData.primaryGoal.toLowerCase()} with a budget of ${formData.estimatedBudget}. The key objective is to ${formData.projectDescription.toLowerCase()} and achieve measurable outcomes within the ${formData.startTimeline.replace('In ', '')} timeframe.`;

      setReportData({
        score: fallbackScoring.bestMatch.score,
        confidence: fallbackScoring.bestMatch.score >= 80 ? "High Confidence" : fallbackScoring.bestMatch.score >= 60 ? "Medium Confidence" : "Low Confidence",
        matchedCategory: fallbackScoring.category,
        grantType: fallbackScoring.bestMatch.grantType,
        aiSummary,
        reasonsForFit: fallbackReasons,
        aiEnrichment: getGrantSpecificFallback(fallbackScoring.bestMatch.grantType),
        snapshot: {
          primaryGoal: formData.primaryGoal,
          estimatedBudget: formData.estimatedBudget,
          startTimeline: formData.startTimeline,
          projectDescription: formData.projectDescription
        },
        identity: {
          name: formData.name,
          companyName: formData.companyName,
          email: formData.email
        },
        metadata: {
          createdAt: new Date().toISOString(),
          reportId: crypto.randomUUID()
        }
      });
      setIsLoading(false);
      nextStep();
    }
  };

  const renderStep = () => {
    const stepProps = {
      nextStep,
      prevStep,
      handleChange,
      formData,
      restart,
      handleSave,
      hasFieldError,
      getFieldError,
      validationErrors,
    };
    
    switch (step) {
      case 1: return <WelcomeStep nextStep={nextStep} />;
      case 2: return <ProjectOverviewStep {...stepProps} />;
      case 3: return formData.primaryGoal === 'Expand into new markets overseas' ? <OverseasExpansionStep {...stepProps} /> : <BusinessEligibilityStep {...stepProps} />;
      case 4: return formData.primaryGoal === 'Expand into new markets overseas' ? <BusinessEligibilityStep {...stepProps} /> : <PreCheckStep {...stepProps} />;
      case 5: return formData.primaryGoal === 'Expand into new markets overseas' ? <PreCheckStep {...stepProps} /> : <SupportNeedsStep {...stepProps} handleMultiSelectChange={handleMultiSelectChange} />;
      case 6: return formData.primaryGoal === 'Expand into new markets overseas' ? <SupportNeedsStep {...stepProps} handleMultiSelectChange={handleMultiSelectChange} /> : <ConsentStep {...stepProps} />;
      case 7: return formData.primaryGoal === 'Expand into new markets overseas' ? <ConsentStep {...stepProps} /> : <ContactInfoStep {...stepProps} nextStep={generateReport} isLoading={isLoading} />;
      case 8: return formData.primaryGoal === 'Expand into new markets overseas' ? <ContactInfoStep {...stepProps} nextStep={generateReport} isLoading={isLoading} /> : (reportData ? <ReportOutput reportData={reportData} formData={formData} restart={restart} userCredits={userCredits} /> : null);
      case 9: return reportData ? <ReportOutput reportData={reportData} formData={formData} restart={restart} userCredits={userCredits} /> : null;
      default: return <WelcomeStep nextStep={nextStep} />;
    }
  };

  const getTotalSteps = () => {
    return formData.primaryGoal === 'Expand into new markets overseas' ? 9 : 8;
  };

  // Helper function to check if a field has validation errors
  const hasFieldError = (fieldName: string): boolean => {
    return validationErrors.some(error => error.field === fieldName);
  };

  // Helper function to get error message for a field
  const getFieldError = (fieldName: string): string | undefined => {
    const error = validationErrors.find(error => error.field === fieldName);
    return error?.message;
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen font-sans text-slate-800 transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto relative px-4 pt-20 pb-6 sm:px-6 sm:pt-24 sm:pb-8">
        {renderStep()}
        {showSaveConfirmation && <SaveConfirmationBanner />}
        {validationErrors.length > 0 && <ValidationErrorBanner errors={validationErrors} onDismiss={() => setValidationErrors([])} />}
      </div>
    </div>
  );
};

export default App;

// Custom Dropdown Component
const CustomDropdown: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  className?: string;
}> = ({ value, onChange, options, placeholder, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 sm:p-4 pr-10 border-2 border-slate-200 rounded-xl bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 text-slate-900 text-sm sm:text-base text-left flex items-center justify-between"
      >
        <span className={selectedOption ? 'text-slate-900' : 'text-slate-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          size={18} 
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base hover:bg-blue-50 transition-colors ${
                option.value === value ? 'bg-blue-100 text-blue-900 font-medium' : 'text-slate-900'
              } ${option.value === options[0].value ? 'rounded-t-xl' : ''} ${
                option.value === options[options.length - 1].value ? 'rounded-b-xl' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// UI Components
const SaveConfirmationBanner: React.FC = () => (
  <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-600 text-white py-3 px-6 rounded-xl shadow-lg flex items-center gap-3 animate-bounce z-50">
    <CheckCircle2 size={20} />
    <span className="font-semibold">Progress Saved!</span>
  </div>
);

const ValidationErrorBanner: React.FC<{ errors: ValidationError[]; onDismiss: () => void }> = ({ errors, onDismiss }) => (
  <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white py-4 px-6 rounded-xl shadow-lg max-w-md z-50">
    <div className="flex items-start gap-3">
      <button 
        onClick={onDismiss}
        className="flex-shrink-0 mt-0.5 hover:bg-red-700 rounded-full p-1 transition-colors"
      >
        <X size={20} />
      </button>
      <div>
        <h3 className="font-semibold mb-2">
          Please fix {errors.length} error{errors.length !== 1 ? 's' : ''}:
        </h3>
        <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
          {errors.map((error, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-red-200">•</span>
              <span><strong>{error.field}:</strong> {error.message}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-red-200 mt-2">
          Click on any field to start fixing the errors
        </p>
      </div>
    </div>
  </div>
);

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative flex items-center group">
    {children}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-slate-700 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg">
      {text}
      <svg className="absolute text-slate-700 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
      </svg>
    </div>
  </div>
);

const ProgressIndicator: React.FC<{ currentStep: number; totalSteps: number; isLoading?: boolean }> = ({ currentStep, totalSteps, isLoading = false }) => {
  const getStepLabels = () => {
    if (totalSteps === 9) {
      return ["Overview", "Eligibility", "Overseas", "Pre-check", "Support", "Consent", "Contact", "Report"];
    }
    return ["Overview", "Eligibility", "Pre-check", "Support", "Consent", "Contact", "Report"];
  };

  // Journey excludes the Welcome page; journey has totalSteps - 1 items
  const journeyStepsCount = Math.max(totalSteps - 1, 1);
  const labels = getStepLabels();

  // Convert absolute step (includes Welcome) to journey index (1-based)
  let journeyActive = currentStep - 1;
  if (currentStep === totalSteps - 1 && isLoading) {
    // While generating report on the Contact step, highlight Report
    journeyActive = journeyStepsCount;
  }

  // Mobile detection based on Tailwind's `sm` breakpoint (<640px)
  const [isMobile, setIsMobile] = React.useState<boolean>(() => typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)').matches : false);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // Build the set of steps to display on mobile
  type DisplayStep = number | '…';
  const getMobileSteps = (): DisplayStep[] => {
    if (journeyActive <= 4) {
      // First set: steps 1-4, then ellipsis
      return [1, 2, 3, 4, '…'];
    }
    // Second set: steps 5..end
    const tail = Array.from({ length: Math.max(journeyStepsCount - 4, 0) }, (_, i) => i + 5);
    return tail as number[];
  };

  const allSteps = Array.from({ length: journeyStepsCount }, (_, i) => i + 1);
  const displayedSteps: DisplayStep[] = isMobile ? getMobileSteps() : allSteps;

  const isStepCompleted = (step: DisplayStep): boolean => {
    if (typeof step !== 'number') return false;
    return journeyActive > step;
  };

  const isStepActive = (step: DisplayStep): boolean => {
    if (typeof step !== 'number') return false;
    return journeyActive === step;
  };

  return (
    <div className="w-full mb-8 sm:mb-12">
      <div className="flex justify-between items-start">
        {displayedSteps.map((displayStep, i) => {
          const stepNumber = typeof displayStep === 'number' ? displayStep : undefined;
          const completed = isStepCompleted(displayStep);
          const active = isStepActive(displayStep);
          const totalToDivide = displayedSteps.length; // width allocation for each item in row

          return (
            <React.Fragment key={`${displayStep}-${i}`}>
              <div className="flex flex-col items-center min-w-0" style={{ width: `${100 / totalToDivide}%` }}>
                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 border-2 text-xs sm:text-sm font-bold ${
                  completed
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : active
                      ? 'bg-white border-blue-600 ring-4 ring-blue-200 text-blue-600'
                      : 'bg-white border-slate-300 text-slate-500'
                }`}>
                  {typeof displayStep === 'number' ? (
                    completed ? <CheckCircle2 size={14} className="sm:w-[18px] sm:h-[18px]" /> : stepNumber
                  ) : (
                    '…'
                  )}
                </div>
                {/* Hide labels on mobile to avoid cramped text */}
                {!isMobile && (
                  <p className={`text-xs mt-1 sm:mt-2 font-semibold transition-colors text-center leading-tight ${
                    active || completed ? 'text-blue-600' : 'text-slate-500'
                  }`}>
                    {labels[(stepNumber ?? 1) - 1]}
                  </p>
                )}
              </div>
              {i < displayedSteps.length - 1 && (
                <div className={`flex-1 h-1 mt-4 sm:mt-5 transition-all duration-300 ${
                  // If this is the last connector in set1 (before the ellipsis), keep it neutral
                  isMobile && displayedSteps[displayedSteps.length - 1] === '…' && i === displayedSteps.length - 2
                    ? 'bg-slate-200'
                    : (typeof displayStep === 'number' && journeyActive > (stepNumber as number) ? 'bg-blue-600' : 'bg-slate-200')
                }`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const StepWrapper: React.FC<{
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  canProceed?: boolean;
  handleSave: () => void;
  restart: () => void;
  isLoading?: boolean;
  validationErrors?: ValidationError[];
}> = ({ children, title, subtitle, currentStep, totalSteps, nextStep, prevStep, canProceed = true, handleSave, restart, isLoading = false, validationErrors = [] }) => (
  <div className="bg-white p-4 sm:p-8 lg:p-12 rounded-2xl shadow-xl animate-fade-in">
    <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} isLoading={isLoading} />
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 leading-tight">{title}</h2>
      {subtitle && <p className="text-slate-600 text-base sm:text-lg px-2">{subtitle}</p>}
      {validationErrors.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 text-sm font-medium">
            ⚠️ {validationErrors.length} field{validationErrors.length !== 1 ? 's' : ''} need{validationErrors.length !== 1 ? '' : 's'} attention
          </p>
        </div>
      )}
    </div>
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {children}
    </div>
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-12 gap-3 sm:gap-4">
      <button 
        onClick={prevStep} 
        className="flex items-center justify-center space-x-2 bg-slate-200 text-slate-700 font-bold py-3 px-4 sm:px-6 rounded-xl hover:bg-slate-300 transition-all duration-300 w-full sm:w-auto order-3 sm:order-1 text-sm sm:text-base"
      >
        <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
        <span>Back</span>
      </button>
      <div className="flex gap-3 order-2 sm:order-2">
        <button 
          onClick={handleSave} 
          className="flex items-center justify-center space-x-2 text-blue-600 font-semibold py-2 px-3 sm:py-3 sm:px-4 rounded-xl hover:bg-blue-50 transition-all duration-300"
        >
          <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
        <button 
          onClick={restart} 
          className="flex items-center justify-center space-x-2 text-red-500 font-semibold py-2 px-3 sm:py-3 sm:px-4 rounded-xl hover:bg-red-50 transition-all duration-300"
        >
          <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
      <button 
        onClick={nextStep} 
        disabled={!canProceed || isLoading} 
        className="flex items-center justify-center space-x-2 bg-blue-600 text-white font-bold py-3 px-6 sm:px-8 rounded-xl hover:bg-blue-700 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed w-full sm:w-auto order-1 sm:order-3 text-sm sm:text-base"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="sm:w-5 sm:h-5 animate-spin" />
            <span>Generating Report...</span>
          </>
        ) : (
          <>
            <span>Next</span>
            <ChevronRight size={18} className="sm:w-5 sm:h-5" />
          </>
        )}
      </button>
    </div>
  </div>
);

const OptionCard: React.FC<{
  option: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  description?: string;
  tooltip?: string;
}> = ({ option, selected, onClick, icon, description, tooltip }) => (
  <div
    onClick={onClick}
    className={`relative p-4 sm:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-lg ${
      selected
        ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20'
        : 'border-slate-200 bg-white hover:border-blue-300'
    }`}
  >
    <div className="flex items-start gap-3 sm:gap-4">
      {icon && (
        <div className={`p-2 sm:p-3 rounded-xl flex-shrink-0 ${selected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
          {icon}
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className={`font-semibold text-base sm:text-lg leading-tight ${selected ? 'text-blue-900' : 'text-slate-900'}`}>
            {option}
          </h3>
          {tooltip && (
            <Tooltip text={tooltip}>
              <HelpCircle size={14} className="sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
            </Tooltip>
          )}
        </div>
        {description && (
          <p className={`text-xs sm:text-sm mt-1 sm:mt-2 leading-relaxed ${selected ? 'text-blue-700' : 'text-slate-600'}`}>
            {description}
          </p>
        )}
      </div>
      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        selected 
          ? 'border-blue-500 bg-blue-500' 
          : 'border-slate-300'
      }`}>
        {selected && <CheckCircle2 size={12} className="sm:w-4 sm:h-4 text-white" />}
      </div>
    </div>
  </div>
);

const InputField: React.FC<{
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}> = ({ icon, placeholder, type = "text", value, onChange, required = false, hasError = false, errorMessage }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none text-slate-400">
      {icon}
    </div>
    <input 
      type={type} 
      placeholder={`${placeholder}${required ? ' *' : ''}`} 
      value={value} 
      onChange={onChange} 
      className={`w-full p-3 sm:p-4 pl-10 sm:pl-12 border-2 rounded-xl bg-white focus:outline-none focus:ring-4 transition-all duration-200 text-slate-900 text-sm sm:text-base ${
        hasError 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
          : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
      }`}
    />
    {hasError && errorMessage && (
      <p className="text-red-600 text-xs mt-1 ml-1">{errorMessage}</p>
    )}
  </div>
);

// Step Components
const WelcomeStep: React.FC<{ nextStep: () => void }> = ({ nextStep }) => (
  <div className="text-center bg-white p-6 sm:p-12 lg:p-16 rounded-2xl shadow-xl animate-fade-in">
    <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 flex-wrap gap-2">
      <span className="text-xs font-semibold bg-blue-100 text-blue-800 py-1 sm:py-2 px-3 sm:px-4 rounded-full flex items-center gap-1 sm:gap-2">
        <Bot size={12} className="sm:w-[14px] sm:h-[14px]" />
        Powered by AI
      </span>
      <span className="text-xs font-semibold bg-green-100 text-green-800 py-1 sm:py-2 px-3 sm:px-4 rounded-full flex items-center gap-1 sm:gap-2">
        <ShieldCheck size={12} className="sm:w-[14px] sm:h-[14px]" />
        EnterpriseSG Guidelines
      </span>
    </div>
    <div className="mb-6 sm:mb-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight px-2">
        Grant DNA™
        <span className="block text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-blue-600 font-normal mt-2">
          Diagnostic Engine
        </span>
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
        Discover your Singapore business grant eligibility in under 5 minutes. Our AI-powered assessment analyzes your project against official EnterpriseSG criteria.
      </p>
    </div>
    <button 
      onClick={nextStep} 
      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-xl text-lg sm:text-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 sm:gap-3 mx-auto"
    >
      <Zap size={20} className="sm:w-6 sm:h-6" />
      Start Assessment
    </button>
    <p className="text-xs sm:text-sm text-slate-500 mt-4 sm:mt-6 px-4">
      Free • No registration required • Instant results
    </p>
  </div>
);

const ProjectOverviewStep: React.FC<{
  formData: FormData;
  handleChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSave: () => void;
  restart: () => void;
  hasFieldError: (fieldName: string) => boolean;
  getFieldError: (fieldName: string) => string | undefined;
}> = ({ formData, handleChange, nextStep, prevStep, handleSave, restart, hasFieldError, getFieldError }) => {
  const canProceed = !!(formData.primaryGoal && formData.projectDescription.trim() && formData.estimatedBudget && formData.startTimeline);
  
  return (
    <StepWrapper 
      title="Project Overview" 
      subtitle="Tell us about your project"
      currentStep={2} 
      totalSteps={formData.primaryGoal === 'Expand into new markets overseas' ? 9 : 8}
      nextStep={nextStep} 
      prevStep={prevStep} 
      canProceed={canProceed} 
      handleSave={handleSave} 
      restart={restart}
    >
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
          <Target size={20} className="sm:w-6 sm:h-6 text-blue-600" />
          What is the primary goal of your project? *
        </h3>
        <div className="grid gap-4">
          <OptionCard
            option="Improve internal processes"
            selected={formData.primaryGoal === 'Improve internal processes'}
            onClick={() => handleChange('primaryGoal')({ target: { value: 'Improve internal processes' } } as any)}
            icon={<Briefcase size={20} className="sm:w-6 sm:h-6" />}
            description="Business Strategy, HR, Financial Management, Data Analytics"
          />
          <OptionCard
            option="Create new products / automate ops"
            selected={formData.primaryGoal === 'Create new products / automate ops'}
            onClick={() => handleChange('primaryGoal')({ target: { value: 'Create new products / automate ops' } } as any)}
            icon={<Lightbulb size={20} className="sm:w-6 sm:h-6" />}
            description="Product Development, Automation, Process Redesign"
          />
          <OptionCard
            option="Expand into new markets overseas"
            selected={formData.primaryGoal === 'Expand into new markets overseas'}
            onClick={() => handleChange('primaryGoal')({ target: { value: 'Expand into new markets overseas' } } as any)}
            icon={<Globe size={20} className="sm:w-6 sm:h-6" />}
            description="Market Entry, Mergers & Acquisitions, Trade Fairs"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
          Please describe your project *
        </h3>
        <textarea
          value={formData.projectDescription}
          onChange={handleChange('projectDescription')}
          rows={3}
          className={`w-full p-3 sm:p-4 border-2 rounded-xl bg-white focus:outline-none focus:ring-4 transition-all duration-200 text-slate-900 text-sm sm:text-base resize-none ${
            hasFieldError('projectDescription')
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
          }`}
          placeholder="e.g., We want to implement a new CRM system to increase sales by 30% and improve customer retention..."
        />
        {hasFieldError('projectDescription') && getFieldError('projectDescription') && (
          <p className="text-red-600 text-xs mt-1">{getFieldError('projectDescription')}</p>
        )}
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Describe your business challenge, technologies involved, and expected outcomes.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
            Estimated Budget *
          </h3>
          <CustomDropdown
            value={formData.estimatedBudget}
            onChange={(value) => handleChange('estimatedBudget')({ target: { value } } as any)}
            options={[
              { value: "Below $50,000", label: "Below $50,000" },
              { value: "$50k–$150k", label: "$50,000 – $150,000" },
              { value: "$150k–$500k", label: "$150,000 – $500,000" },
              { value: "Above $500k", label: "Above $500,000" }
            ]}
            placeholder="Select budget range..."
          />
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
            Start Timeline *
          </h3>
          <CustomDropdown
            value={formData.startTimeline}
            onChange={(value) => handleChange('startTimeline')({ target: { value } } as any)}
            options={[
              { value: "In the next 3 months", label: "In the next 3 months" },
              { value: "In 3–6 months", label: "In 3–6 months" },
              { value: "After 6 months", label: "After 6 months" },
              { value: "Not sure yet", label: "Not sure yet" }
            ]}
            placeholder="Select timeline..."
          />
        </div>
      </div>
    </StepWrapper>
  );
};

const OverseasExpansionStep: React.FC<{
  formData: FormData;
  handleChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSave: () => void;
  restart: () => void;
  hasFieldError: (fieldName: string) => boolean;
  getFieldError: (fieldName: string) => string | undefined;
}> = ({ formData, handleChange, nextStep, prevStep, handleSave, restart, hasFieldError, getFieldError }) => {
  const canProceed = !!(formData.targetMarkets.trim() && formData.previousSales);
  
  return (
    <StepWrapper 
      title="Overseas Expansion Details" 
      subtitle="International market expansion details"
      currentStep={3} 
      totalSteps={9}
      nextStep={nextStep} 
      prevStep={prevStep} 
      canProceed={canProceed} 
      handleSave={handleSave} 
      restart={restart}
    >
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
          Which market(s) are you targeting? *
        </h3>
        <input
          type="text"
          value={formData.targetMarkets}
          onChange={handleChange('targetMarkets')}
          placeholder="e.g., Vietnam, Indonesia, Australia"
          className={`w-full p-3 sm:p-4 border-2 rounded-xl bg-white focus:outline-none focus:ring-4 transition-all duration-200 text-slate-900 text-sm sm:text-base ${
            hasFieldError('targetMarkets')
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
          }`}
        />
        {hasFieldError('targetMarkets') && getFieldError('targetMarkets') && (
          <p className="text-red-600 text-xs mt-1">{getFieldError('targetMarkets')}</p>
        )}
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
          Has your company made over S$100,000 in annual sales in any of these target markets in the past 3 years? *
        </h3>
        <div className="grid gap-4">
          <OptionCard
            option="Yes"
            selected={formData.previousSales === 'Yes'}
            onClick={() => handleChange('previousSales')({ target: { value: 'Yes' } } as any)}
          />
          <OptionCard
            option="No"
            selected={formData.previousSales === 'No'}
            onClick={() => handleChange('previousSales')({ target: { value: 'No' } } as any)}
          />
          <OptionCard
            option="Not sure"
            selected={formData.previousSales === 'Not sure'}
            onClick={() => handleChange('previousSales')({ target: { value: 'Not sure' } } as any)}
          />
        </div>
                   <p className="text-xs sm:text-sm text-slate-500 mt-3 sm:mt-4">
             MRA grants only support expansion into new markets where you haven&apos;t established significant sales presence.
           </p>
      </div>
    </StepWrapper>
  );
};

const BusinessEligibilityStep: React.FC<{
  formData: FormData;
  handleChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSave: () => void;
  restart: () => void;
}> = ({ formData, handleChange, nextStep, prevStep, handleSave, restart }) => {
  const canProceed = !!(formData.singaporeRegistered && formData.localShareholding && formData.employeeCount && formData.financialViability);
  const currentStepNum = formData.primaryGoal === 'Expand into new markets overseas' ? 4 : 3;
  
  return (
    <StepWrapper 
      title="Business Eligibility" 
      subtitle="Basic grant requirements"
      currentStep={currentStepNum} 
      totalSteps={formData.primaryGoal === 'Expand into new markets overseas' ? 9 : 8}
      nextStep={nextStep} 
      prevStep={prevStep} 
      canProceed={canProceed} 
      handleSave={handleSave} 
      restart={restart}
    >
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2 leading-tight">
          <Building size={20} className="sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
          Is your business registered and operating in Singapore? *
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <OptionCard
            option="Yes"
            selected={formData.singaporeRegistered === 'Yes'}
            onClick={() => handleChange('singaporeRegistered')({ target: { value: 'Yes' } } as any)}
            tooltip="Required for all Singapore government grants"
          />
          <OptionCard
            option="No"
            selected={formData.singaporeRegistered === 'No'}
            onClick={() => handleChange('singaporeRegistered')({ target: { value: 'No' } } as any)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2 leading-tight">
          <Users size={20} className="sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
          Does your company have at least 30% local shareholding? *
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <OptionCard
            option="Yes"
            selected={formData.localShareholding === 'Yes'}
            onClick={() => handleChange('localShareholding')({ target: { value: 'Yes' } } as any)}
            tooltip="Ownership by Singapore citizens or permanent residents"
          />
          <OptionCard
            option="No"
            selected={formData.localShareholding === 'No'}
            onClick={() => handleChange('localShareholding')({ target: { value: 'No' } } as any)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
          Company size (employees in Singapore) *
        </h3>
        <CustomDropdown
          value={formData.employeeCount}
          onChange={(value) => handleChange('employeeCount')({ target: { value } } as any)}
          options={[
            { value: "≤ 200 employees", label: "≤ 200 employees" },
            { value: "> 200 employees", label: "> 200 employees" }
          ]}
          placeholder="Select company size..."
        />
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2 leading-tight">
          <Shield size={20} className="sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
          Has your company been financially viable for the past 1-2 years? *
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <OptionCard
            option="Yes"
            selected={formData.financialViability === 'Yes'}
            onClick={() => handleChange('financialViability')({ target: { value: 'Yes' } } as any)}
            tooltip="Profitable or breaking even with positive cash flow"
          />
          <OptionCard
            option="No"
            selected={formData.financialViability === 'No'}
            onClick={() => handleChange('financialViability')({ target: { value: 'No' } } as any)}
          />
        </div>
      </div>
    </StepWrapper>
  );
};

const PreCheckStep: React.FC<{
  formData: FormData;
  handleChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSave: () => void;
  restart: () => void;
}> = ({ formData, handleChange, nextStep, prevStep, handleSave, restart }) => {
  const canProceed = !!formData.vendorDeposit;
  const currentStepNum = formData.primaryGoal === 'Expand into new markets overseas' ? 5 : 4;
  
  return (
    <StepWrapper 
      title="Pre-check" 
      subtitle="Compliance check"
      currentStep={currentStepNum} 
      totalSteps={formData.primaryGoal === 'Expand into new markets overseas' ? 9 : 8}
      nextStep={nextStep} 
      prevStep={prevStep} 
      canProceed={canProceed} 
      handleSave={handleSave} 
      restart={restart}
    >
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
          Have you already paid or placed a deposit with any vendors for this project? *
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <OptionCard
            option="Yes"
            selected={formData.vendorDeposit === 'Yes'}
            onClick={() => handleChange('vendorDeposit')({ target: { value: 'Yes' } } as any)}
          />
          <OptionCard
            option="No"
            selected={formData.vendorDeposit === 'No'}
            onClick={() => handleChange('vendorDeposit')({ target: { value: 'No' } } as any)}
          />
        </div>
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl">
                       <p className="text-amber-800 text-xs sm:text-sm leading-relaxed">
               <strong>Important:</strong> Grants typically do not allow pre-commitments with vendors before approval. 
               If you&apos;ve already made payments, you may not be eligible for funding.
             </p>
        </div>
      </div>
    </StepWrapper>
  );
};

const SupportNeedsStep: React.FC<{
  formData: FormData;
  handleChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleMultiSelectChange: (value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSave: () => void;
  restart: () => void;
}> = ({ formData, handleChange, handleMultiSelectChange, nextStep, prevStep, handleSave, restart }) => {
  const canProceed = !!(formData.hasConsultant && formData.needVendorHelp && formData.supportNeeds.length > 0);
  const currentStepNum = formData.primaryGoal === 'Expand into new markets overseas' ? 6 : 5;
  
  return (
    <StepWrapper 
      title="Support Needs" 
      subtitle="What assistance do you need?"
      currentStep={currentStepNum} 
      totalSteps={formData.primaryGoal === 'Expand into new markets overseas' ? 9 : 8}
      nextStep={nextStep} 
      prevStep={prevStep} 
      canProceed={canProceed} 
      handleSave={handleSave} 
      restart={restart}
    >
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
          Do you already have a management consultant for this project? *
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <OptionCard
            option="Yes"
            selected={formData.hasConsultant === 'Yes'}
            onClick={() => handleChange('hasConsultant')({ target: { value: 'Yes' } } as any)}
          />
          <OptionCard
            option="No"
            selected={formData.hasConsultant === 'No'}
            onClick={() => handleChange('hasConsultant')({ target: { value: 'No' } } as any)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
          Do you need help finding a vendor or tech solution provider? *
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <OptionCard
            option="Yes"
            selected={formData.needVendorHelp === 'Yes'}
            onClick={() => handleChange('needVendorHelp')({ target: { value: 'Yes' } } as any)}
          />
          <OptionCard
            option="No"
            selected={formData.needVendorHelp === 'No'}
            onClick={() => handleChange('needVendorHelp')({ target: { value: 'No' } } as any)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">
          What support do you need most? *
        </h3>
        <div className="grid gap-3 sm:gap-4">
          {[
            'Grant writing',
            'Vendor sourcing', 
            'Project management',
            'Not sure yet'
          ].map((option) => (
            <OptionCard
              key={option}
              option={option}
              selected={formData.supportNeeds.includes(option)}
              onClick={() => handleMultiSelectChange(option)}
            />
          ))}
        </div>
      </div>
    </StepWrapper>
  );
};

const ConsentStep: React.FC<{
  formData: FormData;
  handleChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSave: () => void;
  restart: () => void;
}> = ({ formData, handleChange, nextStep, prevStep, handleSave, restart }) => {
  const canProceed = !!formData.consentSharing;
  const currentStepNum = formData.primaryGoal === 'Expand into new markets overseas' ? 7 : 6;
  
  return (
    <StepWrapper 
      title="Consent & Privacy" 
      subtitle="Data privacy preferences"
      currentStep={currentStepNum} 
      totalSteps={formData.primaryGoal === 'Expand into new markets overseas' ? 9 : 8}
      nextStep={nextStep} 
      prevStep={prevStep} 
      canProceed={canProceed} 
      handleSave={handleSave} 
      restart={restart}
    >
      <div className="max-w-2xl mx-auto">
        <div className="p-4 sm:p-6 lg:p-8 border-2 border-slate-200 rounded-2xl bg-slate-50">
          <div className="flex items-start gap-3 sm:gap-4">
            <input
              type="checkbox"
              checked={formData.consentSharing}
              onChange={handleChange('consentSharing')}
              className="mt-1 h-4 w-4 sm:h-5 sm:w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
            />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">
                Consent to Share Project Details *
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                I agree to have my project details shared with certified EDG consultants and relevant vendors 
                who can help with my grant application and project implementation. I understand this enables 
                personalized matching and may involve paid services.
              </p>
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-blue-800 text-xs sm:text-sm leading-relaxed">
                  <strong>Privacy Note:</strong> Your information will only be shared with pre-vetted, certified partners. 
                  You maintain full control over any subsequent engagements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StepWrapper>
  );
};

const ContactInfoStep: React.FC<{
  formData: FormData;
  handleChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSave: () => void;
  restart: () => void;
  isLoading: boolean;
  hasFieldError: (fieldName: string) => boolean;
  getFieldError: (fieldName: string) => string | undefined;
  validationErrors: ValidationError[];
}> = ({ formData, handleChange, nextStep, prevStep, handleSave, restart, isLoading, hasFieldError, getFieldError, validationErrors }) => {
  const canProceed = !!(formData.name.trim() && formData.email.trim() && formData.companyName.trim());
  const currentStepNum = formData.primaryGoal === 'Expand into new markets overseas' ? 8 : 7;

  const testGrantScoring = () => {
    console.log('🧪 Testing grant scoring with current form data...');
    getDetailedScoring(formData);
  };
  
  // Get validation errors for fields in this step
  const stepValidationErrors = validationErrors.filter(error => 
    ['name', 'email', 'companyName', 'phoneNumber'].includes(error.field)
  );

  return (
    <StepWrapper 
      title="Contact Information" 
      subtitle="Where should we send your report?"
      currentStep={currentStepNum} 
      totalSteps={formData.primaryGoal === 'Expand into new markets overseas' ? 9 : 8}
      nextStep={nextStep} 
      prevStep={prevStep} 
      canProceed={canProceed} 
      handleSave={handleSave} 
      restart={restart}
      isLoading={isLoading}
      validationErrors={stepValidationErrors}
    >
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        <InputField
          icon={<User size={18} className="sm:w-5 sm:h-5" />}
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange('name')}
          required
          hasError={hasFieldError('name')}
          errorMessage={getFieldError('name')}
        />
        <InputField
          icon={<Mail size={18} className="sm:w-5 sm:h-5" />}
          placeholder="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          required
          hasError={hasFieldError('email')}
          errorMessage={getFieldError('email')}
        />
        <InputField
          icon={<Building size={18} className="sm:w-5 sm:h-5" />}
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange('companyName')}
          required
          hasError={hasFieldError('companyName')}
          errorMessage={getFieldError('companyName')}
        />
        <InputField
          icon={<Phone size={18} className="sm:w-5 sm:h-5" />}
          placeholder="Phone Number (Optional)"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange('phoneNumber')}
        />
      </div>
      <div className="text-center">
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto px-4">
          We value your privacy and will only contact you regarding your assessment and relevant grant support services.
        </p>
        
        {/* Test button for development */}
        <div className="mt-4 text-center">
          <button
            onClick={testGrantScoring}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-lg transition-colors"
          >
            🧪 Test Grant Scoring
          </button>
        </div>
      </div>
    </StepWrapper>
  );
};

const ReportOutput: React.FC<{
  reportData: ReportData;
  formData: FormData;
  restart: () => void;
  userCredits: { standard: number; premium: number };
}> = ({ reportData, formData, restart, userCredits }) => {
  const scoreColor = reportData.score >= 75 ? 'text-green-500' : reportData.score >= 50 ? 'text-orange-500' : 'text-red-500';

  return (
    <div className="bg-white rounded-2xl shadow-xl animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 lg:p-8 border-b-2 border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-start flex-col lg:flex-row gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-600 rounded-xl">
                <Bot size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  Grant DNA™ Report
                </h1>
                <p className="text-sm sm:text-base text-slate-600">
                  AI-Powered Eligibility Assessment
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold bg-blue-100 text-blue-800 py-1 px-2 sm:px-3 rounded-full">
                EnterpriseSG Guidelines
              </span>
              <span className="text-xs font-semibold bg-green-100 text-green-800 py-1 px-2 sm:px-3 rounded-full">
                {reportData.confidence}
              </span>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-slate-200 w-full lg:w-auto">
            <div className="text-center lg:text-right mb-3 sm:mb-4">
              <p className="font-semibold text-slate-700 text-sm sm:text-base">{formData.name}</p>
              <p className="text-slate-500 text-xs sm:text-sm">{formData.companyName}</p>
            </div>
            <div className="border-t border-slate-200 pt-3 sm:pt-4 space-y-1 sm:space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-600">Standard Credits</span>
                <span className="font-semibold text-slate-900">{userCredits.standard}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-600 flex items-center gap-1">
                  <Sparkles size={10} className="sm:w-3 sm:h-3 text-purple-500" />
                  Premium Credits
                </span>
                <span className="font-semibold text-slate-900">{userCredits.premium}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Eligibility Scorecard */}
          <div className="bg-slate-50 p-4 sm:p-6 lg:p-8 rounded-2xl border-2 border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Target size={24} className="sm:w-7 sm:h-7 text-blue-600" />
              Eligibility Scorecard
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path 
                    className="text-slate-200" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  />
                  <path 
                    className={scoreColor} 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeDasharray={`${reportData.score}, 100`} 
                    strokeLinecap="round"
                  />
                </svg>
                <div className={`absolute inset-0 flex flex-col items-center justify-center font-bold ${scoreColor}`}>
                  <span className="text-3xl sm:text-4xl">{reportData.score}%</span>
                  <span className="text-xs sm:text-sm">Eligible</span>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-medium leading-relaxed">
                  Based on your inputs, your project is <strong>likely eligible</strong> for {reportData.grantType}.
                </p>
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-blue-800 text-xs sm:text-sm flex items-start gap-2">
                    <Info size={14} className="sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                    This is an estimated score based on our AI model and EnterpriseSG guidelines. 
                    It does not guarantee approval.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Summary */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl border-2 border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Bot size={24} className="sm:w-7 sm:h-7 text-blue-600" />
              Analysis Summary
            </h2>
            <div className="prose max-w-none">
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                {reportData.aiSummary}
              </p>
              <div className="mt-4 sm:mt-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">
                  Key Reasons for Grant Fit:
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {reportData.reasonsForFit.map((reason: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 size={16} className="sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm lg:text-base text-slate-600" dangerouslySetInnerHTML={{ __html: reason }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* AI Implementation Solutions */}
          {reportData.aiEnrichment && (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6 lg:p-8 rounded-2xl border-2 border-purple-100">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Zap size={24} className="sm:w-7 sm:h-7 text-purple-600" />
                AI Implementation Solutions
              </h2>
              <div className="prose max-w-none">
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                  Based on your project requirements, here are 3 specific implementation solutions that can be funded through {reportData.grantType} grants:
                </p>
                <div className="space-y-3 sm:space-y-4">
                  {reportData.aiEnrichment.suggestions.map((suggestion: string, index: number) => (
                    <div key={index} className="bg-white p-3 sm:p-4 rounded-xl border border-purple-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-xs sm:text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
                            {suggestion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {reportData.aiEnrichment.reasoning && (
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-purple-800 text-xs sm:text-sm flex items-start gap-2">
                      <Lightbulb size={14} className="sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Why these solutions:</span> {reportData.aiEnrichment.reasoning}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6 sm:space-y-8">
          {/* Project Snapshot */}
          <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border-2 border-slate-100">
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-slate-800 flex items-center gap-2">
              <FileText size={18} className="sm:w-5 sm:h-5" />
              Project Snapshot
            </h3>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <div>
                <span className="font-semibold text-slate-500 block mb-1 text-xs">Goal</span>
                <span className="text-slate-800 font-medium">{formData.primaryGoal}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block mb-1 text-xs">Budget</span>
                <span className="text-slate-800 font-medium">{formData.estimatedBudget}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block mb-1 text-xs">Timeline</span>
                <span className="text-slate-800 font-medium">{formData.startTimeline}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block mb-1 sm:mb-2 text-xs">Description</span>
                <p className="text-slate-800 font-medium leading-relaxed text-xs sm:text-sm">
                  {formData.projectDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Action Center */}
          <div className="bg-blue-50 p-4 sm:p-6 rounded-2xl border-2 border-blue-100">
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2 text-slate-800">
              <TrendingUp size={18} className="sm:w-5 sm:h-5" />
              Next Steps
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full bg-blue-600 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all text-xs sm:text-sm">
                <FileText size={16} className="sm:w-[18px] sm:h-[18px]" />
                Generate Proposal Draft
              </button>
              <button className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-all text-xs sm:text-sm">
                <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
                Find Consultants
              </button>
              <button className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-all text-xs sm:text-sm">
                <Handshake size={16} className="sm:w-[18px] sm:h-[18px]" />
                Find Vendors
              </button>
              <button className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-all text-xs sm:text-sm">
                <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-100 p-4 sm:p-6 lg:p-8 text-center text-slate-600">
        <p className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Need more help?</p>
        <div className="flex justify-center flex-wrap gap-4 sm:gap-6">
          <button 
            onClick={restart} 
            className="flex items-center gap-1 sm:gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm sm:text-base"
          >
            <RefreshCw size={14} className="sm:w-4 sm:h-4" />
            New Assessment
          </button>
          <button className="flex items-center gap-1 sm:gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm sm:text-base">
            <MessageSquare size={14} className="sm:w-4 sm:h-4" />
            Chat Support
          </button>
          <button className="flex items-center gap-1 sm:gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm sm:text-base">
                         <Mail size={14} className="sm:w-4 sm:h-4" />
            Email Us
          </button>
        </div>
        <p className="text-xs mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed px-4">
          This is a preliminary assessment generated by AI and does not constitute a guarantee of grant approval. 
          Results are based on EnterpriseSG guidelines as of 2024. © Grant DNA™ by SmartSME.ai
        </p>
      </div>
    </div>
  );
};

