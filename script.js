const state = {
  quiz: false,
  memory: false,
  photo: false
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let activeMission = null;
let memorySession = 0;

function initContent() {
  $("#heroTitle").textContent = SITE_CONFIG.hero.title;
  $("#heroSubtitle").textContent = "ออกสำรวจดวงดาวแต่ละดวง และทำภารกิจให้ครบ";

  $("#timeline").innerHTML = SITE_CONFIG.timeline.map(item => `
    <div class="timeline-item">
      <span class="timeline-dot"></span>
      <div class="timeline-content glass">
        <small>${item.date}</small>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    </div>
  `).join("");

  $("#galleryGrid").innerHTML = SITE_CONFIG.gallery.map((item, index) => `
    <figure class="gallery-card" data-gallery-index="${index}" tabindex="0">
      <div class="gallery-magic-frame"></div>
      <img src="${item.image}" alt="${item.caption}">
      <div class="gallery-sparkles"><span>✦</span><span>✧</span><span>✦</span></div>
      <figcaption class="gallery-caption">
        <span>${item.caption}</span>
        <small>คลิกเพื่อขยายภาพ</small>
      </figcaption>
    </figure>
  `).join("");

  initGalleryLightbox();

  $("#secretHeading").textContent = SITE_CONFIG.secret.heading;
  $("#secretBody").textContent = SITE_CONFIG.secret.body;
  $("#signature").textContent = SITE_CONFIG.secret.signature;
}

$$(".mission-planet").forEach(planet => {
  planet.addEventListener("click", () => enterPlanet(planet.dataset.mission, planet));
});

$("#exitPlanet").addEventListener("click", exitPlanet);

function enterPlanet(mission, planetElement) {
  activeMission = mission;
  planetElement.classList.add("planet-activated");
  setTimeout(() => planetElement.classList.remove("planet-activated"), 900);

  const map = $("#spaceMap");
  const mapRect = map.getBoundingClientRect();
  const planetRect = planetElement.getBoundingClientRect();

  const planetCenterX = planetRect.left + planetRect.width / 2;
  const planetCenterY = planetRect.top + planetRect.height / 2;
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  const scale = window.innerWidth < 650 ? 4.6 : 5.8;
  const translateX = (viewportCenterX - planetCenterX) / scale;
  const translateY = (viewportCenterY - planetCenterY) / scale;

  map.classList.add("zooming", "flight-mode");
  playSfx("portal");
  map.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

  setTimeout(() => {
    renderMission(mission);
    const overlay = $("#planetOverlay");
    const landing = $("#landingPlanet");
    landing.className = `landing-planet ${mission}`;
    overlay.classList.remove("hidden");
    document.body.classList.add("planet-open");
    requestAnimationFrame(() => overlay.classList.add("active"));
  }, 520);
}

function exitPlanet() {
  const overlay = $("#planetOverlay");
  overlay.classList.remove("active");

  setTimeout(() => {
    overlay.classList.add("hidden");
    document.body.classList.remove("planet-open");

    const map = $("#spaceMap");
    map.style.transform = "";
    map.classList.remove("zooming", "flight-mode");
    activeMission = null;
  }, 480);
}

function renderMission(mission) {
  const content = $("#missionContent");

  if (mission === "quiz") {
    content.innerHTML = `
      <p class="eyebrow">MISSION 01</p>
      <h2>ดาวแห่งคำถาม</h2>
      <p class="mission-description">ตอบคำถามเกี่ยวกับเรื่องราวของเราให้ถูกทั้งหมด</p>
      <div id="quizContainer"></div>
    `;
    buildQuiz();
  }

  if (mission === "memory") {
    content.innerHTML = `
      <p class="eyebrow">MISSION 02</p>
      <h2>ดาวแห่งความทรงจำ</h2>
      <p class="mission-description">เปิดการ์ดครั้งละ 2 ใบ และจับคู่สัญลักษณ์ให้ครบ</p>
      <div id="memoryBoard" class="memory-board"></div>
      <button id="resetMemory" class="secondary-btn">เริ่มใหม่</button>
    `;
    buildMemory();
    $("#resetMemory").addEventListener("click", buildMemory);
  }

  if (mission === "photo") {
    content.innerHTML = `
      <p class="eyebrow">MISSION 03</p>
      <h2>ดาวแห่งภาพปริศนา</h2>
      <p class="mission-description">ดูภาพปริศนา แล้วเลือกเหตุการณ์ที่ถูกต้อง</p>
      <div id="photoQuizContainer"></div>
    `;
    buildPhotoQuiz();
  }
}

function buildQuiz() {
  const container = $("#quizContainer");
  container.innerHTML = SITE_CONFIG.quiz.map((item, qIndex) => `
    <div class="quiz-question">
      <h3>${qIndex + 1}. ${item.question}</h3>
      <div class="quiz-options">
        ${item.options.map((option, oIndex) => `
          <button class="option-btn quiz-option" data-question="${qIndex}" data-option="${oIndex}">
            ${option}
          </button>
        `).join("")}
      </div>
    </div>
  `).join("") + `<button id="submitQuiz" class="primary-btn">ตรวจคำตอบ</button>`;

  $$(".quiz-option").forEach(button => {
    button.addEventListener("click", () => {
      const questionIndex = button.dataset.question;
      $$(`.quiz-option[data-question="${questionIndex}"]`).forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  $("#submitQuiz").addEventListener("click", submitQuiz);
}

function submitQuiz() {
  let score = 0;

  SITE_CONFIG.quiz.forEach((item, qIndex) => {
    const selected = $(`.quiz-option.selected[data-question="${qIndex}"]`);
    $$(`.quiz-option[data-question="${qIndex}"]`).forEach(btn => {
      btn.classList.remove("correct", "wrong");
      if (Number(btn.dataset.option) === item.answer) btn.classList.add("correct");
    });

    if (selected && Number(selected.dataset.option) === item.answer) {
      score++;
    } else if (selected) {
      selected.classList.add("wrong");
    }
  });

  if (score === SITE_CONFIG.quiz.length) {
    completeMission("quiz");
    toast("ภารกิจดาวแห่งคำถามสำเร็จแล้ว ✨");
  } else {
    toast(`ตอบถูก ${score}/${SITE_CONFIG.quiz.length} ลองอีกครั้งนะ`);
  }
}

function buildMemory() {
  memorySession++;
  const currentSession = memorySession;
  const cards = [...SITE_CONFIG.memorySymbols, ...SITE_CONFIG.memorySymbols]
    .sort(() => Math.random() - 0.5);

  const board = $("#memoryBoard");
  board.innerHTML = cards.map((symbol, index) => `
    <button class="memory-card" data-symbol="${symbol}" data-index="${index}">?</button>
  `).join("");

  let first = null;
  let lock = false;
  let matches = 0;

  $$(".memory-card").forEach(card => {
    card.addEventListener("click", () => {
      if (currentSession !== memorySession || lock || card.classList.contains("matched") || card === first) return;

      card.textContent = card.dataset.symbol;
      card.classList.add("flipped");

      if (!first) {
        first = card;
        return;
      }

      if (first.dataset.symbol === card.dataset.symbol) {
        first.classList.add("matched");
        card.classList.add("matched");
        first = null;
        matches++;

        if (matches === SITE_CONFIG.memorySymbols.length) {
          completeMission("memory");
          toast("ภารกิจดาวแห่งความทรงจำสำเร็จแล้ว 🌌");
        }
      } else {
        lock = true;
        const firstCard = first;
        setTimeout(() => {
          [firstCard, card].forEach(item => {
            item.textContent = "?";
            item.classList.remove("flipped");
          });
          first = null;
          lock = false;
        }, 680);
      }
    });
  });
}

function buildPhotoQuiz() {
  const item = SITE_CONFIG.photoQuiz;
  $("#photoQuizContainer").innerHTML = `
    <div class="photo-question">
      <h3>${item.question}</h3>
      <img id="photoQuizImage" src="${item.image}" alt="ภาพปริศนา">
      <div class="photo-options">
        ${item.options.map((option, index) => `
          <button class="option-btn photo-answer" data-answer="${index}">${option}</button>
        `).join("")}
      </div>
    </div>
  `;

  $$(".photo-answer").forEach(button => {
    button.addEventListener("click", () => {
      $$(".photo-answer").forEach(btn => btn.classList.remove("correct", "wrong"));
      $("#photoQuizImage").classList.add("revealed");

      if (Number(button.dataset.answer) === item.answer) {
        button.classList.add("correct");
        completeMission("photo");
        toast("ภารกิจดาวแห่งภาพปริศนาสำเร็จแล้ว 🔭");
      } else {
        button.classList.add("wrong");
        toast("ยังไม่ใช่ ลองดูภาพอีกครั้งนะ");
      }
    });
  });
}


let activeGalleryIndex = 0;

function initGalleryLightbox() {
  $$(".gallery-card").forEach(card => {
    const open = () => openLightbox(Number(card.dataset.galleryIndex));
    card.addEventListener("click", open);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });

  $("#closeLightbox").addEventListener("click", closeLightbox);
  $("#prevImage").addEventListener("click", () => showGalleryImage(activeGalleryIndex - 1));
  $("#nextImage").addEventListener("click", () => showGalleryImage(activeGalleryIndex + 1));

  $("#galleryLightbox").addEventListener("click", event => {
    if (event.target.id === "galleryLightbox") closeLightbox();
  });

  document.addEventListener("keydown", event => {
    if ($("#galleryLightbox").classList.contains("hidden")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showGalleryImage(activeGalleryIndex - 1);
    if (event.key === "ArrowRight") showGalleryImage(activeGalleryIndex + 1);
  });
}

function openLightbox(index) {
  activeGalleryIndex = index;
  showGalleryImage(index);

  const lightbox = $("#galleryLightbox");
  lightbox.classList.remove("hidden");
  document.body.classList.add("lightbox-open");
  requestAnimationFrame(() => lightbox.classList.add("active"));
}

function closeLightbox() {
  const lightbox = $("#galleryLightbox");
  lightbox.classList.remove("active");
  setTimeout(() => {
    lightbox.classList.add("hidden");
    document.body.classList.remove("lightbox-open");
  }, 350);
}

function showGalleryImage(index) {
  const total = SITE_CONFIG.gallery.length;
  activeGalleryIndex = (index + total) % total;
  const item = SITE_CONFIG.gallery[activeGalleryIndex];

  const image = $("#lightboxImage");
  image.classList.remove("show");
  setTimeout(() => {
    image.src = item.image;
    image.alt = item.caption;
    $("#lightboxCaption").textContent = item.caption;
    requestAnimationFrame(() => image.classList.add("show"));
  }, 120);
}

function completeMission(key) {
  if (state[key]) return;
  state[key] = true;

  const status = $("#" + key + "Status");
  status.textContent = "สำเร็จแล้ว ✓";
  status.classList.add("done");

  playSfx('complete');
  updateProgress();
}

function updateProgress() {
  const complete = Object.values(state).filter(Boolean).length;
  $("#progressText").textContent = `${complete} / 3`;
  $("#progressBar").style.width = `${(complete / 3) * 100}%`;

  if (complete === 3) {
    unlockBoss();
    $("#finalTitle").textContent = "ปลดล็อกดาวดวงสุดท้ายแล้ว ✨";
    $("#finalText").textContent = "เลื่อนลงไปเปิดอ่านข้อความพิเศษที่ฉันอยากบอกเธอ";
    $("#finalBtn").disabled = false;
    $("#finalBtn").textContent = "เปิดข้อความพิเศษ 💌";
    celebrate();
  }
}

$("#finalBtn").addEventListener("click", () => {
  $("#finalBtn").classList.add("hidden");
  $("#secretMessage").classList.remove("hidden");
  celebrate();
});

$("#celebrateBtn").addEventListener("click", celebrate);

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}

function celebrate() {
  const layer = $("#confettiLayer");
  const colors = ["#8f5cff","#ff67c8","#45bfff","#ffe36e","#ffffff"];

  for (let i = 0; i < 110; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 2.2 + Math.random() * 2.6 + "s";
    piece.style.animationDelay = Math.random() * .6 + "s";
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 5500);
  }
}

function createStars() {
  const canvas = $("#stars");
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resize() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);

    stars = Array.from({ length: Math.min(250, Math.floor(innerWidth / 4)) }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.65 + .2,
      a: Math.random() * Math.PI * 2,
      speed: Math.random() * .008 + .002
    }));
  }

  function draw() {
    ctx.clearRect(0,0,innerWidth,innerHeight);
    stars.forEach(star => {
      star.a += star.speed;
      const alpha = .2 + Math.abs(Math.sin(star.a)) * .8;
      ctx.beginPath();
      ctx.arc(star.x,star.y,star.r,0,Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  addEventListener("resize", resize);
  resize();
  draw();
}


let declineCount = 0;

function initCinematicIntro() {
  const intro = $("#cinematicIntro");
  const acceptButton = $("#acceptJourney");
  const declineButton = $("#declineJourney");
  const hint = $("#declineHint");
  const galaxyApp = $("#galaxyApp");

  const declineMessages = [
    "แน่ใจเหรอ? กัปตันแมวเตรียมยานไว้แล้วนะ 🥺",
    "ปุ่มนี้เริ่มหดแล้วนะ... ลองคิดดูอีกที",
    "กาแล็กซีกำลังรอเราอยู่จริง ๆ นะ ✨",
    "ดูเหมือนปุ่ม “ตกลง” จะน่ากดขึ้นเรื่อย ๆ แล้วนะ",
    "กัปตันแมวจะไม่ยอมออกเดินทางคนเดียวหรอก!"
  ];

  declineButton.addEventListener("click", () => {
    declineCount++;
    intro.classList.remove("screen-shake");
    void intro.offsetWidth;
    intro.classList.add("screen-shake");

    const declineScale = Math.max(.22, 1 - declineCount * .17);
    const acceptScale = Math.min(1.85, 1 + declineCount * .16);

    declineButton.style.transform = `scale(${declineScale})`;
    declineButton.style.opacity = String(Math.max(.28, 1 - declineCount * .12));
    acceptButton.style.transform = `scale(${acceptScale})`;
    acceptButton.style.padding = `${14 + declineCount * 2}px ${24 + declineCount * 6}px`;
    acceptButton.style.boxShadow = `0 0 ${24 + declineCount * 10}px rgba(255,104,200,.55)`;

    hint.textContent = declineMessages[Math.min(declineCount - 1, declineMessages.length - 1)];

    if (declineCount >= 6) {
      declineButton.textContent = "ยังไม่ไปจริง ๆ เหรอ...";
      declineButton.style.pointerEvents = "none";
    }
  });

  acceptButton.addEventListener("click", () => {
    acceptButton.disabled = true;
    declineButton.disabled = true;
    intro.classList.add("warping");

    setTimeout(() => {
      galaxyApp.classList.remove("cinematic-locked");
      galaxyApp.classList.add("cinematic-reveal");
    }, 1500);

    setTimeout(() => {
      intro.classList.add("finished");
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 2650);
  });
}



let currentMusicIndex=-1,isMusicPlaying=false,musicCommand=0,previewWatcher=null,easterClicks=[],specialRecordUnlocked=false;
function getMusicList(){return specialRecordUnlocked?[...SITE_CONFIG.music,SITE_CONFIG.specialRecord]:SITE_CONFIG.music}
function initMusicGalaxy(){renderRecords();const p=$("#musicPlayer");$("#musicToggle").onclick=()=>currentMusicIndex<0?playMusic(0):(isMusicPlaying?pauseMusic():resumeMusic());$("#musicPrev").onclick=()=>playMusic(currentMusicIndex<=0?getMusicList().length-1:currentMusicIndex-1);$("#musicNext").onclick=()=>playMusic(currentMusicIndex<0?0:(currentMusicIndex+1)%getMusicList().length);$("#musicProgress").onclick=e=>{if(currentMusicIndex<0)return;const r=e.currentTarget.getBoundingClientRect(),max=getMusicList()[currentMusicIndex].preview||30;p.currentTime=Math.max(0,Math.min(max,(e.clientX-r.left)/r.width*max))};p.ontimeupdate=updateMusicProgress;p.onended=stopMusic;p.onerror=()=>{toast("ไม่พบไฟล์เพลง กรุณาตรวจชื่อไฟล์ใน config.js");stopMusic()}}
function renderRecords(){const list=[...SITE_CONFIG.music,SITE_CONFIG.specialRecord];$("#musicOrbit").innerHTML=list.map((s,i)=>`<div class="record-node ${i===7?'secret-record':''} ${i===7&&specialRecordUnlocked?'unlocked':''}" data-music-index="${i}"><button class="record-player" aria-label="เล่น ${s.title}"><span class="record-disc"><span class="record-cover"><img src="${s.cover}" alt="${s.title}"></span><span class="record-hole"></span></span><span class="record-arm"></span></button><span class="record-title">${s.title}</span><span class="record-artist">${s.artist}</span></div>`).join('');$$('.record-player').forEach((b,i)=>b.onclick=()=>{trackEaster(i);if(i===7&&!specialRecordUnlocked)return;if(currentMusicIndex===i&&isMusicPlaying)pauseMusic();else if(currentMusicIndex===i)resumeMusic();else playMusic(i)})}
function trackEaster(i){const now=Date.now();easterClicks=easterClicks.filter(x=>now-x.time<=5000);easterClicks.push({i,time:now});const seq=easterClicks.slice(-3).map(x=>x.i);if(!specialRecordUnlocked&&seq.join(',')==='1,1,6'&&easterClicks.at(-1).time-easterClicks.at(-3).time<=5000)unlockSpecialRecord()}
function unlockSpecialRecord(){specialRecordUnlocked=true;playSfx('unlock');renderRecords();const m=$("#secretRecordModal");m.classList.remove('hidden');requestAnimationFrame(()=>m.classList.add('active'));celebrate()}
async function playMusic(i){const token=++musicCommand;clearInterval(previewWatcher);const p=$("#musicPlayer"),s=getMusicList()[i];if(!s)return;try{if(!p.paused){await fadeAudio(p,p.volume,0,260,token);if(token!==musicCommand)return;p.pause()}currentMusicIndex=i;p.src=s.file;p.currentTime=0;p.volume=0;await p.play();if(token!==musicCommand)return;isMusicPlaying=true;updateMusicUI();fadeAudio(p,0,1,500,token);watchPreview(token)}catch(e){toast('เบราว์เซอร์ไม่สามารถเล่นเพลงนี้ได้');isMusicPlaying=false;updateMusicUI()}}
function watchPreview(token){clearInterval(previewWatcher);previewWatcher=setInterval(()=>{if(token!==musicCommand)return clearInterval(previewWatcher);const p=$("#musicPlayer"),max=getMusicList()[currentMusicIndex]?.preview||30;if(p.currentTime>=max-2){clearInterval(previewWatcher);fadeAudio(p,p.volume,0,1800,token).then(()=>{if(token!==musicCommand)return;p.pause();p.currentTime=0;isMusicPlaying=false;updateMusicUI()})}},150)}
async function pauseMusic(){const token=++musicCommand;clearInterval(previewWatcher);const p=$("#musicPlayer");await fadeAudio(p,p.volume,0,220,token);if(token!==musicCommand)return;p.pause();isMusicPlaying=false;updateMusicUI()}
async function resumeMusic(){if(currentMusicIndex<0)return playMusic(0);const token=++musicCommand,p=$("#musicPlayer");try{p.volume=0;await p.play();isMusicPlaying=true;updateMusicUI();fadeAudio(p,0,1,420,token);watchPreview(token)}catch(e){toast('ไม่สามารถเล่นเพลงต่อได้')}}
function stopMusic(){musicCommand++;clearInterval(previewWatcher);const p=$("#musicPlayer");p.pause();p.currentTime=0;p.volume=1;isMusicPlaying=false;updateMusicUI();updateMusicProgress()}
function fadeAudio(p,from,to,duration,token){return new Promise(resolve=>{const started=performance.now();function step(now){if(token!==musicCommand)return resolve();const q=Math.min(1,(now-started)/duration);p.volume=Math.max(0,Math.min(1,from+(to-from)*q));q<1?requestAnimationFrame(step):resolve()}requestAnimationFrame(step)})}
function updateMusicUI(){const s=currentMusicIndex>=0?getMusicList()[currentMusicIndex]:null;$("#nowPlayingTitle").textContent=s?s.title:'เลือกแผ่นเสียงเพื่อเริ่มเล่น';$("#nowPlayingArtist").textContent=s?s.artist:'Music Galaxy';$("#musicToggle").textContent=isMusicPlaying?'❚❚':'▶';$("#equalizer").classList.toggle('active',isMusicPlaying);$$('.record-node').forEach((n,i)=>n.classList.toggle('playing',isMusicPlaying&&i===currentMusicIndex))}
function updateMusicProgress(){const p=$("#musicPlayer"),s=currentMusicIndex>=0?getMusicList()[currentMusicIndex]:null,max=s?s.preview||30:30,cur=Math.min(p.currentTime||0,max);$("#musicProgressBar").style.width=`${cur/max*100}%`;$("#musicCurrentTime").textContent=formatMusicTime(cur);$("#musicDuration").textContent=formatMusicTime(max)}
function formatMusicTime(v){v=Math.max(0,Math.floor(v||0));return `${String(Math.floor(v/60)).padStart(2,'0')}:${String(v%60).padStart(2,'0')}`}

function initAdventureExpansion(){
 const npc={cat:['กัปตันเหมียว','ในกาแล็กซีนี้มีเศษเสี้ยวความทรงจำซ่อนอยู่ ทำภารกิจทั้งสามให้ครบ แล้วดาวสุดท้ายจะเปิดทางไปสู่ Our Universe'],penguin:['ศาสตราจารย์เพนกวิน','ฉันวิเคราะห์แล้วว่า พลังงานของความทรงจำ เพลง และคำตอบ จะปลดผนึกดาวสีทองกลางกาแล็กซีได้'],fox:['ฟ็อกซ์ นักสำรวจ','ดาวแต่ละดวงมีเส้นทางของตัวเอง แต่ไม่ต้องกลัวหลง กัปตันเหมียวกำลังจับตาดูเธออยู่'],rabbit:['บันนี่ ช่างยาน','ระบบ Warp พร้อมแล้ว! ตอนคลิกดาว กล้องจะเร่งความเร็วและพุ่งผ่านละอองดาวไปยังภารกิจ']};
 $$('.npc').forEach(b=>b.onclick=()=>{$$('.npc').forEach(x=>x.classList.remove('active'));b.classList.add('active');const [n,t]=npc[b.dataset.npc];$('#npcName').textContent=n;$('#npcText').textContent=t;playSfx('hover')});
 $('#bossPlanet').onclick=()=>{if(!$('#bossPlanet').classList.contains('unlocked'))return toast('ดาวสุดท้ายจะเปิดเมื่อทำภารกิจครบทั้ง 3 ดวง');playSfx('portal');const o=$('#finalPlanetOverlay');o.classList.remove('hidden');requestAnimationFrame(()=>o.classList.add('active'))};
 $('#closeFinalPlanet').onclick=()=>closeOverlay('#finalPlanetOverlay');$('#startEnding').onclick=startEnding;$('#closeEnding').onclick=()=>closeOverlay('#endingCinema');$('#closeSecretRecord').onclick=()=>{closeOverlay('#secretRecordModal');setTimeout(()=>$('#music').scrollIntoView({behavior:'smooth'}),350)};
 createMagicParticles();document.addEventListener('mouseover',e=>{if(e.target.closest('button'))playSfx('hover',.08)},{passive:true});
}
function closeOverlay(sel){const o=$(sel);o.classList.remove('active');setTimeout(()=>o.classList.add('hidden'),420)}
function unlockBoss(){const b=$('#bossPlanet');if(b.classList.contains('unlocked'))return;b.classList.remove('locked');b.classList.add('unlocked');$('#bossStatus').textContent='PORTAL OPEN';playSfx('unlock');celebrate()}
function createMagicParticles(){const c=$('#galaxyParticles');for(let i=0;i<55;i++){const s=document.createElement('i');s.className='magic-particle';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.width=s.style.height=(1+Math.random()*4)+'px';s.style.color=['#fff','#9de8ff','#d9adff','#ffd77e'][i%4];s.style.setProperty('--dx',(Math.random()*240-120)+'px');s.style.setProperty('--dy',(Math.random()*-260-60)+'px');s.style.animationDuration=(4+Math.random()*7)+'s';s.style.animationDelay=(-Math.random()*8)+'s';c.appendChild(s)}}
function startEnding(){closeOverlay('#finalPlanetOverlay');const e=$('#endingCinema'),m=$('#endingMemories');m.innerHTML=SITE_CONFIG.gallery.map((x,i)=>`<img src="${x.image}" style="--sx:${-60+Math.random()*120}vw;--sy:${-40+Math.random()*80}vh;--ex:${-30+Math.random()*60}vw;--ey:${-20+Math.random()*40}vh;--r:${-30+Math.random()*60}deg;animation-delay:${i*.55}s">`).join('');e.classList.remove('hidden');requestAnimationFrame(()=>e.classList.add('active'));playSfx('portal');celebrate()}
let audioCtx;function playSfx(type,vol=.16){try{audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);const now=audioCtx.currentTime,sets={hover:[620,820,.08],complete:[440,980,.45],portal:[120,520,.8],unlock:[520,1280,.9]};const [a,b,d]=sets[type]||sets.hover;o.frequency.setValueAtTime(a,now);o.frequency.exponentialRampToValueAtTime(b,now+d);g.gain.setValueAtTime(vol,now);g.gain.exponentialRampToValueAtTime(.001,now+d);o.start(now);o.stop(now+d)}catch(e){}}
initContent();
initCinematicIntro();
initMusicGalaxy();
initAdventureExpansion();
createStars();
