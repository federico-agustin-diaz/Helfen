import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import { Images } from "assets/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import { RuleEmail, RulePassword } from "utils/rules";
import useToggle from "hooks/useToggle";
import Flex from "components/Flex";
import { RootStackParamList } from "navigation/types";
import useAuth from "hooks/useAuth";
import Globales from "src/Globales";
import { globalStyle } from "styles/globalStyle";

const Login = memo(() => {
  const { navigate, dispatch } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth", "common"]);

  const { signIn } = useAuth();
  const nextScreen = React.useCallback((screenName: string) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
        },
      ],
    });
    dispatch(resetAction);
  }, []);

  const onLogin = () => {
    return fetch('https://seahorse-app-vm8c4.ondigitalocean.app/helfenapi-back2/login', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mail: username,
        password: password
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
      if (data.user != true) {
        console.log(data)
        //chequear si es cuidador o no. 1 es Familiar 2 Cuidador
        Globales.set_variableGlobalTipo(data.user.user.userType)
        Globales.set_variableGlobalPrimerNombre(data.user.user.name)
        Globales.set_variableGlobalApellido(data.user.user.lastName)
        Globales.set_variableGlobalEmail(data.user.user.mail)
        console.log(Globales.variableGlobalTipo);
        console.log(Globales.variableGlobalApellido);
        console.log("se logueo");
        nextScreen("MainBottomTab");
      } else if (data.login != true) {
        console.log("no existe el usuario");
      }
    })
      .catch((error) => {
        console.log("error")
        console.error(error);
      });
  };
  
  const [invisible, setInvisible] = useToggle(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "feded.94@gmail.com",
      password: "Fede123",
    },
  });
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [canContinue, setCanContinue] = React.useState(false);
  React.useEffect(() => {
    if (errors.email === undefined && errors.password === undefined) {
      setCanContinue(false);
    } else {
      setCanContinue(true);
    }
  }, [errors.email, errors.password]);

  const onFacebook = React.useCallback(() => {}, []);
  const onTwitter = React.useCallback(() => {}, []);
  const onSignup = React.useCallback(
    () => navigate("AuthStack", { screen: "Signup" }),
    []
  );
  const onForgetPassword = React.useCallback(
    () => navigate("AuthStack", { screen: "ForgetPassword" }),
    []
  );
  return (
    <Container style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <Image source={Images.logo} />
        <Text mt={24} category="h7" mb={72}>
          {t("welcomeBack")}
        </Text>
        <Controller
          control={control}
          name="email"
          rules={RuleEmail}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("email").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              onChangeText={(value) => setUsername(value)}
              value={username}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
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
        <TouchableOpacity
          activeOpacity={0.54}
          onPress={onForgetPassword}
          style={styles.forgetPass}
        >
          <Text category="h8-s" status={"placeholder"} mv={24} center>
            {t("forgetPassword")}?
          </Text>
        </TouchableOpacity>
        <Button
          onPress={onLogin}
          disabled={canContinue}
          style={globalStyle.shadowBtn}
        >
          {t("login").toString()}
        </Button>
      </KeyboardAwareScrollView>
      <Flex center mb={bottom + 16} style={styles.bottom}>
        <Text category="h8-s">{t("dontHaveAcc")}</Text>
        <TouchableOpacity activeOpacity={0.54} onPress={onSignup}>
          <Text status={"link"} category="h8-s">
            {t("signup")}
          </Text>
        </TouchableOpacity>
      </Flex>
    </Container>
  );
});

export default Login;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    marginTop: 40,
    paddingHorizontal: 24,
    zIndex: 10,
  },
  email: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  password: {
    borderBottomWidth: 2,
  },
  facebook: {
    marginBottom: 16,
    flex: 1,
  },
  logoSocial: {
    position: "absolute",
    left: 16,
    top: 14,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
  },
  forgetPass: {
    alignSelf: "center",
  },
});
