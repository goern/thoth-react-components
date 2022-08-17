import axios from "axios";
import { PythonEnvironment } from "./PythonEnvironment";

/**
 * getPythonVersions() returns a list of Python Versions that are that are supported by
 * the Thoth Guidance Service.
 */
export async function getPythonVersions(): Promise<[]> {
  const url = "https://khemenu.thoth-station.ninja/api/v1/python/environment";
  let versions = new Set<string>();

  return axios
    .get(url)
    .then((response) => {
      return response.data.environment;
    })
    .catch((e) => {
      throw new Error(e.response.data.message);
    });
}

export default { getPythonVersions };
