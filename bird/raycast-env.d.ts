/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Bird CLI Path - Full path to bird binary. Run 'which bird' in terminal to find it. */
  "birdPath"?: string,
  /** Default Count - Number of tweets to fetch */
  "defaultCount": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `bookmarks` command */
  export type Bookmarks = ExtensionPreferences & {}
  /** Preferences accessible in the `likes` command */
  export type Likes = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `bookmarks` command */
  export type Bookmarks = {}
  /** Arguments passed to the `likes` command */
  export type Likes = {}
}

