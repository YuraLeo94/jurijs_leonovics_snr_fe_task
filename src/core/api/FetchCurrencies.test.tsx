import { FETCH_DATA_GENERIC_ERROR_MESSAGE } from "../consts";
import { AmountEntry, Balance } from "../types/types";
import { fetchCurrencies } from "./api";
import axios from "axios";

jest.mock("axios");

describe("fetchCurrencies", () => {
  const mockApiUrl = "https://api.example.com/currencies";

  const mockData: AmountEntry[] = [
    { id: "6", amount: "100.50" },
    { id: "5", amount: "200.75" },
    { id: "21", amount: "300.00" },
  ];

  const dummyData: { [key: string]: string } = {
    "6": "USD",
    "5": "EUR",
    "21": "GBP",
  };

  const dataMapping = (data: AmountEntry[]): Balance[] => {
    return data.map((item) => ({
      id: item.id,
      amount: parseFloat(item.amount),
      currency: dummyData[item.id] || "Unknown",
    }));
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchCurrencies should return mapped data on success", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchCurrencies(mockApiUrl, dataMapping);

    expect(result).toEqual([
      { id: "6", amount: 100.5, currency: "USD" },
      { id: "5", amount: 200.75, currency: "EUR" },
      { id: "21", amount: 300, currency: "GBP" },
    ]);

    expect(axios.get).toHaveBeenCalledWith(mockApiUrl);
  });

  test("fetchCurrencies should throw an error when the request fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

    await expect(fetchCurrencies(mockApiUrl, dataMapping)).rejects.toThrow(
      FETCH_DATA_GENERIC_ERROR_MESSAGE
    );

    expect(axios.get).toHaveBeenCalledWith(mockApiUrl);
  });
});
