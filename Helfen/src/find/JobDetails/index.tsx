import React, { memo } from "react";
import { RECOMMEND_DATA } from "constants/Data";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Avatar,
  Layout,
  Button,
} from "@ui-kitten/components";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import ModalContact from "components/ModalContact";
import Text from "components/Text";
import Container from "components/Container";
import {
  JobDetailsScreenNavigationProp,
  RootStackParamList,
} from "navigation/types";
import { Images } from "assets/images";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Personal from "./Personal";
import Weekdays from "../components/Weekdays";
import Description from "./Description";
import useModal from "hooks/useModal";
import Globales from "src/Globales";
const JobDetails = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["find", "common"]);
  const route = useRoute<JobDetailsScreenNavigationProp>();
  const { modalRef, show, hide } = useModal();

  let NAME = route.params.name;
  let ID = route.params.rating;
  const items = Globales.variableGlobalCuidadores.filter(item => item.carerId == ID);
  console.log(items)
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });
  const styleCover = useAnimatedStyle(() => {
    const heightAnim = interpolate(
      translationY.value,
      [height / 2, 0],
      [0, height / 2.4 + 120],
      Extrapolate.CLAMP
    );
    return {
      position: "absolute",
      left: 0,
      width: width,
      resizeMode: "cover",
      height: heightAnim,
      top: 0,
    };
  });
  const styleHeader = useAnimatedStyle(() => {
    const input = [0, height * 0.3, height * 0.5, height * 0.6];
    const scale = interpolate(translationY.value, input, [0, 0, 1, 1]);
    const transY = interpolate(
      translationY.value,
      input,
      [1, 0, 0, 0],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translationY.value,
      input,
      [0, 0, 0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
      transform: [{ scale }, { translateY: transY }],
    };
  });

  const _onOption = React.useCallback(() => {}, []);
  const _onApply = React.useCallback(() => {
    //pedir turno
    modalRef.current?.show();
    setTimeout(() => {
      navigate("MainBottomTab");
    }, 1800);
    
  }, []);

  return (
    <Container style={styles.container} useSafeArea={false} level="2">
      {/* <FocusAwareStatusBar barStyle="light-content" /> */}
      {/* <Animated.Image source={Images.cover} style={styleCover} /> */}
      <Flex>
        {/* <TouchableOpacity activeOpacity={0.54} onPress={goBack}>
          <ImageBackground
            source={Images.fill}
            imageStyle={{ tintColor: theme["color-basic-700"] }}
            style={styles.goBack}
          >
            <Icon
              pack="assets"
              name="back"
              style={{ tintColor: theme["text-primary-color"] }}
            />
          </ImageBackground>
        </TouchableOpacity>
        <Animated.View style={styleHeader}>
          <Text status={"basic"} center category="h6" mt={4}>
            {NAME}
          </Text>
        </Animated.View> */}
        {/* <TouchableOpacity activeOpacity={0.54} onPress={_onOption}>
          <ImageBackground
            source={Images.fill}
            imageStyle={{ tintColor: theme["color-basic-700"] }}
            style={styles.goBack}
          >
            <Icon
              pack="assets"
              name="option"
              style={{ tintColor: theme["text-primary-color"] }}
            />
          </ImageBackground>
        </TouchableOpacity> */}
      </Flex>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
        ]}
      >
        <Personal name={NAME+" "+items[0].user.lastName} rating={items[0].qualification} speciality={items[0].specialty} mt={72} mb={32} />
        {/* <Text category="para-m" mb={16}>
          Soy una persona muy capa
        </Text>
        <Flex mr={36} mb={24}>
          <View>
            <Text category="h8" status={"placeholder"} mb={8}>
              {t("common:start")}
            </Text>
            <Text category="h6">Tue, Otc 14</Text>
          </View>
          <View>
            <Text category="h8" status={"placeholder"} mb={8}>
              {t("common:hour")}
            </Text>
            <Text category="h6">08:00 - 12:00</Text>
          </View>
        </Flex>
        <Flex mb={32}>
          <View style={styles.regularly}>
            <Text category="h9" status={"primary"}>
              {t("common:regularly")}
            </Text>
          </View>
          <Weekdays data={DAY_IN_WEEK} size="large" status="primary" />
        </Flex>
        <Flex justify="flex-start" itemsCenter mb={16}>
          <Text category="para-m">Rochester, NY</Text>
          <Layout style={globalStyle.dot} level="5" />
          <Text category="para-m">2 miles</Text>
        </Flex>
        <Image
          source={Images.map}
          style={{
            width: width,
            marginLeft: -24,
            height: 200 * (height / 812),
            marginBottom: 56,
          }}
        /> */}
        <Description
          experience={items[0].experience}
          tagResponsibilities={items[0].services}
          distance={items[0].distance}
          speciality={items[0].speciality}
        />
      </Animated.ScrollView>
      <Layout
        style={[styles.bottom]}
      >
        <Button
          children={t("Contactar").toString()}
          style={styles.apply}
          onPress={_onApply}
        />
      </Layout>
      <ModalContact
        name={NAME}
        ref={modalRef}
        isOnl={true}
        onDetails={hide}
      />
    </Container>
  );
});

export default JobDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  bottom: {
    ...globalStyle.topBorder16,
    paddingBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
    ...globalStyle.shadow,
  },
  apply: {
    alignItems: "center",
  },
  topNav: {
    paddingBottom: 8,
  },
  goBack: {
    ...globalStyle.icon40,
    ...globalStyle.center,
  },
  content: {
    ...globalStyle.topBorder16,
    paddingHorizontal: 24,
    backgroundColor: "background-basic-color-1",
    marginTop: -16,
  },
  avatar: {
    alignSelf: "center",
  },
  regularly: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "color-primary-300",
    borderRadius: 8,
  },
});
const DAY_IN_WEEK = [
  {
    title: "Domingo",
    isActive: false,
  },
  {
    title: "Lunes",
    isActive: false,
  },
  {
    title: "Martes",
    isActive: true,
  },
  {
    title: "Miercoles",
    isActive: true,
  },
  {
    title: "Jueves",
    isActive: true,
  },
  {
    title: "Viernes",
    isActive: false,
  },
  {
    title: "Sabado",
    isActive: false,
  },
];
const TAG_QUALIFICATIONS = [
  "Has a car",
  "Comfortable with pets",
  "Will provide sick care",
  "None Smoking",
  "College educated",
  "Background Check",
];
const TAG_RESPONSIBILITIES = [
  "Driving the kids",
  "Prepares food",
  "Sleep training",
  "Potty Training",
  "Will provide sick care",
];
