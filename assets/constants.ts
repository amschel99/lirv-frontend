import { Dimensions } from "react-native";

/*colors*/
export enum colors {
  primary_bg_dark = "#141714",
  primary_bg_dark_faint = "rgba(20, 23, 20, 0.9)",
  primary_bg_light = "#FFFFFF",
  primary_bg_light_faint = "rgba(255, 255, 255, 0.8)",
  content_bg_dark = "#1E1E1E",
  content_bg_light = "#E6E8EA",
  divider_bg_dark = "rgba(248, 250, 252, 0.2)",
  divider_bg_light = "rgba(28, 31, 35, 0.3)",
  text_primary_dark = "#F8FAFC",
  text_faint_dark = "#7F7F7F",
  text_primary_light = "#000000",
  text_faint_light = "#333333",
  accent_light = "#2C2C2C",
  fb_bg_dark = "#4267B2",
  fb_bg_light = "rgba(66, 103, 178, 0.4)",
  popup_bg_dark = "rgba(30, 30, 30, 0.6)",
  popup_bg_light = "rgba(230, 232, 234, 0.6)",
  links_color = "rgba(0, 122, 204, 0.8)",
  green = "#008000",
  navy_blue = "#14244C",
}

/*fonts*/
export const fonts = {
  light: "ops-light",
  regular: "ops-regular",
};

/*styles*/
export const lighttext = {
  fontSize: 14,
  fontFamily: fonts.light,
  color: colors.text_primary_light,
};

export const boldtext = {
  ...lighttext,
  fontFamily: fonts.regular,
};

export const largetext = {
  ...boldtext,
  fontSize: 16,
};

export const container = {
  flex: 1,
  padding: 8,
  backgroundColor: colors.primary_bg_light,
};

/*dimensions*/
export const { width: SCREENWIDTH, height: SCREENHEIGHT } =
  Dimensions.get("window");
