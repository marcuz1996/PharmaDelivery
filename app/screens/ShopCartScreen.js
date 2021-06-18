import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { LogRegButton } from "../components/LogRegButton";
import {
  ERRORCOLOR,
  LIGHTBLUE,
  RAISINBLACK,
  WHITE,
} from "../constants/palette";
import { LinearGradient } from "expo-linear-gradient";
import {
  PaymentPath,
  PaypalPurchasePath,
  PurchasePath,
} from "../constants/path";

const ShopCartScreen = (props) => {
  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          marginTop: -5,
        }}
        onPress={() => {
          handleRemove(item, props);
        }}
      >
        <Icon
          type="font-awesome-5"
          name="times-circle"
          color={ERRORCOLOR}
          size={25}
        />
      </TouchableOpacity>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[WHITE, "#80F7FF", LIGHTBLUE]}
        locations={[0.3, 0.7, 1]}
        style={styles.container}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ justifyContent: "center" }}>
          <Text style={{ ...styles.text, paddingLeft: 20 }}>
            Product: {item.name}
          </Text>
          <Text style={{ ...styles.text, paddingLeft: 20 }}>
            Price: {item.price}€
          </Text>
          <Text style={{ ...styles.text, paddingLeft: 20 }}>
            Quantity: {item.quantity}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 10,
            position: "absolute",
            right: 0,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handlePlus(item, props);
            }}
          >
            <Icon
              style={styles.button}
              type="font-awesome-5"
              name="plus-circle"
              color={RAISINBLACK}
              size={28}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleMinus(item, props);
            }}
          >
            <Icon
              style={styles.button}
              type="font-awesome-5"
              name="minus-circle"
              color={RAISINBLACK}
              size={28}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  return props.items.length ? (
    <View style={styles.flatList}>
      <FlatList
        data={props.items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 5 }}
      />
      <Text
        style={{
          ...styles.text,
          textAlign: "center",
          fontSize: 30,
          paddingTop: 20,
        }}
      >
        Totale: {props.total}€
      </Text>
      <LogRegButton
        text="BUY"
        onPress={() => props.navigation.navigate(PaymentPath)}
      />
    </View>
  ) : (
    <Text style={{ ...styles.text, textAlign: "center", paddingTop: 20 }}>
      Your shopping cart is empty!
    </Text>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 30,
    marginBottom: 3,
    backgroundColor: LIGHTBLUE,
    paddingRight: 160,
    alignItems: "center",
    height: 90,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 30,

    backgroundColor: WHITE,
  },
  text: {
    fontSize: 14,
    color: RAISINBLACK,
    fontFamily: "Montserrat",
  },
  flatList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 20,
  },
  button: {
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    margin: 5,
    borderRadius: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    total: state.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (product) => {
      dispatch({ type: "REMOVE_ITEM", payload: product });
    },
    addQuantity: (product) => {
      dispatch({ type: "ADD_QTY", payload: product });
    },
    subtractQuantity: (product) => {
      dispatch({ type: "SUBTRACT_QTY", payload: product });
    },
  };
};

const handleMinus = (product, props) => {
  props.subtractQuantity(product);
};

const handlePlus = (product, props) => {
  props.addQuantity(product);
};

const handleRemove = (product, props) => {
  props.removeItem(product);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCartScreen);
