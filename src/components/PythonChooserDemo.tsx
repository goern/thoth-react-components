import { useState } from "react";

import {
  Form,
  FormGroup,
  ActionGroup,
  Button,
} from "@patternfly/react-core/dist/esm/components";

import { PythonChooser } from "./PythonChooser";

export const CNBiForm = () => {
  const [selectedPythonVersion, setSelectedPythonVersion] = useState("");

  const onPythonVersionSelect = () => {};

  return (
    <div className="container">
      <Form>
        <FormGroup label="build your custom notebook image">
          <PythonChooser versions={[]} />
        </FormGroup>

        <ActionGroup>
          <Button variant="primary">Submit</Button>
          <Button variant="link">Cancel</Button>
        </ActionGroup>
      </Form>
    </div>
  );
};
