import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  DropdownItemProps,
} from "@patternfly/react-core";

import "./pythonChooser.css";
import "../../node_modules/@patternfly/patternfly/patternfly.min.css";
import { getPythonEnvironments } from "./ThothAPI";
import { version } from "os";

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
  const [isFetching, setFetching] = React.useState(true);
  const [selectedVersion, setSelectedVersion] = React.useState("");
  let cancelled = false;

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

  const getVersions = () => {
    return getPythonEnvironments().then(() => {
      if (cancelled) return;
      setFetching(false);
    });
  };

  const errorCatch = (e: Error) => {
    if (cancelled) return;
    setFetching(false);
    console.error(e);
    // notification.error("Failed to get Python Environments", e.message);
  };

  var dropdownItems: DropdownItemProps[] = [];

  if (versions.length > 0) {
    console.log(versions);
    console.log(selectedVersion);

    versions.forEach((version: string) => {
      dropdownItems.push(<DropdownItem key={version}>{version}</DropdownItem>);
    });
    // https://bobbyhadz.com/blog/react-too-many-re-renders-react-limits-the-number
    useEffect(() => {
      setFetching(false);
    }, []); // 👈️ empty dependencies array
  } else {
    dropdownItems = [
      <DropdownItem key="loading">
        fetching versions from Thoth Guidance Service...
      </DropdownItem>,
    ];
    getVersions().catch(errorCatch);
    console.log(versions);
    console.log(selectedVersion);
  }

  return (
    <div>
      <p className="pf-thoth-pythonChooser">Python</p>&nbsp;
      <Dropdown
        onChange={(value) => console.log("change!", value)}
        onSelect={onSelect}
        toggle={
          <DropdownToggle
            id="pf-thoth-pythonChooser-dropdown"
            onToggle={onToggle}
          >
            {"fetching..." ? isFetching : selectedVersion}
          </DropdownToggle>
        }
        isOpen={isOpen}
        dropdownItems={dropdownItems}
      />
    </div>
  );
};
