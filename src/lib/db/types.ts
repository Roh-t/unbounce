export type UserPlan = 'Build' | 'Experiment' | 'Optimize' | 'Agency';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  workspaceName: string;
  plan: UserPlan;
  createdAt: string;
}

export type PageStatus = 'draft' | 'published';

export interface LandingPage {
  id: string;
  userId: string;
  title: string;
  slug: string;
  status: PageStatus;
  category: string;
  templateId?: string;
  contentJson: Record<string, unknown>;
  variantBJson?: Record<string, unknown>;
  abTestEnabled: boolean;
  abSplitPercent: number; // e.g. 50
  views: number;
  conversions: number;
  variantAViews?: number;
  variantBViews?: number;
  variantAConversions?: number;
  variantBConversions?: number;
  updatedAt: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  pageId: string;
  pageTitle: string;
  variant: 'A' | 'B';
  name: string;
  email: string;
  company?: string;
  source: string;
  createdAt: string;
}

export interface DailyMetric {
  date: string; // YYYY-MM-DD
  visitors: number;
  conversions: number;
}

export interface WorkspaceDatabase {
  users: User[];
  pages: LandingPage[];
  leads: Lead[];
  metrics: DailyMetric[];
}

