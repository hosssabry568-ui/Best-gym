'use strict';

// ===============================================================
// BEAST GYM — JAVASCRIPT
// Multi-page routing, exercises DB, nutrition plans, all UX
// ===============================================================

// ====== DATA ======

const EXERCISES = [
  // CHEST
  {id:1, name:'Bench Press - بنش بريس', muscle:'chest', img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=75&auto=format&fit=crop', desc:'الملك الأول لبناء الصدر. يستهدف الصدر الكبير والأمامي والترايسبس.', sets:'4 × 8-12', level:'مبتدئ–متقدم', tips:'أخفض الحديد ببطء 2-3 ثوانٍ، اضغط الكتفين للخلف'},
  {id:2, name:'Incline DB Press - مائل للأعلى', muscle:'chest', img:'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=500&q=75&auto=format&fit=crop', desc:'يستهدف الجزء العلوي من الصدر. مائل 30-45 درجة للحصول على أقصى تأثير.', sets:'4 × 10-12', level:'مبتدئ', tips:'لا ترتفع الدمبلز عالياً فوق الصدر، حافظ على القوس الطبيعي للظهر'},
  {id:3, name:'Cable Flye - كيبل فلاي', muscle:'chest', img:'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&q=75&auto=format&fit=crop', desc:'تمرين عزل مثالي لتعريف الصدر وإتمام الضخ. يحافظ على الضغط طوال المدى.', sets:'3 × 15', level:'متوسط', tips:'تخيل أنك تحضن شجرة كبيرة، ابق مرفقيك منحنيين قليلاً'},
  // BACK
  {id:4, name:'Deadlift - ديدليفت', muscle:'back', img:'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=500&q=75&auto=format&fit=crop', desc:'أكثر التمارين المركبة فعالية. يعمل على الظهر كاملاً، الأرجل، والمنطقة الوسطى.', sets:'4 × 5', level:'متوسط–متقدم', tips:'حافظ على الظهر مستقيماً، الحديد قريب من الجسم، انطلق من الأعقاب'},
  {id:5, name:'Pull-Up - عقلة', muscle:'back', img:'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&q=75&auto=format&fit=crop', desc:'معيار القوة الحقيقية. يبني الظهر العريض ويعطي الشكل V المميز.', sets:'4 × Max', level:'متوسط', tips:'لا تتأرجح، تحكم في الحركة صعوداً وهبوطاً. مسافة يدين أوسع من الكتفين'},
  {id:6, name:'Cable Row - سحب كيبل', muscle:'back', img:'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&q=75&auto=format&fit=crop', desc:'يستهدف عضلات الظهر الوسطى والسفلى. ممتاز لبناء سمك الظهر.', sets:'4 × 12', level:'مبتدئ', tips:'اجلس منتصباً، اسحب نحو السرة، اضغط لوحي الكتفين معاً في نهاية الحركة'},
  // LEGS
  {id:7, name:'Squat - سكوات', muscle:'legs', img:'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=75&auto=format&fit=crop', desc:'ملك التمارين. يعمل على الكواد، الهامسترينج، الأرداف، والظهر السفلي.', sets:'5 × 5', level:'مبتدئ–متقدم', tips:'ركبتيك تتبعان اتجاه أصابعك، انزل حتى 90 درجة على الأقل، ظهرك مستقيم'},
  {id:8, name:'Romanian Deadlift - RDL', muscle:'legs', img:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=75&auto=format&fit=crop', desc:'أفضل تمرين للهامسترينج والأرداف. يبني القوة الخلفية ويحسن المرونة.', sets:'4 × 10', level:'متوسط', tips:'احرك الوركين للخلف وليس الركبتين، اشعر بشد الهامسترينج في الأسفل'},
  {id:9, name:'Leg Press - بريس أرجل', muscle:'legs', img:'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=75&auto=format&fit=crop', desc:'بديل ممتاز للسكوات لاستهداف الكواد بشكل مكثف بدون ضغط على العمود الفقري.', sets:'4 × 15', level:'مبتدئ', tips:'لا تثني الركبتين أكثر من 90 درجة، القدمان على عرض الكتفين'},
  // SHOULDERS
  {id:10, name:'OHP - ضغط فوق الرأس', muscle:'shoulders', img:'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=75&auto=format&fit=crop', desc:'المحرك الأساسي للأكتاف. يبني الجزء الأمامي والأوسط مع تعمل على الترايسبس.', sets:'4 × 8', level:'متوسط', tips:'الكور مشدود دائماً، لا تنحني للخلف، الحديد فوق الرأس مباشرة'},
  {id:11, name:'Lateral Raise - رفع جانبي', muscle:'shoulders', img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=75&auto=format&fit=crop', desc:'أفضل تمرين لتوسيع الأكتاف وإعطاء المظهر العريض المميز.', sets:'4 × 15', level:'مبتدئ', tips:'ارفع حتى مستوى الأكتاف فقط، لا تتأرجح، ابق المرفق منحنياً قليلاً'},
  {id:12, name:'Face Pull - فيس بول', muscle:'shoulders', img:'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=500&q=75&auto=format&fit=crop', desc:'ضروري لصحة الكتف الخلفي وتوازن الأكتاف. يقوي الكاف الخلفي الذي يُهمل كثيراً.', sets:'3 × 20', level:'مبتدئ', tips:'الكيبل في مستوى الأذن، اسحب بخارجي المرفقين، اضغط لوحي الكتفين'},
  // ARMS
  {id:13, name:'Bicep Curl - تمرين البايسبس', muscle:'arms', img:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=75&auto=format&fit=crop', desc:'الكلاسيكي في بناء البايسبس. يستهدف الرأسين ويعطي الارتفاع والسمك.', sets:'4 × 12', level:'مبتدئ', tips:'لا تتأرجح المرفقان، اجعلهما ثابتتين على جانبيك، تحكم كامل في كل التكرارات'},
  {id:14, name:'Tricep Pushdown - تمرين الترايسبس', muscle:'arms', img:'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&q=75&auto=format&fit=crop', desc:'يستهدف الرأس الطويل والجانبي للترايسبس. يعطي الذراع تعريفاً وحجماً.', sets:'4 × 12', level:'مبتدئ', tips:'المرفقان ثابتان على جانبيك، الجزء العلوي من الذراع لا يتحرك'},
  {id:15, name:'Hammer Curl - هامر', muscle:'arms', img:'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&q=75&auto=format&fit=crop', desc:'يستهدف الـ Brachialis الذي يدفع البايسبس للأعلى ويعطي سماكة للذراع.', sets:'3 × 12', level:'مبتدئ', tips:'الإبهام للأعلى، مسافة عرض الكتفين، التحكم الكامل في الحركة'},
  // CORE
  {id:16, name:'Plank - بلانك', muscle:'core', img:'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=75&auto=format&fit=crop', desc:'أساس القوة الوسطى. يعمل على العضلة المستقيمة والعرضية والجانبية والظهر.', sets:'4 × 60ث', level:'مبتدئ', tips:'الجسم خط مستقيم، لا ترفع المؤخرة أو تتدلى، تنفس بانتظام'},
  {id:17, name:'Cable Crunch - كيبل كرانش', muscle:'core', img:'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&q=75&auto=format&fit=crop', desc:'أفضل تمرين لعضلات البطن العلوية والسفلية بمقاومة ثابتة طوال الحركة.', sets:'4 × 15', level:'متوسط', tips:'الحركة من الكور وليس الرقبة، اضغط البطن في نهاية الحركة بالكامل'},
  {id:18, name:'Russian Twist - روسي تويست', muscle:'core', img:'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=500&q=75&auto=format&fit=crop', desc:'يستهدف العضلات الجانبية Obliques لتنحيف الخصر والحصول على الشكل V.', sets:'4 × 20', level:'مبتدئ', tips:'ارفع قدميك عن الأرض للتصعيب، الدوران يكون من الخصر وليس الذراعين'}
];

const NUT_PLANS = {
  bulk: {
    title: 'نظام الضخامة وبناء الكتلة العضلية',
    desc: 'فائض حراري 300-500 سعرة مع تركيز عالٍ على البروتين لبناء عضلات نظيفة',
    cals: 3200,
    macros: [{l:'بروتين', p:35, c:'#e63946'},{l:'كربوهيدرات', p:45, c:'#4361ee'},{l:'دهون', p:20, c:'#f4a261'}],
    meals: [
      {time:'6:30 ص', name:'الإفطار 🍳', items:['بيض كامل 3 حبات + بياض 3 حبات مخفوق','شوفان مطبوخ 100 غرام بحليب كامل الدسم','موزة متوسطة مهروسة + ملعقة كبيرة زبدة فول سوداني طبيعية'], cals:680},
      {time:'10:00 ص', name:'وجبة منتصف الصباح 💪', items:['واي بروتين 40 غرام في ماء أو حليب','مكسرات مشكلة (لوز + جوز) 30 غرام','تفاحة متوسطة أو كوب توت طازج'], cals:420},
      {time:'1:30 م', name:'الغداء الرئيسية 🍗', items:['صدر دجاج مشوي 220 غرام بالتوابل','أرز بني مطبوخ 150 غرام جاف','خضار مشوية مشكلة 200 غرام + ملعقة زيت زيتون بكر','شوربة عدس كوب صغير'], cals:780},
      {time:'4:30 م', name:'ما قبل التمرين ⚡', items:['موزتان ناضجتان (كربوهيدرات سريعة)','واي بروتين 30 غرام اختياري','كرياتين 5 غرام + ماء'], cals:340},
      {time:'7:30 م', name:'ما بعد التمرين 🥩', items:['لحم بقر مفروم 90% قليل الدهن 180 غرام','بطاطا حلوة مشوية 250 غرام','سلطة خضراء كبيرة + زيت زيتون','واي بروتين 40 غرام'], cals:640},
      {time:'10:30 م', name:'العشاء 🧀', items:['جبن قريش خالي الدسم 250 غرام','بيض مسلوق 3 حبات','خيار + طماطم مقطعة','قليل من الملح والفلفل الأسود'], cals:340}
    ]
  },
  cut: {
    title: 'نظام حرق الدهون والتخسيس',
    desc: 'عجز حراري مدروس 500 سعرة مع بروتين عالٍ للحفاظ على كل كيلو من العضلات',
    cals: 1800,
    macros: [{l:'بروتين', p:45, c:'#e63946'},{l:'كربوهيدرات', p:30, c:'#4361ee'},{l:'دهون', p:25, c:'#f4a261'}],
    meals: [
      {time:'7:00 ص', name:'الإفطار الخفيف 🍳', items:['بياض 6 بيضات مقلي بالتيفال بدون زيت','خضار مشوية 200 غرام (فلفل، كوسا، بصل)','شاي أخضر بدون سكر'], cals:280},
      {time:'10:00 ص', name:'وجبة خفيفة 🥗', items:['زبادي يوناني خالي الدسم 200 غرام','فراولة طازجة 150 غرام أو كوب توت','كاسيين بروتين 20 غرام اختياري'], cals:200},
      {time:'1:00 م', name:'الغداء 🥙', items:['سلطة تونة كبيرة (علبة تونة في الماء)','خبز قمح كامل شريحة واحدة','خس + طماطم + خيار + ليمون + خردل'], cals:450},
      {time:'4:30 م', name:'ما قبل التمرين ☕', items:['قهوة سوداء بدون سكر (200 ملغ كافيين)','تفاحة صغيرة أو حبتا تمر','L-Carnitine 2000 ملغ'], cals:110},
      {time:'7:30 م', name:'ما بعد التمرين 💊', items:['واي بروتين 30 غرام خالي الدهون في ماء','خيار وفلفل مقطع كسناك','ماء دافئ بليمون'], cals:150},
      {time:'9:00 م', name:'العشاء 🫕', items:['صدر دجاج مسلوق 180 غرام','شوربة خضار كبيرة بدون دهون','سلطة خضراء كبيرة + خل تفاح'], cals:610}
    ]
  },
  maintain: {
    title: 'نظام الصيانة والتوازن',
    desc: 'الحفاظ على الوزن الحالي مع تحسين تركيبة الجسم وأداء الرياضة',
    cals: 2400,
    macros: [{l:'بروتين', p:30, c:'#e63946'},{l:'كربوهيدرات', p:45, c:'#4361ee'},{l:'دهون', p:25, c:'#f4a261'}],
    meals: [
      {time:'7:30 ص', name:'إفطار متوازن 🥞', items:['شوفان 80 غرام بحليب 1% + عسل ملعقة','بيضتان مع بياض بيضتين مسلوق','موزة + تفاحة صغيرة'], cals:500},
      {time:'10:30 ص', name:'وجبة خفيفة 🍌', items:['موزة + كوب عصير برتقال طازج','حفنة مكسرات 20 غرام','ماء 500 مل'], cals:300},
      {time:'1:30 م', name:'الغداء 🍝', items:['معكرونة قمح كامل 150 غرام جاف','صلصة طماطم مع لحم مفروم 100 غرام','سلطة خضراء جانبية'], cals:650},
      {time:'4:00 م', name:'ما قبل التمرين ⚡', items:['موزتان ناضجتان','واي بروتين 25 غرام','ماء + كرياتين 5 غرام'], cals:350},
      {time:'7:00 م', name:'ما بعد التمرين 🍗', items:['دجاج مشوي 180 غرام','أرز بني 120 غرام جاف','بروكلي مطبوخ بالبخار'], cals:500},
      {time:'10:00 م', name:'العشاء 🥛', items:['زبادي بالعسل 200 غرام','تمر 3 حبات','شاي أعشاب (نعناع أو بابونج)'], cals:100}
    ]
  },
  women: {
    title: 'نظام غذائي مخصص للمرأة الرياضية',
    desc: 'مصمم لاحتياجات المرأة الهرمونية والغذائية مع دعم الأرداف والعضلات',
    cals: 1900,
    macros: [{l:'بروتين', p:35, c:'#e63946'},{l:'كربوهيدرات', p:40, c:'#4361ee'},{l:'دهون', p:25, c:'#f4a261'}],
    meals: [
      {time:'7:00 ص', name:'الإفطار 🌸', items:['شوفان 60 غرام بحليب لوز + بذور شيا 15 غرام','بيضتان مسلوقتان','كوب توت بري مجمد أو طازج + عسل طبيعي'], cals:420},
      {time:'10:30 ص', name:'وجبة خفيفة 🍓', items:['زبادي يوناني طبيعي 200 غرام','فواكه موسمية 100 غرام','مكسرات 15 غرام (لوز أو جوز)'], cals:280},
      {time:'1:00 م', name:'الغداء 🥗', items:['سلمون مشوي 150 غرام (مصدر أوميغا 3)','كينوا مطبوخة 100 غرام + خضار ملونة','زيت زيتون ملعقة + ليمون طازج'], cals:500},
      {time:'4:00 م', name:'ما قبل التمرين ⚡', items:['موزة + تمرتان','واي بروتين 20 غرام في حليب لوز'], cals:260},
      {time:'7:00 م', name:'ما بعد التمرين 💪', items:['صدر دجاج مشوي 150 غرام','بطاطا حلوة صغيرة 150 غرام','سبانخ مطبوخ + ثوم'], cals:380},
      {time:'9:30 م', name:'العشاء 🌙', items:['جبن قريش خالي الدسم 150 غرام','خيار + طماطم مقطعة','شاي بابونج (يحسن النوم)'], cals:60}
    ]
  }
};

// ====== ROUTER ======
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  }
  document.querySelectorAll(`[data-page="${pageId}"]`).forEach(l => {
    if (l.classList.contains('nav-link')) l.classList.add('active');
  });
  // Initialize page-specific content
  if (pageId === 'exercises' && !document.getElementById('exGrid').children.length) renderExercises();
  if (pageId === 'nutrition') {
    if (!document.getElementById('nutContent').children.length) renderNutPlan('bulk');
  }
  // Close mobile menu
  document.getElementById('navMenu').classList.remove('open');
  document.getElementById('navBurger').classList.remove('open');
  document.body.style.overflow = '';
  // Animate page hero counters
  setTimeout(() => triggerReveal(), 100);
}

// Bind all data-page links
document.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (el) {
    e.preventDefault();
    navigate(el.dataset.page);
  }
});

// ====== NAV SCROLL ======
const nav = document.getElementById('mainNav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 60);
  // progress bar
  const pb = document.getElementById('pgbar');
  if (pb) {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    pb.style.width = (y / total * 100) + '%';
  }
  // back to top
  const btt = document.getElementById('btt');
  if (btt) btt.classList.toggle('show', y > 400);
  lastY = y;
}, {passive:true});

// ====== BURGER ======
document.getElementById('navBurger').addEventListener('click', function(){
  this.classList.toggle('open');
  const menu = document.getElementById('navMenu');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
});

// ====== BACK TO TOP ======
document.getElementById('btt').addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

// ====== HERO COUNTER ANIMATION ======
function animateCounters(scope = document) {
  scope.querySelectorAll('.hnum[data-count]').forEach(el => {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';
    const target = +el.dataset.count;
    let cur = 0;
    const inc = target / 60;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = Math.floor(cur).toLocaleString('ar-SA');
    }, 25);
  });
}

// ====== SCROLL REVEAL ======
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); revObs.unobserve(e.target); }
  });
}, {threshold:.1, rootMargin:'0px 0px -40px 0px'});

function triggerReveal() {
  document.querySelectorAll('.page.active [class]').forEach(el => {
    const cls = ['split-img','split-txt','wi','mi','ps-card','tc','pd-block','tr-card','prc','ci','sc','mc','ex-card'];
    if (cls.some(c => el.classList.contains(c)) && !el.classList.contains('rev-el')) {
      el.classList.add('rev-el');
      revObs.observe(el);
    }
  });
  if (document.querySelector('#page-home.active')) {
    setTimeout(() => animateCounters(), 400);
  }
}

// ====== EXERCISES RENDER ======
function renderExercises(filter = 'all') {
  const grid = document.getElementById('exGrid');
  if (!grid) return;
  const filtered = filter === 'all' ? EXERCISES : EXERCISES.filter(e => e.muscle === filter);
  grid.innerHTML = filtered.map(ex => `
    <div class="ex-card rev-el" data-m="${ex.muscle}">
      <div class="ex-img">
        <img src="${ex.img}" alt="${ex.name}" loading="lazy"/>
        <span class="ex-muscle">${muscleAr(ex.muscle)}</span>
      </div>
      <div class="ex-body">
        <h4>${ex.name}</h4>
        <p>${ex.desc}</p>
        <div class="ex-sets">${ex.sets} | ${ex.level}</div>
        <div class="ex-tags"><span class="ex-tag">💡 ${ex.tips.substring(0,35)}...</span></div>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('.rev-el').forEach(el => revObs.observe(el));
}

function muscleAr(m) {
  return {chest:'الصدر',back:'الظهر',legs:'الأرجل',shoulders:'الأكتاف',arms:'الذراعين',core:'Core'}[m] || m;
}

// Exercise filter buttons
document.getElementById('exFilter')?.addEventListener('click', e => {
  const btn = e.target.closest('.ef');
  if (!btn) return;
  document.querySelectorAll('.ef').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderExercises(btn.dataset.f);
});

// ====== NUTRITION RENDER ======
function renderNutPlan(planKey) {
  const plan = NUT_PLANS[planKey];
  if (!plan) return;
  const content = document.getElementById('nutContent');
  if (!content) return;
  const calPerc = (p) => `width:${p}%`;
  content.innerHTML = `
    <div class="nut-plan-wrap">
      <div class="np-header">
        <div class="np-info">
          <h3>${plan.title}</h3>
          <p>${plan.desc}</p>
          <div class="np-macros">
            ${plan.macros.map(m => `
              <div class="nm">
                <span>${m.l}</span>
                <div class="nm-bar"><div class="nm-fill" style="background:${m.c};width:${m.p}%"></div></div>
                <span>${m.p}%</span>
              </div>`).join('')}
          </div>
        </div>
        <div class="np-cal">
          <span>${plan.cals.toLocaleString('ar-SA')}</span>
          <span>سعرة/يوم</span>
        </div>
      </div>
      <div class="meals-grid">
        ${plan.meals.map(m => `
          <div class="mc rev-el">
            <div class="mc-time">${m.time}</div>
            <div class="mc-name">${m.name}</div>
            <ul>${m.items.map(i => `<li>${i}</li>`).join('')}</ul>
            <span class="mc-cal">${m.cals} سعرة</span>
          </div>`).join('')}
      </div>
    </div>`;
  content.querySelectorAll('.rev-el').forEach(el => revObs.observe(el));
}

document.querySelector('.nut-tabs')?.addEventListener('click', e => {
  const btn = e.target.closest('.nt');
  if (!btn) return;
  document.querySelectorAll('.nt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderNutPlan(btn.dataset.plan);
});

// ====== CALORIE CALCULATOR ======
document.getElementById('calcBtn')?.addEventListener('click', () => {
  const w = +document.getElementById('cW').value;
  const h = +document.getElementById('cH').value;
  const a = +document.getElementById('cA').value;
  const g = document.getElementById('cG').value;
  const act = +document.getElementById('cAct').value;
  if (!w || !h || !a || w < 30 || h < 100 || a < 10) {
    alert('الرجاء إدخال بيانات صحيحة');
    return;
  }
  // Mifflin-St Jeor
  const bmr = g === 'm'
    ? 10*w + 6.25*h - 5*a + 5
    : 10*w + 6.25*h - 5*a - 161;
  const maint = Math.round(bmr * act);
  const cut = maint - 500;
  const bulk = maint + 300;
  document.getElementById('crM').textContent = maint.toLocaleString('ar-SA');
  document.getElementById('crC').textContent = cut.toLocaleString('ar-SA');
  document.getElementById('crB').textContent = bulk.toLocaleString('ar-SA');
  // macros
  const prot = Math.round(w * 2.2);
  const fat = Math.round(maint * 0.25 / 9);
  const carb = Math.round((maint - prot*4 - fat*9) / 4);
  const ms = document.getElementById('macroSplit');
  if (ms) ms.innerHTML = `
    <div class="ms-item"><strong>${prot}غ</strong><span>بروتين</span></div>
    <div class="ms-item"><strong>${carb}غ</strong><span>كربوهيدرات</span></div>
    <div class="ms-item"><strong>${fat}غ</strong><span>دهون</span></div>`;
  const res = document.getElementById('calcRes');
  res.classList.add('show');
  res.scrollIntoView({behavior:'smooth', block:'nearest'});
});

// ====== PRICING TOGGLE ======
document.getElementById('annTog')?.addEventListener('change', function() {
  const isAnn = this.checked;
  document.querySelectorAll('.prn').forEach(el => {
    el.textContent = isAnn ? el.dataset.a : el.dataset.m;
  });
});

// ====== CONTACT FORM ======
document.getElementById('mainForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('fN').value.trim();
  const phone = document.getElementById('fP').value.trim();
  const email = document.getElementById('fE').value.trim();
  const goal = document.getElementById('fGo').value;
  const status = document.getElementById('fStatus');
  const btn = document.getElementById('sTxt');
  // Validate
  if (!name || !phone || !email || !goal) {
    status.textContent = '⚠️ يرجى تعبئة جميع الحقول المطلوبة (*)';
    status.className = 'fstatus err';
    return;
  }
  if (!/^05\d{8}$/.test(phone.replace(/\s/g,''))) {
    status.textContent = '⚠️ رقم الجوال غير صحيح — يجب أن يبدأ بـ 05';
    status.className = 'fstatus err';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = '⚠️ البريد الإلكتروني غير صحيح';
    status.className = 'fstatus err';
    return;
  }
  btn.textContent = '⏳ جاري الإرسال...';
  this.querySelector('button').disabled = true;
  setTimeout(() => {
    btn.textContent = 'احجز جلستي المجانية 🔥';
    this.querySelector('button').disabled = false;
    status.textContent = `✅ تم استلام طلبك يا ${name}! سنتواصل معك على ${phone} خلال ساعات.`;
    status.className = 'fstatus ok';
    this.reset();
  }, 1500);
});

// ====== PROGRESS BAR ======
const pgbar = document.createElement('div');
pgbar.id = 'pgbar';
document.body.prepend(pgbar);

// ====== INIT ======
window.addEventListener('DOMContentLoaded', () => {
  triggerReveal();
  animateCounters();
  // Set home page active nav
  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.dataset.page === 'home') l.classList.add('active');
  });
});

console.log('%c⚡ BEAST GYM %c— Powered by passion', 'color:#e63946;font-size:18px;font-weight:bold', 'color:#4cc9f0;font-size:12px');
