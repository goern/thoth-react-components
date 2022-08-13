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

  if (versions.length > 0) {
    versions.forEach((version: string) => {
      dropdownItems.push(<DropdownItem key={version}>{version}</DropdownItem>);
    });
    useEffect(() => {
      setFetching(false);
    }, []); // 👈️ empty dependencies array
  } else {
    dropdownItems = [
      <DropdownItem key="loading">
        fetching versions from Thoth Guidance Service...
      </DropdownItem>,
    ];
  }

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
            version
          </DropdownToggle>
        }
        isOpen={isOpen}
        dropdownItems={dropdownItems}
      />
    </div>
  );
};
