import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  Card,
  Title,
  Text,
  Button,
  Avatar,
  Badge,
  Menu,
  Divider,
} from 'react-native-paper';

const PharmacyHome = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View style={styles.container}>
      {/* Top Bar with Pharmacy Name & Profile Icon */}
      <View style={styles.topBar}>
        <Text style={styles.pharmacyName}>Greenish Meds</Text>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Avatar.Icon
              size={40}
              icon="account-circle"
              color="#fff"
              style={styles.profileIcon}
              onPress={openMenu}
            />
          }>
          <Menu.Item onPress={() => console.log('Profile')} title="Profile" />
          <Menu.Item onPress={() => console.log('Settings')} title="Settings" />
          <Divider />
          <Menu.Item onPress={() => console.log('Logout')} title="Logout" />
        </Menu>
      </View>

      <ScrollView>
        <Title style={styles.title}>Pharmacy Dashboard</Title>

        {/* Order Summary */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Order Summary</Title>
            <View style={styles.row}>
              <SummaryItem title="New" count={5} icon="cart-outline" />
              <SummaryItem title="Processing" count={8} icon="progress-clock" />
              <SummaryItem
                title="Delivered"
                count={20}
                icon="check-circle-outline"
              />
            </View>
          </Card.Content>
        </Card>

        {/* Earnings & Payouts */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Earnings & Payouts</Title>
            <Text>Total Earnings: ₹45,000</Text>
            <Text>Pending Payouts: ₹10,000</Text>
          </Card.Content>
        </Card>

        {/* Stock Alerts */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Stock Alerts</Title>
            <Text style={{color: 'red'}}>5 items are running low!</Text>
          </Card.Content>
        </Card>

        {/* Notifications */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Notifications</Title>
            <Text>🔔 You have 2 new messages</Text>
          </Card.Content>
        </Card>

        {/* Navigation Options */}
        <View style={styles.buttonContainer}>
          <DashboardButton title="Manage Orders" icon="clipboard-list" />
          <DashboardButton title="Inventory Management" icon="warehouse" />
          <DashboardButton
            title="Earnings & Transactions"
            icon="cash-multiple"
          />
          <DashboardButton title="Customer Support" icon="headset" />
          <DashboardButton title="Profile & Settings" icon="cog-outline" />
        </View>
      </ScrollView>
    </View>
  );
};

// Order Summary Component
const SummaryItem = ({title, count, icon}) => (
  <View style={styles.summaryItem}>
    <Avatar.Icon
      size={50}
      icon={icon}
      color="#fff"
      style={{backgroundColor: '#033c6b'}}
    />
    <Text style={styles.summaryText}>{title}</Text>
    <Badge style={styles.badge}>{count}</Badge>
  </View>
);

// Navigation Button Component
const DashboardButton = ({title, icon}) => (
  <Button
    mode="contained"
    style={styles.button}
    icon={icon}
    onPress={() => console.log(title)}>
    {title}
  </Button>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfcff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#033c6b',
    padding: 15,
    paddingHorizontal: 20,
  },
  pharmacyName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileIcon: {
    backgroundColor: '#38b6ff',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#033c6b',
    marginVertical: 15,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#38b6ff',
    color: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  button: {
    marginBottom: 10,
    backgroundColor: '#033c6b',
    borderRadius: 8,
  },
});

export default PharmacyHome;
