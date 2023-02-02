import { createContext, useDeferredValue, useEffect, useState } from "react";
import { DebtEntry } from "../../models/bill-tracking.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { DebtDirection } from "../../constants/bill-tracking.constants";

interface BillTrackerContextModel {
  displayedTableData: DebtEntry[];
  setDisplayedTableData: (data: DebtEntry[]) => void;
  selectedRowData: DebtEntry | null;
  setSelectedRowData: (data: DebtEntry) => void;
  deferredSearch: string;
  debtDirection: string;
  setDebtDirection: (direction: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  updateTableData: (index: number, newData: Partial<DebtEntry>) => void;
}

export const BillTrackingContext = createContext<BillTrackerContextModel>({
  displayedTableData: [],
  setDisplayedTableData: () => {
  },
  selectedRowData: null,
  setSelectedRowData: () => {
  },
  deferredSearch: '',
  debtDirection: DebtDirection.ALL,
  setDebtDirection: () => {
  },
  searchQuery: '',
  setSearchQuery: () => {
  },
  updateTableData: () => {
  }
});

export const BillTrackingProvider = ({ children }: any) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [displayedTableData, setDisplayedTableData] = useState<DebtEntry[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<DebtEntry | null>(null)
  const [debtDirection, setDebtDirection] = useState<string>(DebtDirection.ALL);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearch = useDeferredValue(searchQuery!);

  const getRowDataById = (selectedId: number): DebtEntry => {
    const index = displayedTableData.findIndex(debt => debt.id === selectedId);
    return displayedTableData[index];
  }

  const updateTableData = (debtId: number, newData: Partial<DebtEntry>) => {
    setDisplayedTableData(currentTable => {
      const updatedTable = [...currentTable];
      const index = updatedTable.findIndex(debt => debt.id === debtId);
      updatedTable[index] = { ...currentTable[index], ...newData }
      return updatedTable;
    });
  };

  useEffect(() => {
    if (displayedTableData.length === 0 || selectedRowData === null) return;

    setSelectedRowData(getRowDataById(selectedRowData.id));
  }, [displayedTableData]);

  const states = {
    displayedTableData,
    setDisplayedTableData,
    selectedRowData,
    setSelectedRowData,
    deferredSearch,
    debtDirection,
    setDebtDirection,
    searchQuery,
    setSearchQuery,
    updateTableData
  };

  return (
    <BillTrackingContext.Provider value={states}>
      {children}
    </BillTrackingContext.Provider>
  )
}

