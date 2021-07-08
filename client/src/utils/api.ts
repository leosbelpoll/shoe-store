import { API_URL } from "../configs";
import { getEnv } from "./env";

type DynamicObject = { [key: string]: any };

const apiUrl = getEnv(API_URL);

const getEndpoint = (resource: string) => `${apiUrl}/${resource}`;

export const postData = async (resource: string, data: DynamicObject) => {
  return sendData("POST", resource, data);
};

export const putData = async (resource: string, data: DynamicObject) => {
  return sendData("PUT", resource, data);
};

export const getData = async (resource: string) => {
  const response = await fetch(getEndpoint(resource));
  if (!response.ok) throw Error("API Error");
  const json = await response.json();
  return json;
};

const sendData = async (
  method: string,
  resource: string,
  data: DynamicObject
) => {
  const response = await fetch(getEndpoint(resource), {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.text();
    throw Error(message);
  }

  const json = await response.json();

  return json;
};
