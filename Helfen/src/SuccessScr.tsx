import React, {memo} from 'react';
import { ScrollView, ScrollViewProps } from "react-native";
import {useRoute} from '@react-navigation/native';
import {ModalScreenNavigationProp} from 'navigation/types';
import NotificationScreen from 'components/NotificationScreen';

const initValue = {
  goBack: true,
  title: 'Oops!',
  description: 'Something went wrong somewhere.\nWould you like to try again?',
  children: [],
  logo: false,
};

const SuccessScr = memo(() => {
  const route = useRoute<ModalScreenNavigationProp>();
  const {title, description, children, buttonsViewStyle, logo} =
    route?.params?.successScr || initValue;

  return (
    <ScrollView>
    <NotificationScreen
      title={title}
      description={description}
      children={children}
      buttonsViewStyle={buttonsViewStyle}
      logo={logo}
    />
    </ScrollView>
  );
});

export default SuccessScr;
