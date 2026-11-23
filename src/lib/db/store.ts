import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { WorkspaceDatabase, User, LandingPage, Lead, DailyMetric } from './types';
import { hashPassword } from '../auth/session';
import {
  saasDefaultData,
  leadGenDefaultData,
  ecommerceDefaultData,
  getDefaultPuckData,
  ensureComponentIds,
} from '../builder/default-templates';
import type { Data } from '@puckeditor/core';

const DB_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DB_DIR, 'db.json');

const DEMO_USER_ID = 'usr_demo_workspace_2026';

// Global in-memory cache for Vercel / serverless runtime safety
declare global {
  var __unbounce_memory_db__: WorkspaceDatabase | undefined;
}

function generateSeedData(): WorkspaceDatabase {
  const demoUser: User = {
    id: DEMO_USER_ID,
    name: 'Alex Vance',
    email: 'demo@unbounce.ai',
    passwordHash: hashPassword('demo1234'),
    workspaceName: 'Growth Velocity Lab',
    plan: 'Experiment',
    createdAt: '2026-01-15T09:00:00.000Z',
  };

  const pages: LandingPage[] = [
    {
      id: 'page_saas_hero',
      userId: DEMO_USER_ID,
      title: 'SaaS AI Launchpad — Dark Mode High CVR',
      slug: 'saas-launchpad',
      status: 'published',
      category: 'SaaS',
      templateId: 'tpl_saas_dark',
      contentJson: saasDefaultData as unknown as Record<string, unknown>,
      variantBJson: {
        ...saasDefaultData,
        content: saasDefaultData.content.map((item) =>
          item.type === 'HeroSection'
            ? {
                ...item,
                props: {
                  ...item.props,
                  headline: 'Convert 35% More Ad Traffic into Paid Customers',
                  subheadline: 'Autonomous multi-armed bandit traffic routing built for performance marketers.',
                  primaryCtaText: 'Claim Your Free Growth Audit',
                },
              }
            : item
        ),
      } as unknown as Record<string, unknown>,
      abTestEnabled: true,
      abSplitPercent: 50,
      views: 3420,
      conversions: 486,
      variantAViews: 1740,
      variantBViews: 1680,
      variantAConversions: 228,
      variantBConversions: 258,
      updatedAt: '2026-11-19T14:32:00.000Z',
      createdAt: '2026-02-01T10:00:00.000Z',
    },
    {
      id: 'page_b2b_lead_gen',
      userId: DEMO_USER_ID,
      title: 'B2B Enterprise Lead Magnet Guide',
      slug: 'b2b-growth-guide',
      status: 'published',
      category: 'Lead Gen',
      templateId: 'tpl_leadgen_minimal',
      contentJson: leadGenDefaultData as unknown as Record<string, unknown>,
      abTestEnabled: false,
      abSplitPercent: 50,
      views: 2150,
      conversions: 387,
      variantAViews: 2150,
      variantBViews: 0,
      variantAConversions: 387,
      variantBConversions: 0,
      updatedAt: '2026-11-18T11:15:00.000Z',
      createdAt: '2026-02-10T12:00:00.000Z',
    },
    {
      id: 'page_ecommerce_bundle',
      userId: DEMO_USER_ID,
      title: 'DTC Skincare Summer Flash Sale',
      slug: 'glow-serum-bundle',
      status: 'published',
      category: 'Ecommerce',
      templateId: 'tpl_ecommerce_hero',
      contentJson: ecommerceDefaultData as unknown as Record<string, unknown>,
      variantBJson: {
        ...ecommerceDefaultData,
        content: ecommerceDefaultData.content.map((item) =>
          item.type === 'HeroSection'
            ? {
                ...item,
                props: {
                  ...item.props,
                  headline: 'The Clinical Glow Bundle Celebrities Are Raving About',
                  subheadline: 'Free overnight shipping on all orders placed before midnight.',
                  primaryCtaText: 'Claim 30% Off Today',
                },
              }
            : item
        ),
      } as unknown as Record<string, unknown>,
      abTestEnabled: true,
      abSplitPercent: 50,
      views: 5890,
      conversions: 824,
      variantAViews: 2980,
      variantBViews: 2910,
      variantAConversions: 378,
      variantBConversions: 446,
      updatedAt: '2026-11-20T08:45:00.000Z',
      createdAt: '2026-03-01T14:00:00.000Z',
    },
    {
      id: 'page_fintech_waitlist',
      userId: DEMO_USER_ID,
      title: 'Fintech Mobile App Waitlist 2026',
      slug: 'fintech-waitlist',
      status: 'draft',
      category: 'Lead Gen',
      templateId: 'tpl_agency_portfolio',
      contentJson: getDefaultPuckData('Lead Gen', 'Fintech Mobile App Waitlist 2026') as unknown as Record<string, unknown>,
      abTestEnabled: false,
      abSplitPercent: 50,
      views: 120,
      conversions: 18,
      variantAViews: 120,
      variantBViews: 0,
      variantAConversions: 18,
      variantBConversions: 0,
      updatedAt: '2026-11-20T16:00:00.000Z',
      createdAt: '2026-11-15T09:30:00.000Z',
    },
  ];

  const leads: Lead[] = [
    {
      id: 'lead_001',
      pageId: 'page_saas_hero',
      pageTitle: 'SaaS AI Launchpad — Dark Mode High CVR',
      variant: 'A',
      name: 'Sarah Chen',
      email: 'sarah.chen@techscale.io',
      company: 'TechScale Dynamics',
      source: 'google_ads',
      createdAt: '2026-11-20T11:24:00.000Z',
    },
    {
      id: 'lead_002',
      pageId: 'page_saas_hero',
      pageTitle: 'SaaS AI Launchpad — Dark Mode High CVR',
      variant: 'B',
      name: 'Marcus Brody',
      email: 'marcus@hypergrowth.co',
      company: 'HyperGrowth Media',
      source: 'linkedin',
      createdAt: '2026-11-20T09:12:00.000Z',
    },
    {
      id: 'lead_003',
      pageId: 'page_b2b_lead_gen',
      pageTitle: 'B2B Enterprise Lead Magnet Guide',
      variant: 'A',
      name: 'Elena Rostova',
      email: 'elena@cloudmatrix.com',
      company: 'CloudMatrix Enterprise',
      source: 'direct',
      createdAt: '2026-11-19T17:40:00.000Z',
    },
    {
      id: 'lead_004',
      pageId: 'page_ecommerce_bundle',
      pageTitle: 'DTC Skincare Summer Flash Sale',
      variant: 'B',
      name: 'David Kim',
      email: 'dkim@glowhaus.shop',
      company: 'GlowHaus DTC',
      source: 'meta',
      createdAt: '2026-11-19T14:18:00.000Z',
    },
    {
      id: 'lead_005',
      pageId: 'page_saas_hero',
      pageTitle: 'SaaS AI Launchpad — Dark Mode High CVR',
      variant: 'B',
      name: 'Chloe Tremblay',
      email: 'chloe@kineticlabs.ca',
      company: 'Kinetic Labs',
      source: 'google_ads',
      createdAt: '2026-11-18T16:05:00.000Z',
    },
    {
      id: 'lead_006',
      pageId: 'page_b2b_lead_gen',
      pageTitle: 'B2B Enterprise Lead Magnet Guide',
      variant: 'A',
      name: 'Liam O’Connor',
      email: 'liam@dublinfintech.ie',
      company: 'Apex Dublin',
      source: 'organic',
      createdAt: '2026-11-18T10:30:00.000Z',
    },
    {
      id: 'lead_007',
      pageId: 'page_ecommerce_bundle',
      pageTitle: 'DTC Skincare Summer Flash Sale',
      variant: 'A',
      name: 'Ananya Sharma',
      email: 'ananya@zenithretail.in',
      company: 'Zenith Brands',
      source: 'meta',
      createdAt: '2026-11-17T20:45:00.000Z',
    },
    {
      id: 'lead_008',
      pageId: 'page_fintech_waitlist',
      pageTitle: 'Fintech Mobile App Waitlist 2026',
      variant: 'A',
      name: 'Julian Thorne',
      email: 'julian@vanguardseed.vc',
      company: 'Vanguard Capital',
      source: 'twitter',
      createdAt: '2026-11-16T13:10:00.000Z',
    },
  ];

  const metrics: DailyMetric[] = [
    { date: '2026-11-07', visitors: 680, conversions: 88 },
    { date: '2026-11-08', visitors: 710, conversions: 96 },
    { date: '2026-11-09', visitors: 820, conversions: 114 },
    { date: '2026-11-10', visitors: 790, conversions: 105 },
    { date: '2026-11-11', visitors: 940, conversions: 138 },
    { date: '2026-11-12', visitors: 890, conversions: 122 },
    { date: '2026-11-13', visitors: 1020, conversions: 147 },
    { date: '2026-11-14', visitors: 970, conversions: 135 },
    { date: '2026-11-15', visitors: 1100, conversions: 162 },
    { date: '2026-11-16', visitors: 1050, conversions: 154 },
    { date: '2026-11-17', visitors: 1180, conversions: 176 },
    { date: '2026-11-18', visitors: 1240, conversions: 189 },
    { date: '2026-11-19', visitors: 1310, conversions: 198 },
    { date: '2026-11-20', visitors: 880, conversions: 131 },
  ];

  return {
    users: [demoUser],
    pages,
    leads,
    metrics,
  };
}

export function getDatabase(): WorkspaceDatabase {
  // 1. If memory cache already holds the database, return it
  if (globalThis.__unbounce_memory_db__) {
    return globalThis.__unbounce_memory_db__;
  }

  // 2. Try loading from disk in environments with writable / persistent filesystem
  try {
    const isVercel = process.env.VERCEL === '1';

    if (!isVercel) {
      if (!fs.existsSync(DB_DIR)) {
        try {
          fs.mkdirSync(DB_DIR, { recursive: true });
        } catch {}
      }

      if (!fs.existsSync(DB_FILE)) {
        const seed = generateSeedData();
        try {
          fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2), 'utf8');
        } catch {}
        globalThis.__unbounce_memory_db__ = seed;
        return seed;
      }

      const raw = fs.readFileSync(DB_FILE, 'utf8');
      const db = JSON.parse(raw) as WorkspaceDatabase;

      // Auto-migration: Ensure every landing page has a valid Puck Data structure with component IDs
      let migrated = false;
      db.pages = db.pages.map((p) => {
        const c = p.contentJson as Data | undefined;
        if (!c || !Array.isArray(c.content)) {
          p.contentJson = ensureComponentIds(getDefaultPuckData(p.category, p.title)) as unknown as Record<string, unknown>;
          migrated = true;
        } else {
          const ensured = ensureComponentIds(c);
          if (JSON.stringify(ensured) !== JSON.stringify(c)) {
            p.contentJson = ensured as unknown as Record<string, unknown>;
            migrated = true;
          }
        }

        if (p.variantBJson) {
          const vb = p.variantBJson as Data | undefined;
          if (vb && Array.isArray(vb.content)) {
            const ensuredB = ensureComponentIds(vb);
            if (JSON.stringify(ensuredB) !== JSON.stringify(vb)) {
              p.variantBJson = ensuredB as unknown as Record<string, unknown>;
              migrated = true;
            }
          }
        } else if (p.abTestEnabled) {
          p.variantBJson = JSON.parse(JSON.stringify(p.contentJson));
          migrated = true;
        }

        // Ensure variant views/conversions counters exist
        if (p.variantAViews === undefined) {
          p.variantAViews = Math.round((p.views || 0) * (p.abTestEnabled ? 0.52 : 1));
          migrated = true;
        }
        if (p.variantBViews === undefined) {
          p.variantBViews = p.abTestEnabled ? Math.round((p.views || 0) * 0.48) : 0;
          migrated = true;
        }
        if (p.variantAConversions === undefined) {
          p.variantAConversions = Math.round((p.conversions || 0) * (p.abTestEnabled ? 0.45 : 1));
          migrated = true;
        }
        if (p.variantBConversions === undefined) {
          p.variantBConversions = p.abTestEnabled ? Math.round((p.conversions || 0) * 0.55) : 0;
          migrated = true;
        }

        return p;
      });

      if (migrated) {
        saveDatabase(db);
      }
      globalThis.__unbounce_memory_db__ = db;
      return db;
    }
  } catch {
    // Filesystem error (e.g. read-only serverless filesystem) - fallback cleanly to memory seed
  }

  // 3. Fallback: Seed in-memory store
  const fallback = generateSeedData();
  globalThis.__unbounce_memory_db__ = fallback;
  return fallback;
}

export function saveDatabase(data: WorkspaceDatabase): void {
  // Always update global memory state first
  globalThis.__unbounce_memory_db__ = data;

  // Persist to disk when filesystem is writable
  try {
    if (process.env.VERCEL !== '1') {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    }
  } catch {
    // Gracefully ignore filesystem write errors on read-only serverless environments
  }
}

// User Helpers
export function getUserById(id: string): User | undefined {
  const db = getDatabase();
  return db.users.find((u) => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  const db = getDatabase();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(user: Omit<User, 'id' | 'createdAt'>): User {
  const db = getDatabase();
  const newUser: User = {
    ...user,
    id: `usr_${crypto.randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString(),
  };
  db.users.push(newUser);
  saveDatabase(db);
  return newUser;
}

// Landing Pages Helpers
export function getPages(userId: string): LandingPage[] {
  const db = getDatabase();
  return db.pages.filter((p) => p.userId === userId);
}

export function getPageById(id: string, userId?: string): LandingPage | undefined {
  const db = getDatabase();
  return db.pages.find((p) => p.id === id && (!userId || p.userId === userId));
}

export function getPageBySlug(slug: string): LandingPage | undefined {
  const db = getDatabase();
  return db.pages.find((p) => p.slug === slug);
}

export function createPage(pageData: {
  userId: string;
  title: string;
  category?: string;
  templateId?: string;
  slug?: string;
}): LandingPage {
  const db = getDatabase();
  const rawSlug = pageData.slug || pageData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const uniqueSlug = `${rawSlug}-${crypto.randomBytes(3).toString('hex')}`;

  const newPage: LandingPage = {
    id: `page_${crypto.randomUUID().slice(0, 10)}`,
    userId: pageData.userId,
    title: pageData.title,
    slug: uniqueSlug,
    status: 'draft',
    category: pageData.category || 'SaaS',
    templateId: pageData.templateId,
    contentJson: ensureComponentIds(getDefaultPuckData(pageData.category, pageData.title)) as unknown as Record<string, unknown>,

    abTestEnabled: false,
    abSplitPercent: 50,
    views: 0,
    conversions: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.pages.unshift(newPage);
  saveDatabase(db);
  return newPage;
}

export function updatePage(
  id: string,
  userId: string,
  updates: Partial<Omit<LandingPage, 'id' | 'userId' | 'createdAt'>>
): LandingPage | null {
  const db = getDatabase();
  const idx = db.pages.findIndex((p) => p.id === id && p.userId === userId);
  if (idx === -1) return null;

  const processedUpdates = { ...updates };
  if (processedUpdates.contentJson) {
    processedUpdates.contentJson = ensureComponentIds(processedUpdates.contentJson as unknown as Data) as unknown as Record<string, unknown>;
  }
  if (processedUpdates.variantBJson) {
    processedUpdates.variantBJson = ensureComponentIds(processedUpdates.variantBJson as unknown as Data) as unknown as Record<string, unknown>;
  }

  db.pages[idx] = {
    ...db.pages[idx],
    ...processedUpdates,
    updatedAt: new Date().toISOString(),
  };

  saveDatabase(db);
  return db.pages[idx];
}

export function deletePage(id: string, userId: string): boolean {
  const db = getDatabase();
  const initialLen = db.pages.length;
  db.pages = db.pages.filter((p) => !(p.id === id && p.userId === userId));
  db.leads = db.leads.filter((l) => l.pageId !== id);
  if (db.pages.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function duplicatePage(id: string, userId: string): LandingPage | null {
  const original = getPageById(id, userId);
  if (!original) return null;

  const db = getDatabase();
  const dup: LandingPage = {
    ...original,
    id: `page_${crypto.randomUUID().slice(0, 10)}`,
    title: `${original.title} (Copy)`,
    slug: `${original.slug}-copy-${crypto.randomBytes(2).toString('hex')}`,
    status: 'draft',
    views: 0,
    conversions: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.pages.unshift(dup);
  saveDatabase(db);
  return dup;
}

// Leads Helpers
export function getLeads(userId: string): Lead[] {
  const db = getDatabase();
  const userPageIds = new Set(db.pages.filter((p) => p.userId === userId).map((p) => p.id));
  return db.leads.filter((l) => userPageIds.has(l.pageId));
}

export function createLead(leadData: Omit<Lead, 'id' | 'createdAt'>): Lead {
  const db = getDatabase();
  const newLead: Lead = {
    ...leadData,
    id: `lead_${crypto.randomUUID().slice(0, 10)}`,
    createdAt: new Date().toISOString(),
  };
  db.leads.unshift(newLead);

  // Increment page conversions
  const pageIdx = db.pages.findIndex((p) => p.id === leadData.pageId);
  if (pageIdx !== -1) {
    db.pages[pageIdx].conversions += 1;
  }

  saveDatabase(db);
  return newLead;
}

export function deleteLead(id: string, userId: string): boolean {
  const db = getDatabase();
  const userPageIds = new Set(db.pages.filter((p) => p.userId === userId).map((p) => p.id));
  const lead = db.leads.find((l) => l.id === id);
  if (!lead || !userPageIds.has(lead.pageId)) return false;

  db.leads = db.leads.filter((l) => l.id !== id);
  saveDatabase(db);
  return true;
}

// Public Tracking & Lead Recording
export function recordPageView(pageId: string, variant: 'A' | 'B'): LandingPage | null {
  const db = getDatabase();
  const page = db.pages.find((p) => p.id === pageId);
  if (!page) return null;

  page.views = (page.views || 0) + 1;
  if (variant === 'B') {
    page.variantBViews = (page.variantBViews || 0) + 1;
  } else {
    page.variantAViews = (page.variantAViews || 0) + 1;
  }

  // Increment today's DailyMetric
  const today = new Date().toISOString().slice(0, 10);
  const metric = db.metrics.find((m) => m.date === today);
  if (metric) {
    metric.visitors = (metric.visitors || 0) + 1;
  } else {
    db.metrics.push({ date: today, visitors: 1, conversions: 0 });
  }

  saveDatabase(db);
  return page;
}

export function recordPublicLead(leadData: {
  pageId: string;
  variant: 'A' | 'B';
  name: string;
  email: string;
  company?: string;
  source?: string;
}): Lead {
  const db = getDatabase();
  const page = db.pages.find((p) => p.id === leadData.pageId);
  const pageTitle = page ? page.title : 'Live Landing Page';

  const newLead: Lead = {
    id: `lead_${crypto.randomUUID().slice(0, 8)}`,
    pageId: leadData.pageId,
    pageTitle,
    variant: leadData.variant,
    name: leadData.name,
    email: leadData.email,
    company: leadData.company,
    source: leadData.source || 'direct',
    createdAt: new Date().toISOString(),
  };

  db.leads.unshift(newLead);

  if (page) {
    page.conversions = (page.conversions || 0) + 1;
    if (leadData.variant === 'B') {
      page.variantBConversions = (page.variantBConversions || 0) + 1;
    } else {
      page.variantAConversions = (page.variantAConversions || 0) + 1;
    }
  }

  // Increment today's DailyMetric
  const today = new Date().toISOString().slice(0, 10);
  const metric = db.metrics.find((m) => m.date === today);
  if (metric) {
    metric.conversions = (metric.conversions || 0) + 1;
  } else {
    db.metrics.push({ date: today, visitors: 1, conversions: 1 });
  }

  saveDatabase(db);
  return newLead;
}

// Analytics Helpers
export function getAnalytics(userId: string) {
  const db = getDatabase();
  const userPages = db.pages.filter((p) => p.userId === userId);
  const userPageIds = new Set(userPages.map((p) => p.id));
  const userLeads = db.leads.filter((l) => userPageIds.has(l.pageId));

  const totalVisitors = userPages.reduce((acc, p) => acc + p.views, 0);
  const totalConversions = userPages.reduce((acc, p) => acc + p.conversions, 0);
  const avgCvr = totalVisitors > 0 ? ((totalConversions / totalVisitors) * 100).toFixed(1) : '0.0';

  return {
    kpis: {
      totalVisitors,
      totalConversions,
      avgConversionRate: `${avgCvr}%`,
      activePages: userPages.filter((p) => p.status === 'published').length,
      totalLeads: userLeads.length,
    },
    metrics: db.metrics,
    topPages: userPages.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      status: p.status,
      views: p.views,
      conversions: p.conversions,
      cvr: p.views > 0 ? ((p.conversions / p.views) * 100).toFixed(1) : '0.0',
    })),
    experiments: userPages
      .filter((p) => p.abTestEnabled)
      .map((p) => {
        const vAViews = p.variantAViews ?? Math.round(p.views * 0.52);
        const vBViews = p.variantBViews ?? Math.round(p.views * 0.48);
        const vAConv = p.variantAConversions ?? Math.round(p.conversions * 0.45);
        const vBConv = p.variantBConversions ?? Math.round(p.conversions * 0.55);
        const vACvr = vAViews > 0 ? (vAConv / vAViews) * 100 : 0;
        const vBCvr = vBViews > 0 ? (vBConv / vBViews) * 100 : 0;
        const lift = vACvr > 0 ? ((vBCvr - vACvr) / vACvr) * 100 : 0;
        const winner = vBCvr > vACvr ? ('B' as const) : vACvr > vBCvr ? ('A' as const) : ('Tie' as const);

        return {
          id: p.id,
          title: p.title,
          slug: p.slug,
          splitPercent: p.abSplitPercent,
          variantA: { views: vAViews, conversions: vAConv, cvr: Number(vACvr.toFixed(1)) },
          variantB: { views: vBViews, conversions: vBConv, cvr: Number(vBCvr.toFixed(1)) },
          lift: Number(lift.toFixed(1)),
          winner,
        };
      }),
  };
}

