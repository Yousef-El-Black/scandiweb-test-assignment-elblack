import axios from "axios";
import { links } from "../environment/environment";

export const saveForm = (e, data) => {
  e.preventDefault();
  console.log(data);
  const url = `${links.serverLink}/scandiweb-server/postdata.php`;
  axios
    .post(url, data)
    .then((res) => {
      window.location.href = "/";
    })
    .catch((res) => {
      console.log("SKU have been used!");
    });
};
