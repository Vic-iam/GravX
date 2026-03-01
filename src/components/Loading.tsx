import { ClockLoader } from "react-spinners";
import style from "./Style/Loading.module.css";
import Aurora from "./Aurora";

interface LoadingProps {
  text: string;
}

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className={style.loadingContainer}>
      <div className={style.auroraBg}>
        <Aurora
          colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <ClockLoader size={150} color="#ffffff" />

      <p> {text} </p>
    </div>
  );
};

export default Loading;
