(function(root){
'use strict';
const statuses={unknown:'Chưa rõ',applied:'Đã nộp',viewed:'Đã xem CV',responded:'Có phản hồi',interview:'Phỏng vấn',offer:'Có offer',review:'Đang review',accepted:'Đã nhận',closed:'Đã đóng'};
const fields=['id','company','role','status','source','asOf','lastContact','reviewOn','next','notes','decisionId','freshness','archived','createdAt','updatedAt'];
function isDate(v){if(v==='')return true;if(!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;const d=new Date(v+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===v}
function validJob(j){return j&&fields.every(k=>typeof j[k]==='string'&&j[k].length<=5000)&&j.id.length>0&&j.company.trim().length>0&&j.role.trim().length>0&&Object.hasOwn(statuses,j.status)&&['historical','confirmed'].includes(j.freshness)&&['yes','no'].includes(j.archived)&&['asOf','lastContact','reviewOn'].every(k=>isDate(j[k]))&&Number.isFinite(Date.parse(j.createdAt))&&Number.isFinite(Date.parse(j.updatedAt))&&(j.status==='unknown'||(j.source.trim()!==''&&j.asOf!==''))}
function validJobs(jobs){return Array.isArray(jobs)&&jobs.length<=5000&&jobs.every(validJob)&&new Set(jobs.map(j=>j.id)).size===jobs.length}
function parseBundle(data){if(!data||data.kind!=='life-stable-hr'||data.version!==1||!validJobs(data.jobs))throw Error('File hồ sơ không đúng định dạng, ngày hoặc ID bị trùng.');return data.jobs.map(j=>Object.fromEntries(fields.map(k=>[k,j[k]])))}
function mergeJobs(current,incoming){if(!validJobs(current)||!validJobs(incoming))throw Error('Dữ liệu hồ sơ không hợp lệ.');const ids=new Set(current.map(j=>j.id));const added=incoming.filter(j=>!ids.has(j.id));if(current.length+added.length>5000)throw Error('Quá giới hạn hồ sơ.');return {jobs:[...current,...added],added:added.length,skipped:incoming.length-added.length}}
function due(j,today){return j.archived==='no'&&!['closed','accepted'].includes(j.status)&&!!j.reviewOn&&j.reviewOn<=today}
const api={statuses,fields,isDate,validJob,validJobs,parseBundle,mergeJobs,due};root.HRModel=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window==='undefined'?globalThis:window);
