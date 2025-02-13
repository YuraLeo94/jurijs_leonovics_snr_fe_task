"use client";
import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { AmountEntry, Balance } from "@/core/types/types";
import { fetchCurrencies } from "@/core/api/api";
import {
  BALANCE_TABLE,
  COLUMNS_DEFAULT_COUNT,
  FETCH_DATA_GENERIC_ERROR_MESSAGE,
  LOADING_MESSAGE,
} from "@/core/consts";

interface BalanceTableProps {
  apiUrl: string;
  tableTitle: string;
  dataMapping: (data: AmountEntry[]) => Balance[];
  columnsConfig?: number;
}

const BalanceTable = ({
  apiUrl,
  tableTitle,
  dataMapping,
  columnsConfig = COLUMNS_DEFAULT_COUNT,
}: BalanceTableProps) => {
  const [currencies, setCurrencies] = useState<Balance[]>([]);
  const [columns, setColumns] = useState<number>(columnsConfig);
  const [search, setSearch] = useState<string>("");
  const [customError, setCustomError] = useState<string>("");

  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["currencies", apiUrl],
    queryFn: () => fetchCurrencies(apiUrl, dataMapping),
  });

  useEffect(() => {
    if (error) {
      setCustomError(FETCH_DATA_GENERIC_ERROR_MESSAGE);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setCurrencies(data);
    }
  }, [data]);

  const handleDelete = (id: string) => {
    setCurrencies((prev) => prev.filter((currency) => currency.id !== id));
  };

  const filteredCurrencies = currencies.filter((currency) =>
    currency.currency.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCurrencies = filteredCurrencies.reduce((acc, currency) => {
    if (!acc[currency.currency]) {
      acc[currency.currency] = {
        currency: currency.currency,
        amount: currency.amount,
        id: currency.id,
      };
    }

    return acc;
  }, {} as Record<string, Balance>);

  const groupedArray = Object.values(groupedCurrencies);

  const chunkedData = (data: Balance[], chunkSize: number) => {
    return Array.from({ length: Math.ceil(data.length / chunkSize) }, (_, i) =>
      data.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
  };

  const distributedCurrencies = chunkedData(groupedArray, columns);

  return (
    <div className="mt-6 p-6 bg-blue-50 rounded-lg shadow-md container mx-auto">
      <h2 className="text-xl font-bold mb-4">{tableTitle}</h2>

      {isLoading && <p className="text-black">{LOADING_MESSAGE}</p>}

      {isError && <p className="text-red-500">{customError}</p>}

      {isSuccess && (
        <>
          <div className="relative max-w-600px mb-4">
            <input
              type="text"
              placeholder="Search by currency symbol"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded w-full relative"
            />
            {search?.length > 0 && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setColumns(columns + 1)}
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
            >
              {BALANCE_TABLE.BUTTONS.INCREMENT}
            </button>
            <button
              onClick={() => setColumns(Math.max(1, columns - 1))}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              {BALANCE_TABLE.BUTTONS.DECREMENT}
            </button>
          </div>

          <div className="w-full overflow-auto">
            <table className="border-collapse border border-gray-200 mt-2 text-center">
              <thead>
                <tr className="bg-blue-500">
                  {Array.from({ length: columns }).map((_, idx) => (
                    <th key={`header-${idx}`} className="p-2">
                      <div className="flex min-w-350px">
                        <div className="font-bold w-1/3">
                          {BALANCE_TABLE.TABLE.COL1}
                        </div>
                        <div className="font-bold w-1/3">
                          {BALANCE_TABLE.TABLE.COL2}
                        </div>
                        <div className="font-bold w-1/3">
                          {BALANCE_TABLE.TABLE.COL3}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {distributedCurrencies.map((rowGroup, rowIndex) => (
                  <tr
                    key={`row-${rowIndex}`}
                    className={rowIndex % 2 !== 0 ? "bg-blue-100" : ""}
                  >
                    {Array.from({ length: columns }).map((_, colIndex) => {
                      const entry = rowGroup[colIndex] || [[]];
                      return (
                        <td
                          key={`cell-${rowIndex}-${colIndex}-${entry?.id}`}
                          className="p-2 hover:bg-blue-200"
                        >
                          {entry?.currency ? (
                            <>
                              <div className="flex">
                                <div className="text-gray-700 w-1/3">
                                  {entry?.currency}
                                </div>
                                <div className="text-gray-700 w-1/3">
                                  {entry.amount.toFixed(2)}
                                </div>
                                <div className="w-1/3 flex justify-center">
                                  <button
                                    aria-label="delete-icon"
                                    onClick={() => handleDelete(entry.id)}
                                    className="p-1"
                                  >
                                    <TrashIcon className="h-5 w-5 text-white fill-black cursor-pointer" />
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default BalanceTable;
