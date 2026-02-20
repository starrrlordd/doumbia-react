const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");

// Firebase Admin SDK
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

setGlobalOptions({ maxInstances: 10 });

exports.addmessage = onRequest(async (req, res) => {
  const original = req.query.text;

  const writeResult = await getFirestore()
    .collection("messages")
    .add({ original });

  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});