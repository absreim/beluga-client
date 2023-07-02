export function fetchChatgptResults(poDescs: string[], invoiceDescs: string[]) {
  return fetch("https://us-east4-beluga-389917.cloudfunctions.net/chatgpt-proxy", {
    method: "POST",
    body: JSON.stringify({
      poList: poDescs,
      invoiceList: invoiceDescs
    })
  })
}
