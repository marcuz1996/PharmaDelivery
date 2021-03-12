import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");


export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Montserrat", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "MontserratBold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "MontserratBold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "MontserratBold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "MontserratBold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Montserrat", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Montserrat", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Montserrat", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Montserrat", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Montserrat", fontSize: SIZES.body5, lineHeight: 22 },
};