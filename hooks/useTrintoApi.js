import { useState, useEffect } from "react";
import jQuery from "jquery";

//window.$ = window.jQuery = jQuery;

export default function useRapidApi() {
  let [responseData, setResponseData] = useState(null);
  useEffect(() => {
    const getPlayers = async () => {
      try {
        jQuery.ajax({
          url: "https://www.trinto.com.br/testes/frontendjr/index.php?v=32",
          method: "GET",
          dataType: "json",
          success: (res) => {
            setResponseData(res);
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPlayers();
  }, []);
  return { responseData };
}
