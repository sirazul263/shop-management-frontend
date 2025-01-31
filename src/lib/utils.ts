import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GroupBase, StylesConfig } from "react-select";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (err: unknown): string => {
  // First, check if `err` is an object and not null
  if (typeof err === "object" && err !== null) {
    // Now, narrow the type of `err` by checking for the `errors` property
    if ("errors" in err) {
      const errors = (err as { errors?: Record<string, string[]> }).errors;
      if (errors) {
        return Object.values(errors)[0][0] || "An unknown error occurred";
      }
    }

    // Check if `err` has a `message` property
    if ("message" in err) {
      const message = (err as { message?: string | Record<string, string[]> })
        .message;

      if (typeof message === "object" && message !== null) {
        return Object.values(message)[0][0] || "An unknown error occurred";
      }

      if (typeof message === "string") {
        return message;
      }
    }
  }
  // If `err` doesn't have the expected structure, return a default message
  return "An unknown error occurred";
};

export const getMessage = (res: unknown): string | undefined => {
  // First, check if `err` is an object and not null
  if (typeof res === "object" && res !== null) {
    // Now, narrow the type of `err` by checking for the `errors` property

    // Check if `err` has a `message` property
    if ("message" in res) {
      if (typeof res.message === "object" && res.message !== null) {
        return Object.values(res.message)[0][0] || "An unknown error occurred";
      }

      if (typeof res.message === "string") {
        return res.message;
      }
    }
    // If `err` doesn't have the expected structure, return a default message
    return "An unknown error occurred";
  }
};

export function snakeCaseToTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function numberWithCommas(value: number | string): string {
  // Ensure the value is a number before converting it to a string
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  // Ensure the value is rounded to two decimal places
  let convertedAmount: number | string = Math.ceil(value * 100) / 100;

  // If the value has a fractional part, ensure it's formatted to 2 decimal places
  if (convertedAmount % 1 !== 0) {
    convertedAmount = convertedAmount.toFixed(2);
  }

  // Add commas as thousand separators
  return convertedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const numToWords = (number: number): string | undefined => {
  const a: string[] = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
  ];
  const b: string[] = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const num = Math.floor(number).toString(); // Handle the integer part of the number
  if (num.length > 9) return "overflow";

  let finalStr = "";

  // Pad the number to ensure it has exactly 9 digits
  const n = ("000000000" + num)
    .slice(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);

  if (!n) return;

  let str = "";
  str +=
    n[1] !== "00"
      ? (a[Number(n[1])] || b[parseInt(n[1][0])] + " " + a[parseInt(n[1][1])]) +
        "Crore "
      : "";
  str +=
    n[2] !== "00"
      ? (a[Number(n[2])] || b[parseInt(n[2][0])] + " " + a[parseInt(n[2][1])]) +
        "Lakh "
      : "";
  str +=
    n[3] !== "00"
      ? (a[Number(n[3])] || b[parseInt(n[3][0])] + " " + a[parseInt(n[3][1])]) +
        "Thousand "
      : "";
  str +=
    n[4] !== "0"
      ? (a[Number(n[4])] || b[parseInt(n[4][0])] + " " + a[parseInt(n[4][1])]) +
        "Hundred "
      : "";
  str +=
    n[5] !== "00"
      ? (str !== "" ? "and " : "") +
        (a[Number(n[5])] || b[parseInt(n[5][0])] + " " + a[parseInt(n[5][1])]) +
        "TAKA"
      : "TAKA";

  finalStr = str;

  // Handle decimal part
  const decimalPart = number.toString().split(".")[1];
  if (decimalPart) {
    const decimalNum = decimalPart.padEnd(2, "0"); // Pad decimal part to ensure 2 digits
    const decimalN = ("000000000" + decimalNum)
      .slice(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);

    if (!decimalN) return;

    const decimalStr =
      a[Number(decimalN[5])] ||
      b[parseInt(decimalN[5][0])] + " " + a[parseInt(decimalN[5][1])] ||
      "";

    finalStr += ` and ${decimalStr} POISHA`;
  }

  return finalStr;
};

interface OptionType {
  value: string;
  label: string;
}
export const customStyles: StylesConfig<
  OptionType,
  boolean,
  GroupBase<OptionType>
> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "white",
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    borderRadius: "0.375rem",
    padding: "0.40rem",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    borderRadius: "0.375rem",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#3b82f6"
      : state.isFocused
      ? "#eff6ff"
      : "white",
    color: state.isSelected ? "white" : "black",
    padding: "0.5rem 1rem",
    fontSize: 14,
  }),
};
