import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: Stripe | null = null;

  constructor(private configService: ConfigService) {}

  private getClient() {
    if (!this.stripe) {
      const secret = this.configService.get<string>('STRIPE_SECRET_KEY');

      if (!secret) {
        throw new Error('STRIPE_SECRET_KEY is missing');
      }

      this.stripe = new Stripe(secret, {
      apiVersion: "2025-08-27.basil",
      });
    }
    return this.stripe;
  }

  async createCheckoutSession(data: {
    amount: number;
    currency: string;
    successUrl: string;
    cancelUrl: string;
    customerEmail?: string;
    metadata?: Record<string, string>;
  }) {
    const stripe = this.getClient();

    return stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: data.currency,
            product_data: { name: 'Booking Payment' },
            unit_amount: data.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      customer_email: data.customerEmail,
      metadata: data.metadata,
    });
  }
}
