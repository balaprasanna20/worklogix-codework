import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    // Honeypot check (hidden field to trap bots)
    if (data.hp_fax || data.website_hp) {
      console.warn('[SPAM DETECTED] Honeypot triggered:', data);
      return NextResponse.json({ success: true, message: 'Received' }); // Silent reject
    }

    // Minimum fill time check (less than 2.5s is almost certainly a bot)
    if (data.fill_time_ms && data.fill_time_ms < 2500) {
      console.warn('[SPAM DETECTED] Form filled too quickly:', data.fill_time_ms, 'ms');
      return NextResponse.json({ success: true, message: 'Received' });
    }

    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const timestamp = new Date().toISOString();

    const leadRecord = {
      id: leadId,
      timestamp,
      form_type: data.form_type || 'unknown',
      source_button: data.source_button || 'direct',
      page_url: data.page_url || '',
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      utm_term: data.utm_term || '',
      utm_content: data.utm_content || '',
      full_name: data.full_name,
      work_email: data.work_email,
      company_name: data.company_name,
      company_size: data.company_size,
      country: data.country,
      phone: data.phone || '',
      role: data.role || '',
      problems_to_fix: data.problems_to_fix || [],
      demo_date: data.demo_date || null,
      demo_time: data.demo_time || null,
      demo_timezone: data.demo_timezone || null,
      privacy_accepted: data.privacy_accepted,
      marketing_consent: data.marketing_consent || false,
    };

    console.log('====================================================');
    console.log(`[NEW WORKLOGIX LEAD RECEIVED - ${data.form_type?.toUpperCase()}]`);
    console.log(JSON.stringify(leadRecord, null, 2));
    console.log('====================================================');

    // Future integration placeholder:
    // Here we will pipe leadRecord to user's desired destination
    // (Email / Webhook / Google Sheets / CRM / Backend API)

    return NextResponse.json({
      success: true,
      leadId,
      message: 'Lead captured successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing lead submission:', error);
    return NextResponse.json({
      success: false,
      error: 'Invalid request payload'
    }, { status: 400 });
  }
}
