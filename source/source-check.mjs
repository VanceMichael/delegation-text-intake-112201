export async function exercise({request,move,data,assert}) {
  assert.match(await (await request('/agenda')).text(), /data-docket="K11"/);
  assert.equal((await data('/attachments/fr17')).segments.length,2);
  await move(1);
  assert.equal((await data('/translations'))[0].refs[0],'A2');
  assert.equal((await data('/attachments/fr17')).segments[0].ref,'A1');
  assert.deepEqual((await data('/official'))[0].withdrawn,['A1']);
  await move(2);
  assert.equal((await data('/attachments/fr21')).segments[0].ref,'A2');
  assert.deepEqual((await data('/official'))[0].current[2].audience,['desk-a']);
  assert.equal((await data('/ack')).at(-1).notice,'N1');
  assert.equal((await data('/official'))[0].changes.at(-1).notice,'N2');
  await move(3);
  assert.equal((await request('/official')).status,503);
}
