import { useSearchParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Summary from "../components/dashboard/Summary";
import FoodLog from "../components/dashboard/FoodLog";
import TrainingLog from "../components/dashboard/TrainingLog";
import ProfilePanel from "../components/dashboard/ProfilePanel";
import { emptyProfile, useUserData, type Profile } from "../utils/userData";
import style from "./Style/Dashboard.module.css";

const TABS = [
  { id: "resumen", label: "Resumen" },
  { id: "alimentacion", label: "Alimentación" },
  { id: "entrenamiento", label: "Entrenamiento" },
  { id: "perfil", label: "Perfil" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type HeaderProps = {
  userId: string;
  fallbackName: string;
  fallbackPicture: string;
};

const Header = ({ userId, fallbackName, fallbackPicture }: HeaderProps) => {
  const [profile] = useUserData<Profile>(userId, "profile", emptyProfile);
  const name = profile.nombre || fallbackName;
  const picture = profile.foto || fallbackPicture;

  return (
    <header className={style.header}>
      {picture ? (
        <img className={style.avatar} src={picture} alt="" />
      ) : (
        <div className={style.avatar} aria-hidden="true" />
      )}
      <h1>Hola{name ? `, ${name}` : ""}</h1>
    </header>
  );
};

const Dashboard = () => {
  const { user } = useAuth0();
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("tab");
  const tab: TabId =
    TABS.find(({ id }) => id === requested)?.id ?? "resumen";
  const setTab = (id: TabId) => setSearchParams({ tab: id });

  if (!user?.sub) return null;
  const userId = user.sub;

  return (
    <div className={style.containerDashboard}>
      {/* La key relee el perfil al volver de la pestaña Perfil. */}
      <Header
        key={tab}
        userId={userId}
        fallbackName={user.name ?? ""}
        fallbackPicture={user.picture ?? ""}
      />

      <nav className={style.tabs} aria-label="Secciones del panel">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={tab === id ? style.tabActive : style.tab}
            aria-current={tab === id ? "page" : undefined}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main>
        {tab === "resumen" && <Summary userId={userId} />}
        {tab === "alimentacion" && <FoodLog userId={userId} />}
        {tab === "entrenamiento" && <TrainingLog userId={userId} />}
        {tab === "perfil" && <ProfilePanel userId={userId} />}
      </main>
    </div>
  );
};

export default Dashboard;
