const RESOURCE_NAME = 'npwd-forge-garage';

export async function fetchNui<TResponse, TData = unknown>(event: string, data?: TData): Promise<TResponse> {
  const response = await fetch(`https://${RESOURCE_NAME}/${event}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data ?? {}),
  });

  return response.json() as Promise<TResponse>;
}