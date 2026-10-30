(() => {
  const cabinet = document.querySelector('.cabinet');
  const icon = (path) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+path+'</svg>';
  const icons = {
    home:icon('<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>'),
    accounts:icon('<rect x="3" y="4" width="18" height="16" rx="4"/><circle cx="9" cy="10" r="2"/><path d="M6 16c0-3 6-3 6 0m3-7h3m-3 4h3"/>'),
    stats:icon('<path d="M4 20h16M7 16V9m5 7V4m5 12v-5"/>'),
    profile:icon('<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>'),
    more:icon('<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>')
  };
  if(cabinet){
    document.querySelectorAll('[data-account-menu]').forEach(button=>{
      const dialog=document.createElement('dialog');dialog.className='app-more-sheet';
      dialog.innerHTML='<div class="sheet-handle"></div><div class="sheet-title"><h2>Test_User</h2><button type="button" aria-label="Закрыть действия">×</button></div><a href="account.html">Открыть аккаунт <span>↗</span></a><a href="account-settings.html">Настройки аккаунта <span>↗</span></a>';
      document.body.append(dialog);
      button.onclick=()=>{dialog.showModal();document.body.classList.add('sheet-open')};
      const close=()=>{dialog.close();document.body.classList.remove('sheet-open')};
      dialog.querySelector('button').onclick=close;
      dialog.addEventListener('click',e=>{if(e.target===dialog)close()});
      dialog.addEventListener('close',()=>document.body.classList.remove('sheet-open'));
    });
    const page=location.pathname.split('/').pop();
    const items=[['dashboard.html','Обзор','home'],['accounts.html','Аккаунты','accounts'],['stats.html','Статистика','stats'],['profile.html','Профиль','profile']];
    const nav=document.createElement('nav');nav.className='app-bottom-nav';nav.setAttribute('aria-label','Основные разделы');
    nav.innerHTML=items.map(([href,label,key])=>'<a href="'+href+'" '+((page===href || (key==='accounts'&&page.startsWith('account')))?'aria-current="page"':'')+'>'+icons[key]+'<span>'+label+'</span></a>').join('')+'<button type="button" aria-label="Другие разделы" aria-haspopup="dialog">'+icons.more+'<span>Ещё</span></button>';
    document.body.append(nav);
    const sheet=document.createElement('dialog');sheet.className='app-more-sheet';
    sheet.innerHTML='<div class="sheet-handle"></div><div class="sheet-title"><h2>Другие разделы</h2><button type="button" aria-label="Закрыть меню">×</button></div><a href="billing.html">Тарифы и оплата <span>↗</span></a><a href="news.html">Новости проекта <span>↗</span></a><a href="admin.html">Админка <span>↗</span></a><a href="index.html">Главная сайта <span>↗</span></a><a href="mailto:rakcloude.support@gmail.com">Поддержка <span>↗</span></a>';
    document.body.append(sheet);
    nav.querySelector('button').onclick=()=>{sheet.showModal();document.body.classList.add('sheet-open')};
    const close=()=>{sheet.close();document.body.classList.remove('sheet-open')};
    sheet.querySelector('button').onclick=close;
    sheet.addEventListener('click',e=>{if(e.target===sheet)close()});
    sheet.addEventListener('close',()=>document.body.classList.remove('sheet-open'));
    if(page==='accounts.html'){
      const toolbar=document.querySelector('.workspace-toolbar');
      const buttons=[...toolbar.querySelectorAll('button')];
      const toggle=document.createElement('button');toggle.className='bulk-toggle';toggle.type='button';toggle.textContent='Массовые действия';toggle.setAttribute('aria-expanded','false');
      const panel=document.createElement('div');panel.className='bulk-panel';panel.id='bulk-actions';
      buttons.forEach(b=>panel.append(b));toolbar.prepend(toggle,panel);
      toggle.setAttribute('aria-controls',panel.id);
      toggle.onclick=()=>{const open=panel.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))};
    }
    document.querySelectorAll('table').forEach(table=>{
      const headings=[...table.querySelectorAll('th')].map(h=>h.textContent.trim());
      table.querySelectorAll('tbody tr').forEach(row=>[...row.cells].forEach((cell,i)=>{if(cell.colSpan===1)cell.dataset.label=headings[i]||''}));
    });
    const toast=document.createElement('div');toast.className='app-toast';toast.setAttribute('role','status');document.body.append(toast);
    let timeout;
    const showToast=()=>{toast.textContent='Просмотр дизайна: действие пока не подключено';toast.classList.add('visible');clearTimeout(timeout);timeout=setTimeout(()=>toast.classList.remove('visible'),3500)};
    document.querySelectorAll('[data-preview-action]').forEach(b=>b.addEventListener('click',showToast));
    document.querySelectorAll('[data-preview-form]').forEach(f=>f.addEventListener('submit',showToast));
  }
})();
if(window.visualViewport){const syncKeyboard=()=>document.body.classList.toggle("keyboard-open",window.innerHeight-window.visualViewport.height>140);window.visualViewport.addEventListener("resize",syncKeyboard)}
