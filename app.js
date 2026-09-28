'use strict';
(() => {
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const en=document.body.dataset.locale==='en';
const t=(zh,english)=>en?english:zh;
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const selected=(selector,key,value)=>$$(selector).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[key]===value)));
function animate(el){if(el&&!motion.matches)el.animate([{opacity:.3,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'cubic-bezier(.2,.75,.25,1)'});}
function dismissMenu(){const menu=$('#mobile-nav');if(menu)menu.hidden=true;$('.menu-toggle')?.setAttribute('aria-expanded','false');}
$('.menu-toggle')?.addEventListener('click',()=>{const b=$('.menu-toggle'),open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));$('#mobile-nav').hidden=!open;});
$$('#mobile-nav a').forEach(a=>a.addEventListener('click',dismissMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')dismissMenu();});
matchMedia('(min-width:951px)').addEventListener('change',e=>{if(e.matches)dismissMenu();});
$$('[data-download]').forEach(b=>b.addEventListener('click',()=>{const url=window.SITE_CONFIG?.[en?'en':'zh']?.appStoreUrl;if(url&&/^https:\/\/apps\.apple\.com\//.test(url)){window.open(url,'_blank','noopener,noreferrer');}else $('#download-dialog')?.showModal();}));
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});});
$$('[data-print]').forEach(b=>b.addEventListener('click',()=>window.print()));
const openDetails=[];window.addEventListener('beforeprint',()=>{$$('.prose details').forEach(d=>{if(!d.open){openDetails.push(d);d.open=true;}});});window.addEventListener('afterprint',()=>{openDetails.splice(0).forEach(d=>d.open=false);});
if('IntersectionObserver' in window&&!motion.matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pending');observer.unobserve(e.target);}}),{threshold:.07,rootMargin:'0px 0px -25px 0px'});$$('.reveal').forEach(el=>{el.classList.add('pending');observer.observe(el);});motion.addEventListener('change',()=>{if(motion.matches){$$('.pending').forEach(el=>el.classList.remove('pending'));observer.disconnect();}});}
if($('.document-toc')&&'IntersectionObserver' in window){const obs=new IntersectionObserver(es=>{const visible=es.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(visible[0])$$('.document-toc nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+visible[0].target.id));},{rootMargin:'-110px 0px -55% 0px'});$$('.prose h2').forEach(h=>obs.observe(h));}
if(!$('#phone'))return;
const state={theme:'minimal',day:2,phase:'before',weekly:false,holiday:'normal',device:'ipad'};
const days=en?['M','T','W','T','F','S','S']:['一','二','三','四','五','六','日'];
const courses=[
[{name:t('大气污染控制原理','Environmental Science'),time:'09:50–12:15',room:t('3 区 1-505','Science 505')},{name:t('环境修复工程','Restoration Ecology'),time:'18:30–20:55',room:t('3 区 1-208','Science 208')}],
[{name:t('生态保护与修复','Conservation Biology'),time:'18:30–20:55',room:t('3 区 1-303','Science 303')}],
[{name:t('环境高分子材料','Environmental Materials'),time:'09:50–12:15',room:t('3 区 1-528','Science 528')},{name:t('科学哲学与学术英语','Academic Writing'),time:'14:05–16:30',room:t('3 区 1-310','Hall 310')},{name:t('环境毒理与健康风险','Environmental Health'),time:'18:30–20:55',room:t('3 区 1-218','Science 218')}],
[{name:t('思想政治理论课','Research Methods'),time:'14:05–16:30',room:t('3 区 1-123','Hall 123')}],
[{name:t('科学研究方法','Design Thinking'),time:'14:05–16:30',room:t('国教 4-203','Studio 203')}],[],[]];
const date=i=>new Date(Date.UTC(2026,8,21+i));
const dateFormat=new Intl.DateTimeFormat(en?'en-GB':'zh-CN',{month:'short',day:'numeric',weekday:'long',timeZone:'UTC'});
function renderToday(keepFocus=false){
 const list=courses[state.day],empty=!list.length,done=state.phase==='done';
 $('#date-label').textContent=dateFormat.format(date(state.day));
 $('#status-title').textContent=empty?t('今天没课，好好休息','A little room to breathe'):done?t('今天的课上完啦','All done for today'):state.phase==='during'?t('正在上课 · 还剩 24 分钟','In class · 24 min left'):t('还有 9 分钟上课','Your class in 9 minutes');
 $('#status-subtitle').textContent=empty||done?t('留点时间，做喜欢的事。','The rest of the day is yours.'):t('时间与地点，都为你放好了。','Your time and place, all sorted.');
 $('#week-strip').innerHTML=days.map((d,i)=>`<button class="day" data-day="${i}" aria-label="${dateFormat.format(date(i))}" aria-pressed="${i===state.day}"><small>${d}</small><strong>${21+i}</strong><i ${courses[i].length?'':'style="visibility:hidden"'}></i></button>`).join('');
 if(keepFocus)$(`[data-day="${state.day}"]`).focus({preventScroll:true});
 $('#course-list').innerHTML=empty?`<article class="course"><h3>${t('周末，慢一点也没关系。','Take the scenic route.')}</h3><p>${t('本日没有课程安排','No classes on your calendar.')}</p></article>`:list.map((c,i)=>`<article class="course ${i===0&&!done?'current':''}" ${done?'style="opacity:.55"':''}><div class="course-head"><h3>${c.name}</h3>${i===0&&!done?`<span class="badge">${state.phase==='during'?t('上课中','NOW'):t('下一节','NEXT')}</span>`:''}</div><p><span>${c.time}</span><span>${c.room}</span></p>${i===0&&state.phase==='during'?'<div class="progress"><i></i></div>':''}</article>`).join('');
 $('#widget-time').textContent=empty||done?t('休息一下','All yours'):list[0].time.split('–')[0];
 $('#widget-course').textContent=empty||done?t('今天没有更多课程','No more classes today'):list[0].name;
 $('#widget-room').textContent=empty||done?t('把时间留给自己','Make a little room for you.'):list[0].room;
 animate($('#course-list'));
}
$('#week-strip').addEventListener('click',e=>{const b=e.target.closest('[data-day]');if(!b)return;state.day=Number(b.dataset.day);state.phase='before';selected('[data-state]','state','before');renderToday(true);});
const hints=en?{classic:'Familiar colours. Every class in its place.',minimal:'A calmer way to see what comes next.',focus:'A little more focus on the class ahead.'}:{classic:'熟悉的色彩，一眼找到每一节课。',minimal:'让层次更清楚，让今天更轻松。',focus:'把注意力，留给眼前这一节。'};
$$('button[data-theme]').forEach(b=>b.addEventListener('click',()=>{state.theme=b.dataset.theme;$('#phone').dataset.theme=state.theme;selected('button[data-theme]','theme',state.theme);$('#theme-hint').textContent=hints[state.theme];animate($('#theme-hint'));}));
$$('[data-state]').forEach(b=>b.addEventListener('click',()=>{state.phase=b.dataset.state;selected('[data-state]','state',state.phase);renderToday();}));
function renderWeek(){let html='<div></div>'+days.slice(0,5).map(x=>`<div class="wh">${x}</div>`).join('');for(let r=0;r<6;r++){html+=`<div class="time" style="grid-column:1;grid-row:${r+2}">${r*2+1}</div>`;for(let c=0;c<5;c++)html+=`<div class="cell" style="grid-column:${c+2};grid-row:${r+2}"></div>`;}const blocks=[[t('高分子材料','Materials'),4,3,2,'purple'],[t('大气污染','Environment'),2,3,2,'pink'],[t('学术英语','Writing'),4,5,2,''],[t('研究方法','Research'),5,5,2,''],[t('生态保护','Ecology'),3,7,1,'green']];blocks.forEach(([name,c,r,span,color])=>html+=`<div class="block ${color}" style="grid-column:${c};grid-row:${r}/span ${span}">${name}</div>`);$('#mini-week').innerHTML=html;}
function showView(){ $('#today-screen').hidden=state.weekly;$('#weekly-screen').hidden=!state.weekly;$('#view-toggle').setAttribute('aria-pressed',String(state.weekly));animate($(state.weekly?'#weekly-screen':'#today-screen')); }
$('#view-toggle').addEventListener('click',()=>{state.weekly=!state.weekly;showView();});
$('#reset-demo').addEventListener('click',()=>{Object.assign(state,{day:2,phase:'before',weekly:false,theme:'minimal'});$('#phone').dataset.theme='minimal';selected('button[data-theme]','theme','minimal');$('#theme-hint').textContent=hints.minimal;selected('[data-state]','state','before');showView();renderToday();});
const hero=$('#hero-visual'),stage=$('.device-stage');let frame;
hero.addEventListener('pointermove',e=>{if(motion.matches||!matchMedia('(hover:hover) and (min-width:701px)').matches)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=hero.getBoundingClientRect();stage.style.transform=`rotateY(${-9+((e.clientX-r.left)/r.width-.5)*5}deg) rotateX(${2-((e.clientY-r.top)/r.height)*4}deg) rotateZ(4deg)`;});});
hero.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);stage.style.transform='';});
function renderHoliday(){ $('#holiday-badge').textContent={normal:t('原有安排','As planned'),off:t('假期中 · 原有 1 节','On a break · 1 class paused'),makeup:t('补周三课程','Wednesday’s classes moved here')}[state.holiday];$('#holiday-courses').innerHTML=state.holiday==='off'?`<p class="holiday-empty">${t('今天放假，好好休息。','A little space for yourself.')}</p>`:state.holiday==='makeup'?courses[2].map(c=>`<div class="holiday-row"><span>${c.name}</span><span>${c.time.split('–')[0]}</span></div>`).join(''):`<div class="holiday-row"><span>${t('自主学习 · 原周日安排','Independent study')}</span><span>10:00</span></div>`;animate($('#holiday-courses'));}
$$('[data-holiday]').forEach(b=>b.addEventListener('click',()=>{state.holiday=b.dataset.holiday;selected('[data-holiday]','holiday',state.holiday);renderHoliday();}));
const devices={iphone:{label:t('今天的重点','A clearer today'),title:t('下一节课，<br>打开就知道。','Your next class.<br>One glance away.'),description:t('当前与即将开始的课程，放在最显眼的位置。日期、时间、教室，清清楚楚。','The right time. The right room. A quieter way to keep your day in view.'),alt:'查课啦 iPhone 今日课表实际截图'},ipad:{label:t('更大的视野','A broader perspective'),title:t('整周安排，<br>一屏展开。','Your whole week.<br>One clear view.'),description:t('课程与空闲，在大屏上都更清楚。向前看看，让这一周心中有数。','Classes, breaks and the time in between. See how your days fit together.'),alt:'查课啦 iPad 完整课表实际截图'},watch:{label:t('轻轻抬腕','A little closer'),title:t('课程安排，<br>就在手边。','Your next class.<br>Right on your wrist.'),description:t('查看当前或下一节课，掌握时间与地点。表盘复杂功能，让下一节课随时可见。','Check your next class, its time and place. A useful little glance, wherever you are.'),alt:'查课啦 Apple Watch 下一节课实际截图'}};
$$('button[data-device]').forEach(b=>b.addEventListener('click',()=>{state.device=b.dataset.device;selected('button[data-device]','device',state.device);const d=devices[state.device];$('.device-gallery').dataset.device=state.device;$('#gallery-label').textContent=d.label;$('#gallery-title').innerHTML=d.title;$('#gallery-description').textContent=d.description;animate($('.gallery-copy'));animate($('#gallery-image')||$('#international-preview'));}));
function renderChanges(){const all=$('input[name=scope]:checked').value==='all';$('#change-list').innerHTML=Array.from({length:all?6:1},(_,i)=>`<div class="change-row"><span>${t(`第 ${i+3} 周 · 周三`,`Week ${i+3} · Wednesday`)}</span><strong>528 → 305</strong></div>`).join('');$('#change-warning').textContent=all?t('这 6 次上课的地点都会改为 3 区 1-305。','All 6 classes move to Science 305.'):t('仅修改第 3 周这一次，其他周保持原教室。','Only this class in week 3 changes. Other weeks stay as they are.');}
$('#open-edit').addEventListener('click',()=>{renderChanges();$('#edit-dialog').showModal();});$$('input[name=scope]').forEach(i=>i.addEventListener('change',renderChanges));
let toastTimer;$('#confirm-edit').addEventListener('click',()=>{const all=$('input[name=scope]:checked').value==='all';$('[data-edit-room="3"]').textContent=t('3 区 1-305','Science 305');$('[data-edit-room="4"]').textContent=all?t('3 区 1-305','Science 305'):t('3 区 1-528','Science 528');$('#edit-dialog').close();animate($('.edit-preview'));$('#toast').textContent=all?t('已演示修改整门课程的教室','All occurrences updated in this demo.'):t('已演示修改这一次的教室','This occurrence updated in the demo.');$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3200);});
renderToday();renderWeek();renderHoliday();
})();
