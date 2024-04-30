import React, { useState, useEffect } from "react";

const getCharacterData = (characterAge, gender) => {
  const characterData = [
    {
      gender: "male",
      images: [
        require("../assets/baby.png"),
        require("../assets/boy_child.png"),
        require("../assets/boy.png"),
        require("../assets/ong.png"),
      ],
      backgrounds: ["#F5ACE1", "#ACF5EC", "#F5DCAC", "#90A9D0"],
    },
    {
      gender: "female",
      images: [
        require("../assets/baby.png"),
        require("../assets/girl_child.png"),
        require("../assets/girl.png"),
        require("../assets/ba.png"),
      ],
      backgrounds: ["#F5ACE1", "#ACF5D2", "#AFE6A2", "#DBB9FD"],
    },
  ];

  const matchingData = characterData.find((obj) => obj.gender === "female");

  if (!matchingData) {
    throw new Error(`Invalid gender: ${gender}`); // Throw custom error
  }

  
  if (characterAge <= 6) {
    return [matchingData.images[0], matchingData.backgrounds[0]];
  } else if (characterAge <= 16) {
    return [matchingData.images[1], matchingData.backgrounds[1]];
  } else if (characterAge <= 50) {
    return [matchingData.images[2], matchingData.backgrounds[2]];
  } else {
    return [matchingData.images[3], matchingData.backgrounds[3]];
  }
};

// const CharacterData = ({ characterAge, gender }) => {
//   const [characterData, setCharacterData] = useState([]);

//   useEffect(() => {
//     try {
//       setCharacterData(getCharacterData(characterAge, gender));
//     } catch (error) {
//       console.error(error.message); // Log the error message
//     }
//   }, [characterAge, gender]);

//   return characterData;
// };

export default getCharacterData;
