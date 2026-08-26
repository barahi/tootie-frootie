import axios from "axios";
const BASE_URI = "http://localhost:8080";

export async function post<REQUEST, RESPONSE>(
  path: string,
  body: REQUEST,
): Promise<RESPONSE> {
  const response = await axios.post<RESPONSE>(`${BASE_URI}/${path}`, body);
  if (200 <= response.status && response.status <= 299) {
    return response.data;
  }
  throw new Error("Error");
}

export class NetworkError extends Error {
  public status?: number;

  constructor(message?: string, status?: number, options?: ErrorOptions) {
    super(message, options);
    this.name = "NetworkError";
    this.status = status;
    console.info(
      `Network error encountered (${status ?? "no status"}):`,
      message,
    );
  }
}
