import { useEffect } from "react";
import { installFakeServerAxios } from "./FakeServerCore";

function FakeServerApp() {
  useEffect(() => {
    installFakeServerAxios();
  }, []);
}

export default FakeServerApp;
