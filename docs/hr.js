'use strict';
const hrForm=document.querySelector('#hr-form');
let hrImportPending=null;
function todayLocal(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function hrDate(s){return s?s.split('-').reverse().join('/'):'Chưa ghi nhận'}
function commitJobs(jobs){const old=state.jobs;state.jobs=jobs;if(save())return true;state.jobs=old;render();return false}
function renderHR(){
 const list=state.jobs||[],today=todayLocal();
 const live=list.filter(j=>j.archived==='no');
 $('#hr-stats').innerHTML=`<span><strong>${live.filter(j=>!['closed','accepted'].includes(j.status)).length}</strong> đang theo dõi</span><span><strong>${live.filter(j=>HRModel.due(j,today)).length}</strong> đến điểm xem lại</span><span><strong>${live.filter(j=>j.freshness==='historical').length}</strong> cần xác minh</span>`;
 const query=$('#hr-search').value.trim().toLocaleLowerCase('vi'),filter=$('#hr-filter').value;
 const selected=list.filter(j=>`${j.company} ${j.role}`.toLocaleLowerCase('vi').includes(query)&&(filter==='archived'?j.archived==='yes':j.archived==='no'&&(filter==='all'||filter==='due'&&HRModel.due(j,today)||filter==='historical'&&j.freshness==='historical'||filter==='active'&&!['accepted','closed'].includes(j.status))));
 selected.sort((a,b)=>Number(HRModel.due(b,today))-Number(HRModel.due(a,today))||a.company.localeCompare(b.company,'vi'));
 $('#hr-count').textContent=`${selected.length} hồ sơ phù hợp · ${list.length} hồ sơ trên thiết bị`;
 $('#hr-list').innerHTML=selected.length?selected.map(j=>{
 const decision=state.decisions.find(d=>d.id===j.decisionId);
 return `<article class="card hr-card ${HRModel.due(j,today)?'hr-due':''}"><h3>${esc(j.company)}</h3><p>${esc(j.role)}</p><span class="hr-badge">${esc(HRModel.statuses[j.status])}</span><span class="hr-badge ${j.freshness==='historical'?'hr-stale':''}">${j.freshness==='historical'?'Thông tin cũ — cần xác minh':'Đã xác minh tại mốc ghi nhận'}</span><p><strong>Bước tiếp:</strong> ${esc(j.next)||'Chưa ghi nhận'}</p><p class="hr-note">Ghi nhận: ${hrDate(j.asOf)} · Xem lại: ${hrDate(j.reviewOn)}</p><details><summary>Nguồn & chi tiết</summary><p><strong>Nguồn:</strong> ${esc(j.source)||'Chưa có'}</p><p>Liên hệ gần nhất: ${hrDate(j.lastContact)}</p><p>${esc(j.notes)||'Chưa có ghi chú'}</p><p>Phiếu review: ${decision?esc(decision.title):j.decisionId?'Phiếu đã bị xóa — liên kết cần cập nhật':'Chưa liên kết'}</p></details><div class="actions"><button data-hr-edit="${esc(j.id)}">Sửa hồ sơ</button>${j.archived==='yes'?`<button data-hr-restore="${esc(j.id)}">Khôi phục</button>`:`<button data-hr-archive="${esc(j.id)}">Lưu trữ</button><button data-hr-review="${esc(j.id)}">${decision?'Mở phiếu review':'Soạn phiếu review'}</button>`}</div></article>`;
 }).join(''):'<div class="empty"><h3>Chưa có hồ sơ trong mục này.</h3><p>Thêm một hồ sơ hoặc nhập file riêng tư bên dưới. App không tự lấy hồ sơ cá nhân từ GitHub.</p></div>';
 const picker=$('#hr-decision'),current=picker.value;
 picker.innerHTML='<option value="">Chưa liên kết</option>'+state.decisions.map(d=>`<option value="${esc(d.id)}">${esc(d.title)}</option>`).join('');
 if(state.decisions.some(d=>d.id===current))picker.value=current;
}
hrForm.addEventListener('submit',e=>{e.preventDefault();
 const values=Object.fromEntries(new FormData(hrForm));Object.keys(values).forEach(k=>values[k]=values[k].trim());
 const prior=state.jobs.find(j=>j.id===values.id),now=new Date().toISOString();
 const job={...values,id:prior?prior.id:crypto.randomUUID(),createdAt:prior?prior.createdAt:now,updatedAt:now,archived:prior?prior.archived:'no'};
 if(!HRModel.validJob(job)||!job.next){notify('Điền công ty, vị trí, bước tiếp theo. Trạng thái khác Chưa rõ cần nguồn và ngày ghi nhận hợp lệ.');return}
 if(job.asOf>todayLocal()||job.lastContact>todayLocal()){notify('Ngày ghi nhận và lần liên hệ đã xảy ra không thể ở tương lai.');return}
 const jobs=prior?state.jobs.map(j=>j.id===job.id?job:j):[job,...state.jobs];
 if(!HRModel.validJobs(jobs)){notify('Không thể lưu: dữ liệu hồ sơ không hợp lệ hoặc vượt giới hạn.');return}
 if(commitJobs(jobs)){hrForm.reset();$('#hr-editor-title').textContent='Thêm hồ sơ';$('#hr-editor').open=false;renderHR()}
});
$('#hr-cancel').addEventListener('click',()=>{hrForm.reset();$('#hr-editor-title').textContent='Thêm hồ sơ';$('#hr-editor').open=false});
$('#hr-search').addEventListener('input',renderHR);$('#hr-filter').addEventListener('change',renderHR);
document.addEventListener('click',e=>{const b=e.target.closest('[data-hr-edit],[data-hr-archive],[data-hr-restore],[data-hr-review]');if(!b)return;
 const id=b.dataset.hrEdit||b.dataset.hrArchive||b.dataset.hrRestore||b.dataset.hrReview,j=state.jobs.find(x=>x.id===id);if(!j)return;
 if(b.dataset.hrEdit){renderHR();for(const el of hrForm.elements){if(el.name&&Object.hasOwn(j,el.name))el.value=j[el.name]}$('#hr-editor-title').textContent='Sửa hồ sơ';$('#hr-editor').open=true;$('#hr-editor').scrollIntoView({behavior:'smooth'});return}
 if(b.dataset.hrArchive||b.dataset.hrRestore){commitJobs(state.jobs.map(x=>x.id===id?{...x,archived:b.dataset.hrArchive?'yes':'no',updatedAt:new Date().toISOString()}:x));return}
 const decision=state.decisions.find(d=>d.id===j.decisionId);
 if(decision){document.querySelector('[data-tab="decisions"]').click();const card=Array.from(document.querySelectorAll('#decision-list .card')).find(c=>c.querySelector('select')?.dataset.decision===decision.id);card?.scrollIntoView({behavior:'smooth'});return}
 const f=$('#decision-form');if(Array.from(f.elements).some(el=>el.name&&el.value.trim())){notify('Phiếu review đang có nội dung chưa lưu. Hãy lưu hoặc hoàn tất phiếu đó trước.');return}
 f.elements.title.value=`${j.company} — ${j.role}`;f.elements.facts.value=`${HRModel.statuses[j.status]} · ${hrDate(j.asOf)}\nNguồn: ${j.source||'Chưa xác nhận'}\n${j.freshness==='historical'?'Thông tin lịch sử, cần xác minh lại.':''}`;
 f.dataset.hrJob=id;f.dataset.hrDraftTitle=f.elements.title.value;f.dataset.hrDraftFacts=f.elements.facts.value;
 document.querySelector('[data-tab="decisions"]').click();notify('Đã soạn phần dữ kiện. Điền phần còn thiếu, được–mất và đường lui rồi lưu; phiếu sẽ liên kết với hồ sơ.');
});
// app.js saves the decision first; link only when the form was successfully reset.
$('#decision-form').addEventListener('submit',e=>{const id=e.target.dataset.hrJob;if(!id)return;const d=state.decisions[0];const isNewDraft=d&&d.title===e.target.dataset.hrDraftTitle&&d.facts===e.target.dataset.hrDraftFacts;if(!isNewDraft)return;if(commitJobs(state.jobs.map(j=>j.id===id?{...j,decisionId:d.id,updatedAt:new Date().toISOString()}:j))){delete e.target.dataset.hrJob;delete e.target.dataset.hrDraftTitle;delete e.target.dataset.hrDraftFacts}else notify('Phiếu review đã lưu nhưng liên kết chưa lưu được. Có thể liên kết lại trong Sửa hồ sơ.')});
$('#hr-import').addEventListener('change',async e=>{hrImportPending=null;$('#hr-confirm-import').hidden=true;const file=e.target.files[0];if(!file)return;
 try{if(file.size>5000000)throw Error('File quá lớn.');hrImportPending=HRModel.parseBundle(JSON.parse(await file.text()));const result=HRModel.mergeJobs(state.jobs,hrImportPending);$('#hr-import-preview').textContent=`Sẽ thêm ${result.added} hồ sơ; bỏ qua ${result.skipped} ID đã có. ${hrImportPending.filter(j=>j.freshness==='historical').length} hồ sơ là thông tin cũ cần xác minh.\n`+hrImportPending.map(j=>`${j.company} — ${j.role} (${hrDate(j.asOf)})`).join('\n');$('#hr-confirm-import').hidden=result.added===0}
 catch(err){$('#hr-import-preview').textContent=err.message||'Không đọc được file. Dữ liệu hiện tại không đổi.'}e.target.value='';
});
$('#hr-confirm-import').addEventListener('click',()=>{if(!hrImportPending)return;try{const result=HRModel.mergeJobs(state.jobs,hrImportPending);if(commitJobs(result.jobs)){notify(`Đã thêm ${result.added} hồ sơ; giữ nguyên các hồ sơ đã có.`);hrImportPending=null;$('#hr-confirm-import').hidden=true;$('#hr-import-preview').textContent='Đã nhập xong.'}}catch(err){notify(err.message)}});
$('#hr-export').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify({kind:'life-stable-hr',version:1,jobs:state.jobs},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`ho-so-ung-tuyen-${todayLocal()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Đã xuất hồ sơ riêng. File chứa dữ liệu cá nhân; giữ ở nơi riêng tư.')});
renderHR();
