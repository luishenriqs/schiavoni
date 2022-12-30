import { RFValue } from "react-native-responsive-fontsize";

export default {
  COLORS: {
    black: "#000000",
    white: "#FFFFFF",
    gold: "#ffD700",

    green_500: "#00B37E",
    green_700: "#00875F",

    red_200: "#F75A68",
    red_400: "#AA2834",
    red_700: "#7A0000",

    gray_100: "#E1E1E6",
    gray_200: "#C4C4CC",
    gray_300: "#A4A4A4",
    gray_400: "#808080",
    gray_500: "#676767",
    gray_600: "#363636",
    gray_700: "#29292E",
    gray_800: "#202024",
    gray_900: "#1C1C1C",
    gray_1000: "#121214",
  },

  FONT_FAMILY: {
    regular: "Roboto_400Regular",
    medium: "Roboto_500Medium",
    bold: "Roboto_700Bold",
  },

  FONT_SIZE: {
    SS: `${RFValue(12)}px`,
    SM: `${RFValue(14)}px`,
    MD: `${RFValue(16)}px`,
    LG: `${RFValue(18)}px`,
    XL: `${RFValue(20)}px`,
    XLL: `${RFValue(25)}px`,
    XXL: `${RFValue(30)}px`,
  },
};
