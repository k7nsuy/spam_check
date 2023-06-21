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

  // 응답이 3xx 리다이렉션 인 경우
  if (response.status >= 300 && response.status < 400) {
    // response 객체의 header 속성에서 'location' 헤더를 가져와 리다이렉션 위치 확인
    const locationHeader = response.headers.get('location');
    if (locationHeader) { // 만약 locationHeader가 존재하면,
      // isSpam 함수를 통해 Spam check 확인 및 rediectionDepth 1 제거.
      // 3xx 리다이렉션이 없을 때 까지 해당 조건 반복
      return await isSpam(locationHeader, spamLinkDomains, redirectionDepth - 1);
    }
  }
  
  // HTML body에서 <a href="link"></a> 태그를 찾아 스팸 여부를 확인
  const html = await response.text();
  // a tag가 문자열에 포함될 시 true 반환
  const isSpamHtml = html.includes(`<a href="${link}"></a>`);
  if (isSpamHtml) {
    return isSpamHtml;
  }
  
  return false; // 어떤 스팸 조건에도 해당하지 않으면 스팸이 아닙니다.
}