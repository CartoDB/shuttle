export async function requestQuery(query, username, token) {
  token = token === null ? 'default_public' : token;
  const response = await fetch(encodeURI(`https://${username}.carto.com/api/v2/sql?q=${query}&api_key=${token}`));
  return await response.json();
}
