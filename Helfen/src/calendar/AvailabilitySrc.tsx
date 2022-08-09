import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Datepicker,
  Icon,
  CheckBox,
  Button,
} from "@ui-kitten/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { AvailabilityPassScreenNavigationProp } from "navigation/types";
import NavigationAction from "components/NavigationAction";
import dayjs from "dayjs";
import Flex from "components/Flex";
import TimePicker from "./TimePicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { globalStyle } from "styles/globalStyle";

const AvailabilitySrc = memo(() => {
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["calendar", "common"]);
  const route = useRoute<AvailabilityPassScreenNavigationProp>();

  const [availableDate, setDate] = React.useState(new Date());
  const [timeStart, setTimeStart] = React.useState(new Date().getTime());
  const [timeEnd, setTimeEnd] = React.useState(
    new Date().getTime() + 30 * 60 * 1000
  );
  const [showPickTimeStart, setShowPickTimeStart] = React.useState(false);
  const [showPickTimeEnd, setShowPickTimeEnd] = React.useState(false);
  const [repeat, setRepeat] = React.useState(false);
  const [weekly, setWeekly] = React.useState(false);
  const [everyWeekday, setWeekday] = React.useState(false);

  const handleConfirmStart = (date: Date) => {
    setTimeStart(date.getTime());
    setShowPickTimeStart(false);
  };
  const handleConfirmEnd = (date: Date) => {
    setTimeEnd(date.getTime());
    setShowPickTimeEnd(false);
  };
  const showTimeStart = () => {
    setShowPickTimeStart(!showPickTimeStart);
  };
  const showTimeEnd = () => {
    setShowPickTimeEnd(!showPickTimeEnd);
  };
  const onSave = () => {
    goBack();
  };
  const onDelete = () => {
    goBack();
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={`${route.params.type} Availability`}
      />
      <Content padder contentContainerStyle={styles.content}>
        <Datepicker
          style={styles.viewDate}
          label={t("availableDate").toString()}
          status={"basic"}
          min={new Date()}
          onSelect={(nextDate) => {
            setDate(nextDate);
          }}
          /* @ts-ignore */
          placeholder={null}
          onPress={() => null}
          accessoryLeft={(props) => (
            <Flex>
              <Icon pack="assets" name="calendar" {...props} />
              <Text center category="h7" ml={12}>
                {dayjs(availableDate).format("MMM DD, YYYY")}
              </Text>
            </Flex>
          )}
        />
        <Flex mb={32}>
          <TimePicker
            timeStart={timeStart}
            onPress={showTimeStart}
            label={t("timeStart")}
            marginRight={16}
          />
          <TimePicker
            timeStart={timeEnd}
            onPress={showTimeEnd}
            label={t("timeEnd")}
            marginLeft={16}
          />
        </Flex>
        <CheckBox
          appearance={"success"}
          checked={repeat}
          onChange={setRepeat}
          status="info"
        >
          <Text category="para-m">{t("repeatThisTimeBlock")}</Text>
        </CheckBox>
        <View style={styles.checkbox}>
          <CheckBox checked={weekly} onChange={setWeekly}>
            <Text category="para-m" mv={24}>
              {t("weeklyOnMon")}
            </Text>
          </CheckBox>
          <CheckBox checked={everyWeekday} onChange={setWeekday}>
            <Text category="para-m">{t("everyWeekday")}</Text>
          </CheckBox>
        </View>
        <Text category="h8-s" mt={24} mb={44}>
          {t("description")}
        </Text>
        {route.params.type === "Add" ? (
          <Button children={t("common:save").toString()} onPress={onSave} />
        ) : (
          <Flex>
            <Button
              children={t("common:delete").toString()}
              onPress={onDelete}
              status="outline"
              style={styles.deleteButton}
            />
            <Button
              children={t("common:save").toString()}
              onPress={onSave}
              style={globalStyle.flexOne}
            />
          </Flex>
        )}
      </Content>
      <DateTimePickerModal
        isVisible={showPickTimeStart}
        mode={"time"}
        date={new Date()}
        onConfirm={handleConfirmStart}
        onCancel={showTimeStart}
      />
      <DateTimePickerModal
        isVisible={showPickTimeEnd}
        mode={"time"}
        date={new Date()}
        onConfirm={handleConfirmEnd}
        onCancel={showTimeEnd}
      />
    </Container>
  );
});

export default AvailabilitySrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 32,
  },
  viewDate: {
    marginBottom: 24,
  },
  checkbox: {
    marginLeft: 36,
  },
  deleteButton: {
    flex: 1,
    marginRight: 16,
  },
});
