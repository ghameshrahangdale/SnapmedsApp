import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const DeliveryDashboard = () => {
  const navigation = useNavigation();
  const [isOnline, setIsOnline] = useState(false);

  // Toggle online/offline
  const toggleOnlineStatus = () => setIsOnline(!isOnline);

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        {/* Toggle Button */}
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: isOnline ? "#4CAF50" : "#ccc" },
          ]}
          onPress={toggleOnlineStatus}
        >
          <Text style={styles.toggleText}>
            {isOnline ? "Online" : "Offline"}
          </Text>
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="account-circle" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Today's Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>Today's Progress</Text>
          <View style={styles.progressContainer}>
            <ProgressItem icon="attach-money" label="Earnings" value="0" />
            <ProgressItem icon="directions-bike" label="Trips" value="0" />
          </View>
          <View style={styles.progressContainer}>
            <ProgressItem
              icon="access-time"
              label="Time on Order"
              value="0h 0m"
            />
            <ProgressItem icon="history" label="History" value="View" />
          </View>
        </View>

        {/* Referral Card */}
        <View style={styles.referralCard}>
          <Text style={styles.cardTitle}>Refer New Pharmacy and Earn ₹200</Text>
          <Text style={styles.referralCondition}>
            Conditions: Fill in the pharmacy name, owner's name, pharmacist's
            number, and inventory details.
          </Text>
          <TouchableOpacity
            style={styles.formButton}
            onPress={() => navigation.navigate("ReferralForm")}
          >
            <Text style={styles.buttonText}>Fill Form</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem icon="rss-feed" label="Feed" />
        <NavItem icon="account-balance-wallet" label="Pocket" />
        <NavItem icon="history" label="History" />
        <NavItem icon="notifications" label="Updates" />
      </View>
    </View>
  );
};

// Progress Item Component
const ProgressItem = ({ icon, label, value }) => (
  <View style={styles.progressItem}>
    <Icon name={icon} size={24} color="#000" />
    <Text style={styles.progressLabel}>{label}</Text>
    <Text style={styles.progressValue}>{value}</Text>
  </View>
);

// Bottom Navigation Item
const NavItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.navItem}>
    <Icon name={icon} size={24} color="#666" />
    <Text style={styles.navLabel}>{label}</Text>
  </TouchableOpacity>
);

// Styles
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  toggleText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#000",
  },
  progressCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  progressItem: {
    alignItems: "center",
    width: "45%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginTop: 4,
  },
  progressValue: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    marginTop: 2,
  },
  referralCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  referralCondition: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666",
    marginVertical: 8,
  },
  formButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 6,
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginTop: 4,
    color: "#000",
  },
};

export default DeliveryDashboard;
