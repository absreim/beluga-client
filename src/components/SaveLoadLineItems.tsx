import { FC, useCallback, useEffect, useState } from "react";
import LineItemDataGrid, { LineItem } from "./LineItemDataGrid.tsx";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  localStorageKey: string;
  currentRows: LineItem[] | null;
  setCurrentRows: (rows: LineItem[]) => void;
}

// For now, this component assumes that the user will not try to edit local
// storage directly.
const SaveLoadLineItems: FC<Props> = ({
  localStorageKey,
  currentRows,
  setCurrentRows,
}) => {
  const [savedRows, setSavedRows] = useState<LineItem[] | null>(null);
  // Loaded copy data from local storage that last time local storage was
  // checked. In reality, the contents of the state may differ from the contents
  // of local storage.

  const loadStorageContents: () => void = useCallback(() => {
    const contents = localStorage.getItem(localStorageKey);
    if (contents === null) {
      setSavedRows(null);
    } else {
      setSavedRows(JSON.parse(contents));
    }
  }, [localStorageKey]);

  useEffect(() => {
    loadStorageContents();
  }, [loadStorageContents]);

  const handleSave: () => void = () => {
    if (currentRows) {
      localStorage.setItem(localStorageKey, JSON.stringify(currentRows));
      loadStorageContents();
    }
  };

  const handleLoad: () => void = () => {
    if (!savedRows) {
      return;
    }
    setCurrentRows(savedRows);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Saved Contents</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {savedRows ? (
          <LineItemDataGrid
            rows={savedRows}
          />
        ) : (
          <Alert color="info">No saved items.</Alert>
        )}
      </AccordionDetails>
      <AccordionActions>
        <Button onClick={handleSave} disabled={currentRows === null}>
          Save
        </Button>
        <Button onClick={handleLoad} disabled={savedRows === null}>
          Load
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default SaveLoadLineItems;
