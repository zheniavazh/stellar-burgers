type TRequestOptions = {
  method: string;
  headers: {
    [key: string]: string;
  };
};

function checkResponse(response: Response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`Ошибка ${response.status}`);
}

export async function request(url: string, options: TRequestOptions) {
  const response = await fetch(url, options);
  return checkResponse(response);
}
