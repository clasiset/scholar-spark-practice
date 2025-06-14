
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')!
    
    // Set the Auth context for the user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { planId } = await req.json()

    // Get plan details
    const { data: plan, error: planError } = await supabaseClient
      .from('plans')
      .select('*')
      .eq('id', planId)
      .single()

    if (planError || !plan) {
      console.error('Plan error:', planError)
      return new Response(
        JSON.stringify({ error: 'Plan not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate unique transaction reference
    const txRef = `sub_${user.id}_${planId}_${Date.now()}`

    // Prepare Chapa payment request
    const chapaPayload = {
      amount: plan.price.toString(),
      currency: plan.currency,
      tx_ref: txRef,
      callback_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/chapa-webhook`,
      return_url: `https://jhiafsazllzimnykfiut.supabase.co/payment-return?tx_ref=${txRef}`,
      email: user.email,
      first_name: user.user_metadata?.first_name || 'User',
      last_name: user.user_metadata?.last_name || 'Name',
      phone_number: user.user_metadata?.phone || '0911234567',
      customization: {
        title: 'Zehulu.com Subscription',
        description: `${plan.name} Plan Subscription`
      },
      meta: {
        user_id: user.id,
        plan_id: planId
      }
    }

    console.log('Initializing Chapa payment:', chapaPayload)

    // Call Chapa API
    const chapaResponse = await fetch('https://api.chapa.co/v1/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('CHAPA_SECRET_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chapaPayload)
    })

    const chapaData = await chapaResponse.json()
    console.log('Chapa response:', chapaData)

    if (chapaData.status === 'success') {
      // Store payment record as pending
      const { error: paymentError } = await supabaseClient
        .from('payments')
        .insert({
          user_id: user.id,
          plan_id: planId,
          amount: plan.price,
          currency: plan.currency,
          status: 'pending',
          chapa_tx_ref: txRef
        })

      if (paymentError) {
        console.error('Payment insert error:', paymentError)
      }

      return new Response(
        JSON.stringify({ 
          checkout_url: chapaData.data.checkout_url,
          tx_ref: txRef
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    } else {
      console.error('Chapa initialization failed:', chapaData)
      return new Response(
        JSON.stringify({ error: 'Payment initialization failed' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
