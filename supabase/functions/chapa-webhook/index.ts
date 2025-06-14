
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const webhookData = await req.json()
    console.log('Webhook received:', webhookData)

    const txRef = webhookData.tx_ref
    const status = webhookData.status

    if (status === 'success') {
      // Verify the transaction with Chapa
      const verificationResponse = await fetch(`https://api.chapa.co/v1/transaction/verify/${txRef}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('CHAPA_SECRET_KEY')}`
        }
      })

      const verificationData = await verificationResponse.json()
      console.log('Verification response:', verificationData)

      if (verificationData.status === 'success' && verificationData.data.tx_ref === txRef) {
        const paymentData = verificationData.data
        const userId = paymentData.meta?.user_id
        const planId = paymentData.meta?.plan_id

        // Update payment status to succeeded
        const { error: paymentUpdateError } = await supabaseClient
          .from('payments')
          .update({ status: 'succeeded' })
          .eq('chapa_tx_ref', txRef)

        if (paymentUpdateError) {
          console.error('Payment update error:', paymentUpdateError)
        }

        // Get plan details for subscription
        const { data: plan } = await supabaseClient
          .from('plans')
          .select('*')
          .eq('id', planId)
          .single()

        if (plan && userId) {
          // Calculate subscription period
          const currentPeriodStart = new Date()
          const currentPeriodEnd = new Date()
          
          if (plan.interval === 'month') {
            currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)
          } else if (plan.interval === 'year') {
            currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1)
          }

          // Create or update subscription
          const { data: existingSubscription } = await supabaseClient
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .eq('plan_id', planId)
            .single()

          if (existingSubscription) {
            // Update existing subscription
            const { error: subscriptionUpdateError } = await supabaseClient
              .from('subscriptions')
              .update({
                status: 'active',
                current_period_start: currentPeriodStart.toISOString(),
                current_period_end: currentPeriodEnd.toISOString(),
                updated_at: new Date().toISOString()
              })
              .eq('id', existingSubscription.id)

            if (subscriptionUpdateError) {
              console.error('Subscription update error:', subscriptionUpdateError)
            }
          } else {
            // Create new subscription
            const { error: subscriptionError } = await supabaseClient
              .from('subscriptions')
              .insert({
                user_id: userId,
                plan_id: planId,
                status: 'active',
                current_period_start: currentPeriodStart.toISOString(),
                current_period_end: currentPeriodEnd.toISOString()
              })

            if (subscriptionError) {
              console.error('Subscription creation error:', subscriptionError)
            }
          }

          console.log(`Subscription activated for user ${userId} and plan ${planId}`)
        }
      } else {
        console.error('Payment verification failed for tx_ref:', txRef)
        
        // Update payment status to failed
        await supabaseClient
          .from('payments')
          .update({ status: 'failed' })
          .eq('chapa_tx_ref', txRef)
      }
    } else if (status === 'failed') {
      console.log(`Payment failed for transaction ${txRef}`)
      
      // Update payment status to failed
      await supabaseClient
        .from('payments')
        .update({ status: 'failed' })
        .eq('chapa_tx_ref', txRef)
    }

    return new Response(
      JSON.stringify({ status: 'success' }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
