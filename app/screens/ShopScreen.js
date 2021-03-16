import React, { useEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, Image } from "react-native";
import * as firebase from "firebase";
import { LIGHTGREY, OKICOLOR } from "../constants/palette";
import { SIZES, FONTS } from "../constants/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const ShopScreen = ({ route }) => {

const [categories, setCategories] = useState([]);
const { item } = route.params;

useEffect(() => {
  loadElements();
}, []);

const loadElements = async () => {
    let temp = [];
    await firebase
      .firestore()
      .collection("Categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          for (let count = 1; count < 8; count++) {
            const obj = {
              id: count,
              name: doc.data()[count][0],
              icon: doc.data()[count][1],
            };
            temp.push(obj);
          }
        });
      });
    setCategories(temp);
  }

  console.log(categories);


  function renderShopInfo() {
    return (
      <View
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
      >
              <View
                style={{ alignItems: 'center'}}
              >
                <View style={{ height: SIZES.height * 0.35 }}>
                  <Image
                    source={{ uri: item.image }}
                    //resizeMethod="cover"
                    style={{
                      width: SIZES.width,
                      height: "100%"
                    }}
                  />

                  {/* Quantity */}
                  <View
                    style={{
                      position: 'absolute',
                      bottom: - 20,
                      width: SIZES.width,
                      height: 50,
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: 50,
                        backgroundColor: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopLeftRadius: 25,
                        borderBottomLeftRadius: 25
                      }}
                    >
                      <Text style={{...FONTS.body1 }}>-</Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        width: 50,
                        backgroundColor: "white",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      >
                      <Text style={{...FONTS.h2 }}>5</Text>
                    </View>
                    <TouchableOpacity
                      style= {{
                        width: 50,
                        backgroundColor: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopRightRadius: 25,
                        borderBottomRightRadius: 25
                      }}
                    >
                      <Text style={{...FONTS.body1}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
               
                {/* Name & Description */}
                <View
                  style={{
                    width: SIZES.width,
                    alignItems: 'center',
                    marginTop: 15,
                    paddingHorizontal: SIZES.padding * 2
                  }}
                >
                  <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{item.name} - {item.price}</Text>
                  <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
                </View>

                {/* Categories */}
                <View
                style= {{
                  flexDirection: 'row',
                  marginTop: 10
                }}
                >
                <Image 
                  source={ categories.length > 0 ? { uri: categories[item.category[0] - 1].icon } : null}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 10
                  }}
                />
                 <Text style={{ ...FONTS.body3, color: LIGHTGREY }}>{ categories.length > 0 ? categories[item.category[0] - 1].name : null}</Text>                      
                </View>
              </View>
      </View>
    )
}

function renderOrder() {
  return (
    <View>
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40
        }}
      >
    <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: SIZES.padding * 2,
      paddingHorizontal: SIZES.padding * 3,
      borderBottomColor: LIGHTGREY
    }}
    >

    </View>
      </View>
    </View>
  )
}


  return (
  <SafeAreaView style ={styles.container}>
    {renderShopInfo()}
    </SafeAreaView>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
})

