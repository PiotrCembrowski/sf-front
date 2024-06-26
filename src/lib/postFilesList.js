import { address } from "./../utils/site_url";

export async function postFilesList(list) {
  const response = await fetch(`${address}fileslists`, {
    method: "POST",
    body: JSON.stringify(list),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error("An error occured while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { lists } = await response.json();

  return lists;
}
