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
        subject: "Welcome to Doumbia 🎉",
        html: `
          <h1>Welcome 🎉</h1>
          <p>Thanks for joining Doumbia — we're happy to have you.</p>
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
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      try {
        const { email, cartItems, userId } = req.body;

        const totalAmount = cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );

        const secret = process.env.PAYSTACK_SECRET;

        const response = await axios.post(
          "https://api.paystack.co/transaction/initialize",
          {
            email,
            amount: totalAmount * 100,
            currency: "GHS",
            metadata: {
              userId,
              cartItems,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${secret}`,
              "Content-Type": "application/json",
            },
          },
        );

        res.json(response.data);
      } catch (error) {
        console.error("Error initializing payment:", error.response?.data || error.message);
        res.status(500).json({ error: "Payment initialization failed" });
      }
    });
  });

exports.verifyPayment = functions
  .runWith({ secrets: ["PAYSTACK_SECRET"] })
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      const { reference } = req.body;

      const secret = process.env.PAYSTACK_SECRET;

      try {
        const response = await axios.get(
          `https://api.paystack.co/transaction/verify/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${secret}`,
            },
          },
        );

        const paymentData = response.data.data;

        if (paymentData.status === "success") {
          res.json({ success: true, paymentData });
        } else {
          res.json({ success: false });
        }
      } catch (error) {
        res.status(500).json({ error: "Verification failed" });
      }
    });
  });
