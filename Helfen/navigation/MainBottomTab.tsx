import React, { memo } from "react";
import { View } from "react-native";
import {
  useTheme,
  useStyleSheet,
  Icon,
  StyleService,
} from "@ui-kitten/components";
import { MainBottomTabStackParamList } from "./types";
import Text from "components/Text";
import { globalStyle } from "styles/globalStyle";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MoreSrc from "src/more/MoreSrc";
import useLayout from "hooks/useLayout";
import FindSrc from "src/find/FindSrc";
import ModalRequest from "components/ModalRequest";
import useModal from "hooks/useModal";
import { Images } from "assets/images";
import MessagesSrc from "src/messages/MessagesSrc";
import RequestsBottomNavigator from "./RequestsBottomNavigator";
import CalendarNavigator from "./CalendarNavigator";
import MoreNavigator from "./MoreNavigator";
import Globales from "src/Globales";

interface ButtonTabProps {
  focused: boolean;
  icon: string;
  numberNotification?: number;
  onPress?: void;
}

const BottomTab = createBottomTabNavigator<MainBottomTabStackParamList>();

const MainBottomTab = memo(() => {
  const theme = useTheme();
  const { height, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { modalRef, show, hide } = useModal();

  const ButtonTab = React.useCallback(
    ({ focused, icon, numberNotification }: ButtonTabProps) => {
      React.useEffect(() => {
        if (focused && icon == "bookmark") {
          setTimeout(() => {
            modalRef.current?.show();
          }, 1200);
          clearTimeout();
        } else {
          modalRef.current?.hide();
        }
      }, [focused]);
      return (
        <View
          style={{
            width: 40,
            height: 40,
            ...globalStyle.center,
          }}
        >
          {numberNotification ? (
            focused ? null : (
              <View style={styles.notification}>
                <Text center category="h9" status="primary">
                  {numberNotification}
                </Text>
              </View>
            )
          ) : null}
          <Icon
            pack="assets"
            name={!focused ? icon : `${icon}Active`}
            style={{
              width: 24,
              height: 24,
              tintColor: focused
                ? theme["button-basic-color"]
                : theme["text-placeholder-color"],
            }}
          />
        </View>
      );
    },
    [modalRef]
  );

  if (Globales.variableGlobalTipo == 1) {
    return (
      <View style={styles.container}>
        <BottomTab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarLabelStyle: styles.styleLabel,
            tabBarStyle: [
              styles.tabBarStyle,
              {
                height: (54 + bottom) * (height / 812),
              },
            ],
          }}
        >
          <BottomTab.Screen
            name="Buscar"
            component={FindSrc}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab
                  focused={focused}
                  icon="search"
                  numberNotification={undefined}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Solicitudes"
            component={RequestsBottomNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab
                  focused={focused}
                  icon="bookmark"
                  numberNotification={undefined}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Mas"
            component={MoreNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab focused={focused} icon="more" />
              ),
            }}
          />
        </BottomTab.Navigator>
        {/* Modal request job notification*/}
      </View>
    );
  } else if (Globales.variableGlobalTipo == 2) {
    return (
      <View style={styles.container}>
        <BottomTab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarLabelStyle: styles.styleLabel,
            tabBarStyle: [
              styles.tabBarStyle,
              {
                height: (54 + bottom) * (height / 812),
              },
            ],
          }}
        >
          <BottomTab.Screen
            name="Solicitudes"
            component={RequestsBottomNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab
                  focused={focused}
                  icon="bookmark"
                  numberNotification={undefined}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Calendario"
            component={CalendarNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab
                  focused={focused}
                  icon="calendar"
                  numberNotification={undefined}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Mas"
            component={MoreNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab focused={focused} icon="more" />
              ),
            }}
          />
        </BottomTab.Navigator>
        {/* Modal request job notification*/}
        <ModalRequest
          name={"Marcela Lopez"}
          ref={modalRef}
          avatar={Images.avatar3}
          isOnl={true}
          onDetails={hide}
        />
      </View>
    );
  }
});
export default MainBottomTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -44,
    paddingTop: 12,
  },
  styleLabel: {
    fontFamily: "GothamPro-Medium",
    fontSize: 11,
    lineHeight: 24,
  },
  buttonTab: {
    borderRadius: 12,
    height: 40,
    width: 40,
  },
  notification: {
    position: "absolute",
    borderRadius: 99,
    backgroundColor: "button-basic-color",
    width: 16,
    height: 16,
    zIndex: 10,
    top: 2,
    right: 1,
  },
});
