import React, { useState, useEffect } from "react";

import {
  Form,
  FormGroup,
  ActionGroup,
  Button,
} from "@patternfly/react-core/dist/esm/components";

import { getPythonVersions } from "./ThothGuidanceService";
import { PythonChooser } from "./PythonChooser";

export const CNBiForm = () => {
  const [isLoadingPythonVersions, setLoadingPythonVersions] = useState(false);
  const [supportedPythonVersions, setSupportedPythonVersions] = useState<
    string[]
  >([]);
  const [selectedPythonVersion, setSelectedPythonVersion] = useState("");

  const getPythonVersionsFromThothService = async () => {
    const versions = await getPythonVersions();
    setSupportedPythonVersions(versions);
    console.log("supportedPythonVersions", versions);
  };

  useEffect(() => {
    getPythonVersionsFromThothService();
  }, []);

  return (
    <div className="container">
      <Form>
        <FormGroup label="build your custom notebook image">
          <PythonChooser versions={supportedPythonVersions} />
        </FormGroup>

        <ActionGroup>
          <Button variant="primary">Submit</Button>
          <Button variant="link">Cancel</Button>
        </ActionGroup>
      </Form>
    </div>
  );
};
