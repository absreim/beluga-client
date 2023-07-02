import { FC, useCallback, useRef, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Alert, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../redux/hooks.ts";
import { selectLoadingState, uploadInvoice } from "./slice.ts";

type OnDropHandler = DropzoneOptions['onDrop']

const FileUpload: FC = () => {
  const [filesPresent, setFilesPresent] = useState<boolean>(false);
  const files = useRef<File[] | null>(null);
  const onDrop: OnDropHandler = useCallback(
    (acceptedFiles: File[]) => {
      setFilesPresent(true);
      files.current = acceptedFiles;
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const loadingState = useAppSelector(selectLoadingState);
  const dispatch = useAppDispatch();

  const handleUpload = () => {
    if (files.current) {
      dispatch(uploadInvoice(files.current[0]));
    }
  };

  return (
    <Box>
      {loadingState === "failed" && (
        <Alert color="error">Error uploading file.</Alert>
      )}
      {!filesPresent && (
        <Paper
          {...getRootProps()}
          sx={{
            backgroundColor: "primary.light",
            padding: 1,
            minHeight: "10rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input {...getInputProps()} accept="application/pdf" />
          {isDragActive ? (
            <Typography>Drop the files here ...</Typography>
          ) : (
            <Typography>Drag 'n' drop some files here, or click to select files</Typography>
          )}
        </Paper>
      )}
      {filesPresent && (
        <Stack direction="row">
          <Button
            variant="outlined"
            onClick={() => setFilesPresent(false)}
            disabled={loadingState === "loading"}
          >
            Select Other File
          </Button>
          <Button
            variant="contained"
            disabled={loadingState === "loading"}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default FileUpload;
