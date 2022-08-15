import axios from "axios";
import PythonEnvironment from "./PythonEnvironment";

// TODO some error handling would be nice, wouldnt it?
export const getPythonEnvironments = (): Promise<string[]> => {
  const url = "https://khemenu.thoth-station.ninja/api/v1/python/environment";
  let versions = new Set<string>();

  return axios
    .get(url)
    .then((response) => {
      response.data.environment.forEach((environment: PythonEnvironment) => {
        versions.add(environment.python_version);
      });
      return Array.from(versions);
    })
    .catch((e) => {
      throw new Error(e.response.data.message);
    });
};

export default { getPythonEnvironments };
