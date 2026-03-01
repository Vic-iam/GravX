import Loading from "../components/Loading";
import style from "./Style/Dashboard.module.css";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading text="...Cargando datos" />
      ) : (
        <div className={style.containerDashboard}></div>
      )}
    </>
  );
};

export default Dashboard;
