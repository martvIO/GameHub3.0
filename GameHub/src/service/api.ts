type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface HttpRequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any; // Body can be JSON, FormData, or any other type
  queryParams?: Record<string, string>; // Optional query parameters
}

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Sends an HTTP request.
   * @param endpoint The API endpoint (e.g., "/users").
   * @param options Configuration options for the request.
   * @returns A Promise resolving to the response JSON or error message.
   */
  public async request<T = any>(endpoint: string, options: HttpRequestOptions = {}): Promise<T> {
    const { method = 'GET', headers = {}, body, queryParams } = options;

    // Construct URL with query parameters if provided
    let url = `${this.baseUrl}${endpoint}`;
    if (queryParams) {
      const query = new URLSearchParams(queryParams).toString();
      url += `?${query}`;
    }

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json', // Default to JSON
        ...headers,
      },
    };

    // Attach body if provided
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      // Return parsed JSON response
      return (await response.json()) as T;
    } catch (error) {
      console.error('HTTP Request Error:', error);
      throw error;
    }
  }

  /**
   * Convenience method for GET requests.
   */
  public get<T = any>(endpoint: string, queryParams?: Record<string, string>, headers?: Record<string, string>): Promise<T> {
    return this.request(endpoint, { method: 'GET', queryParams, headers });
  }

  /**
   * Convenience method for POST requests.
   */
  public post<T = any>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request(endpoint, { method: 'POST', body, headers });
  }

  /**
   * Convenience method for PUT requests.
   */
  public put<T = any>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request(endpoint, { method: 'PUT', body, headers });
  }

  /**
   * Convenience method for DELETE requests.
   */
  public delete<T = any>(endpoint: string, queryParams?: Record<string, string>, headers?: Record<string, string>): Promise<T> {
    return this.request(endpoint, { method: 'DELETE', queryParams, headers });
  }
}
