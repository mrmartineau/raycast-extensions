import parsedGithubRepoUrl from 'parse-github-url'
import parsedGitlabRepoUrl from 'gitlab-url-parse'

interface ParseRepoUrlResponse {
  owner: string
  name: string
  type?: 'github' | 'gitlab'
}

export const parseRepoUrl = (repoUrl: string): ParseRepoUrlResponse => {
  const isGithubRepo = repoUrl.includes('github.com')
  const isGitlabRepo = repoUrl.includes('gitlab.com')
  const parsedRepo = isGithubRepo
    ? parsedGithubRepoUrl(repoUrl)
    : isGitlabRepo
    ? parsedGitlabRepoUrl(repoUrl)
    : null

  return {
    owner: isGithubRepo
      ? parsedRepo.owner
      : isGitlabRepo
      ? parsedRepo.user
      : '',
    name: isGithubRepo
      ? parsedRepo.name
      : isGitlabRepo
      ? parsedRepo.project
      : '',
    type: isGithubRepo ? 'github' : isGitlabRepo ? 'gitlab' : undefined,
  }
}
