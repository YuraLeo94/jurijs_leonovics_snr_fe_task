export const BALANCE_PATH = "/balances";

const PATH = {
  HOME: "/",
  BALANCE: "/balances",
  LOGIN: "/login",
};

const NAV_MENU = {
  HOME: "Home",
  BALANCE: "Balances Tables",
  LOGIN: "Login",
};

const BALANCE_TABLE = {
  TABLE: {
    COL1: "Name",
    COL2: "Balance",
    COL3: "Delete",
  },
  BUTTONS: {
    INCREMENT: "+ Column",
    DECREMENT: "- Column",
  },
};

const AUTH = {
  LOGIN: {
    EMAIL_ERROR_MESSAGE: "Incorrect email",
    EMAIL_PLACEHOLDER: "Email",
    PASSWORD_ERROR_MESSAGE: "Incorrect password",
    PASSWORD_PLACEHOLDER: "Password",
    OTP_FORM_TITLE: "Enter OTP",
    OTP_FORM_BUTTON_LABEL: "Submit",
    OTP_PLACEHOLDER: "Email",
    LOGIN_FORM_TITLE: "Login",
    LOGIN_FORM_BUTTON_LABEL: "Next",
  },
};

const FETCH_DATA_GENERIC_ERROR_MESSAGE =
  "Failed to fetch data. Please try again later.";
const LOADING_MESSAGE = "...Loading";

const COLUMNS_DEFAULT_COUNT = 3;

export {
  FETCH_DATA_GENERIC_ERROR_MESSAGE,
  COLUMNS_DEFAULT_COUNT,
  BALANCE_TABLE,
  NAV_MENU,
  PATH,
  LOADING_MESSAGE,
  AUTH,
};
