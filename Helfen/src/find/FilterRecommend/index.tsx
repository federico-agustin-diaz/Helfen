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
import Geolocation from '@react-native-community/geolocation';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Keyboard, Platform, ScrollView, StyleSheet, View } from "react-native";
import useToggle from "hooks/useToggle";
interface FilterRecommendProps {
  onHide?(): void;
}

const FilterRecommend = memo(({ onHide }: FilterRecommendProps) => {
  const { width, bottom, height } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["find", "common"]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "lehieuds@gmail.com",
      password: "123456Aa",
      consider: "",
    },
  });
  const [male, setMale] = React.useState(false);
  const [hombre, setHombre] = useToggle(true);
  const [cuidador, setCuidador] = useToggle(true);
  const [higiene, sethigiene] = useToggle(false);
  const [bañocon, setbañocon] = useToggle(false);
  const [bañosin, setbañosin] = useToggle(false);
  const [controles, setcontroles] = useToggle(false);
  const [curaciones, setcuraciones] = useToggle(false);
  const [suero, setsuero] = useToggle(false);
  const [aseo, setaseo] = useToggle(false);
  const [alim, setalim] = useToggle(false);
  const [asist, setasist] = useToggle(false);
  const [paseos, setPaseos] = useToggle(false);
  const [acompañamiento, setacompañamiento] = useToggle(false);
  const [rcp, setrcp] = useToggle(false);
  const [aux, setaux] = useToggle(false);
  const [hem, sethem] = useToggle(false);
  const _onMap = React.useCallback(() => {
    Geolocation.getCurrentPosition(info => console.log(info));
    navigate('FindStack', {screen: 'ViewOnMap'});
  }, []);
  const onChange = React.useCallback((next) => {
    setMale(next);
  }, []);


  return (
    <Container
      style={[styles.container, { width: width, paddingTop: bottom + 20 }]}
    >
        <ScrollView >
      <TopNavigation
        title={t("filter").toString()}
        accessoryLeft={
            <Icon pack="assets" name="close" onPress={onHide}/>
        }
      />

      <Content contentContainerStyle={styles.content} padder>
        <Text category="h7" mb={24}>
          {t("Tipo de Profesion")}
        </Text>
        <Flex mb={32}>
          <CheckBox children={"Cuidador"} checked={cuidador} onChange={setCuidador} />
          <CheckBox children={"Acompañante"} checked={!cuidador} onChange={setCuidador} />
        </Flex>
        <Text category="h7" mb={24}>
          {t("Genero Paciente")}
        </Text>
        <Flex mb={32}>
          <CheckBox children={"Masculino"} checked={hombre} onChange={setHombre} />
          <CheckBox children={"Femenino"} checked={!hombre} onChange={setHombre} />
        </Flex>
        <Text category="h7" mb={10}>
          {t("Direccion para ubicar profesionales mas cercanos")}
        </Text>
        <Button
          children={t("Presione aqui para abrir el mapa").toString()}
          onPress={_onMap}
          status="outline"
          style={styles.email}
          //style={globalStyle.shadowBtn}
        />
        <Text category="h7" mb={24}>
          {t("Servicios Prestados")}
        </Text>
          <CheckBox children={"Higiene y confort"} checked={higiene} onChange={sethigiene} />
          <CheckBox children={"Baño con movilidad"} checked={bañocon} onChange={setbañocon} />
          <CheckBox children={"Baño sin movilidad"} checked={bañosin} onChange={setbañosin} />
          <CheckBox children={"Controles (Presión, glucosa, temperatura)"} checked={controles} onChange={setcontroles} />
          <CheckBox children={"Curaciones"} checked={curaciones} onChange={setcuraciones} />
          <CheckBox children={"Cambio de suero"} checked={suero} onChange={setsuero} />
          <CheckBox children={"Aseo del espacio"} checked={aseo} onChange={setaseo} />
          <CheckBox children={"Alimentación"} checked={alim} onChange={setalim} />
          <CheckBox children={"Asistencia en traslados"} checked={asist} onChange={setasist} />
          <CheckBox children={"Paseos de rutina"} checked={paseos} onChange={setPaseos} />
          <CheckBox children={"Acompañamiento en rehabilitación"} checked={acompañamiento} onChange={setacompañamiento} />
          <CheckBox children={"RCP"} checked={rcp} onChange={setrcp} />
          <CheckBox children={"Primeros Auxilios"} checked={aux} onChange={setaux} />
          <CheckBox children={"Maniobra de heimlich"} checked={hem} onChange={sethem} />


      </Content>

</ScrollView>
<Button styles={styles.button} onPress = {onHide} children={t("buttonFilter").toString()}/>
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
    width: 24,
  },
  email: {
    marginBottom: 24,
  }
});
