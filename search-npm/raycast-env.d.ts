/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Default Package Manager - The package manager to use by default */
  "defaultCopyAction": "yarn" | "npm" | "pnpm",
  /** Secondary Package Manager - The secondary package manager to use */
  "secondaryCopyAction": "yarn" | "npm" | "pnpm",
  /** Default Open Action - How to open the selected package when Enter is pressed */
  "defaultOpenAction": "openRepository" | "openHomepage" | "npmPackagePage" | "skypackPackagePage",
  /** History Count - How many items to store in your history */
  "historyCount": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `index` command */
  export type Index = ExtensionPreferences & {}
  /** Preferences accessible in the `favorites` command */
  export type Favorites = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `index` command */
  export type Index = {}
  /** Arguments passed to the `favorites` command */
  export type Favorites = {}
}

