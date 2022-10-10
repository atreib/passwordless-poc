// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/passwordless/start`, {
    method: "POST",
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      "client_id": process.env.AUTH0_CLIENT_ID,
      "client_secret": process.env.AUTH0_CLIENT_SECRET,
      "connection": "email",
      "email": "andre.schumacher.treib@gmail.com",
      "send": "link", 
      "authParams": { 
        "scope": "openid profile email",  
        "state": Buffer.from(JSON.stringify({
          redirectTo: "/success"
        })).toString("base64")
      }
    })
  });

  const a = await response.json();

  res.status(200).json({ result: a })
}
