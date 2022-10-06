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
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";
import {
  IntroduceYourselfNavigationProp
} from "navigation/types";
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
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

interface PersonalProps {
  userType: number,
  name: string,
  lastName: string,
  dateOfBirth: string,
  dniNumber: string,
  localAddress: string,
  postalCode: string,
  province: string,
  mail: string,
  phoneNumber: string,
  password: string,
  latitude: string,
  longitude: string,
  gender: string
}

const IntroduceYourself = memo(
  ({})  => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<IntroduceYourselfNavigationProp>();
  var form1 = new FormData();
  const form2 = new FormData();
  let userType = route.params.userType;
  let name = route.params.name;
  let lastName = route.params.lastName;
  let dateOfBirth = route.params.dateOfBirth;
  let dniNumber = route.params.dniNumber;
  let localAddress = route.params.localAddress;
  let province = route.params.province;
  let mail = route.params.mail;
  let phoneNumber = route.params.phoneNumber;
  let password = route.params.password;
  let latitude = route.params.latitude;
  let longitude = route.params.longitude;
  let gender = route.params.gender;
  let postalCode = route.params.postalCode;
  const { t } = useTranslation(["auth", "common"]);
  const handleVerify = React.useCallback(() => {
    navigate("SuccessScr", {
      successScr: {
        title: "Solo queda un paso mas!",
        description: t("A continuacion, requerimos que adjunte fotos del frente y dorso de su DNI"),
        children: [
          {
            title: t("Adjuntar Foto Frente"),
            onPress: () => selectFileDNI1(),
            status: "outline",
          },
          {
            title: t("Adjuntar Foto Detras"),
            onPress: () => selectFileDNI2(),
            status: "outline",
          },
          {
            title: t("Continuar"),
            onPress: () => onSubirFotelli(),
            status: "outline",
          },
        ],
        buttonsViewStyle: { marginHorizontal: 68 },
      },
    });
  }, []);

  const handleVerifyCompleto = React.useCallback(() => {
    navigate("SuccessScr", {
      successScr: {
        title: t("Felicitaciones, se ha Registrado con Exito"),
        children: [
          {
            title: t("Continuar"),
            onPress: () => navigate('AuthStack', {screen: 'Login'}),
            status: "outline",
          }
        ],
        buttonsViewStyle: { marginHorizontal: 68 },
      },
    });
  }, []);

  const onSubirFotelli = () => {
    console.log("entrosubirFotelli")
    console.log(form1)
      return fetch('https://seahorse-app-vm8c4.ondigitalocean.app/helfenapi-back2/saveimage', {
      method: 'POST',
      body: form1
    })
    .then((response) =>  {
      console.log(response.status)
      console.log("entrosubirFotelli2")
      if (response.status == 200) {
      var url = 'https://seahorse-app-vm8c4.ondigitalocean.app/helfenapi-back2/user/checkid/' + dniNumber
      console.log(url)
      return fetch(url, {
      method: 'GET',
    })
    .then((response) =>  console.log(response))
    .then((data) => {
      console.log(data);
    })
      .catch((error) => {
        console.log("error")
        console.error(error);
      });
    }
    else {
      console.log("Por favor realiza las fotos de nuevo")
      alert("Por favor realiza las fotos de nuevo");
      form1 = new FormData();
    }
  })
    
      .catch((error) => {
        console.log("error")
        console.error(error.response);
        console.error(error);
      });
  };

  const selectFileDNI1 = () => {
    console.log("entro foto")
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        console.log(response.assets[0].uri);
        // form1.append("file", response.assets[0].uri);
        // form1.append("fileName", "DNI-1");
        form1.append("file", {
         name: dniNumber + "-1.jpg", // Whatever your filename is
          uri: response.assets[0].uri, //  file:///data/user/0/com.cookingrn/cache/rn_image_picker_lib_temp_5f6898ee-a8d4-48c9-b265-142efb11ec3f.jpg
          type: response.assets[0].type, // video/mp4 for videos..or image/png etc...
        }); 
        console.log(form1);
      }
    });
  }

  const selectFileDNI2 = () => {
    console.log("entro foto")
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        console.log(response.assets[0].uri);
        form1.append("file1", {
         name: dniNumber + "-2.jpg", // Whatever your filename is
          uri: response.assets[0].uri, //  file:///data/user/0/com.cookingrn/cache/rn_image_picker_lib_temp_5f6898ee-a8d4-48c9-b265-142efb11ec3f.jpg
          type: response.assets[0].type, // video/mp4 for videos..or image/png etc...
        }); 
        console.log(form1);
      }
    });
  }
  
  const onSignup = () => {
    let speciality = cuidador==true ? "Cuidador" : (acompañante==true ? "Acompañante" : "Ambos")
    console.log(speciality)
    let higieneString = higiene ? "Higiene y confort, " : ""
    let banoString = bañocon ? "Baño con movilidad, " : ""
    let banoSinString = bañosin ? "Baño sin movilidad, " : ""
    let controlesString = controles ? "Controles (Presión, glucosa, temperatura)" : ""
    let curacionesString = curaciones ? "Curaciones, " : ""
    let sueroString = bañocon ? "Cambio de suero, " : ""
    let aseoString = bañosin ? "Aseo del espacio, " : ""
    let alimString = alim ? "Alimentación, " : ""
    let asistString = asist ? "Asistencia en traslados" : ""
    let paseosString = paseos ? "Paseos de rutina, " : ""
    let acompañamientoString = acompañamiento ? "Acompañamiento en rehabilitación, " : ""
    let rcpString = rcp ? "Primeros Auxilios, " : ""
    let hemString = hem ? "Maniobra de heimlich" : ""
    let arrayServices = higieneString+banoString+banoSinString+controlesString+curacionesString+sueroString+aseoString+alimString+asistString+paseosString+acompañamientoString+rcpString+hemString
      console.log(arrayServices)
    return fetch('https://seahorse-app-vm8c4.ondigitalocean.app/helfenapi-back2/user', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userType: userType,
        name: name,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        dniNumber: dniNumber,
        localAddress: localAddress,
        postalCode: postalCode,
        province: province,
        mail: mail,
        phoneNumber: phoneNumber,
        password: password,
        latitude: "1",
        longitude: "1",
        gender: gender,
        specialty: speciality,
        isNurse: enfermero,
        price: 200,
        //experience: experience
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log("llego aca");
      console.log(userType);
      console.log(data);
      if (data.user != true) {
        console.log(data)
        console.log("termino la parte de registro");
        return fetch('https://seahorse-app-vm8c4.ondigitalocean.app/helfenapi-back2/service', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        carer: data.user.id,
        description: arrayServices
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
      if (data.user != true) {
        console.log(data)
        console.log("se registro con los services");
        handleVerify();
      } else if (data.login != true) {
        console.log("error");
      }
    })
      .catch((error) => {
        console.log("error")
        console.error(error);
      });
        handleVerify();
      } else if (data.login != true) {
        console.log("error");
      }
    })
      .catch((error) => {
        console.log("error")
        console.error(error);
      });
    };
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

  const [experience, setExperience] = React.useState("")
  const [male, female, setMale, setFemale] = React.useState(false);
  const [cuidador, setcuidador] = useToggle(false);
  const [acompañante, setacompañante] = useToggle(false);
  const [both, setboth] =useToggle(false);
  const [higiene, sethigiene] = useToggle(false);
  const [enfermero, setEnfermero] = useToggle(false);
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
              onChangeText={(value) => setExperience(value)}
              value={experience}
              //
              //onTouchStart={handleSubmit(() => {})}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.fullName?.message}
            />
          )}
        />
        {/* <Text category="h7" mb={24}>
          {t("Genero al que se dedica")}
        </Text>
        <Flex mb={32}>
          <CheckBox children={"Masculino"} checked={male && !female} onChange={setMale} />
          <CheckBox children={"Femenino"} checked={!male && female} onChange={setFemale} />
          <CheckBox children={"Ambos"} checked={male && female} onChange={setMale && setFemale} />
        </Flex> */}
        <Text category="h7" mb={24}>
          {t("A que te dedicas")}
        </Text>
        <Flex mb={32}>
          <CheckBox children={"Cuidador"} checked={cuidador && !acompañante && !both} onChange={setcuidador} />
          <CheckBox children={"Acompañante"} checked={!cuidador && acompañante && !both} onChange={setacompañante} />
          <CheckBox children={"Ambas"} checked={!cuidador && !acompañante && both} onChange={setboth} />
        </Flex>
        <Text category="h7" mb={24}>
          {t("Soy Enfermero")}
        </Text>
        <Flex mb={32}>
          <CheckBox children={"Si"} checked={enfermero} onChange={setEnfermero} />
          <CheckBox children={"No"} checked={!enfermero} onChange={setEnfermero} />
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
