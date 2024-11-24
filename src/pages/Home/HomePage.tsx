import HeaderMenu from "../../components/HeaderMenu/HeaderMenu";
import HeaderMenuLeft from "../../components/HeaderMenuLeft/HeaderMenuLeft";
import WelcomePanel from "../../components/WelcomePanel/WelcomePanel";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMenu
        logo="./src/assets/static/logo.png"
        LinksItems={["Accueil", "Profil", "Réglages", "Communauté"]}
      />
      <div className="flex flex-row flex-1">
        <HeaderMenuLeft />
        <div className="flex-1 overflow-auto 2xl:pl-24">
          <WelcomePanel />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
