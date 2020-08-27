import { api } from './../../config/environment';

type httpCongis = {
  router: string;
  body: object;
  token: string;
};

class HttpSender {
  token: string | null;
  constructor() {
    this.token = null;
  }

  send = async (data: httpCongis) => {
    try {
      const { router, body } = data;
      const fullUrl = `${api.protocol}://${api.host}`;
      const address = `${fullUrl}${router}`;
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      if (this.token) {
        headers.authorization = this.token;
      }

      const resp = await fetch(address, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      const handledResponse = await this.handleHttpResponse(resp);
      return handledResponse;
    } catch (e) {
      console.error(e);
    }
  };

  handleHttpResponse = async (resp: any) => {
    try {
      if (resp.status === 204) {
        return this.sendSuccessStatus();
      } else {
        return await resp.json();
      }
    } catch (e) {
      console.error(e);
      return this.sendFailedStatus();
    }
  };

  sendSuccessStatus = () => ({
    status: true,
  });

  sendFailedStatus = () => ({
    status: false,
  });

  setAuthorizationToken = (token: string) => {
    this.token = token;
  };
}

export const httpSender = new HttpSender();
