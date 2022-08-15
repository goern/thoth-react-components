import axios from "axios";

// TODO some error handling would be nice, wouldnt it?
export const getPythonEnvironments = (): Promise<number> => {
  const url = "https://khemenu.thoth-station.ninja/api/v1/python/environment";

  return axios
    .get(url)
    .then((response) => {
      console.log(response);
      return response.data.environment;
    })
    .catch((e) => {
      throw new Error(e.response.data.message);
    });
};

export default { getPythonEnvironments };
