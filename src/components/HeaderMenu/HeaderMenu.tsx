import { HeaderMenuProps } from "./HeaderMenu.type";

const HeaderMenu = ({ logo, LinksItems }: HeaderMenuProps) => {
  return (
    <header className="bg-black h-[91px] sticky top-0 z-50">
      <ul className="flex flex-row items-center h-full justify-between ml-7 mr-32">
        <li>
          <img src={logo} alt="logo" />
        </li>
        {LinksItems.map((item, index) => (
          <li className="text-white text-2xl" key={index}>
            <a href="/">{item}</a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default HeaderMenu;
