import React, { useEffect } from "react";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { LogRegButton } from "../components/LogRegButton";
import { LIGHTBLUE, RAISINBLACK, WHITE } from "../constants/palette";

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    total: state.total,
  };
};

const ShopCartScreen = (props) => {
  const renderItem = ({ item }) => (
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
    </View>
  );

  return props.items.length ? (
    <View>
      <FlatList
        data={props.items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 30,
          paddingTop: 20,
        }}
      />
      <Text style={{ ...styles.text, textAlign: "center" }}>
        totale: {props.total}€
      </Text>
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
});

export default connect(mapStateToProps)(ShopCartScreen);
