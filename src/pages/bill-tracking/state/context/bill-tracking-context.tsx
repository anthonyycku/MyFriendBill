import { createContext, useDeferredValue, useEffect, useState } from "react";
import { DebtEntryFromDb } from "../../models/bill-tracking.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { DebtDirection } from "../../constants/bill-tracking.constants";

interface BillTrackerContextModel {
  displayedTableData: DebtEntryFromDb[];
  setDisplayedTableData: (data: DebtEntryFromDb[]) => void;
  selectedRowData: DebtEntryFromDb | null;
  setSelectedRowData: (data: DebtEntryFromDb | null) => void;
  deferredSearch: string;
  debtDirection: string;
  setDebtDirection: (direction: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  updateTableData: (index: number, newData: Partial<DebtEntryFromDb>) => void;
  insertNewDebt: (data: DebtEntryFromDb) => void;
  deleteFromTableData: (id: number) => void;
  archivedTableData: DebtEntryFromDb[];
  setArchivedTableData: (data: DebtEntryFromDb[]) => void;
  isArchive: boolean;
  setIsArchive: (archive: boolean) => void;
  insertNewArchive: (data: DebtEntryFromDb) => void;
  deleteFromArchiveTable: (id: number) => void;
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
  insertNewDebt: () => {
  },
  deleteFromTableData: () => {
  },
  archivedTableData: [],
  setArchivedTableData: () => {
  },
  isArchive: false,
  setIsArchive: () => {
  },
  insertNewArchive: () => {
  },
  deleteFromArchiveTable: () => {
  }
});

export const BillTrackingProvider = ({ children }: any) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [isArchive, setIsArchive] = useState(false);
  const [displayedTableData, setDisplayedTableData] = useState<DebtEntryFromDb[]>([]);
  const [archivedTableData, setArchivedTableData] = useState<DebtEntryFromDb[]>([]);
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

  const deleteFromTableData = (debtId: number) => {
    setDisplayedTableData(currentTable => {
      const updatedTable = [...currentTable];
      const index = updatedTable.findIndex(debt => debt.id === debtId);
      updatedTable.splice(index, 1);
      return updatedTable;
    });
  }

  const deleteFromArchiveTable = (debtId: number) => {
    setArchivedTableData(currentTable => {
      const updatedTable = [...currentTable];
      const index = updatedTable.findIndex(debt => debt.id === debtId);
      updatedTable.splice(index, 1);
      return updatedTable;
    })
  }

  const insertNewArchive = (newData: DebtEntryFromDb) => {
    setArchivedTableData(prev => [...prev, newData]);
  };

  const insertNewDebt = (newData: DebtEntryFromDb) => {
    setDisplayedTableData(prev => [...prev, newData]);
  }

  useEffect(() => {
    if (displayedTableData.length === 0 || selectedRowData === null) return;

    setSelectedRowData(getRowDataById(selectedRowData.id));
  }, [displayedTableData]);


  useEffect(() => {
    setSelectedRowData(null);
  }, [isArchive])

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
    insertNewDebt,
    deleteFromTableData,
    archivedTableData,
    setArchivedTableData,
    isArchive,
    setIsArchive,
    insertNewArchive,
    deleteFromArchiveTable
  };

  return (
    <BillTrackingContext.Provider value={states}>
      {children}
    </BillTrackingContext.Provider>
  )
}

