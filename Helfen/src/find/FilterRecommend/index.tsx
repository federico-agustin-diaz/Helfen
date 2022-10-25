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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList, AuthStackParamList} from 'navigation/types';
import { globalStyle } from "styles/globalStyle";
import NavigationAction from "components/NavigationAction";
import Geolocation from '@react-native-community/geolocation';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Keyboard, Platform, ScrollView, StyleSheet, View } from "react-native";
import useToggle from "hooks/useToggle";
import Globales from "src/Globales";
import { Pressable } from "react-native"

interface FilterRecommendProps {
  onHide(): void;
  onFilter(): void
}

const FilterRecommend = memo(({ onHide, onFilter }: FilterRecommendProps) => {
    // const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

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
  let location: Boolean = false;
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
  let arrayServices = new Array();
  
  // const _onMap = React.useCallback(() => {
  //   location = true
  //   Geolocation.getCurrentPosition(info => console.log(info));
  //   navigate('FindStack', {screen: 'ViewOnMap'});
  // }, []);
  const onSearch = () => {
    if (Globales.variableGlobalLatitude != null) {
    let higieneString = higiene ? "Higiene y confort," : ""
    let banoString = bañocon ? "Baño con movilidad," : ""
    let banoSinString = bañosin ? "Baño sin movilidad, " : ""
    let controlesString = controles ? "Controles (Presión glucosa y temperatura)," : ""
    let curacionesString = curaciones ? "Curaciones," : ""
    let sueroString = bañocon ? "Cambio de suero," : ""
    let aseoString = bañosin ? "Aseo del espacio," : ""
    let alimString = alim ? "Alimentación," : ""
    let asistString = asist ? "Asistencia en traslados," : ""
    let paseosString = paseos ? "Paseos de rutina," : ""
    let acompañamientoString = acompañamiento ? "Acompañamiento en rehabilitación," : ""
    let rcpString = rcp ? "Primeros Auxilios," : ""
    let hemString = hem ? "Maniobra de heimlich" : ""
    let stringServices = higieneString+banoString+banoSinString+controlesString+curacionesString+sueroString+aseoString+alimString+asistString+paseosString+acompañamientoString+rcpString+hemString
    arrayServices = stringServices.split(",")
    console.log(stringServices)
    console.log(arrayServices)
    return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/users', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: Globales.variableGlobalLatitude,
        longitude: Globales.variableGlobalLatitude,
    description: arrayServices,
    specialty: cuidador==true ? "Cuidador" : "Acompañante",
    gender: hombre==true ? "M" : "F"
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
      if (data.carers.length != 0) {
        onHide()
        onFilter()
        console.log(data)
        Globales.variableGlobalCuidadores = data.carers
        console.log(Globales.variableGlobalCuidadores)
      } else if (data.carers.length == 0) {
        alert("No se encontraron cuidadores que cumplan con estas preferencias.")
        console.log("no hay cuidadores");
      }
    })
      .catch((error) => {
        onHide()
        alert("Hubo un error buscando cuidadores. Pruebe mas tarde.")
        console.log("error")
        console.error(error);
      });
    } else {
      alert("Por favor marque su ubicacion en el mapa")
    }
  };


  return (
    <Container
      style={[styles.container, { width: width, paddingTop: bottom + 20 }]}
    >
      <TopNavigation
        title={t("filter").toString()}
        
        accessoryLeft={
          <Pressable onPress={()=> onHide()}>
            <Icon pack="assets" name="close"/>
            </Pressable>
        }
        
      />
        <ScrollView >
        

      <Content contentContainerStyle={styles.content} padder>
      {/* <Pressable onPress={()=> onHide()}>
      <Icon pack="assets" name="close"/>
       </Pressable> */}
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
        {/* <Text category="h7" mb={10}>
          {t("Ubicar profesionales mas cercanos")}
        </Text>
        <Button
          children={t("Presione para ubicar su posicion el mapa").toString()}
          onPress={onMap}
          status="outline"
          style={styles.email}
          //style={globalStyle.shadowBtn}
        /> */}
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
<Button styles={styles.button} onPress = {onSearch} children={t("buttonFilter").toString()}/>
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
