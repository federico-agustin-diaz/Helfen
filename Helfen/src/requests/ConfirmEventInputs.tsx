import React, { memo } from "react";
import { View, FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
  Input,
  Datepicker,
  Icon,
  CheckBox,
  Button
} from "@ui-kitten/components";
import { Controller, useForm } from "react-hook-form";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Text from "components/Text";
import DateTimePicker from '@react-native-community/datetimepicker';
import Flex from "components/Flex";
import useLayout from "hooks/useLayout";
import Container from "components/Container";
import { globalStyle } from "styles/globalStyle";
import keyExtractor from "utils/keyExtractor";
import { RequestsStackParamList, ConfirmEventInputsNavigationProp } from "navigation/types";
import InterviewTab from "./Interview/InterviewTab";
import InterviewTabConfirmed from "./Interview/InterviewTabConfirmed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import dayjs from "dayjs";

import BookingsTab from "./Bookings/BookingsTab";
import ApplicationsTab from "./Applications/ApplicationsTab";
import Globales from "src/Globales";

const ConfirmEventInputs = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RequestsStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["requests", "common"]);
  const [fechaInicio, setFechaInicio] = React.useState(new Date());
  const [fechaFin, setFechaFin] = React.useState(new Date());
  const { goBack } = useNavigation();
  const [notas, setNotas] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
//   const [horarioInicio, setHorarioInicio] = React.useState(new Date());
//   const [horarioFin, setHorarioFin] = React.useState(new Date());
const [horarioInicio, setHorarioInicio] = React.useState("");
const [horarioFin, setHorarioFin] = React.useState("");
const { bottom } = useLayout();
   const [lunes, setLunes] = React.useState(false);
   const route = useRoute<ConfirmEventInputsNavigationProp>();
   const carerId = route.params.id;
   const [martes, setMartes] = React.useState(false);
   const [miercoles, setMiercoles] = React.useState(false);
   const [jueves, setJueves] = React.useState(false);
   const [viernes, setViernes] = React.useState(false);
   const [sabado, setSabado] = React.useState(false);
   const [domingo, setDomingo] = React.useState(false);
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

  // const handleCreateRelationAndEvent = () => {
  //   console.log("entro al handle create relation and evnet")
  //   console.log(carerId)
  // return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/relation', {
  //   method: 'PUT',
  //   headers: {
  //     'Accept': '*/*',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     "carer": carerId,
  //     "familiar": Globales.variableGlobalId,
  //     "relationConfirmated": false,
  //     "resume": ""
  //   })
  // })
  // .then((response) =>  response.json())
  // .then((data) => {
  //   if (data.message == "404 Not Found Error. The relation not exist.") {
  //    Alert.alert("Aviso","Ha habido un error, la relacion no existe")
  //   }

  //   // console.log(data);
  //   // setTimeout(() => {
  //     return createEvento()
  //   // }, 2000);
  //   // clearTimeout();
    

  // })
  //   .catch((error) => {
      
  //    Alert.alert("Aviso","Ha habido un error al confirmar contacto.")
  //     console.log("error")
  //     console.error(error);
  //   });
  // }

  const createEvento = () => {
    var arrayDias = new Array()
    lunes ? arrayDias.push(1) : console.log("sarasa")
    martes ? arrayDias.push(2) : console.log("sarasa")
    miercoles ? arrayDias.push(3) : console.log("sarasa")
    jueves ? arrayDias.push(4) : console.log("sarasa")
    viernes ? arrayDias.push(5) : console.log("sarasa")
    sabado ? arrayDias.push(6) : console.log("sarasa")
    domingo ? arrayDias.push(0) : console.log("sarasa")
    console.log(Globales.variableGlobalId)
    console.log("linea 119")
    console.log(arrayDias)
    return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/event', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "familiar": Globales.variableGlobalId,
    "carer": carerId,
    "day": arrayDias,
    "date": (`${fechaInicio.getFullYear()}-${fechaInicio.getMonth() + 1}-${fechaInicio.getDate()}`).toString(),
    "startEvent": horarioInicio,
    "endEvent": horarioFin,
    "localAddress": direccion,
    "expirationDate": (`${fechaFin.getFullYear()}-${fechaFin.getMonth() + 1}-${fechaFin.getDate()}`).toString(),
    "notes": notas
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
      if (data.event =! null) {
       Alert.alert("Aviso","Se ha enviado el Evento al Profesional. Se aguarda su confirmacion")
        goBack();
      } else {
       Alert.alert("Aviso","Ha habido un error al confirmar contacto.")
      }
    })
      .catch((error) => {
       Alert.alert("Aviso","Ha habido un error al confirmar contacto.")
        console.log("error")
        console.error(error);
      });
}

  return (
        <Container style={styles.container}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
          <Text category="h2" mb={8}>
            {t("Completa los datos del Evento")}
          </Text>
          <Datepicker
          label={`Fecha Inicio Evento`}
          /* @ts-ignore */
          placeholder={null}
          style={styles.birthday}
          min={new Date()}
          max={new Date(2040, 12, 12)}
          onSelect={(nextDate) => {
            setFechaInicio(nextDate);
          }}
          filter={() => true}
          accessoryLeft={(props) => (
            <Flex>
              <Icon pack="assets" name="calendar" {...props} />
              <Text center category="h7" ml={12}>
                {dayjs(fechaInicio).format("MMM DD, YYYY")}
              </Text>
            </Flex>
          )}
        />
        <Text category="h7-s" mb={24}>
          {t("Dias de la Actividad")}
        </Text>
        <CheckBox children={"Lunes"} checked={lunes} onChange={setLunes} />
        <CheckBox children={"Martes"} checked={martes} onChange={setMartes} />
        <CheckBox children={"Miercoles"} checked={miercoles} onChange={setMiercoles} />
        <CheckBox children={"Jueves"} checked={jueves} onChange={setJueves} />
        <CheckBox children={"Viernes"} checked={viernes} onChange={setViernes} />
        <CheckBox children={"Sabado"} checked={sabado} onChange={setSabado} />
        <CheckBox children={"Domingo"} checked={domingo} onChange={setDomingo} style={styles.birthday} />
        <Controller
          control={control}
          name="Horario Inicio"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Horario Inicio (Hora:Minutos)").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              keyboardType="numbers-and-punctuation"
              onChangeText={(value) => setHorarioInicio(value)}
              value={horarioInicio}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="Horario Fin (Hora:Minutos)"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Horario Fin").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              onChangeText={(value) => setHorarioFin(value)}
              keyboardType="numbers-and-punctuation"
              value={horarioFin}
              onBlur={onBlur}
            />
          )}
        />
        <Datepicker
          label={`Fecha Fin Evento`}
          /* @ts-ignore */
          placeholder={null}
          style={styles.birthday}
          min={new Date()}
          max={new Date(2040, 12, 12)}
          onSelect={(nextDate) => {
            setFechaFin(nextDate);
          }}
          filter={() => true}
          accessoryLeft={(props) => (
            <Flex>
              <Icon pack="assets" name="calendar" {...props} />
              <Text center category="h7" ml={12}>
                {dayjs(fechaFin).format("MMM DD, YYYY")}
              </Text>
            </Flex>
          )}
        />
        <Controller
          control={control}
          name="Direccion"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Direccion").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              onChangeText={(value) => setDireccion(value)}
              value={direccion}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="Notas"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Notas de la Actividad").toString()}
              onChangeText={(value) => setNotas(value)}
              value={notas}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              multiline
              style={styles.inputExperienciaLaboral}
              keyboardType="email-address"
            />
          )}
        />
        <Button
          children= {`${t("Enviar informacion de la Actividad").toString()}`}
          style={globalStyle.shadowBtn}
          onPress={createEvento}
        />
          </KeyboardAwareScrollView>
        
        </Container>
      );
});

export default ConfirmEventInputs;

const themedStyles = StyleService.create({
    inputExperienciaLaboral: {
        minHeight: 50,
      },
    container: {
      flex: 1,
      marginLeft: 16,
      marginTop:20,
      marginRight:16
    },
    birthday: {
      marginBottom: 24,
    },
    email: {
      borderBottomWidth: 2,
      marginBottom: 24,
    },
    password: {
      borderBottomWidth: 2,
      marginBottom: 24,
    },
    consider: {
      borderBottomWidth: 2,
      marginBottom: 24,
      borderColor: "background-basic-color-3",
    },
    facebook: {
      backgroundColor: "color-facebook-100",
      flex: 1,
      marginRight: 16,
      borderColor: "transparent",
    },
    twitter: {
      backgroundColor: "color-twitter-100",
      borderColor: "transparent",
      flex: 1,
    },
    mapView: {
      zIndex: -10,
    },
    bottom: {
      position: "absolute",
      bottom: 0,
    },
  });
