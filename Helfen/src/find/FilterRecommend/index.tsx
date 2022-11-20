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
import { Keyboard, Platform, ScrollView, StyleSheet, View, Alert } from "react-native";
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
  const [enfermero, setEnfermero] = useToggle(false);
  const [mujer, setMujer] = React.useState(false);
  const [hombre, setHombre] = React.useState(true);
  const [bothSexos, setbothSexos] = React.useState(false);
  const [cuidador, setCuidador] = React.useState(true);
  const [acompañante, setacompañante] = React.useState(false);
  const [both, setboth] =React.useState(false);
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
  
  const setHombrePosta = () => {
    setHombre(true)
    setMujer(false)
    setbothSexos(false)
  }

  const setMujerPosta = () => {
    setHombre(false)
    setMujer(true)
    setbothSexos(false)
  }

  const setbothSexosPosta = () => {
    setHombre(false)
    setMujer(false)
    setbothSexos(true)
  }

    const setCuidadorPosta = () => {
    setCuidador(true)
    setacompañante(false)
    setboth(false)
  }

  const setacompañantePosta = () => {
    setCuidador(false)
    setacompañante(true)
    setboth(false)
  }

  const setbothPosta = () => {
    setCuidador(false)
    setacompañante(false)
    setboth(true)
  }
  const onSearch = () => {
    if (Globales.variableGlobalLatitude != null) {
      let speciality = cuidador==true ? "Cuidador" : (acompañante==true ? "Acompaniante" : "Ambos")
      console.log(speciality)
      let sexo = hombre == true ? "M" : (mujer==true ? "F" : "")
      console.log(sexo)
      let higieneString = higiene ? "Higiene y confort," : ""
      let banoString = bañocon ? "Baño con movilidad," : ""
      let banoSinString = bañosin ? "Baño sin movilidad," : ""
      let controlesString = controles ? "Controles (Presión glucosa y temperatura)," : ""
      let curacionesString = curaciones ? "Curaciones," : ""
      let sueroString = suero ? "Cambio de suero," : ""
      let aseoString = aseo ? "Aseo del espacio," : ""
      let alimString = alim ? "Alimentación," : ""
      let asistString = asist ? "Asistencia en traslados," : ""
      let paseosString = paseos ? "Paseos de rutina," : ""
      let acompañamientoString = acompañamiento ? "Acompañamiento en rehabilitación," : ""
      let rcpString = rcp ? "Tecnica RCP," : ""
      let auxString = aux ? "Primeros Auxilios," : ""
      let hemString = hem ? "Maniobra de heimlich," : ""
    let stringServices = higieneString+banoString+banoSinString+controlesString+curacionesString+sueroString+aseoString+alimString+asistString+paseosString+acompañamientoString+rcpString+auxString+hemString
    arrayServices = stringServices.split(",")
    arrayServices.splice(-1)
    console.log(stringServices)
    console.log("este es el array de servicios")
    console.log(arrayServices)
    return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/users', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: Globales.variableGlobalLatitude,
        longitude: Globales.variableGlobalLongitude,
    description: arrayServices,
    specialty: speciality,
    gender: sexo,
    isNurse: enfermero
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
      if (data.carers.length != 0) {
        console.log(data)
        Globales.variableGlobalCuidadores = data.carers
        console.log(Globales.variableGlobalCuidadores)
        onHide()
        onFilter()
      } else if (data.carers.length == 0) {
       Alert.alert("Aviso","No se encontraron cuidadores que cumplan con estas preferencias.")
        console.log("no hay cuidadores");
      }
    })
      .catch((error) => {
        onHide()
       Alert.alert("Aviso","Hubo un error buscando cuidadores. Pruebe mas tarde.")
        console.log("error")
        console.error(error);
      });
    } else {
     Alert.alert("Aviso","Por favor marque su ubicacion en el mapa")
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
        <Text category="h7" mb={15}>
          {t("Tipo de Profesion")}
        </Text>
        <View style={styles.checks}>
          <CheckBox children={"Cuidador"} checked={cuidador && !acompañante && !both} onChange={setCuidadorPosta} />
          <CheckBox children={"Acompañante"} checked={!cuidador && acompañante && !both} onChange={setacompañantePosta} />
          <CheckBox children={"Ambas"} checked={!cuidador && !acompañante && both} onChange={setbothPosta} />
        </View>
        <Text category="h7" mb={15}>
          {t("Genero deseado en un profesional")}
        </Text>
        <View style={styles.checks}>
          <CheckBox children={"Masculino"} checked={hombre && !mujer && !bothSexos} onChange={setHombrePosta} />
          <CheckBox children={"Femenino"} checked={!hombre && mujer && !bothSexos} onChange={setMujerPosta} />
          <CheckBox children={"Indistinto"} checked={!hombre && !mujer && bothSexos} onChange={setbothSexosPosta} />
        </View>
        <Text category="h7" mb={15}>
          {t("¿Es Enfermero?")}
        </Text>
        <View style={styles.checks}>
          <CheckBox children={"Si"} checked={enfermero} onChange={setEnfermero} />
          <CheckBox children={"No"} checked={!enfermero} onChange={setEnfermero} />
        </View>
        <Text category="h7" mb={15}>
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
<Button style={styles.button} onPress = {onSearch} children={t("buttonFilter").toString()}/>
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
    marginBottom: 10,
    marginHorizontal:10
  },
  email: {
    marginBottom: 24,
  },
  checks: {
    marginBottom: 15,
  }
});
