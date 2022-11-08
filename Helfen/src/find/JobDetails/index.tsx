import React, { memo, useEffect } from "react";
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
  const [comments, setComments] = React.useState([]);
  const [seSetearonLosPendientes, setSeSetearonLosPendientes] = React.useState(true);

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

  const onPedirValoraciones = React.useCallback(() => {
    return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/reviews/' + items[0].carerId, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
      if (data.reviews != null) {
        var listaReviews = data.reviews.map(item => item.comment)
        console.log("esta es la lista de reviews")
        console.log(listaReviews)
        setComments(listaReviews)
      } else {
        //alert("Ya estaba creada la relacion.")
      }
    })
      .catch((error) => {
        alert("Hubo un error al crear la relacion.")
        console.log("error")
        console.error(error);
      });
  }, []);

  const _onApply = React.useCallback(() => {
    console.log(items[0].carerId)
    console.log(Globales.variableGlobalId)
    //pedir turno
    return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/contact', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        carer: items[0].carerId,
        familiar: Globales.variableGlobalId
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
      if (data.possibleContacts != null) {
        console.log(data)
        modalRef.current?.show();
       setTimeout(() => {
        navigate("MainBottomTab");
    }, 1800);
      } else {
        alert("Ya estaba creada la relacion.")
      }
    })
      .catch((error) => {
        alert("Hubo un error al crear la relacion.")
        console.log("error")
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (seSetearonLosPendientes) {
      onPedirValoraciones()
      setSeSetearonLosPendientes(false)
    }
  }, []);

  return (
    <Container style={styles.container} useSafeArea={false} level="2">
      <Flex>
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
        <Description
          experience={items[0].experience}
          tagResponsibilities={items[0].services}
          distance={items[0].distance}
          speciality={items[0].speciality}
          comments={comments}
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
