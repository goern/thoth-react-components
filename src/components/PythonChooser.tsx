import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  DropdownItemProps,
} from "@patternfly/react-core";

import "./pythonChooser.css";
import { getPythonVersions } from "./ThothGuidanceService";

import "../../node_modules/@patternfly/patternfly/patternfly.min.css";
import { PythonEnvironment } from "./PythonEnvironment";

interface PythonChooserProps {
  /**
   * PythonChooser supported Python Versions
   */
  versions: string[];
}

/**
 * Primary UI component for choosing a Python Version that is an environment supported by Thoth
 */
export const PythonChooser = ({ versions, ...props }: PythonChooserProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoadingPythonVersions, setLoadingPythonVersions] = useState(false);
  const [supportedPythonVersions, setSupportedPythonVersions] =
    useState<string[]>(versions);
  const [selectedVersion, setSelectedVersion] =
    React.useState("<choose a version>");

  const getPythonVersionsFromThothService = async () => {
    setLoadingPythonVersions(true);
    const _versions = (await getPythonVersions())
      .map((version: PythonEnvironment) => {
        return `${version.python_version} (${version.os_name} ${version.os_version})`;
      })
      .sort();

    setSupportedPythonVersions(_versions);
    setLoadingPythonVersions(false);
  };

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onFocus = () => {
    const element = document.getElementById("pf-thoth-pythonChooser-dropdown");
    if (element) {
      element.focus();
    }
  };

  const onSelect = (event: any) => {
    setIsOpen(false);
    setSelectedVersion(event.target.text);
    onFocus();
  };

  useEffect(() => {
    if (versions.length === 0) {
      getPythonVersionsFromThothService();
    }
  }, []);

  const dropdownItems = supportedPythonVersions.map((version: string) => {
    return <DropdownItem key={version}>{version}</DropdownItem>;
  });

  // TODO - add a loading indicator
  // TODO - add a "no versions found" message
  // TODO - add default seletion to be 3.9
  // TODO - sort supportedPythonVersions

  return (
    <div>
      <p className="pf-thoth-pythonChooser">Python</p>&nbsp;
      <Dropdown
        onSelect={onSelect}
        toggle={
          <DropdownToggle
            id="pf-thoth-pythonChooser-dropdown"
            onToggle={onToggle}
          >
            {selectedVersion}
          </DropdownToggle>
        }
        isOpen={isOpen}
        dropdownItems={dropdownItems}
      />
      <p className="pf-thoth-pythonChooser-spinner">
        {isLoadingPythonVersions
          ? "loading supported Python Versions from the Thoth Guidance Service"
          : ""}
      </p>
    </div>
  );
};
