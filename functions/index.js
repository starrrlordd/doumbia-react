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