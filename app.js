(() => {
  "use strict";

  const STYLE_KEY = "aivpw_style_v1";

  const els = {
    talentEthnicity: document.getElementById("talentEthnicity"),
    talentGender: document.getElementById("talentGender"),
    talentAge: document.getElementById("talentAge"),
    talentRole: document.getElementById("talentRole"),
    personalityChips: document.getElementById("personalityChips"),
    deliveryPrimary: document.getElementById("deliveryPrimary"),
    mood: document.getElementById("mood"),
    ratioBroll: document.getElementById("ratioBroll"),
    ratioReadout: document.getElementById("ratioReadout"),
    negativeGrid: document.getElementById("negativeGrid"),
    saveStyleBtn: document.getElementById("saveStyleBtn"),
    loadStyleBtn: document.getElementById("loadStyleBtn"),
    resetStyleBtn: document.getElementById("resetStyleBtn"),
    saveState: document.getElementById("saveState"),

    tool: document.getElementById("tool"),
    platform: document.getElementById("platform"),
    projectName: document.getElementById("projectName"),
    location: document.getElementById("location"),
    audience: document.getElementById("audience"),
    objective: document.getElementById("objective"),
    priceInfo: document.getElementById("priceInfo"),
    sizeInfo: document.getElementById("sizeInfo"),
    furnishing: document.getElementById("furnishing"),
    lengthSec: document.getElementById("lengthSec"),
    uspList: document.getElementById("uspList"),
    addUspBtn: document.getElementById("addUspBtn"),
    framework: document.getElementById("framework"),
    frameworkTip: document.getElementById("frameworkTip"),
    frameworkTipText: document.getElementById("frameworkTipText"),
    acceptFrameworkBtn: document.getElementById("acceptFrameworkBtn"),
    triggerChips: document.getElementById("triggerChips"),
    newProjectBtn: document.getElementById("newProjectBtn"),

    readinessList: document.getElementById("readinessList"),
    skeletonOutput: document.getElementById("skeletonOutput"),
    promptOutput: document.getElementById("promptOutput"),
    copyBtn: document.getElementById("copyBtn"),
    toast: document.getElementById("toast"),
  };

  const FRAMEWORK_META = {
    AIDA: { name: "AIDA", stages: [["Attention",0.15],["Interest",0.25],["Desire",0.45],["Action",0.15]] },
    PAS: { name: "PAS", stages: [["Problem",0.20],["Agitate",0.30],["Solution",0.50]] },
    FFAB: { name: "FFAB", stages: [["Feature",0.20],["Function",0.25],["Advantage",0.25],["Benefit",0.30]] },
    BAB: { name: "BAB", stages: [["Before",0.30],["After",0.40],["Bridge",0.30]] },
    "4P": { name: "4 P's", stages: [["Picture",0.25],["Promise",0.25],["Prove",0.25],["Push",0.25]] },
    HSO: { name: "Hook-Story-Offer", stages: [["Hook",0.15],["Story",0.55],["Offer",0.30]] },
    PASTOR: { name: "PASTOR", stages: [["Problem",0.12],["Amplify",0.13],["Story",0.20],["Transformation",0.20],["Offer",0.20],["Response",0.15]] },
  };

  const AIDA_TRIGGER_SLOT = { Attention: null, Interest: "Authority", Desire: "Social Proof", Action: "FOMO + Urgency" };

  function el(tag, cls, text){
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // ---------- Chip pickers ----------
  function setupChipPicker(container, maxCount){
    container.addEventListener("click", (ev) => {
      const btn = ev.target.closest(".chip");
      if (!btn) return;
      const selected = container.querySelectorAll(".chip.selected");
      if (!btn.classList.contains("selected") && selected.length >= maxCount) {
        selected[0].classList.remove("selected");
      }
      btn.classList.toggle("selected");
      render();
    });
  }
  function getChipValues(container){
    return Array.from(container.querySelectorAll(".chip.selected")).map(b => b.dataset.value);
  }
  function setChipValues(container, values){
    const set = new Set(values || []);
    container.querySelectorAll(".chip").forEach(b => {
      b.classList.toggle("selected", set.has(b.dataset.value));
    });
  }

  setupChipPicker(els.personalityChips, 3);
  setupChipPicker(els.triggerChips, 3);

  // ---------- USP rows ----------
  function addUspRow(value){
    const row = el("div", "usp-row");
    const input = el("input");
    input.type = "text";
    input.placeholder = "e.g. Walkable to LRT";
    input.value = value || "";
    input.addEventListener("input", render);
    const remove = el("button", "usp-remove", "×");
    remove.type = "button";
    remove.addEventListener("click", () => { row.remove(); render(); });
    row.appendChild(input);
    row.appendChild(remove);
    els.uspList.appendChild(row);
  }
  function getUsps(){
    return Array.from(els.uspList.querySelectorAll("input")).map(i => i.value.trim()).filter(Boolean);
  }
  els.addUspBtn.addEventListener("click", () => addUspRow(""));
  addUspRow(""); addUspRow(""); addUspRow("");

  // ---------- Style persistence (Phase A) ----------
  function collectStyle(){
    return {
      talentEthnicity: els.talentEthnicity.value.trim(),
      talentGender: els.talentGender.value,
      talentAge: els.talentAge.value.trim(),
      talentRole: els.talentRole.value.trim(),
      personality: getChipValues(els.personalityChips),
      deliveryPrimary: els.deliveryPrimary.value,
      mood: els.mood.value,
      ratioBroll: Number(els.ratioBroll.value),
      negatives: Array.from(els.negativeGrid.querySelectorAll("input"))
        .filter(i => i.checked).map(i => i.dataset.neg),
    };
  }
  function applyStyle(style){
    if (!style) return;
    els.talentEthnicity.value = style.talentEthnicity || "";
    els.talentGender.value = style.talentGender || "Male";
    els.talentAge.value = style.talentAge || "";
    els.talentRole.value = style.talentRole || "";
    setChipValues(els.personalityChips, style.personality || []);
    els.deliveryPrimary.value = style.deliveryPrimary || "Face-to-camera";
    els.mood.value = style.mood || "Luxury";
    els.ratioBroll.value = style.ratioBroll || 70;
    const negSet = new Set(style.negatives || []);
    els.negativeGrid.querySelectorAll("input").forEach(i => { i.checked = negSet.has(i.dataset.neg); });
  }
  function saveStyle(){
    localStorage.setItem(STYLE_KEY, JSON.stringify(collectStyle()));
    updateSaveState();
    showToast("Style saved — it'll load automatically next time.");
  }
  function loadStyle(){
    const raw = localStorage.getItem(STYLE_KEY);
    if (!raw) { showToast("No saved style yet."); return; }
    applyStyle(JSON.parse(raw));
    render();
    showToast("Saved style loaded.");
  }
  function resetStyle(){
    applyStyle({ negatives: ["No subtitles / on-screen text","No background music","No sound effects","No static camera during talk","No stiff / robotic delivery","No boring opening shot"] });
    setChipValues(els.personalityChips, []);
    render();
  }
  function updateSaveState(){
    const raw = localStorage.getItem(STYLE_KEY);
    els.saveState.textContent = raw ? "Style saved on this device" : "Style not saved yet";
  }

  els.saveStyleBtn.addEventListener("click", saveStyle);
  els.loadStyleBtn.addEventListener("click", loadStyle);
  els.resetStyleBtn.addEventListener("click", resetStyle);
  els.newProjectBtn.addEventListener("click", () => {
    ["projectName","location","audience","objective","priceInfo","sizeInfo","furnishing"].forEach(k => els[k].value = "");
    els.uspList.innerHTML = "";
    addUspRow(""); addUspRow(""); addUspRow("");
    els.framework.value = "";
    setChipValues(els.triggerChips, []);
    render();
    showToast("Project fields cleared. Style kept.");
  });

  els.ratioBroll.addEventListener("input", () => {
    const b = els.ratioBroll.value;
    els.ratioReadout.textContent = `${b}% b-roll / ${100 - b}% talk`;
    render();
  });

  // ---------- Framework recommendation ----------
  function recommendFramework(project){
    const blob = `${project.audience} ${project.objective} ${project.platform}`.toLowerCase();
    const painWords = ["traffic","stuck","jam","rent","rising","cramped","small","expensive","noisy","far"];
    const featureWords = ["smart home","smart-home","one feature","single feature","security","facility","gym","pool"];
    const testimonialWords = ["testimonial","client","review","story","success"];
    const coldSocial = (project.platform === "TikTok" || project.platform === "Instagram Reel") && Number(project.lengthSec) <= 30;

    if (coldSocial) return { key: "HSO", reason: "short reel + cold scrolling audience is exactly what Hook-Story-Offer is built for." };
    if (testimonialWords.some(w => blob.includes(w))) return { key: "PASTOR", reason: "you're leaning on a story or testimonial, which PASTOR is built to carry." };
    if (painWords.some(w => blob.includes(w))) return { key: "PAS", reason: "your audience description names a clear pain point — PAS (or BAB) turns that into a strong hook." };
    if (featureWords.some(w => blob.includes(w))) return { key: "FFAB", reason: "you're centered on one strong feature — FFAB turns a spec into a reason to buy." };
    return { key: "AIDA", reason: "no strong signal either way — AIDA is the safest default and rarely fails." };
  }

  // ---------- Scene skeleton ----------
  function buildSkeleton(frameworkKey, lengthSec, triggers){
    const meta = FRAMEWORK_META[frameworkKey] || FRAMEWORK_META.AIDA;
    let cursor = 0;
    const rows = [];
    meta.stages.forEach(([name, pct], idx) => {
      const isLast = idx === meta.stages.length - 1;
      let dur = Math.round(lengthSec * pct);
      if (isLast) dur = lengthSec - cursor;
      const start = cursor;
      const end = cursor + dur;
      cursor = end;
      const shots = Math.max(1, Math.round(dur / 7));
      let trigger = "";
      if (frameworkKey === "AIDA") {
        trigger = AIDA_TRIGGER_SLOT[name] || "";
        if (trigger && !triggers.length) trigger = "";
        if (trigger === "Authority" && !triggers.includes("Authority")) trigger = triggers[0] || "";
        if (trigger === "Social Proof" && !triggers.includes("Social Proof")) trigger = triggers[1] || triggers[0] || "";
        if (trigger === "FOMO + Urgency") {
          const has = triggers.filter(t => t === "FOMO" || t === "Urgency");
          trigger = has.length ? has.join(" + ") : (triggers[triggers.length-1] || "");
        }
      } else {
        // spread remaining triggers across the middle stages
        const mid = Math.floor(meta.stages.length / 2);
        if (idx === mid && triggers[0]) trigger = triggers[0];
        if (idx === meta.stages.length - 1 && triggers[1]) trigger = triggers[1];
      }
      rows.push({ name, start, end, shots, trigger });
    });
    return rows;
  }

  function renderSkeleton(rows){
    els.skeletonOutput.innerHTML = "";
    rows.forEach(r => {
      const row = el("div", "sk-row");
      const time = el("span", "sk-time", `${r.start}–${r.end}s`);
      const body = el("div");
      const stage = el("span", "sk-stage", r.name.toUpperCase());
      const note = el("span", "sk-note", `${r.shots} shot${r.shots > 1 ? "s" : ""}${r.trigger ? " · trigger: " + r.trigger : ""}`);
      body.appendChild(stage);
      body.appendChild(note);
      row.appendChild(time);
      row.appendChild(body);
      els.skeletonOutput.appendChild(row);
    });
  }

  // ---------- Readiness ----------
  function computeReadiness(style, project){
    const triggerCount = getChipValues(els.triggerChips).length;
    return [
      { label: "Talent defined", ok: !!(style.talentEthnicity && style.talentAge && style.talentRole) },
      { label: "2–3 personality traits chosen", ok: style.personality.length >= 2 && style.personality.length <= 3 },
      { label: "Goal & audience described", ok: !!(project.audience && project.objective) },
      { label: "Framework chosen", ok: !!project.framework },
      { label: "2–3 triggers selected", ok: triggerCount >= 2 && triggerCount <= 3 },
      { label: "Project name & location set", ok: !!(project.projectName && project.location) },
      { label: "At least 3 selling points listed", ok: project.usps.length >= 3 },
      { label: "Negative prompt confirmed", ok: style.negatives.length >= 4 },
    ];
  }

  function renderReadiness(items){
    els.readinessList.innerHTML = "";
    items.forEach(it => {
      const li = el("li", it.ok ? "ok" : "bad");
      const dot = el("span", "readiness-dot");
      li.appendChild(dot);
      li.appendChild(document.createTextNode(it.label));
      els.readinessList.appendChild(li);
    });
  }

  // ---------- Prompt assembly ----------
  function buildPrompt(style, project, skeleton){
    const personality = style.personality.join("/").toLowerCase() || "confident/professional";
    const uspLine = project.usps.length ? project.usps.join(" · ") : "[add your selling points]";
    const skeletonLines = skeleton.map(r =>
      `${r.start}-${r.end}s ${r.name}: ${r.shots} shot(s)${r.trigger ? ", trigger=" + r.trigger : ""}`
    ).join("\n");
    const fwMeta = FRAMEWORK_META[project.framework];
    const fwName = fwMeta ? fwMeta.name : "[choose a framework]";
    const triggerLine = getChipValues(els.triggerChips).join(", ") || "[pick 2-3 triggers]";

    return `01 ROLE
You are my property-ad creative director & ${project.tool || "Seedance 2.0"} prompt engineer.
Market: Malaysia. Platform: ${project.platform}. Goal: grab attention, never bore,
build desire, trigger sign-ups.

02 PROJECT
Project: ${project.projectName || "[project name]"} · Location: ${project.location || "[location]"}
Audience: ${project.audience || "[audience]"}
Objective: ${project.objective || "[objective]"}
Price/instalment: ${project.priceInfo || "[price]"} · Size/layout: ${project.sizeInfo || "[size]"}
Furnishing: ${project.furnishing || "[furnishing]"}
Selling points: ${uspLine}
Length: ${project.lengthSec}s · Platform: ${project.platform}

03 FRAMEWORK
Use ${fwName} as the structure, layered with these triggers: ${triggerLine}.
If a stage doesn't need a trigger, leave it clean (see skeleton below).

04 TALENT · CAM
${style.talentEthnicity || "[ethnicity]"} ${style.talentGender.toLowerCase()} ${style.talentRole || "[role]"},
${style.talentAge || "[age range]"}, ${personality}. Walk 1-2s THEN look to camera
to talk. Follow-cam, never fixed in dialogue. Short shots, change angles.
Slow steady b-roll.

05 STYLE
${style.mood} feel. ${style.ratioBroll}% lifestyle b-roll / ${100 - style.ratioBroll}% talk.
Delivery priority: ${style.deliveryPrimary}. Indoor + outdoor; facilities, showroom, scale model.

06 NEGATIVE
${style.negatives.length ? style.negatives.join(". ") + "." : "[confirm your negative prompt list]"}

07 OUTPUT
Scene-by-scene: # + seconds · shot & camera move · face-to-cam or VO · script ·
on-screen suggestion · trigger. End on one clear CTA + brand card (added in edit).

SCENE SKELETON — follow these time codes and shot counts exactly:
${skeletonLines}

Now write the full scene-by-scene prompt following this skeleton, in a format
ready to paste straight into ${project.tool || "Seedance 2.0"}.`;
  }

  // ---------- Main render ----------
  function render(){
    const style = collectStyle();
    const project = {
      tool: els.tool.value.trim(),
      platform: els.platform.value,
      projectName: els.projectName.value.trim(),
      location: els.location.value.trim(),
      audience: els.audience.value.trim(),
      objective: els.objective.value.trim(),
      priceInfo: els.priceInfo.value.trim(),
      sizeInfo: els.sizeInfo.value.trim(),
      furnishing: els.furnishing.value.trim(),
      lengthSec: Number(els.lengthSec.value),
      usps: getUsps(),
      framework: els.framework.value,
    };

    // recommendation
    if (project.audience || project.objective) {
      const rec = recommendFramework(project);
      if (!project.framework || project.framework !== rec.key) {
        els.frameworkTip.hidden = false;
        els.frameworkTipText.textContent = `${FRAMEWORK_META[rec.key].name} — ${rec.reason}`;
        els.acceptFrameworkBtn.onclick = () => { els.framework.value = rec.key; render(); };
      } else {
        els.frameworkTip.hidden = true;
      }
    } else {
      els.frameworkTip.hidden = true;
    }

    const activeFrameworkKey = project.framework || (project.audience || project.objective ? recommendFramework(project).key : "AIDA");
    const triggers = getChipValues(els.triggerChips);
    const skeleton = buildSkeleton(activeFrameworkKey, project.lengthSec, triggers);
    renderSkeleton(skeleton);

    renderReadiness(computeReadiness(style, project));

    els.promptOutput.textContent = buildPrompt(style, { ...project, framework: project.framework || activeFrameworkKey }, skeleton);
  }

  // wire up remaining inputs to re-render
  [
    "talentEthnicity","talentGender","talentAge","talentRole","deliveryPrimary","mood",
    "tool","platform","projectName","location","audience","objective","priceInfo",
    "sizeInfo","furnishing","lengthSec","framework"
  ].forEach(id => {
    els[id].addEventListener("input", render);
    els[id].addEventListener("change", render);
  });
  els.negativeGrid.addEventListener("change", render);

  // copy
  els.copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(els.promptOutput.textContent);
      showToast("Prompt copied — paste it into ChatGPT.");
    } catch (e) {
      showToast("Couldn't copy automatically — select the text and copy manually.");
    }
  });

  let toastTimer;
  function showToast(msg){
    els.toast.textContent = msg;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2600);
  }

  // init
  resetStyle();
  updateSaveState();
  const savedRaw = localStorage.getItem(STYLE_KEY);
  if (savedRaw) applyStyle(JSON.parse(savedRaw));
  render();
})();
