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
  const [supportedPythonVersions, setSupportedPythonVersions] = useState<
    string[]
  >([]);
  const [selectedVersion, setSelectedVersion] = React.useState(
    "no versions available"
  );
  const getPythonVersionsFromThothService = async () => {
    console.log("getPythonVersionsFromThothService: loading data from API");
    setLoadingPythonVersions(true);
    const _versions = await getPythonVersions();
    setSupportedPythonVersions(_versions);
    console.log("supportedPythonVersions from API", _versions);
    console.log("supportedPythonVersions in state", versions);
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

  const onSelect = () => {
    setIsOpen(false);
    onFocus();
  };

  var dropdownItems: DropdownItemProps[] = [];

  useEffect(() => {
    getPythonVersionsFromThothService();
  }, []);

  useEffect(() => {
    console.log("versions", versions);
    versions.map((version) => {
      dropdownItems.push(<DropdownItem key={version}>{version}</DropdownItem>);
    });
    if (versions.length == 0) {
      setSelectedVersion("no versions available");
    } else {
      setSelectedVersion("<choose version>");
    }
  }, [versions]);

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
    </div>
  );
};
