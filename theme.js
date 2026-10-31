(() => {
 const presets=[['Фиолетовый','#8b5cf6'],['Синий','#3985f5'],['Бирюзовый','#14b8a6'],['Розовый','#ec4899'],['Оранжевый','#f97316']];
 const apply=hex=>{
  if(!/^#[0-9a-f]{6}$/i.test(hex))return;
  const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
  const root=document.documentElement;
  root.style.setProperty('--accent-rgb',rgb.join(' '));
  root.style.setProperty('--orange',hex);root.style.setProperty('--orange-soft',hex);
  root.style.setProperty('--violet',hex);
  root.style.setProperty('--logo-start',hex);
  root.style.setProperty('--logo-end','hsl('+((rgb[2]>rgb[0]?190:260))+' 95% 65%)');

  document.querySelectorAll('[data-color]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.color===hex)));
 };
 const saved='#8b5cf6';
 apply(saved||'#8b5cf6');
 let id=0;
 document.querySelectorAll('img').forEach(img=>{
  const src=img.getAttribute('src')||'';
  if(!/(?:logo|favicon)\.png/.test(src))return;
  const gid='brand-gradient-'+id++;
  const mark='<svg viewBox="0 0 110 90" aria-hidden="true"><defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="1" y2=".6"><stop stop-color="var(--logo-start,#8b5cf6)"/><stop offset="1" stop-color="var(--logo-end,#22d3ee)"/></linearGradient></defs><g fill="url(#'+gid+')"><path d="M25 10H67C98 10 102 53 68 53H62L91 81H70L42 53H45V81L28 81V59C28 47 37 41 48 41H65C81 41 81 25 66 25H44C37 25 31 18 25 10Z"/><path d="M29 35C-14 57 2 72 35 65V61C10 66 8 55 29 35ZM89 25C124 25 116 49 69 64L65 60C99 47 115 32 89 25Z"/></g></svg>';
  const holder=document.createElement('span');
  holder.className='svg-brand'+(src.includes('favicon')?' svg-mark':'');
  holder.innerHTML=mark+(src.includes('logo')?'<span>RakCloude</span>':'');
  holder.setAttribute('role','img');holder.setAttribute('aria-label','RakCloude');
  img.replaceWith(holder);
 });

})();
