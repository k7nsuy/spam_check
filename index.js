 import fetch from "node-fetch"; // HTTP 요청을 보내기 위해 사용

async function isSpam(content, spamLinkDomains, redirectionDepth) {
  // 만약 redirection depth가 0 이면 스팸이 아닙니다.
  if (redirectionDepth === 0) { 
    return false; 
  }

  const response = await fetch(content); // content URL로 HTTP 요청을 보냅니다.
  const finalUrl = response.url; // 리디렉션을 따라 이동한 후의 최종 URL을 가져옵니다.

  // 최종 URL이 스팸 링크 도메인을 포함하는지 확인
  const isSpamLink = spamLinkDomains.some((domain) => finalUrl.includes(domain)); 

  if (isSpamLink) {
    return true; // 스팸 링크라면 true를 반환
  }

  return false; // 어떤 스팸 조건에도 해당하지 않으면 스팸이 아닙니다.
}
