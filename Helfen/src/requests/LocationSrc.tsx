import React, { memo, useEffect } from "react";
import { View, FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Text from "components/Text";
import Container from "components/Container";
import { globalStyle } from "styles/globalStyle";
import keyExtractor from "utils/keyExtractor";
import { RequestsStackParamList } from "navigation/types";
import ContactosParaUbicar from "./Interview/ContactosParaUbicar";


const LocationSrc = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RequestsStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["requests", "common"]);

  const shouldLoadComponent = (index: number) => index === activeIndex;
  const [activeIndex, setActiveIndex] = React.useState(0);

  const ListFooterComponent = React.useCallback(() => {
    return (
      <View style={styles.footer}>

<Text category="h5" status={"basic"} center mt={16} >
Presione en el profesional para visualizar su ubicacion.
            </Text>
        <ViewPager
          selectedIndex={activeIndex}
          onSelect={setActiveIndex}
          style={[globalStyle.flexOne]}
          swipeEnabled={false}
          shouldLoadComponent={shouldLoadComponent}
        >
          <ContactosParaUbicar
          />
        </ViewPager>
      </View>
    );
  }, [activeIndex]);

  return (
    <Container style={styles.container}>
      <TopNavigation title={t("Ubicacion").toString()} />
      <FlatList
        renderItem={() => <></>}
        stickyHeaderIndices={[0]}
        keyExtractor={keyExtractor}
        data={[0]}
        contentContainerStyle={styles.content}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
});

export default LocationSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {},
  tabBar: {
    marginTop: 12,
    paddingHorizontal: 12,
  },
  footer: {
    marginHorizontal: 24,
    paddingBottom: 40,
  },
});
