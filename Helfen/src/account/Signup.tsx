import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  IndexPath,
  Select,
  SelectItem,
  Button,
  Datepicker,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Flex from "components/Flex";
import { AuthStackParamList } from "navigation/types";
import useToggle from "hooks/useToggle";
import { Controller, useForm } from "react-hook-form";
import { RuleEmail, RulePassword } from "utils/rules";
import { globalStyle } from "styles/globalStyle";

const Signup = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth", "common"]);

  const [invisible, setInvisible] = useToggle(true);
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >();
  const [selectedIndexGenero, setSelectedIndexGenero] = React.useState<
  IndexPath | IndexPath[]
>();

const handleVerify = React.useCallback(() => {
  navigate("SuccessScr", {
    successScr: {
      title: t("Se ha Registrado con Exito! Continua para Iniciar Sesion"),
      children: [
        {
          title: t("Continuar"),
          onPress: () => navigate('AuthStack', {screen: 'Login'}),
          status: "outline",
        },
      ],
      buttonsViewStyle: { marginHorizontal: 68 },
    },
  });
}, []);

const handleVerifyCuidador = React.useCallback(() => {
    navigate('IntroduceYourself',
      {
        userType: selectedIndex.row+1,
        name: primerNombre,
        lastName: segundoNombre,
        dateOfBirth:  (`${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`).toString(),
        dniNumber: dni.toString(),
        localAddress: direccion,
        postalCode: postal,
        province: province,
        mail: email,
        phoneNumber: tel.toString(),
        password: password,
        latitude: "1",
        longitude: "1",
        gender: DATA_SELECT_Generos[selectedIndexGenero - 1]
      })
});

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

  const onLogin = React.useCallback(() => navigate("Login"), []);
  const onSignup = () => {
    if ((DATA_SELECT_1[selectedIndex - 1]) == "Cuidador") {
      console.log(selectedIndex.row)
      handleVerifyCuidador();
    } else if ((DATA_SELECT_1[selectedIndex - 1]) == "Familiar") {
      console.log(DATA_SELECT_1[selectedIndex - 1])
    let birthdayString= `${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`
      console.log(birthdayString)
      console.log(selectedIndex.row+1)
      return fetch('https://seahorse-app-vm8c4.ondigitalocean.app/helfenapi-back2/user', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userType: selectedIndex.row+1,
        name: primerNombre,
        lastName: segundoNombre,
        dateOfBirth: birthdayString,
        dniNumber: dni.toString(),
        localAddress: direccion,
        postalCode: postal,
        province: province,
        mail: email,
        phoneNumber: tel.toString(),
        password: password,
        latitude: "1",
        longitude: "1",
        gender: DATA_SELECT_Generos[selectedIndexGenero - 1]
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
      if (data.user != true) {
        console.log(data)
        console.log("se registro");
        handleVerify();
      } else if (data.login != true) {
        console.log("error");
      }
    })
      .catch((error) => {
        console.log("error")
        console.error(error);
      });
    }
  };
  const onFacebook = React.useCallback(() => {}, []);
  const onTwitter = React.useCallback(() => {}, []);
  const [birthday, setBirthday] = React.useState(new Date());
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [primerNombre, setPrimerNombre] = React.useState("");
  const [segundoNombre, setSegundoNombre] = React.useState("");
  const [dni, setDni] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [postal, setPostal] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [gender, setGender] = React.useState("");
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <Content padder>
        <Text category="h2" mb={8}>
          {t("titleSignup")}
        </Text>
        <Flex justify="flex-start" mb={48}>
          <Text category="para-m" mb={8}>
            {t("alreadyHaveAcc")}
          </Text>
          <Text
            category="para-m"
            status="link"
            children={` ${t("login")}`}
            onPress={onLogin}
          />
        </Flex>
        <Controller
          control={control}
          name="Email"
          rules={RuleEmail}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("email").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              onChangeText={(value) => setEmail(value)}
              value={email}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="Password"
          rules={RulePassword}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("password").toString()}
              status={errors.password ? "warning" : "basic"}
              style={styles.password}
              onChangeText={(value) => setPassword(value)}
              value={password}
              onBlur={onBlur}
              caption={errors.password?.message}
              secureTextEntry={invisible}
              accessoryRight={(props) => (
                <TouchableOpacity activeOpacity={0.7} onPress={setInvisible}>
                  <Icon
                    {...props}
                    pack="assets"
                    name={!invisible ? "eyeOn" : "eyeOff"}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="primerNombre"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Primer Nombre").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              onChangeText={(value) => setPrimerNombre(value)}
              value={primerNombre}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="segundoNombre"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Apellido").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              onChangeText={(value) => setSegundoNombre(value)}
              value={segundoNombre}
              onBlur={onBlur}
            />
          )}
        />
        <Datepicker
          label={`Fecha Nacimiento`}
          /* @ts-ignore */
          placeholder={null}
          style={styles.birthday}
          min={new Date(1900, 0, 0)}
          max={new Date()}
          onSelect={(nextDate) => {
            setBirthday(nextDate);
          }}
          filter={() => true}
          accessoryLeft={(props) => (
            <Flex>
              <Icon pack="assets" name="calendar" {...props} />
              <Text center category="h7" ml={12}>
                {dayjs(birthday).format("MMM DD, YYYY")}
              </Text>
            </Flex>
          )}
        />
        <Controller
          control={control}
          name="dni"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Numero DNI").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              onChangeText={(value) => setDni(value)}
              value={dni}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="direccion"
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
          name="postal"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Codigo Postal").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              onChangeText={(value) => setPostal(value)}
              value={postal}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="province"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Provincia").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              onChangeText={(value) => setProvince(value)}
              value={province}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="numtelefono"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Numero Telefono").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              onChangeText={(value) => setTel(value)}
              value={tel}
              onBlur={onBlur}
            />
          )}
        />
        <Select
          selectedIndex={selectedIndexGenero}
          onSelect={(index) => setSelectedIndexGenero(index)}
          placeholder="Seleccione"
          style={styles.consider}
          label={`${t("Genero")}`}
          /* @ts-ignore */
          value={DATA_SELECT_Generos[selectedIndexGenero - 1]}
        >
          {DATA_SELECT_Generos.map((item, i) => {
            return <SelectItem title={item} key={i} />;
          })}
        </Select>
        <Select
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          placeholder="Seleccione"
          style={styles.consider}
          label={`${t("considerMyself")}`}
          /* @ts-ignore */
          value={DATA_SELECT_1[selectedIndex - 1]}
        >
          {DATA_SELECT_1.map((item, i) => {
            return <SelectItem title={item} key={i} />;
          })}
        </Select>
        <Button
          children={t("Continuar").toString()}
          onPress={onSignup}
          style={globalStyle.shadowBtn}
        />
      </Content>
    </Container>
  );
});

export default Signup;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
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
});
const DATA_SELECT_1 = ["Familiar", "Cuidador"];
const DATA_SELECT_Generos = ["M", "F"];
