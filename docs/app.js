'use strict';
const $=s=>document.querySelector(s), KEY='life-stable-v5';
const statuses={open:'Đang mở',waiting:'Đang chờ',doing:'Đang làm',done:'Đã xong'};
const outcomes={review:'Đang review',waiting:'Chờ dữ liệu',merged:'Đã chọn',closed:'Không chọn'};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const empty=()=>({version:2,tasks:[],decisions:[],journal:[],jobs:[]});
let state=empty(), storageOK=true, recoveryRaw=null;
function notify(s){$('#notice').textContent=s}
function validCore(s){return s&&(s.version===1||s.version===2)&&['tasks','decisions','journal'].every(k=>Array.isArray(s[k])&&s[k].length<=5000&&s[k].every(o=>o&&typeof o.id==='string'&&typeof o.date==='string'&&Number.isFinite(Date.parse(o.date))&&Object.values(o).every(v=>typeof v==='string'&&v.length<=5000)))&&s.tasks.every(o=>['title','category','next','status'].every(k=>typeof o[k]==='string')&&Object.hasOwn(statuses,o.status))&&s.decisions.every(o=>['title','facts','unknowns','tradeoffs','exit','outcome'].every(k=>typeof o[k]==='string')&&Object.hasOwn(outcomes,o.outcome))&&s.journal.every(o=>typeof o.changed==='string'&&typeof o.next==='string')}
function valid(s){return validCore(s)&&(s.version===1||HRModel.validJobs(s.jobs))}
function normalize(s){return {...s,version:2,jobs:s.version===1?[]:s.jobs}}
try{const raw=localStorage.getItem(KEY);recoveryRaw=raw;if(raw){const parsed=JSON.parse(raw);if(!valid(parsed))throw Error('invalid');state=normalize(parsed);recoveryRaw=null}}catch{storageOK=false;notify('Không đọc được dữ liệu đã lưu. App chưa ghi đè dữ liệu cũ. Dùng Tải nguyên dữ liệu bị lỗi ở cuối trang để cứu bản gốc.');$('#recover-raw').hidden=recoveryRaw===null}
function save(){if(!storageOK){notify('Chưa thể lưu an toàn. Hãy tải nguyên dữ liệu bị lỗi trước khi phục hồi.');render();return false}try{localStorage.setItem(KEY,JSON.stringify(state));notify('Đã lưu trên thiết bị này.');render();return true}catch{notify('Thiết bị không cho lưu hoặc đã hết dung lượng. Nội dung nhập được giữ lại; xuất sao lưu trước khi đóng trang.');render();return false}}
$('#recover-raw').addEventListener('click',()=>{if(recoveryRaw===null)return;const url=URL.createObjectURL(new Blob([recoveryRaw],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download='life-stable-recovery.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
const stamp=()=>({id:crypto.randomUUID(),date:new Date().toISOString()});
const date=s=>new Date(s).toLocaleDateString('vi-VN');
const options=(map,current)=>Object.entries(map).map(([k,v])=>`<option value="${k}" ${k===current?'selected':''}>${v}</option>`).join('');
function render(){const filter=$('#filter').value;const tasks=state.tasks.filter(t=>filter==='all'||(filter==='done'?t.status==='done':t.status!=='done'));$('#task-count').textContent=`${state.tasks.filter(t=>t.status!=='done').length} việc chưa xong`;
$('#tasks').innerHTML=tasks.length?tasks.map(t=>`<article class="card"><div class="meta">${esc(t.category)} · ${date(t.date)}</div><h3>${esc(t.title)}</h3><p>Bước tiếp: ${esc(t.next)}</p><div class="actions"><label>Trạng thái<select data-task="${esc(t.id)}">${options(statuses,t.status)}</select></label><button data-delete="tasks" data-id="${esc(t.id)}">Xóa việc</button></div></article>`).join(''):'<div class="empty"><h3>Chưa có việc trong mục này.</h3><p>Thêm một việc thật sự cần theo dõi. Không cần lấp đầy bảng.</p></div>';
$('#decision-list').innerHTML=state.decisions.length?state.decisions.map(d=>`<article class="card"><div class="meta">PR cá nhân · ${date(d.date)}</div><h3>${esc(d.title)}</h3>${[['Bằng chứng',d.facts],['Còn thiếu',d.unknowns],['Lợi ích & chi phí',d.tradeoffs],['Đường lui',d.exit]].map(([l,v])=>`<p><strong>${l}:</strong> ${esc(v)}</p>`).join('')}<div class="actions"><label>Kết luận<select data-decision="${esc(d.id)}">${options(outcomes,d.outcome)}</select></label><button data-delete="decisions" data-id="${esc(d.id)}">Xóa phiếu</button></div></article>`).join(''):'<div class="empty"><p>Chưa có quyết định cần review. Không cần tự tạo thêm áp lực.</p></div>';
$('#journal-list').innerHTML=state.journal.length?state.journal.map(j=>`<article class="card"><div class="meta">commit · ${date(j.date)}</div><p>${esc(j.changed)}</p><p><strong>Bước tiếp:</strong> ${esc(j.next)}</p><button data-delete="journal" data-id="${esc(j.id)}">Xóa ghi chép</button></article>`).join(''):'<div class="empty"><p>Ghi một điều có thật trong tuần, kể cả việc đã cho mình nghỉ.</p></div>';if(typeof renderHR==='function')renderHR()}
for(const b of document.querySelectorAll('[data-tab]'))b.addEventListener('click',()=>{document.querySelectorAll('[data-tab]').forEach(n=>n.removeAttribute('aria-current'));b.setAttribute('aria-current','page');document.querySelectorAll('.panel').forEach(p=>p.hidden=p.id!==b.dataset.tab)});
function form(id,list,extra={}){$(id).addEventListener('submit',e=>{e.preventDefault();const values=Object.fromEntries(new FormData(e.target));if(Object.values(values).some(v=>!v.trim())){notify('Vui lòng điền nội dung, không chỉ khoảng trắng.');return}const old=state[list];state[list]=[{...values,...extra,...stamp()},...old];if(save())e.target.reset();else{state[list]=old;render()}})}
form('#task-form','tasks');form('#decision-form','decisions',{outcome:'review'});form('#journal-form','journal');$('#filter').addEventListener('change',render);
document.addEventListener('change',e=>{const t=e.target;if(t.dataset.task){state.tasks.find(x=>x.id===t.dataset.task).status=t.value;save()}if(t.dataset.decision){state.decisions.find(x=>x.id===t.dataset.decision).outcome=t.value;save()}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-delete]');if(b&&confirm('Xóa mục này khỏi thiết bị?')){state[b.dataset.delete]=state[b.dataset.delete].filter(x=>x.id!==b.dataset.id);save()}});
function downloadText(text,name,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$('#export').addEventListener('click',()=>{if(!storageOK&&recoveryRaw!==null){downloadText(recoveryRaw,'life-stable-recovery.txt','text/plain');notify('Đã tải nguyên dữ liệu chưa đọc được. Giữ file ở nơi riêng tư để phục hồi.');return}downloadText(JSON.stringify(state,null,2),`life-stable-${new Date().toISOString().slice(0,10)}.json`,'application/json');notify('Đã xuất bản sao. Giữ file ở nơi riêng tư.')});
$('#import').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;let data=null;try{if(f.size>5000000)throw Error('File quá lớn.');data=JSON.parse(await f.text());
 if(data&&data.kind==='life-stable-hr'){
  const incoming=HRModel.parseBundle(data),result=HRModel.mergeJobs(state.jobs||[],incoming);
  if(result.added===0){notify('File hồ sơ ứng tuyển này đã có đủ ID trên thiết bị. Không có gì để thêm.');return}
  if(confirm(`Đây là file hồ sơ ứng tuyển riêng tư. Thêm ${result.added} hồ sơ vào pipeline? Hồ sơ đang có sẽ không bị ghi đè.`)){
   if(!storageOK){notify('Chưa thể nhập hồ sơ vì dữ liệu cũ đang lỗi. Hãy tải nguyên dữ liệu bị lỗi trước; dữ liệu hiện tại được giữ nguyên.');return}
   const old=state,oldOK=storageOK;state=normalize({...state,jobs:result.jobs});storageOK=true;
   if(!save()){state=old;storageOK=oldOK;render()}else notify(`Đã thêm ${result.added} hồ sơ ứng tuyển; giữ nguyên ${result.skipped} hồ sơ đã có.`)
  }
  return
 }
 if(!valid(data))throw Error('File sao lưu toàn bộ không đúng định dạng.');
 if(confirm('Thay thế toàn bộ ghi chép trên thiết bị bằng bản sao này? Hãy xuất dữ liệu hiện tại trước nếu cần.')){const old=state;const oldOK=storageOK;state=normalize(data);storageOK=true;if(!save()){state=old;storageOK=oldOK;render()}else{$('#recover-raw').hidden=true;recoveryRaw=null}}
 }catch(err){notify(err.message==='File quá lớn.'?`${err.message} Dữ liệu hiện tại được giữ nguyên.`:'File sao lưu không đọc được hoặc không đúng định dạng. Dữ liệu hiện tại được giữ nguyên.')}finally{e.target.value=''}});
let installPrompt=null;const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
function installed(){if(standalone()){$('#install').textContent='Đang dùng app';$('#install').disabled=true}}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('#install').textContent='Cài app';$('#install-status').textContent='Trình duyệt đã cho phép cài. Bấm Cài app để tiếp tục.'});
$('#install').addEventListener('click',async()=>{if(installPrompt){const prompt=installPrompt;installPrompt=null;await prompt.prompt();const result=await prompt.userChoice;notify(result.outcome==='accepted'?'Đã chấp nhận yêu cầu cài đặt.':'Đã đóng yêu cầu cài đặt. Bạn vẫn có thể dùng web.')}else{$('#install-guide').open=true;$('#install-guide').scrollIntoView({behavior:'smooth',block:'center'})}});
window.addEventListener('appinstalled',()=>{installPrompt=null;$('#install').textContent='Đã cài app';$('#install').disabled=true;notify('Đã cài. Mở Giác ngộ từ màn hình chính.')});
if('serviceWorker'in navigator&&window.isSecureContext){navigator.serviceWorker.register('./sw.js').then(async()=>{await navigator.serviceWorker.ready;if(!installPrompt)$('#install-status').textContent='Đã sẵn sàng chạy ngoại tuyến. Cài trực tiếp còn tùy trình duyệt; nếu chưa có lời mời, dùng hướng dẫn bên dưới.'}).catch(()=>{$('#install-status').textContent='Chưa chuẩn bị được chế độ ngoại tuyến. Kiểm tra kết nối rồi tải lại trang.'})}else{$('#install-status').textContent='Trình duyệt hoặc kết nối hiện tại chưa hỗ trợ chế độ ngoại tuyến. Hãy mở link HTTPS trực tiếp bằng Chrome hoặc Safari.'}
installed();render();
