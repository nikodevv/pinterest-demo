import firebaseConfig from '../config/firebaseConfig';
import axios from "axios";

const API_KEY = firebaseConfig.apiKey;

export class AxiosWrapper {
  static shortenLink = (link) => {
    let linkRequest = {
      destination: link,
      domain: { fullName: "rebrand.ly" }
    };
    let requestHeaders = {
      "Content-Type": "application/json",
      "apikey": "d48c10a11e0d477792cdb4de04cea20e",
      "workspace": "2bdcf71bcb2348e1b511aad23b4999dd"
    }
    return axios.post(
      "https://api.rebrandly.com/v1/links",
      linkRequest,
      {headers: requestHeaders}
      )
  }
}
