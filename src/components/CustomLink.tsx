import type { LucideProps } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  name: string;
  path: string;
  isDisabled?: boolean;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

const CustomLink: React.FC<Props> = ({ name, path, isDisabled, Icon }) => {
  if (isDisabled)
    return (
      <NavLink to="#" className="disabled-link">
        <Icon />
        <p>{name} (en desarrollo)</p>
      </NavLink>
    );
  return (
    <NavLink
      className={({ isActive }) => (isActive ? "active-link" : "")}
      to={path}
    >
      <Icon />
      <p>{name}</p>
    </NavLink>
  );
};

export default CustomLink;
