import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  CheckBox,
  Icon,
  Datepicker,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Container from "components/Container";
import SignupHeader from "./components/StepTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import Flex from "components/Flex";
import NavigationAction from "components/NavigationAction";
import dayjs from "dayjs";
import { globalStyle } from "styles/globalStyle";
import { AuthStackParamList } from "navigation/types";
import useToggle from "hooks/useToggle";

const IntroduceYourself = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth", "common"]);
  const handleVerify = React.useCallback(() => {
    navigate("SuccessScr", {
      successScr: {
        title: t("Bienvenido a Helfen!"),
        children: [
          {
            title: t("Continuar"),
            onPress: () => navigate("MainBottomTab"),
            status: "outline",
          },
        ],
        buttonsViewStyle: { marginHorizontal: 68 },
      },
    });
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      homeAddress: "",
      phoneNumber: "",
    },
  });
  const [male, female, setMale, setFemale] = React.useState(false);
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
  const [birthday, setBirthday] = React.useState(new Date());
  const onChange = React.useCallback((next) => {
    setMale(next);
  }, []);
  const onVerify = React.useCallback(() => {
    navigate("Verification");
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
      <Text category="h2" mb={8}>
        {t("introduceYourself")}
      </Text>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Experiencia laboral").toString()}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.fullName?.message}
            />
          )}
        />
        <Text category="h7" mb={24}>
          {t("Genero al que se dedica")}
        </Text>
        <Flex mb={32}>
          <CheckBox children={"Masculino"} checked={male & !female} onChange={onChange} />
          <CheckBox children={"Femenino"} checked={!male & female} onChange={onChange} />
          <CheckBox children={"Ambos"} checked={male & female} onChange={onChange} />
        </Flex>
        <Text category="h7" mb={24}>
          {t("A que te dedicas")}
        </Text>
        <Flex mb={32}>
          <CheckBox children={"Cuidador"} checked={male & !female} onChange={onChange} />
          <CheckBox children={"Acompañante"} checked={!male & female} onChange={onChange} />
          <CheckBox children={"Ambas"} checked={!male & female} onChange={onChange} />
        </Flex>
        <Text category="h7" mb={24}>
          {t("Soy Enfermero")}
        </Text>
        <Flex mb={32}>
          <CheckBox children={"Si"} checked={male} onChange={onChange} />
          <CheckBox children={"No"} checked={!male} onChange={onChange} />
        </Flex>
        <Controller
          control={control}
          name="homeAddress"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Rango Edad al que se dedica (separar con -)").toString()}
              style={styles.homeAddress}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="numeric"
            />
          )}
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

      </KeyboardAwareScrollView>
      <View style={[styles.bottom, { bottom: 8 + bottom }]}>
        <Button
          children={t("Terminar Registro").toString()}
          style={globalStyle.shadowBtn}
          onPress={handleVerify}
        />
      </View>
    </Container>
  );
});

export default IntroduceYourself;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  fullName: {
    borderBottomWidth: 2,
    marginBottom: 32,
  },
  homeAddress: {
    borderBottomWidth: 2,
  },
  iconMap: {
    tintColor: "color-primary-100",
  },
  phoneNumber: {
    borderBottomWidth: 2,
  },
  birthday: {},
  bottom: {
    paddingHorizontal: 24,
  },
});
