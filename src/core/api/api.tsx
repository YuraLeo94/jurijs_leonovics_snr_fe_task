import axios from "axios";
import { AmountEntry, Balance } from "../types/types";
import { FETCH_DATA_GENERIC_ERROR_MESSAGE } from "../consts";

export const fetchCurrencies = async (
  apiUrl: string,
  dataMapping: (data: AmountEntry[]) => Balance[]
) => {
  try {
    const response = await axios.get(apiUrl);
    return dataMapping(response.data);
  } catch (error) {
    throw new Error(FETCH_DATA_GENERIC_ERROR_MESSAGE);
  }
};
