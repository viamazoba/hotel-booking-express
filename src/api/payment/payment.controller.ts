import { Request, Response } from 'express';
import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
})

export const handlePayment = async (req: Request, res: Response) => {
  const { paymentMethod, amount } = req.body
  try {
    const { id } = paymentMethod
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount,
      currency: 'usd',
      confirm: true,
      description: 'Software development services provided',
      return_url: 'http://localhost:5173/success-payment',
    })

    res.status(201).json({ message: 'Payment successful', payment })
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message})
    console.log(error)
  }
} 