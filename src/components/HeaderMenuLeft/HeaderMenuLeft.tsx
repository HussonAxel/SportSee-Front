const HeaderMenuLeft = () => {
  const HeaderMenuPictoItems = [
    {
      id: 1,
      src: "./src/assets/static/bike_icon.png",
      alt: "bike icon",
    },
    {
      id: 2,
      src: "./src/assets/static/swim_icon.png",
      alt: "swim icon",
    },
    {
      id: 3,
      src: "./src/assets/static/workout_icon.png",
      alt: "workout icon",
    },
    {
      id: 4,
      src: "./src/assets/static/zen_icon.png",
      alt: "zen icon",
    },
  ];

  return (
    <div className="bg-black w-[117px] h-[calc(100vh-91px)] sticky top-[91px] flex flex-col justify-center items-center">
      <ul className="flex flex-col items-center gap-5">
        {HeaderMenuPictoItems.map((item, index) => (
          <li key={index} className="text-white  lg:w-[64px] md:w-[48px]">
            <img src={item.src} alt={item.alt} />
          </li>
        ))}
      </ul>
      <p className="-rotate-90 text-white text-[12px] w-max relative top-[15%]">
        Copiryght, SportSee 2020
      </p>
    </div>
  );
};

export default HeaderMenuLeft;
