const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Resend } = require("resend");

admin.initializeApp();

exports.sendWelcomeMessage = functions
  .runWith({
    secrets: ["RESEND_API_KEY"],
  })
  .auth.user()
  .onCreate(async (user) => {
    if (!user.email) return;

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      await resend.emails.send({
        from: "Doumbia <onboarding@resend.dev>",
        to: user.email,
        subject: "Welcome to Doumbia Online",
        html: `
          <h1>Welcome 🎉</h1>
          <p>Thanks for joining Doumbia Online — shop and enjoy free deliveries</p>
        `,
      });

      console.log("Welcome email sent to:", user.email);
    } catch (error) {
      console.error("Failed to send welcome email:", error);
    }
  });

const axios = require("axios");
const cors = require("cors")({ origin: true });

exports.initializePayment = functions
  .runWith({ secrets: ["PAYSTACK_SECRET"] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be logged in",
      );
    }

    const userId = context.auth.uid;

    const cartRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("cart");

    const cartSnapshot = await cartRef.get();

    if (cartSnapshot.empty) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Cart is empty",
      );
    }

    let totalAmount = 0;
    const cartItems = [];

    cartSnapshot.forEach((doc) => {
      const item = doc.data();
      totalAmount += item.price * item.quantity;
      cartItems.push(item);
    });

    console.log("working");

    const secret = process.env.PAYSTACK_SECRET;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: context.auth.token.email,
        amount: totalAmount * 100,
        currency: "GHS",
        metadata: {
          userId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  });

exports.verifyPayment = functions
  .runWith({ secrets: ["PAYSTACK_SECRET"] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be logged in",
      );
    }

    const userId = context.auth.uid;
    const { reference } = data;

    const secret = process.env.PAYSTACK_SECRET;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${secret}`,
        },
      },
    );

    const paymentData = response.data.data;

    if (paymentData.status !== "success") {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Payment not successful",
      );
    }

    const cartRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("cart");

    const cartSnapshot = await cartRef.get();

    let backenedTotal = 0;
    const cartItems = [];

    cartSnapshot.forEach((doc) => {
      const item = doc.data();
      backenedTotal += item.price * item.quantity;
      cartItems.push(item);
    });

    const expectedAmount = backenedTotal * 100;

    if (paymentData.amount !== expectedAmount) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Amount mismatch",
      );
    }

    const orderRef = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("orders")
      .add({
        items: cartItems,
        totalAmount: backenedTotal,
        paymentStatus: "paid",
        orderStatus: "pending",
        reference,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    const batch = admin.firestore().batch();
    cartSnapshot.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    return { success: true, orderId: orderRef.id };
  });

exports.createCashOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be logged in",
    );
  }

  const userId = context.auth.uid;

  const db = admin.firestore();

  const cartRef = db.collection("users").doc(userId).collection("cart");
  const cartSnapshot = await cartRef.get();

  if (cartSnapshot.empty) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Cart is empty",
    );
  }

  let totalAmount = 0;
  const cartItems = [];

  cartSnapshot.forEach((doc) => {
    const item = doc.data();
    totalAmount += item.price * item.quantity;
    cartItems.push(item);
  });

  const deliveryRef = db
    .collection("users")
    .doc(userId)
    .collection("userDelivery")
    .doc("details");

  const deliverySnapshot = await deliveryRef.get();

  if (!deliverySnapshot.exists) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Delivery details not found",
    );
  }

  const deliveryDetails = deliverySnapshot.data();
  const deliveryFee = parseFloat(deliveryDetails.delivery);

  const finalTotal = totalAmount + deliveryFee;

  const orderRef = await db
    .collection("users")
    .doc(userId)
    .collection("orders")
    .add({
      items: cartItems,
      delivery: { ...deliveryDetails, fees: deliveryFee },
      totalAmount: finalTotal,
      paymentMethod: "cash",
      paymentStatus: "pending",
      orderStatus: "pending",
      reference: "CASH",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

  const batch = db.batch();
  cartSnapshot.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();

  return {
    success: true,
    orderId: orderRef.id,
  };
});
