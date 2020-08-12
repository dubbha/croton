import { api } from './../../config/environment';

type httpCongis = {
  router: string;
  body: object;
  token: string;
};

class HttpSender {
  send = async (data: httpCongis) => {
    try {
      const { router, body } = data;
      const fullUrl = `${api.protocol}://${api.host}:${api.port}`;
      const address = `${fullUrl}${router}`;
      // TODO: currentUrl should be dinamic
      const currentUrl = 'http://localhost:8081';
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        origin: currentUrl,
      };
      const { token } = data;
      if (token) {
        delete data.token;
        headers.authorization = token;
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
      // TODO: Shame block. We should get resp from server
      if (resp.status === 204) {
        return this.sendSuccessRegistrationResp();
      } else {
        return await resp.json();
      }
    } catch (e) {
      console.error(e);
    }
  };

  sendSuccessRegistrationResp = () => {
    return {
      status: true,
      message: 'Please check your email for verification before signing in',
    };
  };
}

export const httpSender = new HttpSender();
