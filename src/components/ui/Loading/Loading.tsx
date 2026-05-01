import { ClockLoader } from "react-spinners";
import style from "./Loading.module.css";

interface LoadingProps {
  text: string;
}

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className={style.loadingContainer}>
      <div className={style.auroraBg}></div>
      <div className={style.loaderContent}>
        <ClockLoader size={120} color="var(--text)" />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Loading;
