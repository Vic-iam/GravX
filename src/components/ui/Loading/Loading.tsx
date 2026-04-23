import { ClockLoader } from "react-spinners";
import style from "./Loading.module.css";

interface LoadingProps {
  text: string;
}

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className={style.loadingContainer}>

      <ClockLoader size={150} color="#ffffff" />

      <p> {text} </p>
    </div>
  );
};

export default Loading;
