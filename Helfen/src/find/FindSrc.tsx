import React, {memo} from 'react';
import {FlatList} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  ViewPager,
  Modal,
  Layout,
} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';
import {useTranslation} from 'react-i18next';

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

const FindSrc = memo(() => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const {height, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['find', 'common']);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const {modalRef, show, hide} = useModal();
  const ListFooterComponent = React.useCallback(() => {
    return (
      <ViewPager
        selectedIndex={activeIndex}
        onSelect={index => setActiveIndex(index)}
        swipeEnabled={false}>
        <Recommended />
        <></>
        <></>
        <></>
        <></>
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
    navigate('FindStack', {screen: 'ViewOnMap'});
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t('title').toString()}
      />
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
      />
      <ButtonFill
        icon="filter"
        status="warning"
        size="large"
        onPress={show}
        style={styles.filter}
      />

      <Modal ref={modalRef} style={{ flex: 1, height: height }}>
        <FilterRecommend onHide={hide} />
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
});
