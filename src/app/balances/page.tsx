"use client";
import BalanceTable from "@/core/components/molecules/BalanceTable/BalanceTable";
import { AmountEntry } from "@/core/types/types";
import { dummyData } from "./dummyData";
import { API_URL_1, API_URL_2 } from "@/core/api/api.path";

const mapData1 = (data: AmountEntry[]) => {
  return data.map((item) => ({
    id: item.id,
    amount: parseFloat(item.amount),
    currency: dummyData[item.id] || "Unknown",
  }));
};

const mapData2 = (data: AmountEntry[]) => {
  return data.map((item) => ({
    id: item.id,
    amount: parseFloat(item.amount),
    currency: dummyData[item.id] || "Unknown",
  }));
};

const Tables = () => {
  return (
    <div>
      <BalanceTable
        apiUrl={API_URL_1}
        tableTitle="Balances"
        dataMapping={mapData1}
      />
      <BalanceTable
        apiUrl={API_URL_2}
        tableTitle="Table 2 - Other Currencies"
        dataMapping={mapData2}
      />
    </div>
  );
};

export default Tables;
