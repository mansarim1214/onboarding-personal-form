import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
import serverless from "serverless-http";

dotenv.config();

// ✅ Create Express app first
const app = express();

app.use(cors());
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

// ✅ Health check (useful for testing)
app.get("/api/ping", (req, res) => {
  res.json({ ok: true, message: "Serverless function running ✅" });
});

// ======== DIDIT CONFIG ========
const DIDIT_API = "https://verification.didit.me/v2";
const API_KEY = process.env.DIDIT_API_KEY;
const WORKFLOW_ID = process.env.DIDIT_WORKFLOW_ID;
const CALLBACK_URL = process.env.CALLBACK_URL;
const WEBHOOK_SECRET = process.env.DIDIT_WEBHOOK_SECRET;

// ======== TEMP IN-MEMORY CACHE ========
const kycCache = new Map();

// ======== EXPRESS ROUTER ========
const router = express.Router();

// ======== ROUTE: Create DIDIT Session ========
router.post("/start-kyc", async (req, res) => {
  try {
    const { email, name, type } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: "Email and name are required" });
    }

    const response = await axios.post(
      `${DIDIT_API}/session/`,
      {
        workflow_id: WORKFLOW_ID,
        vendor_data: email,
        callback: CALLBACK_URL,
        metadata: { name, type },
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Didit session created:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error("❌ DIDIT Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to create KYC session" });
  }
});

// ======== ROUTE: DIDIT Webhook ========
router.post("/didit-webhook", (req, res) => {
  try {
    const signature = req.headers["x-signature"];
    if (!signature) return res.status(400).send("Missing signature");

    const computedSignature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(req.rawBody)
      .digest("hex");

    if (computedSignature !== signature) {
      console.warn("⚠️ Invalid webhook signature!");
      return res.status(401).send("Invalid signature");
    }

    const { session_id, vendor_data, status } = req.body;
    if (vendor_data) {
      kycCache.set(vendor_data.toLowerCase(), {
        status,
        session_id,
        updatedAt: new Date().toISOString(),
      });
    }

    console.log("📩 Webhook received for:", vendor_data);
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(500).send("Internal error");
  }
});

// ======== ROUTE: Check KYC Status ========
router.get("/kyc-status/:email", async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();

    const cached = kycCache.get(email);
    if (cached) return res.json(cached);

    const response = await axios.get(
      `${DIDIT_API}/session/vendor/${encodeURIComponent(email)}/decision/`,
      { headers: { "x-api-key": API_KEY } }
    );

    res.json(response.data);
  } catch (err) {
    console.error("❌ KYC status check error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get KYC status" });
  }
});

// ======== ROUTE: Send KYC Link ========
router.post("/send-kyc-link", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, error: "Missing fields." });
    }

    const response = await axios.post(
      `${DIDIT_API}/session/`,
      {
        workflow_id: WORKFLOW_ID,
        vendor_data: email,
        callback: CALLBACK_URL,
        metadata: { name, type: "significant_individual" },
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ success: true, url: response.data?.url });
  } catch (err) {
    console.error("❌ Error creating KYC link:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Mount router for Netlify path
app.use("/api", router);

// ✅ Export for Netlify
export const handler = serverless(app);
