import fetch from 'node-fetch'
import { getChangeLogUrl } from '../utils/getChangelogUrl'
import { parseRepoUrl } from '../utils/parseRepoUrl'
import type { NpmFetchResponse } from '../npmResponse.model'

type Input = {
  query: string
}

/**
 * Search API: https://www.npmjs.com/search?page=0&q=react
 * - &sortBy=score - default
 * - &sortBy=dependent_count
 * - &sortBy=downloads_weekly
 * - &sortBy=downloads_monthly
 * - &sortBy=published_at
 */

const fetchPackages = async (query: string): Promise<NpmFetchResponse> => {
  console.log(`🚀 ~ fetchPackages ~ query:`, query)
  // const url = `https://www.npmjs.com/search?page=0&sortBy=score&q=${query.replace(
  //   /\s/g,
  //   '+',
  // )}`
  const url = `https://registry.npmjs.org/-/v1/search?size=5&text=${query.replace(
    /\s/g,
    '+',
  )}`
  console.log(`🚀 ~ fetchPackages ~ url:`, url)
  const response = await fetch(url)
  const data = await response.json()
  return data?.objects
}

export default async function (input: Input) {
  console.log(`🚀 ~ input:`, input)
  const packages = await fetchPackages(input.query)
  const packagesWithLinks = packages.map((pkg) => {
    const { owner, name, type } = parseRepoUrl(pkg.package.links.repository)
    const changelogUrl = getChangeLogUrl(type, owner, name)
    return {
      ...pkg,
      package: {
        ...pkg.package,
        links: {
          ...pkg.links,
          changelog: changelogUrl,
        },
      },
    }
  })
  return packagesWithLinks
}
