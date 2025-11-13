// ECT Grant Scoring Logic - Ported from aivira-ect-main
// Grant Scoring Logic for MRA, PSG, and EDG
// Based on EnterpriseSG guidelines and eligibility criteria

import type { FormData, GrantScore, GrantType } from './types';

// Project goal mapping
const PROJECT_GOAL_MAP: Record<string, string> = {
  'Improve internal processes': 'internal',
  'Create new products / automate ops': 'automate',
  'Expand into new markets overseas': 'overseas'
};

// Budget mapping
const BUDGET_MAP: Record<string, string> = {
  'Below $50,000': '<50k',
  '$50k–$150k': '50-150k',
  '$150k–$500k': '150-500k',
  'Above $500k': '>500k'
};

// Timeline mapping
const TIMELINE_MAP: Record<string, string> = {
  'In the next 3 months': '<3mo',
  'In 3–6 months': '3-6mo',
  'After 6 months': '>6mo',
  'Not sure yet': 'unsure'
};

/**
 * Calculate MRA (Market Readiness Assistance) score
 * MRA is specifically for overseas market expansion
 */
function calculateMRAScore(formData: FormData): GrantScore {
  const disqualifiers: string[] = [];
  const breakdown: GrantScore['breakdown'] = [];

  // Hard disqualifiers check
  if (PROJECT_GOAL_MAP[formData.primaryGoal] !== 'overseas') {
    disqualifiers.push('Project goal must be overseas expansion for MRA');
  }
  if (formData.singaporeRegistered !== 'Yes') {
    disqualifiers.push('Must be registered in Singapore for MRA');
  }
  if (formData.localShareholding !== 'Yes') {
    disqualifiers.push('Must have at least 30% local shareholding for MRA');
  }
  if (formData.employeeCount !== '≤ 200 employees') {
    disqualifiers.push('Group employment must be ≤ 200 employees for MRA');
  }
  if (formData.previousSales === 'Yes') {
    disqualifiers.push('Cannot have >S$100k sales in target market in last 3 years for MRA');
  }

  // If any disqualifiers, return 0 score
  if (disqualifiers.length > 0) {
    return {
      grantType: 'MRA',
      score: 0,
      disqualifiers,
      breakdown: []
    };
  }

  let totalScore = 0;

  // 1. New market confirmation (40 pts)
  let marketScore = 0;
  if (formData.previousSales === 'No') {
    marketScore = 40;
  } else if (formData.previousSales === 'Not sure') {
    marketScore = 20;
  }
  totalScore += marketScore;
  breakdown.push({
    component: 'New Market Confirmation',
    points: marketScore,
    maxPoints: 40,
    reason: formData.previousSales === 'No' ? 'No previous sales in target market' : 'Uncertain about previous sales'
  });

  // 2. Registration in SG (20 pts)
  const registrationScore = formData.singaporeRegistered === 'Yes' ? 20 : 0;
  totalScore += registrationScore;
  breakdown.push({
    component: 'Singapore Registration',
    points: registrationScore,
    maxPoints: 20,
    reason: 'Registered and operating in Singapore'
  });

  // 3. ≥30% local equity (20 pts)
  const equityScore = formData.localShareholding === 'Yes' ? 20 : 0;
  totalScore += equityScore;
  breakdown.push({
    component: 'Local Shareholding',
    points: equityScore,
    maxPoints: 20,
    reason: 'At least 30% local shareholding'
  });

  // 4. Group size ≤200 (10 pts)
  const sizeScore = formData.employeeCount === '≤ 200 employees' ? 10 : 0;
  totalScore += sizeScore;
  breakdown.push({
    component: 'Group Size',
    points: sizeScore,
    maxPoints: 10,
    reason: 'Group employment ≤ 200 employees'
  });

  // 5. Timeline readiness (10 pts)
  let timelineScore = 0;
  const timeline = TIMELINE_MAP[formData.startTimeline];
  switch (timeline) {
    case '<3mo':
      timelineScore = 10;
      break;
    case '3-6mo':
      timelineScore = 7;
      break;
    case '>6mo':
      timelineScore = 4;
      break;
    case 'unsure':
      timelineScore = 5;
      break;
  }
  totalScore += timelineScore;
  breakdown.push({
    component: 'Timeline Readiness',
    points: timelineScore,
    maxPoints: 10,
    reason: `Project start timeline: ${formData.startTimeline}`
  });

  return {
    grantType: 'MRA',
    score: totalScore,
    disqualifiers: [],
    breakdown
  };
}

/**
 * Calculate PSG (Productivity Solutions Grant) score
 * PSG focuses on IT adoption and automation
 */
function calculatePSGScore(formData: FormData): GrantScore {
  const disqualifiers: string[] = [];
  const breakdown: GrantScore['breakdown'] = [];

  // Hard disqualifiers check
  if (formData.singaporeRegistered !== 'Yes') {
    disqualifiers.push('Must be registered in Singapore for PSG');
  }
  if (formData.localShareholding !== 'Yes') {
    disqualifiers.push('Must have at least 30% local shareholding for PSG');
  }
  if (formData.employeeCount !== '≤ 200 employees') {
    disqualifiers.push('Group employment must be ≤ 200 employees for PSG');
  }
  if (formData.vendorDeposit === 'Yes') {
    disqualifiers.push('Cannot have pre-paid vendor deposits for PSG');
  }

  // If any disqualifiers, return 0 score
  if (disqualifiers.length > 0) {
    return {
      grantType: 'PSG',
      score: 0,
      disqualifiers,
      breakdown: []
    };
  }

  let totalScore = 0;

  // 1. Project goal alignment (40 pts)
  let goalScore = 0;
  const goal = PROJECT_GOAL_MAP[formData.primaryGoal];
  switch (goal) {
    case 'automate':
      goalScore = 40;
      break;
    case 'internal':
      goalScore = 20;
      break;
    case 'overseas':
      goalScore = 0;
      break;
  }
  totalScore += goalScore;
  breakdown.push({
    component: 'Project Goal Alignment',
    points: goalScore,
    maxPoints: 40,
    reason: `Goal type: ${goal} (automation preferred for PSG)`
  });

  // 2. Budget suitability (20 pts)
  let budgetScore = 0;
  const budget = BUDGET_MAP[formData.estimatedBudget];
  switch (budget) {
    case '<50k':
      budgetScore = 20;
      break;
    case '50-150k':
      budgetScore = 15;
      break;
    case '150-500k':
      budgetScore = 8;
      break;
    case '>500k':
      budgetScore = 4;
      break;
  }
  totalScore += budgetScore;
  breakdown.push({
    component: 'Budget Suitability',
    points: budgetScore,
    maxPoints: 20,
    reason: `Budget range: ${budget} (lower budgets preferred for PSG)`
  });

  // 3. Timeline (15 pts)
  let timelineScore = 0;
  const timeline = TIMELINE_MAP[formData.startTimeline];
  switch (timeline) {
    case '<3mo':
      timelineScore = 15;
      break;
    case '3-6mo':
      timelineScore = 12;
      break;
    case '>6mo':
      timelineScore = 6;
      break;
    case 'unsure':
      timelineScore = 8;
      break;
  }
  totalScore += timelineScore;
  breakdown.push({
    component: 'Timeline',
    points: timelineScore,
    maxPoints: 15,
    reason: `Project start timeline: ${formData.startTimeline}`
  });

  // 4. Needs vendor (10 pts)
  const vendorScore = formData.needVendorHelp === 'Yes' ? 10 : 4;
  totalScore += vendorScore;
  breakdown.push({
    component: 'Vendor Need',
    points: vendorScore,
    maxPoints: 10,
    reason: formData.needVendorHelp === 'Yes' ? 'Needs vendor help (preferred for PSG)' : 'No vendor help needed'
  });

  // 5. Support needs (15 pts total)
  let supportScore = 0;
  if (formData.supportNeeds.includes('Vendor sourcing')) {
    supportScore += 7;
  }
  if (formData.supportNeeds.includes('Project management')) {
    supportScore += 5;
  }
  if (formData.supportNeeds.includes('Grant writing')) {
    supportScore += 3;
  }
  if (formData.supportNeeds.length === 1 && formData.supportNeeds.includes('Not sure yet')) {
    supportScore = 5;
  }
  // Cap at 15 points
  supportScore = Math.min(supportScore, 15);
  totalScore += supportScore;
  breakdown.push({
    component: 'Support Needs',
    points: supportScore,
    maxPoints: 15,
    reason: `Support needs: ${formData.supportNeeds.join(', ')}`
  });

  return {
    grantType: 'PSG',
    score: totalScore,
    disqualifiers: [],
    breakdown
  };
}

/**
 * Calculate EDG (Enterprise Development Grant) score
 * EDG is for business transformation and capability development
 */
function calculateEDGScore(formData: FormData): GrantScore {
  const disqualifiers: string[] = [];
  const breakdown: GrantScore['breakdown'] = [];

  // Hard disqualifiers check
  if (formData.singaporeRegistered !== 'Yes') {
    disqualifiers.push('Must be registered in Singapore for EDG');
  }
  if (formData.localShareholding !== 'Yes') {
    disqualifiers.push('Must have at least 30% local shareholding for EDG');
  }
  if (formData.financialViability !== 'Yes') {
    disqualifiers.push('Must be financially viable for EDG');
  }

  // If any disqualifiers, return 0 score
  if (disqualifiers.length > 0) {
    return {
      grantType: 'EDG',
      score: 0,
      disqualifiers,
      breakdown: []
    };
  }

  let totalScore = 0;

  // 1. Project goal alignment (35 pts)
  let goalScore = 0;
  const goal = PROJECT_GOAL_MAP[formData.primaryGoal];
  switch (goal) {
    case 'internal':
      goalScore = 35;
      break;
    case 'automate':
      goalScore = 30;
      break;
    case 'overseas':
      goalScore = 10;
      break;
  }
  totalScore += goalScore;
  breakdown.push({
    component: 'Project Goal Alignment',
    points: goalScore,
    maxPoints: 35,
    reason: `Goal type: ${goal} (internal processes preferred for EDG)`
  });

  // 2. Budget adequacy (25 pts)
  let budgetScore = 0;
  const budget = BUDGET_MAP[formData.estimatedBudget];
  switch (budget) {
    case '150-500k':
      budgetScore = 25;
      break;
    case '>500k':
      budgetScore = 22;
      break;
    case '50-150k':
      budgetScore = 18;
      break;
    case '<50k':
      budgetScore = 10;
      break;
  }
  totalScore += budgetScore;
  breakdown.push({
    component: 'Budget Adequacy',
    points: budgetScore,
    maxPoints: 25,
    reason: `Budget range: ${budget} (higher budgets preferred for EDG)`
  });

  // 3. Timeline (10 pts)
  let timelineScore = 0;
  const timeline = TIMELINE_MAP[formData.startTimeline];
  switch (timeline) {
    case '<3mo':
      timelineScore = 10;
      break;
    case '3-6mo':
      timelineScore = 8;
      break;
    case '>6mo':
      timelineScore = 5;
      break;
    case 'unsure':
      timelineScore = 6;
      break;
  }
  totalScore += timelineScore;
  breakdown.push({
    component: 'Timeline',
    points: timelineScore,
    maxPoints: 10,
    reason: `Project start timeline: ${formData.startTimeline}`
  });

  // 4. Consultant engagement (15 pts)
  const consultantScore = formData.hasConsultant === 'Yes' ? 15 : 5;
  totalScore += consultantScore;
  breakdown.push({
    component: 'Consultant Engagement',
    points: consultantScore,
    maxPoints: 15,
    reason: formData.hasConsultant === 'Yes' ? 'Has management consultant' : 'No consultant engaged'
  });

  // 5. Support needs (15 pts total)
  let supportScore = 0;
  if (formData.supportNeeds.includes('Grant writing')) {
    supportScore += 8;
  }
  if (formData.supportNeeds.includes('Project management')) {
    supportScore += 7;
  }
  if (formData.supportNeeds.includes('Vendor sourcing')) {
    supportScore += 0; // Vendor sourcing doesn't boost EDG fit
  }
  if (formData.supportNeeds.length === 1 && formData.supportNeeds.includes('Not sure yet')) {
    supportScore = 5;
  }
  // Cap at 15 points
  supportScore = Math.min(supportScore, 15);
  totalScore += supportScore;
  breakdown.push({
    component: 'Support Needs',
    points: supportScore,
    maxPoints: 15,
    reason: `Support needs: ${formData.supportNeeds.join(', ')}`
  });

  return {
    grantType: 'EDG',
    score: totalScore,
    disqualifiers: [],
    breakdown
  };
}

/**
 * Main function to calculate all grant scores and return the best match
 */
export function calculateGrantScores(formData: FormData): {
  scores: GrantScore[];
  bestMatch: GrantScore;
  category: string;
} {
  const mraScore = calculateMRAScore(formData);
  const psgScore = calculatePSGScore(formData);
  const edgScore = calculateEDGScore(formData);

  const scores = [mraScore, psgScore, edgScore];
  
  // Find the highest scoring grant
  const bestMatch = scores.reduce((best, current) => 
    current.score > best.score ? current : best
  );

  // Map grant type to category name
  const categoryMap = {
    'MRA': 'Market Access',
    'PSG': 'Innovation & Productivity', 
    'EDG': 'Core Capabilities'
  };

  return {
    scores,
    bestMatch,
    category: categoryMap[bestMatch.grantType]
  };
}

/**
 * Get detailed scoring breakdown for debugging/testing
 */
export function getDetailedScoring(formData: FormData) {
  const result = calculateGrantScores(formData);
  
  console.log('=== GRANT SCORING BREAKDOWN ===');
  result.scores.forEach(score => {
    console.log(`\n${score.grantType} Score: ${score.score}/100`);
    if (score.disqualifiers.length > 0) {
      console.log('❌ Disqualifiers:', score.disqualifiers);
    } else {
      console.log('✅ Breakdown:');
      score.breakdown.forEach(item => {
        console.log(`  ${item.component}: ${item.points}/${item.maxPoints} - ${item.reason}`);
      });
    }
  });
  
  console.log(`\n🏆 Best Match: ${result.bestMatch.grantType} (${result.bestMatch.score}/100) - ${result.category}`);
  
  return result;
}
