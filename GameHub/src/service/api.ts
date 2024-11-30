type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface HttpRequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any; // Body can be JSON, FormData, or any other type
  queryParams?: Record<string, string>; // Optional query parameters
}

interface HttpResponse<T = any> {
  success: boolean;
  data?: T;
  statusCode: number;
  error?: any;
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
   * @returns A Promise resolving to the response data, status code, and success flag.
   */
  public async request<T = any>(endpoint: string, options: HttpRequestOptions = {}): Promise<HttpResponse<T>> {
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
        const errorText = await response.json();
        return {
          success: false,
          data: null,
          statusCode: response.status,
          error: {
            status: response.status,
            statusText: response.statusText,
            detail: errorText.detail,
          },
        };
      }

      // Return parsed JSON response
      const data = await response.json();
      return {
        success: true,
        data: data as T,
        statusCode: response.status,
      };
    } catch (error: any) {
      console.error('HTTP Request Error:', error);
      return {
        success: false,
        data: null,
        statusCode: 0, // Indicate a network error or other unexpected failure
        error: {
          message: error.message || 'An unknown error occurred',
        },
      };
    }
  }

  /**
   * Convenience method for GET requests.
   */
  public get<T = any>(endpoint: string, queryParams?: Record<string, string>, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request(endpoint, { method: 'GET', queryParams, headers });
  }

  /**
   * Convenience method for POST requests.
   */
  public post<T = any>(endpoint: string, body: any, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request(endpoint, { method: 'POST', body, headers });
  }

  /**
   * Convenience method for PUT requests.
   */
  public put<T = any>(endpoint: string, body: any, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request(endpoint, { method: 'PUT', body, headers });
  }

  /**
   * Convenience method for DELETE requests.
   */
  public delete<T = any>(endpoint: string, queryParams?: Record<string, string>, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request(endpoint, { method: 'DELETE', queryParams, headers });
  }
}
