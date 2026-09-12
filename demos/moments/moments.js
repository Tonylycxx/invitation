const photos=[
 {src:'assets/gold-portrait.jpg',alt:'米金色背景婚纱合照',chapter:'OUR LITTLE FOREVER',caption:'与你，从此。'},
 {src:'../../photos/alb1.jpg',alt:'两人手持结婚证的竖幅领证合照',chapter:'THE DAY WE SAID YES',caption:'把我们，写在一起。'},
 {src:'../../photos/alb2.jpg',alt:'两人手持结婚证的横幅领证合照',chapter:'OFFICIALLY US',caption:'这一刻，有了共同的名字。'},
 {src:'assets/red-playful.jpg',alt:'两人手持心形纸框的红底婚纱合照',chapter:'STILL FALLING FOR YOU',caption:'和你一起，认真地可爱。'},
 {src:'assets/red-bouquet.jpg',alt:'新娘与新郎递来的红色捧花',chapter:'A LOVE IN BLOOM',caption:'心动，仍在继续。'},
 {src:'assets/red-portrait.jpg',alt:'新娘手持捧花与新郎的红底竖幅合照',chapter:'TO ALL OUR TOMORROWS',caption:'往后的每一天，都有你。'},
 {src:'assets/gold-embrace.jpg',alt:'米金色背景下相拥的婚纱合照',chapter:'CLOSE TO YOU',caption:'在你怀里，安放温柔。'},
 {src:'assets/red-joy.jpg',alt:'两人与红色囍字的俏皮合照',chapter:'DOUBLE HAPPINESS',caption:'欢喜，是我们的日常。'},
 {src:'assets/red-hearts.jpg',alt:'两人拿着红色爱心相视互动的横幅合照',chapter:'ONLY YOU',caption:'目光所至，都是你。'},
 {src:'assets/red-wave.jpg',alt:'两人在囍字旁挥手的全身婚纱合照',chapter:'SEE YOU AT OUR WEDDING',caption:'我们的喜悦，等你一起分享。'},
 {src:'assets/gold-flowers.jpg',alt:'两人依偎并手持白色捧花的米金色合照',chapter:'GENTLE DAYS',caption:'相依相伴，岁岁年年。'}
];
const $=id=>document.getElementById(id);let albumIndex=0,spreadIndex=0;
function fade(el){el.classList.remove('fade');void el.offsetWidth;el.classList.add('fade');}
function renderAlbum(){const p=photos[albumIndex];$('album-image').src=p.src;$('album-image').alt=p.alt;$('album-chapter').textContent=p.chapter;$('album-caption').textContent=p.caption;$('album-count').textContent=`${String(albumIndex+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')}`;$('album-prev').disabled=albumIndex===0;$('album-next').disabled=albumIndex===photos.length-1;fade(document.querySelector('.album-stage'));}
function photo(i,cls=''){return `<button class="photo-button ${cls}" data-photo="${i}" aria-label="放大：${photos[i].alt}"><img src="${photos[i].src}" alt="${photos[i].alt}"></button>`;}
const spreads=[
 `<header class="spread-heading"><span class="chapter">01 / OFFICIALLY US</span><h2>把我们写在一起</h2><p>从这一天起，幸福有了共同的名字。</p></header><div class="registry-layout">${photo(1)}<div>${photo(2)}<p class="side-note">一纸约定，<br>是我们漫长故事的序言。</p></div></div><p class="spread-note">那些小小的瞬间，值得长长地珍藏。</p>`,
 `<header class="spread-heading"><span class="chapter">02 / THE BEGINNING OF FOREVER</span><h2>与你，从此</h2><p>把平凡的日子，过成我们的故事。</p></header>${photo(0,'opening-photo')}<p class="spread-note">一场相遇，一生相伴。</p>`,
 `<header class="spread-heading"><span class="chapter">03 / CLOSE TO YOU</span><h2>温柔，都与你有关</h2><p>相拥的片刻，是想要珍藏的一生。</p></header><div class="portrait-pair">${photo(6)}<div><p class="pair-quote">朝朝暮暮，<br>相依相伴。</p>${photo(10)}</div></div><p class="spread-note">WITH YOU, EVERY DAY FEELS LIKE HOME</p>`,
 `<header class="spread-heading"><span class="chapter">04 / STILL FALLING FOR YOU</span><h2>心动，仍在继续</h2><p>有郑重的承诺，也有藏不住的欢喜。</p></header><div class="red-layout">${photo(5)}<div>${photo(3)}${photo(4)}<p class="side-note">和你一起，<br>把每一天都过得可爱。</p></div></div><p class="spread-note">TO ALL OUR TOMORROWS</p>`,
 `<header class="spread-heading"><span class="chapter">05 / DOUBLE HAPPINESS</span><h2>欢喜，藏不住</h2><p>目光相遇，连笑意也有了默契。</p></header><div class="joy-layout">${photo(7)}<p class="pair-quote">一半是心动，<br>一半是与你一起的孩子气。</p>${photo(8)}</div><p class="spread-note">YOU & ME · A PERFECT LITTLE TEAM</p>`,
 `<header class="spread-heading"><span class="chapter">06 / SEE YOU AT OUR WEDDING</span><h2>这份喜悦，邀你入席</h2><p>我们准备好了，期待与你相见。</p></header>${photo(9,'closing-photo')}<p class="spread-note">2026 · 09 · 26<br>刘禹辰 & 王思越 · 等你来</p>`
];
function renderSpread(){$('spread').innerHTML=spreads[spreadIndex];const art=document.createElement('div');art.className='spread-art';const heading=$('spread').firstElementChild,note=$('spread').lastElementChild;while(heading.nextElementSibling!==note)art.append(heading.nextElementSibling);heading.after(art);$('editorial-count').textContent=`${String(spreadIndex+1).padStart(2,'0')} / ${String(spreads.length).padStart(2,'0')}`;$('editorial-prev').disabled=spreadIndex===0;$('editorial-next').disabled=spreadIndex===spreads.length-1;fade($('spread'));}
function mode(value){const editorial=value==='editorial';$('album').hidden=editorial;$('editorial').hidden=!editorial;document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===value)));history.replaceState(null,'',`#${value}`);}
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>mode(b.dataset.mode)));
$('album-prev').onclick=()=>{if(albumIndex>0){albumIndex--;renderAlbum();}};$('album-next').onclick=()=>{if(albumIndex<photos.length-1){albumIndex++;renderAlbum();}};
$('editorial-prev').onclick=()=>{if(spreadIndex>0){spreadIndex--;renderSpread();window.scrollTo({top:0});}};$('editorial-next').onclick=()=>{if(spreadIndex<spreads.length-1){spreadIndex++;renderSpread();window.scrollTo({top:0});}};
function openPhoto(i){const p=photos[i],img=$('lightbox').querySelector('img');img.src=p.src;img.alt=p.alt;$('lightbox').showModal();document.body.style.overflow='hidden';}
document.querySelector('.album-photo').onclick=()=>openPhoto(albumIndex);
$('spread').onclick=e=>{const b=e.target.closest('[data-photo]');if(b)openPhoto(Number(b.dataset.photo));};
$('lightbox').querySelector('.close').onclick=()=>$('lightbox').close();$('lightbox').onclick=e=>{if(e.target===$('lightbox'))$('lightbox').close();};$('lightbox').addEventListener('close',()=>{document.body.style.overflow='';});
renderAlbum();renderSpread();mode(location.hash==='#album'?'album':'editorial');
