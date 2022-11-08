import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";

interface DescriptionProps {
  tagResponsibilities: string[];
  experience?: string;
  distance: number;
  speciality: string;
}

const Description = memo(
  ({ tagResponsibilities, experience, distance, speciality }: DescriptionProps) => {
    const styles = useStyleSheet(themedStyles);
    const { t } = useTranslation(["find", "common"]);
    return (
      <View style={styles.container}>
        <View style={styles.description}>
          <Text category="h3" mb={24}>
            {t("description")}
          </Text>
          {/* <Text category="para-m" mb={32}>
            {experience = null ? "El Profesional no ha dado su Descripcion" : experience }
          </Text> */}
          {experience == null || experience == "" ? 
            <Text category="para-m" mb={32}> {"El Profesional no ha dado su Descripcion"} </Text>  
           : 
           <Text category="para-m" mb={32}> {experience} </Text> 
          }
          <Text category="para-m" mb={10}>
            {"Se encuentra a una distancia de " + distance.toFixed(0) + "km"}
          </Text>
        </View>
        <View>
          <Text category="h3" mb={10}>
            {t("Servicios Proporcionados")}
          </Text>
          {tagResponsibilities.map((item, i) => {
            return (
              <Flex key={i} justify="flex-start" itemsCenter mb={12}>
                <Layout style={globalStyle.dot} level="5" />
                <Text category="para-m">{item}</Text>
              </Flex>
            );
          })}
        </View>
        <View>
          <Text category="h3" mb={10}>
            {t("Comentarios y Valoraciones de Familiares")}
          </Text>
          {tagResponsibilities.map((item, i) => {
            return (
              <Flex key={i} justify="flex-start" itemsCenter mb={12}>
                <Layout style={globalStyle.dot} level="5" />
                <Text category="para-m">{item}</Text>
              </Flex>
            );
          })}
        </View>
      </View>
    );
  }
);

export default Description;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  description: {
    borderBottomWidth: 1,
    borderColor: "background-basic-color-3",
    marginBottom: 56,
  },
  line: {
    marginBottom: 56,
    height: 1,
    marginTop: 12,
  },
});
