(function(root){
'use strict';
const statuses={ready:'Sẵn sàng',doing:'Đang làm',waiting:'Đang chờ',blocked:'Bị chặn',done:'Đã xong',archived:'Đã lưu trữ'};
const legacyStatuses={open:'ready',waiting:'waiting',doing:'doing',done:'done'};
const fields=['id','date','title','category','next','status','waitingFor','reviewOn','blockedBy','archiveReason'];
function isDate(value){
 if(value==='')return true;
 if(!/^\\d{4}-\\d{2}-\\d{2}$/.test(value))return false;
 const date=new Date(value+'T00:00:00Z');
 return Number.isFinite(date.getTime())&&date.toISOString().slice(0,10)===value;
}
function todayLocal(){
 const date=new Date();
 return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
function normalizeTask(task){
 const value=task||{};
 return {...value,
  status:legacyStatuses[value.status]||value.status,
  waitingFor:typeof value.waitingFor==='string'?value.waitingFor:'',
  reviewOn:typeof value.reviewOn==='string'?value.reviewOn:'',
  blockedBy:typeof value.blockedBy==='string'?value.blockedBy:'',
  archiveReason:typeof value.archiveReason==='string'?value.archiveReason:''
 };
}
function normalizeTasks(tasks){return Array.isArray(tasks)?tasks.map(normalizeTask):[]}
function validTask(task){
 const value=normalizeTask(task);
 return fields.every(key=>typeof value[key]==='string'&&value[key].length<=5000)
  &&value.id.trim()!==''
  &&value.title.trim()!==''
  &&value.category.trim()!==''
  &&value.next.trim()!==''
  &&Object.hasOwn(statuses,value.status)
  &&isDate(value.reviewOn);
}
function validTasks(tasks){
 return Array.isArray(tasks)&&tasks.length<=5000&&tasks.every(validTask)&&new Set(tasks.map(task=>task.id)).size===tasks.length;
}
function readyForStatus(task){
 const value=normalizeTask(task);
 if(value.status==='waiting')return value.waitingFor.trim()!==''&&isDate(value.reviewOn)&&value.reviewOn!=='';
 if(value.status==='blocked')return value.blockedBy.trim()!=='';
 if(value.status==='archived')return value.archiveReason.trim()!=='';
 return true;
}
function statusHint(status){
 return {waiting:'Việc đang chờ cần ghi rõ chờ ai/điều gì và ngày xem lại.',blocked:'Việc bị chặn cần ghi rõ điều kiện còn thiếu.',archived:'Việc lưu trữ cần ghi lý do.'}[status]||'';
}
function needsContext(task){
 const value=normalizeTask(task);
 return ['waiting','blocked','archived'].includes(value.status)&&!readyForStatus(value);
}
function due(task,today=todayLocal()){
 const value=normalizeTask(task);
 return value.status==='waiting'&&value.reviewOn!==''&&value.reviewOn<=today;
}
function focus(task,today=todayLocal()){
 const value=normalizeTask(task);
 return ['ready','doing','blocked'].includes(value.status)||due(value,today)||needsContext(value);
}
const api={statuses,legacyStatuses,fields,isDate,todayLocal,normalizeTask,normalizeTasks,validTask,validTasks,readyForStatus,statusHint,needsContext,due,focus};
root.TaskModel=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window==='undefined'?globalThis:window);
