import { FC, useCallback, useRef, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Alert, Box, Button, Paper, Stack, Typography } from "@mui/material";

type OnDropHandler = DropzoneOptions['onDrop']

interface Props {
  accept: string
  handleUpload: (files: File[]) => void
  loadingState: 'idle' | 'loading' | 'failed'
}

const FileUpload: FC<Props> = ({ accept, handleUpload, loadingState }) => {
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
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} accept={accept} />
          {isDragActive ? (
            <Typography>Drop invoice here</Typography>
          ) : (
            <Typography>Upload Invoice</Typography>
          )}
        </Paper>
      )}
      {filesPresent && (
        <Stack direction="row" gap={2}>
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
            onClick={() => files.current && handleUpload(files.current)}
          >
            Upload
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default FileUpload;
