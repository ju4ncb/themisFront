import { useEffect, useState } from "react";

const NavbarDashboard: React.FC<{ currentUrl: string }> = ({ currentUrl }) => {
  type NavLocationType = {
    path: string;
    locationName: string;
  };
  const [locations, setLocations] = useState([] as NavLocationType[]);
  useEffect(() => {
    const locationsTemp = [] as NavLocationType[];
    let currentUrlBuild = "/";
    currentUrl
      .split("/")
      .splice(1)
      .forEach((locationName) => {
        locationsTemp.push({
          path: currentUrlBuild + locationName,
          locationName:
            locationName.charAt(0).toUpperCase() + locationName.slice(1),
        });
        currentUrlBuild += locationName + "/";
      });
    setLocations(locationsTemp);
  }, [currentUrl]);
  return (
    <nav className="dashboard-navbar">
      {locations.map(({ path, locationName }, index) => (
        <div key={index}>
          <a href={path}>{locationName}</a>
          {index < locations.length - 1 && <span>&gt;</span>}
        </div>
      ))}
    </nav>
  );
};

export default NavbarDashboard;
