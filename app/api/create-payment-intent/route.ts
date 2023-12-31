import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProduct } from "@/app/product/[productId]/ProductDetails";
import getCurrentUser from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2022-11-15",
});

const calculateOrderAmount = (items: CartProduct[]) => {
	const totalPrice = items.reduce((acc, item) => {
		const itemTotal = item.price * item.quantity;
		return acc + itemTotal;
	}, 0);
	return Number(totalPrice.toFixed(2));
};

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();
  
	if (!currentUser) {
	  return NextResponse.error()
	}
  
	let body;
	try {
	  body = await request.json();
	} catch (error) {
	  return NextResponse.error()
	}
	const { items, payment_intent_id , selectedImg} = body;
	const total = calculateOrderAmount(items) * 100;
  
	const orderData = {
	  user: { connect: { id: currentUser?.id } },
	  amount: total,
	  currency: "eur",
	  status: "pending",
	  deliveryStatus: "pending",
	  paymentIntentId: payment_intent_id,
	  products: items,
	  selectedImg: selectedImg
	};
  
	//Check if the payment intent exists just update the order
	if (payment_intent_id) {
	  const current_intent = await stripe.paymentIntents.retrieve(
		payment_intent_id
	  );
	  if (current_intent) {
		const updated_intent = await stripe.paymentIntents.update(
		  payment_intent_id,
		  { amount: total }
		);
		//Fetch order with product ids
		const [existing_order, updated_order] = await Promise.all([
		  prisma.order.findFirst({
			where: { paymentIntentId: updated_intent.id },
			// include: { products: true },
		  }),
		  prisma.order.update({
			where: { paymentIntentId: updated_intent.id },
			data: {
			  amount: total,
			  products: items,
			},
		  }),
		]);
  
		if (!existing_order) {
		  return NextResponse.error()
		}
		return NextResponse.json({ paymentIntent: updated_intent });
	  }
	} else {
	  //Create a new order with prisma
	  const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: "eur",
		automatic_payment_methods: { enabled: true },
	  });
  
	  orderData.paymentIntentId = paymentIntent.id;
	  await prisma.order.create({
		data: orderData,
	  });
  
	  return NextResponse.json({ paymentIntent });
	}
	return NextResponse.error()
  }
