import React, { FC, ReactElement } from "react";
import { Text } from "react-native-paper";

type SectionHeaderProps = {
  title: string | number;
};
export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
}): ReactElement => {
  return <Text variant="titleLarge">{title}</Text>;
};

export default SectionHeader;
