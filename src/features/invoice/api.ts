export function fetchDocumentAiResults(file: File) {
  const formData = new FormData();
  formData.append("invoice", file);
  return fetch("https://us-east4-beluga-389917.cloudfunctions.net/proxy-api", {
    method: "POST",
    body: formData,
  });
}
