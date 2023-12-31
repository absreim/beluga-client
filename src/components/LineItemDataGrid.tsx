import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { nanoid } from "nanoid/non-secure";
import { FC } from "react";
import { Tooltip } from "@mui/material";

export interface LineItem {
  id: string;
  productCode: string;
  description: string;
  quantity: number | null;
  totalAmount: number | null;
  unitPrice: number | null;
}

interface LineItemDataGridMutations {
  addRows: (rows: LineItem[]) => void;
  editRow: (row: LineItem) => void;
  deleteRow: (id: string) => void;
}

interface LineItemDataGridProps {
  rows: LineItem[];
  mutations?: LineItemDataGridMutations; // undefined implies a read=only component
}

interface EditToolbarProps {
  addRows: (rows: LineItem[]) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

const EditToolbar: FC<EditToolbarProps> = ({ addRows, setRowModesModel }) => {
  const handleClick = () => {
    const id = nanoid();
    addRows([
      {
        id,
        productCode: "",
        description: "",
        quantity: null,
        totalAmount: null,
        unitPrice: null,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "productCode" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add line item
      </Button>
    </GridToolbarContainer>
  );
};

const LineItemDataGrid: FC<LineItemDataGridProps> = ({ rows, mutations }) => {
  const readOnly = !mutations;
  const addRows = mutations?.addRows;
  const editRow = mutations?.editRow;
  const deleteRow = mutations?.deleteRow;

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: string) => () => {
    deleteRow && deleteRow(id);
  };

  const handleCancelClick = (id: string) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: LineItem) => {
    editRow && editRow(newRow);
    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "productCode",
      headerName: "Product Code",
      editable: !readOnly,
      flex: 1.5,
    },
    {
      field: "description",
      headerName: "Description",
      editable: !readOnly,
      flex: 5,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      editable: !readOnly,
      flex: 1,
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      type: "number",
      editable: !readOnly,
      flex: 1.5,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      type: "number",
      editable: !readOnly,
      flex: 1.5,
    },
  ];

  if (!readOnly) {
    columns.push({
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      flex: 1.5,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <Tooltip title="Save">
                  <SaveIcon />
                </Tooltip>
              }
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={
                <Tooltip title="Cancel">
                  <CancelIcon />
                </Tooltip>
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id as string)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Delete">
                <DeleteIcon />
              </Tooltip>
            }
            label="Delete"
            onClick={handleDeleteClick(id as string)}
            color="inherit"
          />,
        ];
      },
    });
  }

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: readOnly ? null : EditToolbar,
        }}
        slotProps={
          addRows && {
            toolbar: { addRows, setRowModesModel },
          }
        }
      />
    </Box>
  );
};

export default LineItemDataGrid;
