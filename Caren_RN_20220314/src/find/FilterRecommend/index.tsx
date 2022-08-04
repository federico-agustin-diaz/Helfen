import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Input,
  Button,
  Layout,
  CheckBox
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";
import Flex from "components/Flex";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { TouchableOpacity } from "react-native-gesture-handler";
import TabBar from "components/TabBar";
import { Controller, useForm } from "react-hook-form";
import SliderDistance from "src/account/components/SliderDistance";
import FilterHour from "../components/FilterHour";
import RegularlySchedule from "./RegularlySchedule";
import { globalStyle } from "styles/globalStyle";

interface FilterRecommendProps {
  onHide?(): void;
}

const FilterRecommend = memo(({ onHide }: FilterRecommendProps) => {
  const { width, bottom, height } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["find", "common"]);

  const [babysitter, setBabysitter] = React.useState(0);
  const [sortBy, setSortBy] = React.useState(0);
  const [value, setValue] = React.useState<number | number[]>(10);
  const [hour, setHour] = React.useState<number | number[]>(15);
  const [regularly, setRegularly] = React.useState(true);
  const [occasional, setOccasional] = React.useState(false);
  const [oneTime, setOneTime] = React.useState(false);
  const [needASAP, setNeedASAP] = React.useState(false);
  const [male, setMale] = React.useState(false);
  const onChange = React.useCallback((next) => {
    setMale(next);
  }, []);

  return (
    <Container
      style={[styles.container, { width: width, paddingTop: bottom + 20 }]}
    >
      <TopNavigation
        title={t("filter").toString()}
        accessoryLeft={
          <TouchableOpacity activeOpacity={0.54} onPress={onHide}>
            <Icon pack="assets" name="close" />
          </TouchableOpacity>
        }
      />
      <Content contentContainerStyle={styles.content} padder>
        <Text category="h7" mb={24}>
          {t("distance")}
        </Text>
        <SliderDistance valueSlider={value} setValueSlider={setValue} mb={32} />
        <Text category="h7" mb={24}>
          {t("overThisAmountPerHour")}
        </Text>
        <FilterHour valueSlider={hour} setValueSlider={setHour} mb={40} />
        <Input
          label={t("Buscar por Primer Nombre").toString()}
          style={styles.email}
          value={value}
        />
        <Input
          label={t("Buscar por Segundo Nombre").toString()}
          style={styles.email}
          value={value}
        />
        <Text category="h7" mb={24}>
          {t("Genero")}
        </Text>
        <Flex mb={32}>
          <CheckBox children={"Hombre"} checked={male} onChange={onChange} />
          <CheckBox children={"Mujer"} checked={!male} onChange={onChange} />
</Flex>
        <Button styles={styles.button} children={t("buttonFilter").toString()}/>
      </Content>

    </Container>
  );
});

export default FilterRecommend;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 32,
    paddingBottom: 60,
  },
  location: {
    marginVertical: 32,
    borderBottomWidth: 2,
  },
  iconMap: {
    tintColor: "color-primary-100",
  },
  keyword: {
    ...globalStyle.shadowFade,
    marginBottom: 40,
  },
  see: {
    marginTop: 48,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    paddingTop: 150,
  }
});
