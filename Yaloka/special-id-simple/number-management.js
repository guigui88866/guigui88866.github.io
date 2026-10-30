const safe=v=>String(v??'—').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let writing=false,actionSnapshot=null;
function renderSplit(){
 if(writing){const previous=SpecialDemo.read().pool,stamp=SpecialDemo.format(SpecialDemo.now());rows.forEach(r=>{const old=previous.find(x=>x.id===r.id);if(!old)r.created=stamp;if(!old||JSON.stringify(old)!==JSON.stringify(r))r.updated=stamp});SpecialDemo.updatePool(rows)}
 rows=SpecialDemo.read().pool;
 const value=id=>document.getElementById(id)?.value.trim()||'';
 filtered=rows.filter(r=>(!userView||r.use==='used')&&(!value('qNumber')||r.id===value('qNumber'))&&(!value('qLevel')||r.level===value('qLevel'))&&(!value('qSale')||r.sale===value('qSale'))&&(!value('qUid')||r.uid===value('qUid'))&&(!value('qSource')||r.source===value('qSource')));
 const pages=Math.max(1,Math.ceil(filtered.length/poolSize));poolPage=Math.max(1,Math.min(poolPage,pages));
 document.getElementById('tbody').innerHTML=filtered.slice((poolPage-1)*poolSize,poolPage*poolSize).map(r=>`<tr><td><b>${safe(r.id)}</b></td><td><span class="tag blue">${safe(r.level)}</span></td>${userView?`<td>${safe(r.uid)}</td><td>${safe(r.source)}</td><td>${safe(r.bindTime)}</td><td>${safe(r.expiry)}</td><td>${['续期','换号','回收'].map(t=>`<button class="link ${t==='回收'?'red':'blue'}" onclick="openNumberAction('${r.id}','${t}')">${t}</button>`).join(' ')}</td>`:`<td>${saleTag(r)}</td><td>${safe(r.created)}</td><td>${safe(r.updated)}</td><td>${r.use==='used'?'<span class="muted">—</span>':`<button class="link ${r.sale==='available'?'red':'green'}" onclick="toggleSale('${r.id}')">${r.sale==='available'?'设为不可售':'设为可售'}</button>`}</td>`}</tr>`).join('')||`<tr><td colspan="${userView?7:6}" class="empty">暂无符合条件的号码</td></tr>`;
 document.getElementById('pageInfo').textContent='共 '+filtered.length+' 条 · 第 '+poolPage+' / '+pages+' 页';
}
resetFilters=function(){document.querySelectorAll('.filters input,.filters select').forEach(e=>e.value='');poolPage=1;render()};
const oldAction=openNumberAction;
openNumberAction=function(id,type){rows=SpecialDemo.read().pool;const r=rows.find(x=>x.id===id);if(!r||r.use!=='used'){render();toast('号码状态已变化，请刷新后重试');return}actionSnapshot=JSON.stringify(r);oldAction(id,type)};
for(const name of ['toggleSale','saveManualRows','submitAssignment','confirmNumberAction']){
 const original=window[name];
 window[name]=function(...args){rows=SpecialDemo.read().pool;
 if(name==='confirmNumberAction'&&JSON.stringify(rows.find(r=>r.id===activeActionId))!==actionSnapshot){closeModal('numberActionModal');render();toast('号码状态已变化，请重新操作');return}
 writing=true;try{return original(...args)}finally{writing=false}
 };
}
async function importNumbers(input){
 const file=input.files[0];if(!file)return;
 try{const text=(await file.text()).replace(/^\uFEFF/,'');let lines=text.trim().split(/\r?\n/).filter(x=>x.trim());if(/靓号|号码|number|special/i.test(lines[0]||''))lines.shift();if(!lines.length)throw Error('文件中没有号码');
 rows=SpecialDemo.read().pool;const seen=new Set(rows.map(r=>r.id)),pending=[];
 for(const [i,line] of lines.entries()){const parts=line.split(',').map(x=>x.trim().replace(/^"|"$/g,'')),[id,level]=parts;if(parts.length!==2||!/^[1-9]\d{5}$/.test(id)||!levelOptions.includes(level))throw Error('第 '+(i+1)+' 条号码或等级无效');if(seen.has(id))throw Error('号码 '+id+' 重复，未导入任何号码');seen.add(id);pending.push({id,level,use:'free',sale:'available',uid:'—',bindTime:'—',expiry:'—'})}
 rows.unshift(...pending);writing=true;render();toast('成功导入 '+pending.length+' 个号码');
 }catch(e){toast(e.message)}finally{writing=false;input.value=''}
}
window.addEventListener('storage',()=>render());
window.addEventListener('focus',()=>render());
setInterval(()=>render(),10000);
render();
