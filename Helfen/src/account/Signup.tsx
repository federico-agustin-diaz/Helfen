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
  const onSignup = React.useCallback(() => {
    navigate("IntroduceYourself");
  }, []);
  const onFacebook = React.useCallback(() => {}, []);
  const onTwitter = React.useCallback(() => {}, []);
    const [birthday, setBirthday] = React.useState(new Date());
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
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
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
              value={value}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
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
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="segundoNombre"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Segundo Nombre").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
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
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
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
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
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
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
            />
          )}
        />
        <Select
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          placeholder="Select one"
          style={styles.consider}
          label={`${t("considerMyself")}`}
        >
          <SelectItem title="Profesional" />
          <SelectItem title="Familiar" />
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
