function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`Ошибка ${response.status}`);
}

export async function request(url, options) {
  const response = await fetch(url, options);
  return checkResponse(response);
}
