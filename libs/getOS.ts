function getOS (): string {
  if (!process.client) {
    return
  }

  const userAgent = navigator.userAgent
  const platform = (navigator as Navigator & { userAgentData: { platform: string }})?.userAgentData?.platform || navigator?.platform || 'unknown'
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']
  let os = null

  if (macosPlatforms.includes(platform)) {
    os = 'MacOS'
  } else if (iosPlatforms.includes(platform)) {
    os = 'iOS'
  } else if (windowsPlatforms.includes(platform)) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux'
  }

  return os
}

export default getOS
