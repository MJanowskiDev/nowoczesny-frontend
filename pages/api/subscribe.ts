import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.setHeader("Allow", "POST").status(405).json({});
  }

  const { email } = req.body;

  if (typeof email !== "string") {
    return res.status(400).json({});
  }

  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

  if (!MAILERLITE_API_KEY || !MAILERLITE_API_KEY) {
    return res.status(500).json({ error: "No env variables!" });
  }

  const mailerliteResp = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-MailerLite-ApiKey": MAILERLITE_API_KEY,
      },
      body: JSON.stringify({
        email,
      }),
    }
  );

  if (!mailerliteResp.ok) {
    return res
      .status(500)
      .json({ error: "Problem occured while signing up to newsletter" });
  }

  res.status(201).json({});
};

export default handler;
