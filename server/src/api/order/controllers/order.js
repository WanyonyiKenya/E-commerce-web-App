'use strict';
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

/**
 * order controller
 */


import { factories } from '@strapi/strapi';
const { createCoreController } = factories;

modeule.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        const { products, userName, email } = ctx.request.body

        try {
            //retrieveing item info
            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi.service("api::item.item").findOne(product.id)

                    return {
                        price_data: {
                            currency: 'ksh',
                            product_data: {
                                name: item.name,

                            },
                            unit_amount: item.price * 100
                        },
                        quantity: product.count
                    }
                })
            )

            //cretaing stripe session
            const session = await stripe.checkout.sessions.create({
                payment_method_types:["card"],
                customer_email: email,
                mode:"payment",
                success_url: 'http://localhost:3000/checkout/success',
                cancel_url: 'http://localhost:3000',
                line_items: lineItems
            })

            //creating the item in the backend

            await strapi.service("api::order.order").create({
                data: {userName, products, stripeSessionId:session.id}
            })

            //returning session id
            return {id:session.id}
        } catch (error) {
            ctx.response.status = 500
            return {error: {message:"problem creating order"}}
        }
    }
}));
