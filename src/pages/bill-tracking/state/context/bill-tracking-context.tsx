import { createContext, useDeferredValue, useEffect, useState } from "react";
import { DebtEntryFromDb } from "../../models/bill-tracking.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { DebtDirection } from "../../constants/bill-tracking.constants";

interface BillTrackerContextModel {
  displayedTableData: DebtEntryFromDb[];
  setDisplayedTableData: (data: DebtEntryFromDb[]) => void;
  selectedRowData: DebtEntryFromDb | null;
  setSelectedRowData: (data: DebtEntryFromDb) => void;
  deferredSearch: string;
  debtDirection: string;
  setDebtDirection: (direction: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  updateTableData: (index: number, newData: Partial<DebtEntryFromDb>) => void;
  createNewTableData: (newData: DebtEntryFromDb) => void;
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
  },
  createNewTableData: () => {
  }
});

export const BillTrackingProvider = ({ children }: any) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [displayedTableData, setDisplayedTableData] = useState<DebtEntryFromDb[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<DebtEntryFromDb | null>(null)
  const [debtDirection, setDebtDirection] = useState<string>(DebtDirection.ALL);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearch = useDeferredValue(searchQuery!);

  const getRowDataById = (selectedId: number): DebtEntryFromDb => {
    const index = displayedTableData.findIndex(debt => debt.id === selectedId);
    return displayedTableData[index];
  }

  const updateTableData = (debtId: number, newData: Partial<DebtEntryFromDb>) => {
    setDisplayedTableData(currentTable => {
      const updatedTable = [...currentTable];
      const index = updatedTable.findIndex(debt => debt.id === debtId);
      updatedTable[index] = { ...currentTable[index], ...newData }
      return updatedTable;
    });
  };

  const createNewTableData = (newData: DebtEntryFromDb) => {
    setDisplayedTableData(prev => [...prev, newData]);
  }

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
    updateTableData,
    createNewTableData
  };

  return (
    <BillTrackingContext.Provider value={states}>
      {children}
    </BillTrackingContext.Provider>
  )
}

