import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { type LucideProps } from "lucide-react";

interface SubLink {
  name: string;
  path: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

interface Props {
  name: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  path: string;
  children: SubLink[];
}

const CustomLinkWithChildren: React.FC<Props> = ({
  name,
  Icon,
  path,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const isActiveChild = children?.some(
    (child) => location.pathname === child.path
  );
  const isActiveParent = location.pathname === path;

  // Expand automatically if in any child path
  useEffect(() => {
    if (isActiveChild || isActiveParent) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [isActiveChild, isActiveParent]);

  return (
    <div
      className="custom-link-with-children"
      style={{
        height:
          isActiveChild || isActiveParent ? 44 + children.length * 28 : 44,
        overflow: "hidden",
        transition: "height ease 0.3s",
      }}
    >
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive || isActiveChild ? "active-link parent-link" : "parent-link"
        }
      >
        <Icon />
        <p>{name}</p>
      </NavLink>
      {expanded && (
        <ul className="sublinks">
          {children.map((child, idx) => (
            <li key={idx}>
              <NavLink
                to={child.path}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <child.Icon />
                <p>{child.name}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomLinkWithChildren;
