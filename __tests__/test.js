import "react-native";
import React from "react";
import { PrivacyScreen } from "../app/screens/PrivacyScreen";
//import { AboutUsScreen } from "../app/screens/AboutUsScreen";
import Icon from "react-native-elements";
import renderer from "react-test-renderer";

// dataset

const productQty1 = 1;
const productQty4 = 4;

const userData1 = {
  name: "Marco",
  surname: "Gaspe",
  address: "Via Roma",
  houseNumber: "15",
  zip: "20140",
  phoneNumber: "3334445556",
  mail: "prova@prova.it",
};

const userData2 = {
  name: "M",
  surname: "Gaspe",
  address: "Via Roma",
  houseNumber: "15",
  zip: "20140",
  phoneNumber: "3334445556",
  mail: "prova@prova.it",
};

const userData3 = {
  name: "Marco",
  surname: "Gaspeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  address: "Via Roma",
  houseNumber: "15",
  zip: "20140",
  phoneNumber: "3334445556",
  mail: "prova@prova.it",
};

const userData4 = {
  name: "Marco",
  surname: "Gaspe",
  address: "Via Roma",
  houseNumber: "15123",
  zip: "20140",
  phoneNumber: "3334445556",
  mail: "prova@prova.it",
};

const userData5 = {
  name: "Marco",
  surname: "Gaspe",
  address: "Via Roma",
  houseNumber: "15",
  zip: "201",
  phoneNumber: "3334445556",
  mail: "prova@prova.it",
};

const userData6 = {
  name: "Marco",
  surname: "Gaspe",
  address: "Via Roma",
  houseNumber: "15",
  zip: "20140",
  phoneNumber: "123334445556",
  mail: "prova@prova.it",
};

const userData7 = {
  name: "Marco",
  surname: "Gaspe",
  address: "Via Roma",
  houseNumber: "15",
  zip: "20140",
  phoneNumber: "3334445556",
  mail: "prova.it",
};

const categories = [
  { name: "Supplements", icon: "url", id: 1 },
  { name: "Painkillers", icon: "url", id: 2 },
  { name: "Baby", icon: "url", id: 3 },
  { name: "Cosmetics", icon: "url", id: 4 },
  { name: "Contraceptives", icon: "url", id: 5 },
  { name: "Utils", icon: "url", id: 6 },
  { name: "Veterinary", icon: "url", id: 7 },
];

const product28 = {
  category: [7],
  description: "description of product",
  id: 28,
  image: "url",
  name: "Oxbow Essentials Hamster Food",
  pharmacy: ["1", "2", "3", "4"],
  price: "13.50",
  stock: [5, 6, 6, 7],
};

const pharmacy1 = {
  address: "Via Enrico Noe",
  close: "20:00",
  id: 1,
  image: "url",
  location: {
    latitude: 45.4798088443206,
    longitude: 9.22303369233283,
  },
  name: "Farmacia San Giorgio",
  open: "13:00",
};

const pharmacy2 = {
  address: "Via Piacenza",
  close: "19:00",
  id: 2,
  image: "url",
  location: {
    latitude: 45.449010764728804,
    longitude: 9.20285133804469,
  },
  name: "Farmacia del Castoro",
  open: "8:00",
};

const pharmacy3 = {
  address: "Viale Pasubio",
  close: "23:00",
  id: 3,
  image: "url",
  location: {
    latitude: 45.4820995533759,
    longitude: 9.185049116611385,
  },
  name: "Farmacia Carla",
  open: "6:00",
};

const pharmacy4 = {
  address: "Via Mercato",
  close: "18:00",
  id: 4,
  image: "url",
  location: {
    latitude: 45.47100146158938,
    longitude: 9.18424566545442,
  },
  name: "Farmacia Santagostino",
  open: "7:30",
};
//method

const getCategoryByNameId = (id) => {
  let category = categories.filter((elem) => elem.id == id);
  if (category.length > 0) return category[0].name;
  return "";
};

const getStockByItem = (product, pharmacy) => {
  return product.stock[pharmacy.id - 1];
};

const editOrder = (action, productQty) => {
  let newTotalQuantity = productQty;
  if (action == "+") {
    newTotalQuantity++;
  } else {
    if (newTotalQuantity != 1) newTotalQuantity--;
  }
  return newTotalQuantity;
};

const passCheck = (pass, confirmPass) => {
  if (pass.trim().length < 8 || !pass.match(/\d+/g)) {
    return false;
  }
  if (pass != confirmPass) {
    return false;
  }
  return true;
};

const fieldsCheck = (user) => {
  const mailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (
    user.name.length < 2 ||
    user.name.length > 20 ||
    user.surname.length < 2 ||
    user.surname.length > 20 ||
    !/^\d+$/.test(user.houseNumber) ||
    user.houseNumber.length < 1 ||
    user.houseNumber.length > 4 ||
    !/^\d+$/.test(user.zip) ||
    user.zip.length != 5 ||
    !/^\d+$/.test(user.phoneNumber) ||
    user.phoneNumber.length < 8 ||
    user.phoneNumber.length > 10 ||
    !mailValidator.test(user.mail.toLowerCase())
  ) {
    return false;
  } else {
    return true;
  }
};

//Unit test

test("test get category by name id 1", () => {
  expect(getCategoryByNameId(1)).toEqual("Supplements");
});

test("test get category by name id 2", () => {
  expect(getCategoryByNameId(2)).toEqual("Painkillers");
});

test("test get category by name id 3", () => {
  expect(getCategoryByNameId(3)).toEqual("Baby");
});

test("test get category by name id 4", () => {
  expect(getCategoryByNameId(4)).toEqual("Cosmetics");
});

test("test get category by name id 5", () => {
  expect(getCategoryByNameId(5)).toEqual("Contraceptives");
});

test("test get category by name id 6", () => {
  expect(getCategoryByNameId(6)).toEqual("Utils");
});

test("test get category by name id 7", () => {
  expect(getCategoryByNameId(7)).toEqual("Veterinary");
});

test("test get stock by item for pharmacy 1", () => {
  expect(getStockByItem(product28, pharmacy1)).toEqual(5);
});

test("test get stock by item for pharmacy 2", () => {
  expect(getStockByItem(product28, pharmacy2)).toEqual(6);
});

test("test get stock by item for pharmacy 3", () => {
  expect(getStockByItem(product28, pharmacy3)).toEqual(6);
});

test("test get stock by item for pharmacy 4", () => {
  expect(getStockByItem(product28, pharmacy4)).toEqual(7);
});

test("edit order with 1 quantity and minus", () => {
  expect(editOrder("-", productQty1)).toEqual(1);
});

test("edit order with 1 quantity and plus", () => {
  expect(editOrder("+", productQty1)).toEqual(2);
});

test("edit order with 4 quantity and minus", () => {
  expect(editOrder("-", productQty4)).toEqual(3);
});

test("edit order with 4 quantity and plus", () => {
  expect(editOrder("+", productQty4)).toEqual(5);
});

test("pass check with wrong password and correct confirm password", () => {
  expect(passCheck("marco", "marco")).toBe(false);
});

test("pass check with wrong password and wrong confirm password", () => {
  expect(passCheck("marco", "marco123")).toBe(false);
});

test("pass check with correct password and wrong confirm password", () => {
  expect(passCheck("marco123", "marco")).toBe(false);
});

test("pass check with correct password and correct confirm password", () => {
  expect(passCheck("marco123", "marco123")).toBe(true);
});

test("fields check with correct fields", () => {
  expect(fieldsCheck(userData1)).toBe(true);
});

test("fields check with wrong name", () => {
  expect(fieldsCheck(userData2)).toBe(false);
});

test("fields check with wrong surname", () => {
  expect(fieldsCheck(userData3)).toBe(false);
});

test("fields check with wrong house number", () => {
  expect(fieldsCheck(userData4)).toBe(false);
});

test("fields check with wrong zip", () => {
  expect(fieldsCheck(userData5)).toBe(false);
});

test("fields check with wrong phone number", () => {
  expect(fieldsCheck(userData6)).toBe(false);
});

test("fields check with wrong email", () => {
  expect(fieldsCheck(userData7)).toBe(false);
});
//Rendering test

it("render Privacy Screen", () => {
  renderer.create(<PrivacyScreen />);
});

/* it("render Privacy Screen", () => {
  jest.useFakeTimers();
  renderer.create(<AboutUsScreen />);
}); */
