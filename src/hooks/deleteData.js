import axios from "axios";
import { links } from "../environment/environment";

export const deleteData = async (data) => {
  await axios
    .delete(`${links.serverLink}/scandiweb-server/deletedata.php`, {
      data,
    })
    .then(() => {
      // window.location.href = "/";
      window.location.reload(false);
    });
};
