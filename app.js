const I18N = {
  en: {
    tag:"PUBLIC NODE · 0xNC",
    connect:"CONNECT NODE",
    ghost:"cinema as protocol",
    lede:"Not a brochure. A live operating surface for halls, cold vault, candy inventory and the intake ledger. English by default. Flip to Arabic when the room needs it.",
    sig:"OPERATOR SIGNATURE",
    sigv:"4skylr / noir-cinema",
    hallsTitle:"Four rooms. One chain of seats.",
    h1t:"Hall Alpha", h1p:"218 seats · IMAX throw · clean cycle 00:40",
    h2t:"Hall Beta", h2p:"164 seats · Dolby rack · clean cycle 00:32",
    h3t:"Hall Gamma", h3p:"96 seats · VIP recline · clean cycle 00:28",
    h4t:"Hall Delta", h4p:"72 seats · kids / festival · clean cycle 00:24",
    vaultTitle:"Warehouse is a temperature contract.",
    cold:"COLD BAND", coldp:"Hold between 15–25°C. Door state is binary. Open is an event, not a habit.",
    rules:"RULES", rulesp:"FIFO on candy. Locked cage for high-value SKUs. No cardboard on wet floors. Photograph every intake.",
    invTitle:"Tokens you can eat.",
    i1t:"Hot dog", i1p:"Roll + frank + sauces. Count at open and close.",
    i2t:"Popcorn", i2p:"Kernel bins, oil, salt. Pop only against showtime load.",
    i3t:"Nachos", i3p:"Chips + cheese well. Temp log every two hours.",
    i4t:"Soda line", i4p:"Syrup tanks and CO2. Treat as a pressure system.",
    ledTitle:"Week signal. Intake is append-only.",
    stackTitle:"Famous GitHub libraries in this node.",
    days:["SAT","SUN","MON","TUE","WED","THU","FRI"]
  },
  ar: {
    tag:"عقدة عامة · 0xNC",
    connect:"ربط العقدة",
    ghost:"السينما بروتوكول",
    lede:"مو موقع تعريفي. سطح تشغيل للقاعات والخزنة الباردة وجرد الحلويات وسجل الاستلام. الإنجليزي هو الأصل. حوّله عربي وقت الحاجة.",
    sig:"توقيع المشغّل",
    sigv:"4skylr / نوار سينما",
    hallsTitle:"أربع قاعات. سلسلة مقاعد واحدة.",
    h1t:"قاعة ألفا", h1p:"٢١٨ مقعد · رمي IMAX · دورة تنظيف ٠٠:٤٠",
    h2t:"قاعة بيتا", h2p:"١٦٤ مقعد · دولبي · دورة تنظيف ٠٠:٣٢",
    h3t:"قاعة جاما", h3p:"٩٦ مقعد · في آي بي · دورة تنظيف ٠٠:٢٨",
    h4t:"قاعة دلتا", h4p:"٧٢ مقعد · أطفال / مهرجان · دورة تنظيف ٠٠:٢٤",
    vaultTitle:"المستودع عقد حرارة.",
    cold:"النطاق البارد", coldp:"الإبقاء بين ١٥–٢٥°م. حالة الباب ثنائية. الفتح حدث، مو عادة.",
    rules:"القواعد", rulesp:"FIFO على الحلويات. قفص مقفل للأصناف الغالية. ممنوع الكرتون على الأرضية المبللة. صوّر كل استلام.",
    invTitle:"توكنات تؤكل.",
    i1t:"هوت دوق", i1p:"خبز + نقانق + صوص. جرد عند الفتح والإغلاق.",
    i2t:"فشار", i2p:"حبوب وزيت وملح. الفور حسب حمل العروض.",
    i3t:"ناتشوز", i3p:"رقائق وجبن. سجل حرارة كل ساعتين.",
    i4t:"خط المشروبات", i4p:"سيرب وثاني أكسيد الكربون. تعامل معه كنظام ضغط.",
    ledTitle:"إشارة الأسبوع. الاستلام إضافة فقط.",
    stackTitle:"مكتبات GitHub المستخدمة في العقدة.",
    days:["سبت","أحد","إثنين","ثلاثاء","أربعاء","خميس","جمعة"]
  }
};

let lang = localStorage.getItem("noir-lang") || "en";
const applyLang = () => {
  const pack = I18N[lang];
  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("ar", lang === "ar");
  document.querySelectorAll("[data-i]").forEach(el => {
    const k = el.getAttribute("data-i");
    if (pack[k]) el.textContent = pack[k];
  });
  document.getElementById("enBtn").classList.toggle("on", lang === "en");
  document.getElementById("arBtn").classList.toggle("on", lang === "ar");
  renderDates();
  if (window._chart) {
    window._chart.data.labels = pack.days;
    window._chart.update();
  }
};

document.getElementById("enBtn").onclick = () => { lang = "en"; localStorage.setItem("noir-lang", lang); applyLang(); };
document.getElementById("arBtn").onclick = () => { lang = "ar"; localStorage.setItem("noir-lang", lang); applyLang(); };

dayjs.extend(window.dayjs_plugin_isoWeek);
function renderDates(){
  const now = dayjs();
  if (lang === "ar") dayjs.locale("ar"); else dayjs.locale("en");
  const hijri = new Intl.DateTimeFormat(lang === "ar" ? "ar-SA-u-ca-islamic" : "en-SA-u-ca-islamic", {day:"numeric",month:"long",year:"numeric"}).format(new Date());
  document.getElementById("dates").innerHTML = `
    <span class="chip">${lang==="ar"?"اليوم":"DAY"} <b>${now.format("dddd")}</b></span>
    <span class="chip">${lang==="ar"?"ميلادي":"GREG"} <b>${now.format("D MMM YYYY")}</b></span>
    <span class="chip">${lang==="ar"?"هجري":"HIJRI"} <b>${hijri}</b></span>
    <span class="chip">${lang==="ar"?"أسبوع":"ISO WEEK"} <b>${now.isoWeek()}</b></span>
  `;
}

const lines = [
  "NOIR CINEMA NODE",
  "> mounting projector bus",
  "> hydrating three.js field",
  "> binding GSAP / Lenis",
  "> wallet surface: local only",
  "> locale: EN default / AR ready",
  "READY."
];
const bootlog = document.getElementById("bootlog");
let li = 0;
const bootTimer = setInterval(() => {
  bootlog.textContent += lines[li++] + "\n";
  if (li >= lines.length) {
    clearInterval(bootTimer);
    setTimeout(() => gsap.to("#boot", {opacity:0, duration:.6, onComplete:() => boot.remove()}), 350);
  }
}, 180);

const cur = document.getElementById("cur");
window.addEventListener("pointermove", e => {
  gsap.to(cur, {x:e.clientX, y:e.clientY, duration:.15, ease:"power2.out"});
});

document.getElementById("connect").onclick = () => {
  const btn = document.getElementById("connect");
  btn.textContent = lang === "ar" ? "العقدة متصلة" : "NODE LIVE";
  btn.classList.add("on");
};

const tick = "NOIR · HALLS · VAULT · INVENTORY · LEDGER · 0x7A2A90 · ";
document.getElementById("ticker").textContent = (tick + tick + tick + tick);

const hex = [...crypto.getRandomValues(new Uint8Array(32))].map(n => n.toString(16).padStart(2,"0")).join("");
document.getElementById("hash").textContent = "0x" + hex;

setInterval(() => {
  document.getElementById("clock").textContent = new Date().toISOString().replace("T"," · ").slice(0,22);
}, 1000);

(() => {
  const canvas = document.getElementById("field");
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, 0.1, 100);
  camera.position.z = 16;
  const geo = new THREE.BufferGeometry();
  const count = 900;
  const pos = new Float32Array(count*3);
  for (let i=0;i<pos.length;i++) pos[i] = (Math.random()-0.5)*40;
  geo.setAttribute("position", new THREE.BufferAttribute(pos,3));
  const mat = new THREE.PointsMaterial({size:.035, color:0xD6FF3C, transparent:true, opacity:.55});
  const points = new THREE.Points(geo, mat);
  scene.add(points);
  const resize = () => {
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix();
  };
  resize(); addEventListener("resize", resize);
  const loop = () => {
    points.rotation.y += 0.0007;
    points.rotation.x += 0.0002;
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  };
  loop();
})();

const lenis = new Lenis({ lerp: 0.08 });
function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
gsap.registerPlugin(ScrollTrigger);
lenis.on("scroll", ScrollTrigger.update);

gsap.from("h1", {y:40, opacity:0, duration:1, delay:.9, ease:"power3.out"});
gsap.utils.toArray(".cell").forEach((el,i) => {
  gsap.from(el, {y:30, opacity:0, duration:.7, delay:i*0.05, scrollTrigger:{trigger:el, start:"top 88%"}});
});
gsap.to("#temp", {width:"64%", duration:1.6, delay:1.2, ease:"expo.out"});

anime({targets:".ghost", opacity:[0,1], translateY:[12,0], delay:700, duration:900, easing:"easeOutExpo"});

window._chart = new Chart(document.getElementById("signal"), {
  type:"bar",
  data:{
    labels: I18N.en.days,
    datasets:[{
      label:"INTAKE",
      data:[12,19,15,22,28,24,18],
      backgroundColor:"#7A2A90",
      hoverBackgroundColor:"#D6FF3C",
      borderSkipped:false,
      barPercentage:.55
    }]
  },
  options:{
    plugins:{legend:{display:false}},
    scales:{
      x:{ticks:{color:"#ACA8A7", font:{family:"IBM Plex Mono"}}, grid:{display:false}},
      y:{ticks:{color:"#ACA8A7", font:{family:"IBM Plex Mono"}}, grid:{color:"rgba(122,42,144,.18)"}}
    }
  }
});

applyLang();
