import React, { JSX } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { CommunitiesIcon, VerifiedAccountIcon } from "../../assets/icons";
import { boldtext, colors, lighttext } from "../../assets/constants";

interface profileProps {
  accProfile: any;
}

export const CompanyProfile = ({ accProfile }: profileProps): JSX.Element => {
  return (
    <View>
      <View style={styles.profilepicctr}>
        <View style={styles.industry}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.profilepic}
          />

          <View style={{ gap: 4 }}>
            <Text style={boldtext}>NichLabs</Text>
            <Text style={lighttext}>Technology</Text>
          </View>
        </View>

        <View style={styles.verified}>
          <VerifiedAccountIcon />
        </View>
      </View>

      <View style={styles.about}>
        <Text style={boldtext}>About NichLabs</Text>

        <Text style={[lighttext, { marginTop: 4 }]}>Nichlabs is a ...</Text>

        <Text style={[boldtext, { marginTop: 8 }]}>Company size</Text>

        <View style={styles.size}>
          <CommunitiesIcon iconHeight={14} />
          <Text style={lighttext}>0 -100</Text>
        </View>

        <Text style={[boldtext, { marginTop: 8 }]}>Location</Text>
        <Text
          style={[boldtext, { marginTop: 4, color: colors.text_faint_light }]}
        >
          Nairobi, Kenya
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilepicctr: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider_bg_light,
  },
  profilepic: {
    width: 58,
    height: 58,
    borderRadius: 6,
  },
  industry: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  verified: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 500,
    backgroundColor: colors.green,
  },
  about: {
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider_bg_light,
  },
  size: {
    marginTop: 8,
    flexDirection: "row",
    gap: 8,
  },
});
