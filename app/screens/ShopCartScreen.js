import React, { useEffect } from "react";
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
  OKICOLOR,
  RAISINBLACK,
  WHITE,
} from "../constants/palette";

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

const ShopCartScreen = (props) => {
  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          marginTop: -5,
          //position: "absolute",
        }}
        onPress={() => {
          handleRemove(item, props);
        }}
      >
        <Icon
          //style={{ alignSelf: "flex-end" }}
          type="font-awesome-5"
          name="times-circle"
          color={ERRORCOLOR}
          size={25}
        />
      </TouchableOpacity>
      <View style={styles.container}>
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
      </View>
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
      <Text style={{ ...styles.text, textAlign: "center" }}>
        totale: {props.total}€
      </Text>
      <LogRegButton text="BUY" />
    </View>
  ) : (
    <Text style={{ ...styles.text, textAlign: "center" }}>
      Your shopping chart is empty!
    </Text>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 30,
    borderColor: RAISINBLACK,
    borderWidth: 0.5,
    marginBottom: 3,
    backgroundColor: LIGHTBLUE,
    paddingRight: 160,
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 30,
    borderColor: RAISINBLACK,
    borderWidth: 1,
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
    backgroundColor: OKICOLOR,
    borderRadius: 50,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopCartScreen);
