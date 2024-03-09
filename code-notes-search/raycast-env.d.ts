/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `index` command */
  export type Index = ExtensionPreferences & {
  /** URL for your code notes site - This will prefix the `url` attribute of your records. */
  "baseUrl": string,
  /** Algolia Application ID - You can find your Application ID from the Algolia Dashboard. */
  "appId": string,
  /** Algolia Index Name - Specify the Algolia Index you want to search on. */
  "indexName": string,
  /** Algolia Search API Key - You can find your Search API Key from the Algolia Dashboard. */
  "apiKey": string
}
}

declare namespace Arguments {
  /** Arguments passed to the `index` command */
  export type Index = {}
}

