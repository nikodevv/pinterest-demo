import firebaseConfig from '../config/firebaseConfig';
import axios from "axios";
import {rebrandlyConfig} from "../config/rebrandlyConfig";

const config = rebrandlyConfig;

export class AxiosWrapper {
  static shortenLink = (link) => {
    let linkRequest = {
      destination: link,
      domain: { fullName: "rebrand.ly" }
    };
    let requestHeaders = {
      "Content-Type": "application/json",
      ...config
    };
    return axios.post(
      "https://api.rebrandly.com/v1/links",
      linkRequest,
      {headers: requestHeaders}
      )
  }
}
