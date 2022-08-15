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
import userEvent from "@testing-library/user-event";

interface PythonChooserProps {
  /**
   * PythonChooser supported Python Versions
   */
  versions: string[];
  setVersions: (versions: string[]) => void;
}

/**
 * Primary UI component for choosing a Python Version that is an environment supported by Thoth
 */
export const PythonChooser = ({
  versions,
  setVersions,
  ...props
}: PythonChooserProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFetching, setFetching] = React.useState(false);
  const [selectedVersion, setSelectedVersion] =
    React.useState("<choose version>");
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
    setSelectedVersion("3.8"); // FIXME hardcoded for now
    onFocus();
  };

  const getVersions = (): Promise<string[] | undefined> => {
    return getPythonEnvironments().then((vs) => {
      if (cancelled) return;
      setFetching(false);
      return vs;
    });
  };

  const errorCatch = (e: Error) => {
    if (cancelled) return;
    setFetching(false);
    console.error(e);
    // notification.error("Failed to get Python Environments", e.message);
  };

  var dropdownItems: DropdownItemProps[] = [];

  if (versions.length === 0) {
    if (!isFetching) {
      setFetching(true);

      getVersions()
        .catch(errorCatch)
        .then((result) => {
          if (result !== undefined) {
            setVersions(result);
            setFetching(false);
          }
        });
    }
  }

  if (versions.length > 0) {
    console.log(versions);
    console.log(selectedVersion);

    versions.forEach((version: string) => {
      dropdownItems.push(<DropdownItem key={version}>{version}</DropdownItem>);
    });
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
            {isFetching ? "fetching..." : selectedVersion}
          </DropdownToggle>
        }
        isOpen={isOpen}
        dropdownItems={dropdownItems}
      />
    </div>
  );
};
