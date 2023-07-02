import { FC, useCallback, useRef, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Alert, Box, Button, Stack } from "@mui/material";

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
        <Box
          {...getRootProps()}
          sx={{
            border: 1,
            backgroundColor: "primary.light",
            padding: 1,
            minHeight: "10rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input {...getInputProps()} accept={accept} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </Box>
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
