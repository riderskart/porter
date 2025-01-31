import axios from "axios";

const authenticator = async () => {
  try {
    const response = await axios.get("http://localhost:3000/auth-image-kit");

    if (response.statusText !== "OK") {
      // const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const { signature, expire, token } = response.data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default authenticator;
