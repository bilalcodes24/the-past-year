(function(){
  const memories = [
    {number:1,date:"26 AUGUST 2025",image:"assets/images/1.jpeg",text:"The first time you spammed me with reels.",type:"funny"},
    {number:2,date:"23 SEPTEMBER 2025",image:"assets/images/first vn.jpeg",text:"Not exactly the first vn, but it felt so special.",type:"cute"},
    {number:3,date:"24 SEPTEMBER 2025",image:"assets/images/2.jpeg",text:"You really wrote my name in class.",type:"cute"},
    {number:4,date:"22 OCTOBER 2025",image:"assets/images/3.jpeg",text:"I really love your humour.",type:"funny"},
    {number:5,date:"26 OCTOBER 2025",image:"assets/images/4.jpeg",text:"You somehow sent me thirty reels.",type:"funny"},
    {number:6,date:"28 OCTOBER 2025",image:"assets/images/5.jpeg",text:"I woke up to this.",type:"cute"},
    {number:7,date:"30 OCTOBER 2025",image:"assets/images/6.jpeg",text:"Wife Wazowski.",type:"funny"},
    {number:8,date:"11 NOVEMBER 2025",image:"assets/images/7.jpeg",text:"The first time you said it.",type:"core"},
    {number:9,date:"16 NOVEMBER 2025",image:"assets/images/8j.peg.jpeg",text:"You actually got mad because I fell asleep, and it made me feel so important. (I'm sorry)",type:"cute"},
    {number:10,date:"19 NOVEMBER 2025",image:"assets/images/10.jpeg",text:"And then you said ilym.",type:"core"},
    {number:11,date:"22 NOVEMBER 2025",image:"assets/images/11.jpeg",text:"I really needed this that day.",type:"core"},
    {number:12,date:"2 DECEMBER 2025",image:"assets/images/12.jpeg",text:"I felt so special.",type:"cute"},
    {number:13,date:"10 DECEMBER 2025",image:"assets/images/13.jpeg",text:"More of your little masterpieces.",type:"cute"},
    {number:14,date:"16 DECEMBER 2025",image:"assets/images/14.jpeg",text:"You randomly decided I needed to know I was cool.",type:"cute"},
    {number:15,date:"29 DECEMBER 2025",image:"assets/images/15.jpeg",text:"Two little fish.",type:"cute"},
    {number:16,date:"31 JANUARY 2026",image:"assets/images/19.jpeg",text:"The fact this was your lockscreen for so long.",type:"core"},
    {number:17,date:"12 FEBRUARY 2026",image:"assets/images/20.jpeg",text:"First time I realised you liked how I looked.",type:"cute"},
    {number:18,date:"SOME TIME IN MARCH 2026",image:"assets/images/22.jpeg",text:"🥰",type:"cute"},
    {number:19,date:"5 MARCH 2026",image:"assets/images/23.jpeg",text:"Cutie",type:"cute"},
    {number:20,date:"27 MARCH 2026",image:"assets/images/24.jpeg",text:"Even when I couldn't actually hug you, this felt so good.",type:"core"},
    {number:21,date:"28 MARCH 2026",image:"assets/images/25.jpeg",text:"Talking is the best.",type:"core"},
    {number:22,date:"1 APRIL 2026",image:"assets/images/26.jpeg",text:"You called me your favourite person.",type:"core"},
    {number:23,date:"17 APRIL 2026",image:"assets/images/27.jpeg",text:"Your reaction when I told you I loved you on call for the first time.",type:"cute"},
    {number:24,date:"25 APRIL 2026",image:"assets/images/28.jpeg",text:"You called me YOUR boyfriend.",type:"cute"},
    {number:25,date:"5 MAY 2026",image:"assets/images/29.jpeg",text:"made for each other.",type:"cute"},
    {number:26,date:"22 JUNE 2026",image:"assets/images/30.jpeg",text:"SO ADORABLE",type:"cute"},
    {number:27,date:"10 JULY 2026",image:"assets/images/31.jpeg",text:"You have no idea how much I needed this.",type:"core"}
  ];

  const total = 27;
  const memContainer = document.getElementById('memories');
  const timeline = document.getElementById('timeline');
  const audio = document.getElementById('bgAudio');
  const beginBtn = document.getElementById('beginBtn');
  const musicToggle = document.getElementById('musicToggle');
  const landing = document.getElementById('landing');
  const memoryTransition = document.getElementById('memoryTransition');
  const transitionLines = document.querySelector('.transition-lines');
  const letterSection = document.getElementById('letterSection');
  const finalSection = document.getElementById('final');

  const BASE_MUSIC_VOLUME = 0.28;
  const LETTER_MUSIC_VOLUME = 0.16;
  const FINAL_MUSIC_VOLUME = 0.12;
  let musicFadeFrame = null;
  let letterVolumeLowered = false;

  function setMusicVolume(target, duration = 2200){
    if (!audio) return;
    const normalized = Math.min(1, Math.max(0, Number(target) || BASE_MUSIC_VOLUME));
    const start = Number(audio.volume) || BASE_MUSIC_VOLUME;

    if (musicFadeFrame) cancelAnimationFrame(musicFadeFrame);
    if (duration <= 0) {
      audio.volume = normalized;
      return;
    }

    const startTime = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = start + (normalized - start) * progress;
      audio.volume = Math.min(1, Math.max(0, eased));

      if (progress < 1) {
        musicFadeFrame = requestAnimationFrame(tick);
      } else {
        musicFadeFrame = null;
      }
    };

    musicFadeFrame = requestAnimationFrame(tick);
  }

  function lowerMusicForLetter(){
    if (!audio || letterVolumeLowered) return;
    const current = Number(audio.volume) || BASE_MUSIC_VOLUME;
    if (current <= LETTER_MUSIC_VOLUME) return;

    letterVolumeLowered = true;
    setMusicVolume(LETTER_MUSIC_VOLUME, 2200);
  }

  function lowerMusicForFinal(){
    if (!audio) return;
    setMusicVolume(FINAL_MUSIC_VOLUME, 2600);
  }

  function revealTransition(){
    if (!memoryTransition || !transitionLines) return;
    const rect = memoryTransition.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    if (inView) {
      transitionLines.classList.add('visible');
    }
  }

  function revealLetterSection(){
    if (!letterSection) return;
    const rect = letterSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    if (inView) {
      letterSection.classList.add('visible');
    }
  }

  function buildTimeline(){
    timeline.innerHTML = '';
    for(let i=1;i<=total;i++){
      const mark = document.createElement('div');
      mark.className = 'marker';
      mark.textContent = String(i).padStart(2,'0');
      mark.dataset.index = i;
      timeline.appendChild(mark);
    }
  }

  function renderMemories(){
    memContainer.innerHTML = '';
    memories.forEach((m,idx)=>{
      const el = document.createElement('article');
      el.className = 'memory ' + (m.type || 'normal');
      el.dataset.index = String(m.number || idx + 1);

      const date = document.createElement('div');
      date.className = 'meta-line';
      date.textContent = m.date || '';

      const imageWrap = document.createElement('div');
      imageWrap.className = 'image-wrap';
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = m.date || '';
      if (m.image) {
        img.src = m.image;
        img.onerror = function(){
          img.style.background = 'linear-gradient(135deg, rgba(36,26,66,0.5), rgba(16,21,45,0.6))';
          img.style.minHeight = '320px';
          img.style.border = '1px solid rgba(255,255,255,0.03)';
          img.style.display = 'block';
          img.src = '';
        };
      } else {
        img.style.display = 'none';
      }
      imageWrap.appendChild(img);

      const caption = document.createElement('div');
      caption.className = 'caption';
      caption.textContent = m.text || '';

      el.appendChild(date);
      el.appendChild(imageWrap);
      el.appendChild(caption);

      memContainer.appendChild(el);
    });
  }

  const prefsReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const el = entry.target;
      if(entry.isIntersecting){
        el.classList.add('in-view');
        updateTimelineActive(parseInt(el.dataset.index,10));
      }
    });
  },{threshold:0.2});

  function observeMemories(){
    document.querySelectorAll('.memory').forEach(n=>io.observe(n));
  }

  function updateTimelineActive(idx){
    const prev = timeline.querySelector('.marker.active');
    if(prev) prev.classList.remove('active');
    const node = timeline.querySelector(`.marker[data-index="${idx}"]`);
    if(node) node.classList.add('active');
  }

  function fadeInAudio(target=BASE_MUSIC_VOLUME,duration=4200){
    if(!audio) return;
    audio.volume = 0;
    audio.play().catch(()=>{});
    setMusicVolume(target, duration);
  }

  function toggleMusic(){
    if(!audio) return;
    if(audio.paused){
      audio.volume = Number(audio.volume) || BASE_MUSIC_VOLUME;
      audio.play().then(()=>{
        musicToggle.classList.add('playing');
        musicToggle.setAttribute('aria-pressed','true');
      }).catch(()=>{});
    } else {
      audio.pause();
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-pressed','false');
    }
  }

  beginBtn.addEventListener('click',()=>{
    try{ fadeInAudio(BASE_MUSIC_VOLUME,4200);}catch(e){}
    landing.style.transition = 'opacity 700ms ease, transform 700ms ease';
    landing.style.opacity = 0;
    landing.style.transform = 'translateY(-12px)';

    let cleanedUp = false;
    const scrollToFirst = ()=>{
      if (cleanedUp) return;
      cleanedUp = true;
      try{ landing.remove(); }catch(e){}
      const first = document.querySelector('.memory');
      if (first) {
        const rect = first.getBoundingClientRect();
        const targetY = window.scrollY + rect.top - 64;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    };

    const onTransitionEnd = (e) => {
      if (e.propertyName && e.propertyName.indexOf('opacity') === -1) return;
      landing.removeEventListener('transitionend', onTransitionEnd);
      scrollToFirst();
    };

    landing.addEventListener('transitionend', onTransitionEnd);
    // Fallback in case transitionend doesn't fire
    setTimeout(scrollToFirst, 900);
  });

  musicToggle.addEventListener('click',()=>{
    toggleMusic();
  });

  audio.addEventListener('error',()=>{
    musicToggle.style.display = 'none';
  });
  audio.addEventListener('play',()=>{
    musicToggle.classList.add('playing');
    musicToggle.setAttribute('aria-pressed','true');
  });
  audio.addEventListener('pause',()=>{
    musicToggle.classList.remove('playing');
    musicToggle.setAttribute('aria-pressed','false');
  });

  buildTimeline();
  renderMemories();
  observeMemories();

  revealTransition();
  revealLetterSection();

  const letterObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        document.body.classList.add('letter-mode');
        lowerMusicForLetter();
      }
    });
  }, { threshold: 0.18 });

  if (letterSection) letterObserver.observe(letterSection);

  const finalObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        lowerMusicForFinal();
      }
    });
  }, { threshold: 0.35 });

  if (finalSection) finalObserver.observe(finalSection);

  if (audio) {
    audio.volume = BASE_MUSIC_VOLUME;
  }

  document.addEventListener('scroll',()=>{
    revealTransition();
    revealLetterSection();
  }, { passive: true });

  beginBtn.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter' || e.key === ' ') beginBtn.click();
  });

  if(prefsReduced){
    document.addEventListener('scroll',()=>{
      const items = document.querySelectorAll('.memory');
      let closest = null; let closestDist = Infinity;
      items.forEach(item=>{
        const r = item.getBoundingClientRect();
        const dist = Math.abs(r.top + r.bottom - window.innerHeight)/2;
        if(dist < closestDist){ closest = item; closestDist = dist; }
      });
      if(closest) updateTimelineActive(parseInt(closest.dataset.index,10));
    });
  }
})();
