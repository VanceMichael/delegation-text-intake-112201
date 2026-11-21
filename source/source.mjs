export async function source({url,frame,json,html}) {
  if (url.pathname === '/agenda') {
    return html(200, '<main><article data-docket="K11"><h1>资源适应议案</h1><time>' +
      frame.day + '</time><p>' + frame.committee + '</p></article></main>');
  }
  if (url.pathname === '/attachments/fr17') return json(200, { docket:'K11', lang:'fr', segments:frame.actual });
  if (url.pathname === '/attachments/fr21' && frame.new) return json(200, { docket:'K11', lang:'fr', segments:frame.new });
  return false;
}
