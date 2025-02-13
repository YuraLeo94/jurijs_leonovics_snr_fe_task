import { render, screen, fireEvent, act } from "@testing-library/react";
import BalanceTable from "./BalanceTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { AmountEntry, CurrencyMapping } from "@/core/types/types";
import {
  COLUMNS_DEFAULT_COUNT,
  FETCH_DATA_GENERIC_ERROR_MESSAGE,
} from "@/core/consts";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

describe("BalanceTable Component", () => {
  const mockData: AmountEntry[] = [
    { id: "6", amount: "100.50" },
    { id: "5", amount: "200.75" },
    { id: "21", amount: "300.00" },
  ];

  const dummyData: CurrencyMapping = {
    "6": "USD",
    "5": "EUR",
    "21": "GBP",
  };

  const mapData1 = (data: AmountEntry[]) => {
    return data.map((item) => ({
      id: item.id,
      amount: parseFloat(item.amount),
      currency: dummyData[item.id] || "Unknown",
    }));
  };

  const renderWithQueryClient = (ui: React.ReactNode) => {
    const queryClient = new QueryClient();
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mapData1(mockData),
      error: null,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });
  });

  test("renders BalanceTable component correctly", async () => {
    renderWithQueryClient(
      <BalanceTable
        apiUrl="some-api-url"
        tableTitle="Balances"
        dataMapping={mapData1}
      />
    );
    expect(await screen.findByText("Balances")).toBeInTheDocument();
  });

  test("shows loading state while fetching data", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    renderWithQueryClient(
      <BalanceTable
        apiUrl="some-api-url"
        tableTitle="Balances"
        dataMapping={mapData1}
      />
    );

    expect(screen.getByText("...Loading")).toBeInTheDocument();
  });

  test("fetches and displays data after loading", async () => {
    renderWithQueryClient(
      <BalanceTable
        apiUrl="some-api-url"
        tableTitle="Balances"
        dataMapping={mapData1}
      />
    );

    expect(await screen.findByText("USD")).toBeInTheDocument();
    expect(await screen.findByText("100.50")).toBeInTheDocument();
  });

  test("handles error state when API request fails", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error("Failed to fetch"),
      isLoading: false,
      isSuccess: false,
      isError: true,
    });

    renderWithQueryClient(
      <BalanceTable
        apiUrl="some-api-url"
        tableTitle="Balances"
        dataMapping={mapData1}
      />
    );

    expect(
      screen.getByText(FETCH_DATA_GENERIC_ERROR_MESSAGE)
    ).toBeInTheDocument();
  });

  test("deletes the first currency row when delete button is clicked", async () => {
    renderWithQueryClient(
      <BalanceTable
        apiUrl="some-api-url"
        tableTitle="Balances"
        dataMapping={mapData1}
      />
    );

    const deleteButtons = await screen.findAllByRole("button", {
      name: "delete-icon",
    });
    expect(deleteButtons.length).toBeGreaterThan(0);

    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    expect(screen.queryByText("USD")).not.toBeInTheDocument();
  });

  test("increments columns when + Column button is clicked", async () => {
    renderWithQueryClient(
      <BalanceTable
        apiUrl="some-api-url"
        tableTitle="Balances"
        dataMapping={mapData1}
      />
    );
    const addButton = screen.getByText("+ Column");

    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(screen.getAllByText(/Name/i).length).toBe(COLUMNS_DEFAULT_COUNT + 1);
  });

  test("decrements columns when - Column button is clicked", async () => {
    renderWithQueryClient(
      <BalanceTable
        apiUrl="some-api-url"
        tableTitle="Balances"
        dataMapping={mapData1}
      />
    );
    const addButton = screen.getByText("+ Column");
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const removeButton = screen.getByText("- Column");

    await act(async () => {
      fireEvent.click(removeButton);
    });

    expect(screen.getAllByText(/Name/i).length).toBe(COLUMNS_DEFAULT_COUNT + 1);
  });
});
