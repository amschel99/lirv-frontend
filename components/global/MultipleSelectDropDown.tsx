import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { ChevronDownIcon, RemoveIcon } from "../../assets/icons";
import {
  SCREENWIDTH,
  boldtext,
  colors,
  lighttext,
} from "../../assets/constants";

export interface MultiSelectOption {
  name: string;
  selected: boolean;
}
export interface MultipleSelectDropDownProps {
  label: string;
  showDropDown: boolean;
  optionList: MultiSelectOption[];
  toggleShowDropDown: () => void;
  setOptionList: Dispatch<SetStateAction<MultiSelectOption[]>>;
}

export const MultipleSelectDropDown = ({
  label,
  showDropDown,
  optionList,
  setOptionList,
  toggleShowDropDown,
}: MultipleSelectDropDownProps): JSX.Element => {
  const handleToggleSelected = (nameOfOption: string) => {
    setOptionList((prev) =>
      prev.map((option) =>
        option.name === nameOfOption
          ? { ...option, selected: !option.selected }
          : option
      )
    );

    // const selectedSkills = optionList.map((value) => {
    //   if (value.selected) return value.name;
    // });
    // setSelectedSkills(selectedSkills);
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.labelContainer}
        onPress={toggleShowDropDown}
      >
        <Text style={[boldtext, { fontSize: 14 }]}> {label}</Text>
        <ChevronDownIcon />
      </TouchableOpacity>

      <View style={{ display: "flex", gap: 20 }}>
        {showDropDown && (
          <View style={[styles.dropDownContainer, styles.androidShadow]}>
            {optionList.map((option, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={
                    !option.selected
                      ? styles.showDropdownOption
                      : styles.hideDropdownOption
                  }
                  onPress={() => {
                    handleToggleSelected(option.name);
                    showDropDown && toggleShowDropDown();
                  }}
                >
                  <Text style={{ ...lighttext }}>{option.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View style={styles.selecteOptionsContainer}>
          {optionList.map((option, index) => {
            return (
              <View
                key={index}
                style={option.selected ? styles.showOption : styles.hideOption}
              >
                <Text style={styles.sectedOptionText}>{option.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    handleToggleSelected(option.name);
                    showDropDown && toggleShowDropDown();
                  }}
                >
                  <RemoveIcon />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    height: 43,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropDownContainer: {
    width: SCREENWIDTH - 16,
    borderRadius: 9,
    paddingVertical: 9,
    paddingHorizontal: 8.5,
    display: "flex",
    backgroundColor: "#E6E8EA", // Color should strictly have not opacity
    shadowColor: colors.content_bg_dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    gap: 8,
  },
  androidShadow: {
    elevation: 3,
  },

  showDropdownOption: {
    height: 43,
    borderBottomWidth: 1,
    justifyContent: "center",
    borderColor: colors.divider_bg_light,
  },

  hideDropdownOption: {
    display: "none",
  },
  selecteOptionsContainer: {
    display: "flex",
    gap: 8,
  },
  showOption: {
    display: "flex",
    height: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8.5,
    paddingVertical: 9,
    borderRadius: 6,
    backgroundColor: colors.popup_bg_light,
  },
  hideOption: {
    display: "none",
  },
  sectedOptionText: {
    ...lighttext,
  },
});
