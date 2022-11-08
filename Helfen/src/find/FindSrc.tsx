import React, {memo} from 'react';
import {FlatList} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  ViewPager,
  Modal,
  Layout
} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';
import {useTranslation} from 'react-i18next';
import Text from 'components/Text';
import Container from 'components/Container';
import NavigationAction from 'components/NavigationAction';
import BasicTabBar from '../../components/BasicTabBar';
import Recommended from './Recommended';
import keyExtractor from 'utils/keyExtractor';
import useModal from 'hooks/useModal';
import FilterRecommend from './FilterRecommend';
import {RootStackParamList} from 'navigation/types';
import ButtonFill from 'components/ButtonFill';
import {globalStyle} from 'styles/globalStyle';
import Geolocation from '@react-native-community/geolocation';
import Globales from 'src/Globales';

const FindSrc = memo(() => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const {height, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['find', 'common']);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const [isSeteo, setSeteo] = React.useState(0);

  const toggleModal = () => {
    console.log("Le pego al toggleModal")
    console.log(!isModalVisible)
    setModalVisible(!isModalVisible);
    setSeteo(2)
  };

  const toggleSeteo = () => {
    setSeteo(3)
  };

  const [activeIndex, setActiveIndex] = React.useState(0);
  const {modalRef, show, hide} = useModal();
  const ListFooterComponent = React.useCallback(() => {
    return (
      <ViewPager
        selectedIndex={activeIndex}
        onSelect={index => setActiveIndex(index)}
        swipeEnabled={false}>
        <Recommended />
      </ViewPager>
    );
  }, [activeIndex]);
  const renderItem = React.useCallback(
    item => {
      return (
        <Layout style={styles.tabBar}>
          {/* <BasicTabBar
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            tabs={[t('recommended'), t('newJobs'), t('nearbyYou')]}
          /> */}
        </Layout>
      );
    },
    [activeIndex],
  );

  const _onMap = React.useCallback(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
    Globales.set_variableGlobalLatitude(crd.latitude)
    Globales.set_variableGlobalLongitude(crd.longitude)
    })
    navigate('FindStack', {screen: 'ViewOnMap'});
    setSeteo(1);
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t('title').toString()}
      />
      {isSeteo != 3 ? <Text center category="h2" mb={15} mh={40} mt={80}>
      {isSeteo == 0 ?
        `Si quiere visualizar los profesionales mas cercanos, debe marcar su ubicacion (boton verde).
Luego puede filtrar segun sus preferencias (boton naranja).` :
        `Su ubicacion ha sido establecida, ahora filtre segun sus preferencias, a partir del boton inferior naranja.`
  }
         </Text>
      :
      <FlatList
        data={[1]}
        stickyHeaderIndices={[1]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<></>}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
      />}
      <ButtonFill
        icon="map"
        status="green"
        size="large"
        onPress={_onMap}
        style={styles.map}
      />
      <ButtonFill
        icon="filter"
        status="warning"
        size="large"
        onPress={toggleModal}
        style={styles.filter}
      />
      <Modal visible={isModalVisible} style={{ flex: 1, height: height }} >
        <FilterRecommend onHide={toggleModal} onFilter={toggleSeteo}/>
      </Modal>
    </Container>
  );
});

export default FindSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBar: {
    // paddingBottom: 8,
    // paddingTop: 24,
    backgroundColor: 'background-basic-color-1',
  },
  content: {
    paddingBottom: 120,
  },
  filter: {
    position: 'absolute',
    right: 12,
    bottom: 60,
  },
  map: {
    position: 'absolute',
    left: 12,
    bottom: 60,
  },
});
