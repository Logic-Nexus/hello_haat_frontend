// FIXED: "FIXED",
//   REGULAR: "REGULAR",
//   FREE: "FREE",
//   CHARGEABLE: "CHARGEABLE",

type array = { value: string; label: string }[];

export const PRODUCT_QUANTITY: array = [
  "UNIT",
  "PIECE",
  "KG",
  "GRAM",
  "PER",
  "DOZEN",
  "BOX",
  "CASE",
  "FEET",
  "LITER",
  "SET",
]?.map((item) => ({ value: item, label: item }));

export const DELIVERY_TYPE: array = ["REGULAR", "CHARGEABLE"]?.map((item) => ({
  value: item,
  label: item,
}));
