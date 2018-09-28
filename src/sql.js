export async function requestQuery(query, username) {
  const response = await fetch(encodeURI(`https://${username}.carto.com/api/v2/sql?q=${query}&api_key=default_public`));
  return await response.json();
}
