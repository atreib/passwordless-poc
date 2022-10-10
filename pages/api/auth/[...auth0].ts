import {
    AfterCallback,
    handleAuth,
    handleCallback,
    Session
  } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export const afterCallback = async (
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session,
    state: Parameters<AfterCallback>[3],
  ): Promise<Session> => {
    console.log("User data: ", session.user); // user data (email, name, etc)
    console.log("State: ", state); // from the passwordless/start request
    return { ...session } as unknown as Session;
  };

export const callback = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      // Return to login page because it was unsuccessful
      const returnTo = `${process.env.AUTH0_BASE_URL}/`;

      return res.redirect(
        `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?${new URLSearchParams({
          client_id: process.env.AUTH0_CLIENT_ID as string,
          returnTo,
        })}`
      ).end();
    }
  };

export default handleAuth({
  callback,
});