import { useState, useEffect } from "react";
import jQuery from "jquery";

export default function useRapidApi() {
  let [responseData, setResponseData] = useState(null);
  useEffect(() => {
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
  }, []);
  return { responseData };
}
