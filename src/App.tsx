import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import HeaderLogo from "./assets/static/logo.png"
function App() {

  return (
    <>
      <HeaderMenu logo={HeaderLogo} LinksItems={["Accueil", "Profil", "Réglages", "Communauté"]}   />
    </>
  );
}

export default App
