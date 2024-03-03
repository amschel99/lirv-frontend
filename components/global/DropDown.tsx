import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, ScrollView } from "react-native";
import { ChevronDownIcon } from "../../assets/icons";
import { SCREENWIDTH, boldtext, colors, lighttext } from "../../assets/constants";

export interface DropDownProps {
  list: string[];
  placeHolder: string;
  selectedValue: string;
  showDropDown: boolean;
  toggleShowDropDown: () => void;
  setSelecteOption: React.Dispatch<React.SetStateAction<string>>;
}

export const DropDown = ({
  list,
  placeHolder,
  showDropDown,
  selectedValue,
  toggleShowDropDown,
  setSelecteOption,
}: DropDownProps): JSX.Element => {
  return (
    <View>
      <TouchableOpacity
        style={styles.selectedOption}
        onPress={toggleShowDropDown}
      >
        <View style={styles.selectedOptionTextContainer}>
          <Text style={[boldtext, { fontSize: 14 }]}> {placeHolder}</Text>
          {selectedValue && (
            <Text style={[lighttext, { fontSize: 14 }]}> {selectedValue}</Text>
          )}
        </View>
        <ChevronDownIcon />
      </TouchableOpacity>

      {showDropDown && (
        <View style={styles.optionContainer}>
          <ScrollView style={{ maxHeight: 150 }}>
            {list.map((option, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.option,
                    index + 1 === list.length && styles.removeBottomBorder,
                  ]}
                  key={index}
                  onPress={() => {
                    toggleShowDropDown();
                    setSelecteOption(option);
                  }}
                >
                  <Text style={{ ...lighttext }}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedOption: {
    height: 43,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOptionTextContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  optionContainer: {
    width: SCREENWIDTH - 16,
    position: "absolute",
    top: 45,
    left: 0,
    padding: 4,
    zIndex: 1000,
    borderRadius: 4,
    backgroundColor: "rgba(230, 232, 234, 1)",
  },
  option: {
    height: 43,
    borderBottomWidth: 1,
    justifyContent: "center",
    borderColor: colors.divider_bg_light,
  },
  removeBottomBorder: {
    borderBottomWidth: 0,
  },
});
