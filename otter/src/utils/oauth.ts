import { OAuth, getPreferenceValues } from '@raycast/api'
import fetch from 'node-fetch'
import urlJoin from 'proper-url-join'

const prefs = getPreferenceValues()

const clientId = prefs.otterOAuthClientId
const clientSecret = prefs.otterOAuthClientSecret

export const client = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: 'Otter',
  providerIcon: 'command-icon.png',
  providerId: 'otter',
  description: 'Connect your Otter account…',
})

export async function authorize() {
  const tokenSet = await client.getTokens()
  console.log(`🚀 ~ authorize ~ getTokens:`, tokenSet)

  if (tokenSet?.accessToken) {
    if (tokenSet?.refreshToken && tokenSet?.isExpired()) {
      const tokens = await refreshTokens(tokenSet.refreshToken)
      await client.setTokens(tokens)
      return tokens.access_token
    }
    return tokenSet.accessToken
  }

  const authRequest = await client.authorizationRequest({
    endpoint: urlJoin(prefs.otterBasePath, 'auth', 'connect'),
    clientId,
    scope: 'Auth:Read Database:Read',
  })

  const { authorizationCode } = await client.authorize(authRequest)
  console.log(`🚀 ~ authorize ~ authorizationCode:`, authorizationCode)

  const tokens = await fetchTokens(authRequest, authorizationCode)
  console.log(`🚀 ~ authorize ~ tokens:`, tokens)
  await client.setTokens(tokens)
  return tokens.access_token
}

async function fetchTokens(
  authRequest: OAuth.AuthorizationRequest,
  authCode: string
) {
  console.log(`🚀 ~ fetchTokens authCode:`, authCode)
  console.log(`🚀 ~ fetchTokens authRequest:`, authRequest)
  const response = await fetch('https://api.supabase.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: authCode,
      code_verifier: authRequest.codeVerifier,
      redirect_uri: authRequest.redirectURI,
    }),
  })

  if (!response.ok) {
    console.error('Fetch tokens error: ', await response.text())
    throw new Error(response.statusText)
  }

  return (await response.json()) as OAuth.TokenResponse
}

async function refreshTokens(
  refreshToken: string
): Promise<OAuth.TokenResponse> {
  console.log(`🚀 ~ refreshToken:`, refreshToken)
  const response = await fetch('https://api.supabase.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  if (!response.ok) {
    console.error('refresh tokens error:', await response.text())
    throw new Error(response.statusText)
  }

  const tokenResponse = (await response.json()) as OAuth.TokenResponse
  tokenResponse.refresh_token = tokenResponse.refresh_token ?? refreshToken

  return tokenResponse
}
