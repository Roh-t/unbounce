import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { LandingPage, Lead } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

/**
 * Optional Cloud Database Adapter
 * Seamlessly syncs local in-memory/JSON data with Supabase PostgreSQL when credentials are provided.
 */
export async function syncPageToSupabase(page: LandingPage): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('landing_pages').upsert({
      id: page.id,
      user_id: page.userId,
      title: page.title,
      slug: page.slug,
      status: page.status,
      category: page.category,
      template_id: page.templateId,
      content_json: page.contentJson,
      variant_b_json: page.variantBJson,
      ab_test_enabled: page.abTestEnabled,
      ab_split_percent: page.abSplitPercent,
      views: page.views,
      conversions: page.conversions,
      variant_a_views: page.variantAViews || 0,
      variant_b_views: page.variantBViews || 0,
      variant_a_conversions: page.variantAConversions || 0,
      variant_b_conversions: page.variantBConversions || 0,
      updated_at: page.updatedAt,
    });

    return !error;
  } catch (err) {
    console.warn('[Supabase] syncPage failed:', err);
    return false;
  }
}

export async function syncLeadToSupabase(lead: Lead): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('leads').insert({
      id: lead.id,
      page_id: lead.pageId,
      page_title: lead.pageTitle,
      variant: lead.variant,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      source: lead.source,
      created_at: lead.createdAt,
    });

    return !error;
  } catch (err) {
    console.warn('[Supabase] syncLead failed:', err);
    return false;
  }
}
