/**
 * Seed script for Supabase tables: case_studies and testimonials
 *
 * Usage (requires service role key to bypass RLS):
 *   1. Add SUPABASE_SECRET_KEY to your .env.local
 *   2. Run: node tools/seed-supabase.js
 *
 * Falls back to anon key if service role key is not set (may fail due to RLS).
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SECRET_KEY');
  process.exit(1);
}

if (!process.env.SUPABASE_SECRET_KEY) {
  console.warn('⚠️  SUPABASE_SECRET_KEY not set — using anon key (may fail due to RLS)');
  console.warn('   Add SUPABASE_SECRET_KEY=... to .env.local (find it in Supabase Dashboard → Settings → API)');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const testimonials = [
  {
    client_name: 'Sarah Jenkins',
    company: 'Apex Financial Solutions',
    role: 'Director of Operations',
    feedback:
      'Adwola completely transformed how we handle our month-end close. What used to take us 5 days now takes less than one. The ROI was immediate and our team morale has skyrocketed.',
    rating: 5,
    image_url: null,
  },
  {
    client_name: 'Michael Chen',
    company: 'TechFlow Systems',
    role: 'CFO',
    feedback:
      'The payment reconciliation automation saved us from hiring two additional staff members. The accuracy is 100%, which is unheard of in manual processing. Highly recommend Adwola.',
    rating: 5,
    image_url: null,
  },
  {
    client_name: 'Priya Desai',
    company: 'GreenLeaf Ventures',
    role: 'Finance Manager',
    feedback:
      'We went from spending 20 hours a week on invoice processing to under 2 hours. Nahar understood our pain points immediately and delivered exactly what we needed.',
    rating: 5,
    image_url: null,
  },
  {
    client_name: 'David Okonkwo',
    company: 'Sterling Logistics',
    role: 'CEO',
    feedback:
      'Adwola automated our entire accounts payable process. The error rate dropped from 8% to virtually zero. Their ongoing retainer support keeps everything running smoothly.',
    rating: 5,
    image_url: null,
  },
];

const caseStudies = [
  {
    title: 'Automating Invoice Processing for a Mid-Size Logistics Company',
    industry: 'Logistics & Supply Chain',
    icon_name: 'Clock',
    problem:
      'Sterling Logistics processed over 500 invoices per month manually. Each invoice required data entry into QuickBooks, cross-referencing with purchase orders, and routing through a 3-step approval chain. The process consumed 4 full-time hours per day and had an 8% error rate.',
    solution:
      'We built a Make.com automation that extracts invoice data via OCR, validates it against purchase orders in Airtable, routes approvals through Slack, and posts the final entries to QuickBooks — all without manual intervention.',
    metrics: [
      { metric: '90%', description: 'Reduction in processing time' },
      { metric: '0.1%', description: 'New error rate (down from 8%)' },
      { metric: '20 hrs/wk', description: 'Staff time reclaimed' },
      { metric: '3 weeks', description: 'Full deployment time' },
    ],
  },
  {
    title: 'Real-Time Financial Dashboard for a SaaS Startup',
    industry: 'SaaS / Technology',
    icon_name: 'TrendingUp',
    problem:
      'TechFlow Systems relied on manually assembled spreadsheets for their financial reporting. Reports were only available at month-end, often contained formula errors, and took the finance team 3 days to compile.',
    solution:
      'We created an automated pipeline using Make.com and Google Sheets that pulls real-time data from Stripe, QuickBooks, and their CRM. A live dashboard updates every hour, giving the leadership team instant visibility into MRR, churn, runway, and cash flow.',
    metrics: [
      { metric: 'Real-time', description: 'Dashboard updates hourly' },
      { metric: '3 days → 0', description: 'Manual reporting eliminated' },
      { metric: '100%', description: 'Data accuracy achieved' },
      { metric: '$24K/yr', description: 'Estimated cost savings' },
    ],
  },
  {
    title: 'Payment Reconciliation Automation for E-Commerce',
    industry: 'E-Commerce / Retail',
    icon_name: 'DollarSign',
    problem:
      'GreenLeaf Ventures processed payments through Stripe, PayPal, and bank transfers. Reconciling 10,000+ monthly transactions across these platforms took a dedicated analyst 30+ hours per month, with frequent discrepancies that delayed financial close.',
    solution:
      'We built a Zapier + Make.com hybrid automation that ingests transaction data from all payment sources, normalizes formats, matches against invoices, flags exceptions for human review, and generates reconciliation reports automatically.',
    metrics: [
      { metric: '10,000+', description: 'Transactions reconciled monthly' },
      { metric: '30 → 2 hrs', description: 'Monthly reconciliation time' },
      { metric: '99.9%', description: 'Auto-match success rate' },
      { metric: '5 days', description: 'Faster monthly close' },
    ],
  },
];

async function seed() {
  console.log('Seeding testimonials...');
  const { data: tData, error: tError } = await supabase
    .from('testimonials')
    .upsert(testimonials, { onConflict: 'client_name' })
    .select();

  if (tError) {
    console.error('Testimonials error:', tError.message);
    // Try insert if upsert fails (no unique constraint)
    const { data: tData2, error: tError2 } = await supabase
      .from('testimonials')
      .insert(testimonials)
      .select();
    if (tError2) {
      console.error('Testimonials insert also failed:', tError2.message);
    } else {
      console.log(`Inserted ${tData2.length} testimonials`);
    }
  } else {
    console.log(`Upserted ${tData.length} testimonials`);
  }

  console.log('Seeding case studies...');
  const { data: cData, error: cError } = await supabase
    .from('case_studies')
    .upsert(caseStudies, { onConflict: 'title' })
    .select();

  if (cError) {
    console.error('Case studies error:', cError.message);
    const { data: cData2, error: cError2 } = await supabase
      .from('case_studies')
      .insert(caseStudies)
      .select();
    if (cError2) {
      console.error('Case studies insert also failed:', cError2.message);
    } else {
      console.log(`Inserted ${cData2.length} case studies`);
    }
  } else {
    console.log(`Upserted ${cData.length} case studies`);
  }

  console.log('Done!');
}

seed();
