import { OAuth, getPreferenceValues } from '@raycast/api'
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

const prefs = getPreferenceValues<{
  oauthClientId: string
  supabaseUrl: string
  supabaseAnonKey: string
  otterBasePath: string
  showDetailView: boolean
}>()

const oauthClient = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: 'Otter',
  providerIcon: 'command-icon.png',
  description: 'Connect your Otter Bookmarks account',
})

export const supabase = createClient<Database>(
  prefs.supabaseUrl,
  prefs.supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  },
)

export async function authorize() {
  const tokenSet = await oauthClient.getTokens()

  if (tokenSet?.accessToken) {
    if (tokenSet.refreshToken && tokenSet.isExpired()) {
      const newTokens = await refreshTokens(tokenSet.refreshToken)
      await oauthClient.setTokens(newTokens)
      await supabase.auth.setSession({
        access_token: newTokens.access_token,
        refresh_token: newTokens.refresh_token!,
      })
    } else {
      await supabase.auth.setSession({
        access_token: tokenSet.accessToken,
        refresh_token: tokenSet.refreshToken!,
      })
    }
    return
  }

  const authRequest = await oauthClient.authorizationRequest({
    endpoint: `${prefs.supabaseUrl}/auth/v1/oauth/authorize`,
    clientId: prefs.oauthClientId,
    scope: 'email',
  })

  const { authorizationCode } = await oauthClient.authorize(authRequest)
  const tokens = await fetchTokens(authRequest, authorizationCode)
  await oauthClient.setTokens(tokens)
  await supabase.auth.setSession({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token!,
  })
}

async function fetchTokens(
  authRequest: OAuth.AuthorizationRequest,
  authCode: string,
): Promise<OAuth.TokenResponse> {
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', authCode)
  params.append('client_id', prefs.oauthClientId)
  params.append('code_verifier', authRequest.codeVerifier)
  params.append('redirect_uri', authRequest.redirectURI)

  const response = await fetch(`${prefs.supabaseUrl}/auth/v1/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      apikey: prefs.supabaseAnonKey,
    },
    body: params,
  })

  if (!response.ok) {
    console.error('fetch tokens error:', await response.text())
    throw new Error(response.statusText)
  }

  return (await response.json()) as OAuth.TokenResponse
}

async function refreshTokens(
  refreshToken: string,
): Promise<OAuth.TokenResponse> {
  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', refreshToken)
  params.append('client_id', prefs.oauthClientId)

  const response = await fetch(`${prefs.supabaseUrl}/auth/v1/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      apikey: prefs.supabaseAnonKey,
    },
    body: params,
  })

  if (!response.ok) {
    console.error('refresh tokens error:', await response.text())
    throw new Error(response.statusText)
  }

  return (await response.json()) as OAuth.TokenResponse
}
