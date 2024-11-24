import { greetingsProps } from "./GreetingsProps";
import userInfos from "../../mocks/userInfos.json";
import { useState, useEffect } from "react";

const Greetings = ({ isApi }: greetingsProps) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/18");
        const data = await response.json();
        setUserName(data.data.userInfos.firstName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isApi) {
      fetchData();
    } else {
      setUserName(userInfos.data.userInfos.firstName);
    }
  }, [isApi]);

  return (
    <h1 className="text-5xl my-10">
      <span className="text-[#FF0101]">
        Bonjour {isApi ? `${userName}` : `${userName}`}
      </span>
    </h1>
  );
};

export default Greetings;
