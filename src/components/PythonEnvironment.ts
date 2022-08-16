/**
 * This represents a Python Environment that is well-known to the Thoth Guidance Service.
 * see https://khemenu.thoth-station.ninja/api/v1/ui/#/Environments/list_python_environments
 * for more details.
 */
export type PythonEnvironment = {
  os_name: string;
  os_version: string;
  python_version: string;
};
