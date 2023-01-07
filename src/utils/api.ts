import axios, { AxiosError, RawAxiosRequestHeaders } from 'axios';

/** Used for sending GET requests
 * @param baseURL The url for the specific API you want to send the request to
 * @param url The appended url for the specific REST controller you want to send the request to
 * @param params can be used for attaching parameters to the request
 * @param useEncodedBody defines if request should be sent encoded and use the "Content-Type: 'application/x-www-form-urlencoded'"
 * @returns The response from the GET request encapsulated in a {@link AxiosResponse} promise */
export const getRequest = async <T>(
  baseURL: string,
  url: string,
  params?: unknown,
  withCredentials?: boolean,
  useEncodedBody?: boolean
): Promise<T | undefined> => {
  return await axios
    .get<T>(url, {
      baseURL,
      params,
      withCredentials,
      headers: await defaultHeaders(useEncodedBody),
    })
    .then((x) => x.data)
    .catch((error: AxiosError) => {
      return handleError(error);
    });
};

/** Used for sending POST requests
 * @param baseURL The url for the specific API you want to send the request to
 * @param url The appended url for the specific REST controller you want to send the request to
 * @param body the data to attach to the POST request in the form of the ContentType
 * @param params can be used for attaching parameters to the request
 * @param useEncodedBody defines if request should be sent encoded and use the "Content-Type: 'application/x-www-form-urlencoded'"
 * @returns The response from the POST request */
export const postRequest = async <T>(
  baseURL: string,
  url: string,
  body: object,
  params?: unknown,
  useEncodedBody?: boolean
): Promise<T | undefined> => {
  return await axios
    .post<T>(url, body, {
      baseURL,
      params,
      headers: await defaultHeaders(useEncodedBody),
    })
    .then((x) => x.data)
    .catch((error: AxiosError) => {
      return handleError(error);
    });
};

/** Used for sending PUT requests
 * @param baseURL The url for the specific API you want to send the request to
 * @param url The appended url for the specific REST controller you want to send the request to
 * @param body the data to attach to the POST request in the form of the ContentType
 * @param params can be used for attaching parameters to the request
 * @param useEncodedBody defines if request should be sent encoded and use the "Content-Type: 'application/x-www-form-urlencoded'"
 * @returns The response from the PUT request */
export const putRequest = async <T>(
  baseURL: string,
  url: string,
  body: object,
  params?: unknown,
  useEncodedBody?: boolean
): Promise<T | undefined> => {
  return await axios
    .put<T>(url, body, {
      baseURL,
      params,
      headers: await defaultHeaders(useEncodedBody),
    })
    .then((x) => x.data)
    .catch((error: AxiosError) => {
      return handleError(error);
    });
};

/** Used for sending DELETE requests
 * @param baseURL The url for the specific API you want to send the request to
 * @param url The appended url for the specific REST controller you want to send the request to
 * @param params can be used for attaching parameters to the request
 * @param useEncodedBody defines if request should be sent encoded and use the "Content-Type: 'application/x-www-form-urlencoded'"
 * @returns The response from the DELETE request */
export const deleteRequest = async <T>(
  baseURL: string,
  url: string,
  params?: unknown,
  useEncodedBody?: boolean
): Promise<T | undefined> => {
  return await axios
    .delete<T>(url, {
      baseURL,
      params,
      headers: await defaultHeaders(useEncodedBody),
    })
    .then((x) => x.data)
    .catch((error: AxiosError) => {
      return handleError(error);
    });
};

/** Method to handle a generic way to handle all errors coming from requests to the APIs */
const handleError = (error: AxiosError) => {
  // TODO: Log error to Application Insights here

  if (error.response?.status === 401) {
    console.warn('Unauthorized', error.message);
  } else {
    throw error;
  }
  console.warn('API failed', error);

  return undefined;
};

/** Method to set defaultHeaders and if user is logged in also sets authentication headers */
const defaultHeaders = async (useEncodedBody = false): Promise<RawAxiosRequestHeaders> => {
  // const session = await getSession();

  const headers: RawAxiosRequestHeaders = {
    'Content-Type': useEncodedBody ? 'application/x-www-form-urlencoded' : 'application/json; charset=utf-8',
  };

  // if (session?.accessToken && session.custom) {
  //   headers = {
  //     ...headers,
  //     Authorization: `Bearer ${session.accessToken}`,
  //     ContextIdentifier: session.custom.ContextIdentifier,
  //     InstitutionNumber: session.custom.ContextIdentifierNumber,
  //   };
  // }

  return headers;
};
