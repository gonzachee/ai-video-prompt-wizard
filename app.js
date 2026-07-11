(() => {
  "use strict";

  const STYLE_KEY = "aivpw_style_v1";
  const LANG_KEY = "aivpw_lang";
  const GATE_KEY = "aivpw_unlocked";
  const PASSWORD_HASH = "51b9ee5ed23130fd6a0a4b969a28e785168302cf0f83479523d31c92e771cc6b";

  // ---------------------------------------------------------------------
  // i18n dictionary — Chinese terms reused verbatim from the original
  // workshop slides (Module 1 + Ad Video Frameworks) for consistency.
  // ---------------------------------------------------------------------
  const I18N = {
    en: {
      brandName: "AI Video Prompt Wizard",
      saveStateEmpty: "Style not saved yet",
      saveStateSaved: "Style saved on this device",
      eyebrow: "Property ad videos · Seedance 2.0 & friends",
      introH1: "Answer once, reuse the brief every time.",
      introDek: "This assembles the exact master prompt from the 12-step brief method — framework, triggers, camera rules, negative prompt, and a scene-timing skeleton — so nothing incomplete burns a Seedance credit. Paste the result into ChatGPT to get the creative scene text, then into Seedance as usual.",
      gateTitle: "AI Video Prompt Wizard",
      gateSub: "This tool is shared privately. Enter the password to continue.",
      gatePlaceholder: "Password", gateSubmit: "Unlock",
      gateError: "Wrong password — try again.",
      tabStyle: "Style", tabProject: "Project", tabReview: "Review & Generate",
      btnNextProject: "Next: This Project", btnBackStyle: "Style", btnNextReview: "Next: Review & Generate", btnBackProject: "Project",
      phaseATag: "Phase A · set once",
      phaseATitle: "Your Reusable Style",
      phaseASub: "Steps 1–8 of the brief. Save this once and every future project inherits it.",
      lblEthnicity: "Talent — ethnicity", phEthnicity: "e.g. Chinese, Malay, Indian",
      lblGender: "Talent — gender", optMale: "Male", optFemale: "Female",
      lblAge: "Talent — age range", phAge: "e.g. Late 40s to 50s",
      lblRole: "Talent — role", phRole: "e.g. Property agent",
      lblPersonality: "Talent — personality (pick 2–3)",
      chipConfident: "Confident", chipProfessional: "Professional", chipWarm: "Warm",
      chipAttractive: "Attractive", chipPlayful: "Playful", chipAuthoritative: "Authoritative",
      fixedRulesTitle: "Locked camera & delivery rules", fixedRulesBadge: "always applied",
      fixedRule1: "Camera follows with motion during dialogue — never fixed. Short shots, frequent angle changes.",
      fixedRule2: "Walking is default; stop only on the one line worth emphasizing.",
      fixedRule3: "3-beat entry: walk 1–2s → look to camera → then speak.",
      fixedRule4: "Natural expressions and hand gestures throughout.",
      lblDelivery: "Delivery — primary mode", optFaceCam: "Face-to-camera (prioritised)", optVO: "Voice over (prioritised)",
      lblMood: "Mood / tone", moodLuxury: "Luxury", moodEnergetic: "Energetic", moodCozy: "Cozy", moodPlayful: "Playful", moodCalm: "Calm",
      lblRatio: "Lifestyle b-roll vs. talk ratio —",
      lblPacing: "Cut pace — how often the camera cuts to a new shot",
      paceFast: "Fast cuts (~4s/shot) — high energy, social-first",
      paceStandard: "Standard (~7s/shot) — balanced",
      paceSlow: "Slower, cinematic (~10s/shot) — luxury feel",
      modeFace: "Face-cam", modeVO: "Voice-over", modeBroll: "B-roll",
      lblNegative: "Negative prompt — excluded from every generation",
      neg1: "No subtitles / on-screen text", neg2: "No background music", neg3: "No sound effects",
      neg4: "No static camera during talk", neg5: "No stiff / robotic delivery", neg6: "No boring opening shot",
      btnSaveStyle: "Save style as default", btnLoadStyle: "Load saved style", btnResetStyle: "Reset to blank",
      phaseBTag: "Phase B · per project", phaseBTitle: "This Project",
      phaseBSub: "Steps 9–12 of the brief. Everything here changes for every new property.",
      lblTool: "Generation tool", lblPlatform: "Platform",
      platIG: "Instagram Reel", platTikTok: "TikTok", platFB: "Facebook", platYT: "YouTube", platWA: "WhatsApp / Website",
      lblProjectName: "Project name", phProjectName: "e.g. The Astaka, Bukit Jalil",
      lblLocation: "Location", phLocation: "e.g. Bukit Jalil, Kuala Lumpur",
      lblPropertyType: "Property type",
      ptCondo: "Luxury condominium", ptHighrise: "Premium high-rise", ptServiced: "Serviced apartment",
      ptPenthouse: "Penthouse", ptTerrace: "Landed terrace", ptSemiD: "Semi-D", ptBungalow: "Bungalow",
      ptCommercial: "Commercial / Retail",
      lblScriptLang: "Script language — what the talent actually says on camera",
      langEnglish: "English", langMandarin: "Chinese (Mandarin)", langBM: "Bahasa Malaysia",
      langCantonese: "Cantonese", langTamil: "Tamil", langManglish: "Manglish (BM + English)",
      lblThreeAngles: "Generate 3 alternative angles instead of 1 (different hook/emotional angle each, same skeleton)",
      lblAudience: "Target audience", phAudience: "e.g. Malaysians who want to live in or invest in Bukit Jalil",
      lblObjective: "Objective — what should the viewer do?", phObjective: "e.g. Trigger buying interest and get viewers to sign up with us",
      lblPrice: "Price / instalment", phPrice: "e.g. from RM 3,300/month",
      lblSize: "Size / layout", phSize: "e.g. 732–1,001 sqft, 2–3 bed",
      lblFurnishing: "Furnishing", phFurnishing: "e.g. Partially furnished, smart-home",
      lblLength: "Video length", len30: "30 seconds", len45: "45 seconds", len60: "60 seconds", len90: "90 seconds",
      lblUsps: "Key selling points (USPs)", btnAddUsp: "+ Add selling point", uspPlaceholder: "e.g. Walkable to LRT",
      lblFramework: "Framework", tipSuggested: "Suggested", btnUseThis: "Use this",
      fwChoose: "— choose a framework —",
      fwAIDA: "AIDA — Attention · Interest · Desire · Action (safe default)",
      fwPAS: "PAS — Problem · Agitate · Solution (clear buyer pain)",
      fwFFAB: "FFAB — Feature · Function · Advantage · Benefit (one strong feature)",
      fwBAB: "BAB — Before · After · Bridge (aspirational upgrade)",
      fw4P: "4 P's — Picture · Promise · Prove · Push (fast promo)",
      fwHSO: "Hook–Story–Offer (short social reel, cold audience)",
      fwPASTOR: "PASTOR — Problem·Amplify·Story·Transformation·Offer·Response (brand film)",
      lblTriggers: "Psychological triggers (pick 2–3)",
      trigFOMO: "FOMO", trigScarcity: "Scarcity", trigUrgency: "Urgency",
      trigSocialProof: "Social Proof", trigAuthority: "Authority", trigAnchoring: "Anchoring",
      btnNewProject: "New project (clears this section only)",
      readinessTitle: "Readiness check",
      skeletonTitle: "Scene-timing skeleton",
      skeletonSub: "Auto-split by framework stage weighting and an ~{sec}s average shot length.",
      promptTitle: "Assembled prompt", btnCopy: "Copy prompt", btnDownload: "Download .txt",
      promptNote: "Always assembled in English — AI video tools parse English prompts most reliably.",
      footer: "Built from the 8 July 2026 AI Video Prompt Workshop method. Runs entirely in your browser — nothing is sent anywhere.",
      toastStyleSaved: "Style saved — it'll load automatically next time.",
      toastNoSavedStyle: "No saved style yet.",
      toastStyleLoaded: "Saved style loaded.",
      toastProjectCleared: "Project fields cleared. Style kept.",
      toastCopied: "Prompt copied — paste it into ChatGPT.",
      toastCopyFailed: "Couldn't copy automatically — select the text and copy manually.",
      toastDownloaded: "Prompt downloaded.",
      rTalent: "Talent defined", rPersonality: "2–3 personality traits chosen",
      rGoal: "Goal & audience described", rFramework: "Framework chosen",
      rTriggers: "2–3 triggers selected", rProjectBasics: "Project name & location set",
      rUsps: "At least 3 selling points listed", rNegative: "Negative prompt confirmed",
      rFix: "Fix",
      rsLength: "Length", rsPlatform: "Platform", rsFramework: "Framework", rsTriggers: "Triggers",
      rsScriptLang: "Script",
      rsUntitled: "Untitled project",
      recColdSocial: "short reel + cold scrolling audience is exactly what Hook-Story-Offer is built for.",
      recTestimonial: "you're leaning on a story or testimonial, which PASTOR is built to carry.",
      recPain: "your audience description names a clear pain point — PAS (or BAB) turns that into a strong hook.",
      recFeature: "you're centered on one strong feature — FFAB turns a spec into a reason to buy.",
      recDefault: "no strong signal either way — AIDA is the safest default and rarely fails.",
      shotWord: "shot", shotWordPlural: "shots", triggerWord: "trigger",
    },
    zh: {
      brandName: "AI 视频提示词向导",
      saveStateEmpty: "尚未保存风格",
      saveStateSaved: "风格已保存在本设备",
      eyebrow: "房地产广告视频 · Seedance 2.0 及其他平台",
      introH1: "设定一次，往后每支视频都能复用。",
      introDek: "本工具会按照 12 步简报法组装完整主提示词——框架、触发点、镜头规则、负面提示，以及场景时长骨架——确保不会用不完整的提示词浪费 Seedance 额度。生成结果请粘贴给 ChatGPT 获取创意场景文本，再照常喂给 Seedance。",
      gateTitle: "AI 视频提示词向导",
      gateSub: "此工具为私下分享内容，请输入密码继续。",
      gatePlaceholder: "密码", gateSubmit: "解锁",
      gateError: "密码错误 — 请再试一次。",
      tabStyle: "风格设定", tabProject: "本次项目", tabReview: "审核并生成",
      btnNextProject: "下一步：本次项目", btnBackStyle: "风格设定", btnNextReview: "下一步：审核并生成", btnBackProject: "本次项目",
      phaseATag: "第一阶段 · 预设",
      phaseATitle: "你的可复用风格",
      phaseASub: "对应简报的第 1–8 步。设定一次，之后每个新项目都会继承。",
      lblEthnicity: "出镜模特 — 族裔", phEthnicity: "例如：华裔、马来裔、印裔",
      lblGender: "出镜模特 — 性别", optMale: "男性", optFemale: "女性",
      lblAge: "出镜模特 — 年龄范围", phAge: "例如：四十多岁到五十岁",
      lblRole: "出镜模特 — 角色", phRole: "例如：房地产经纪",
      lblPersonality: "出镜模特 — 性格（选 2–3 个）",
      chipConfident: "自信", chipProfessional: "专业", chipWarm: "温暖",
      chipAttractive: "有魅力", chipPlayful: "活泼", chipAuthoritative: "权威",
      fixedRulesTitle: "锁定的镜头与表达规则", fixedRulesBadge: "始终套用",
      fixedRule1: "对话时镜头始终带着运动跟拍——绝不固定。镜头短、常换角度。",
      fixedRule2: "默认走动；只在最值得强调的那句台词时停下来。",
      fixedRule3: "三节拍开场：先走 1–2 秒 → 看向镜头 → 再开口说话。",
      fixedRule4: "全程加入自然的表情与手势。",
      lblDelivery: "表达方式 — 主要模式", optFaceCam: "对镜说话（优先）", optVO: "旁白配音（优先）",
      lblMood: "氛围 / 基调", moodLuxury: "奢华", moodEnergetic: "充满活力", moodCozy: "温馨", moodPlayful: "活泼", moodCalm: "平静",
      lblRatio: "生活空镜与对话的比例 —",
      lblPacing: "剪辑节奏 — 镜头切换的频率",
      paceFast: "快剪（约 4 秒／镜头）— 高能量，适合社交平台",
      paceStandard: "标准（约 7 秒／镜头）— 平衡",
      paceSlow: "慢节奏、电影感（约 10 秒／镜头）— 奢华感",
      modeFace: "对镜说话", modeVO: "旁白配音", modeBroll: "空镜",
      lblNegative: "负面提示 — 每次生成都会排除",
      neg1: "不要字幕／画面文字", neg2: "不要背景音乐", neg3: "不要音效",
      neg4: "讲话时不要固定镜头", neg5: "不要僵硬 / 机械式的表达", neg6: "不要无聊的开场镜头",
      btnSaveStyle: "保存为默认风格", btnLoadStyle: "载入已保存的风格", btnResetStyle: "重置为空白",
      phaseBTag: "第二阶段 · 每个项目", phaseBTitle: "本次项目",
      phaseBSub: "对应简报的第 9–12 步。每个新楼盘都要重新填写这部分。",
      lblTool: "生成工具", lblPlatform: "投放平台",
      platIG: "Instagram Reel", platTikTok: "TikTok", platFB: "Facebook", platYT: "YouTube", platWA: "WhatsApp / 网站",
      lblProjectName: "项目名称", phProjectName: "例如：The Astaka, Bukit Jalil",
      lblLocation: "地点", phLocation: "例如：武吉加里尔（Bukit Jalil），吉隆坡",
      lblPropertyType: "物业类型",
      ptCondo: "豪华公寓", ptHighrise: "高级高层住宅", ptServiced: "服务式公寓",
      ptPenthouse: "顶层复式（Penthouse）", ptTerrace: "排屋", ptSemiD: "半独立式洋房", ptBungalow: "独立式洋房",
      ptCommercial: "商用／零售",
      lblScriptLang: "台词语言 — 出镜人物实际开口说的语言",
      langEnglish: "英语", langMandarin: "中文（普通话）", langBM: "马来语",
      langCantonese: "粤语", langTamil: "淡米尔语", langManglish: "Manglish（马来语＋英语混用）",
      lblThreeAngles: "生成 3 个不同角度，而非 1 个（每个角度用不同的钩子／情感切入，场景骨架相同）",
      lblAudience: "目标受众", phAudience: "例如：想在武吉加里尔居住或投资的马来西亚人",
      lblObjective: "目的 — 希望观众采取什么行动？", phObjective: "例如：激发购买兴趣，让观众向我们登记",
      lblPrice: "价格 / 月供", phPrice: "例如：月供从 RM 3,300 起",
      lblSize: "面积 / 户型", phSize: "例如：732–1,001 平方尺，2–3 房",
      lblFurnishing: "装修配置", phFurnishing: "例如：部分家具，智能家居",
      lblLength: "视频长度", len30: "30 秒", len45: "45 秒", len60: "60 秒", len90: "90 秒",
      lblUsps: "核心卖点（USP）", btnAddUsp: "+ 新增卖点", uspPlaceholder: "例如：步行可达 LRT",
      lblFramework: "营销框架", tipSuggested: "建议", btnUseThis: "采用此建议",
      fwChoose: "— 选择一个框架 —",
      fwAIDA: "AIDA — 注意·兴趣·欲望·行动（安全默认选项）",
      fwPAS: "PAS — 问题·加剧·解决（买家有明确痛点时）",
      fwFFAB: "FFAB — 特征·功能·优势·利益（突出单一强项卖点）",
      fwBAB: "BAB — 之前·之后·桥梁（向往型生活方式升级）",
      fw4P: "4 P's — 画面·承诺·证明·推动（快速促销）",
      fwHSO: "Hook–Story–Offer 钩子-故事-邀约（短社交视频，陌生受众）",
      fwPASTOR: "PASTOR — 问题·放大·故事·蜕变·邀约·回应（品牌故事片）",
      lblTriggers: "心理触发点（选 2–3 个）",
      trigFOMO: "错失恐惧 FOMO", trigScarcity: "稀缺", trigUrgency: "紧迫感",
      trigSocialProof: "从众效应", trigAuthority: "权威背书", trigAnchoring: "价格锚定",
      btnNewProject: "新项目（仅清空本区块）",
      readinessTitle: "就绪检查",
      skeletonTitle: "场景时长骨架",
      skeletonSub: "按框架阶段权重与约 {sec} 秒的平均镜头时长自动拆分。",
      promptTitle: "组装完成的提示词", btnCopy: "复制提示词", btnDownload: "下载 .txt",
      promptNote: "提示词始终以英文组装 — AI 视频工具对英文提示词的理解最稳定。",
      footer: "内容整理自 2026 年 7 月 8 日的 AI 视频提示词工作坊方法论。完全在你的浏览器内运行 — 不会上传到任何地方。",
      toastStyleSaved: "风格已保存 — 下次会自动载入。",
      toastNoSavedStyle: "目前还没有已保存的风格。",
      toastStyleLoaded: "已载入保存的风格。",
      toastProjectCleared: "项目字段已清空，风格设定保留。",
      toastCopied: "提示词已复制 — 粘贴给 ChatGPT 吧。",
      toastCopyFailed: "自动复制失败 — 请手动选取文字后复制。",
      toastDownloaded: "提示词已下载。",
      rTalent: "已定义出镜模特", rPersonality: "已选择 2–3 个性格标签",
      rGoal: "已填写目标与受众", rFramework: "已选择框架",
      rTriggers: "已选择 2–3 个触发点", rProjectBasics: "已填写项目名称与地点",
      rUsps: "已列出至少 3 个卖点", rNegative: "已确认负面提示",
      rFix: "去修改",
      rsLength: "长度", rsPlatform: "平台", rsFramework: "框架", rsTriggers: "触发点",
      rsScriptLang: "台词语言",
      rsUntitled: "未命名项目",
      recColdSocial: "短社交视频面对陌生滑动受众，正是 Hook-Story-Offer 的强项。",
      recTestimonial: "你的内容偏向故事或口碑，PASTOR 最适合承载这种叙事。",
      recPain: "你的受众描述里有明确的痛点——PAS（或 BAB）能把它转化为强有力的钩子。",
      recFeature: "你聚焦在单一强项卖点——FFAB 能把规格变成购买理由。",
      recDefault: "没有明显信号——AIDA 是最安全的默认选择，几乎不会失手。",
      shotWord: "个镜头", shotWordPlural: "个镜头", triggerWord: "触发点",
    },
  };

  const STAGE_I18N = {
    Attention: "注意", Interest: "兴趣", Desire: "欲望", Action: "行动",
    Problem: "问题", Agitate: "加剧", Solution: "解决",
    Feature: "特征", Function: "功能", Advantage: "优势", Benefit: "利益",
    Before: "之前", After: "之后", Bridge: "桥梁",
    Picture: "画面", Promise: "承诺", Prove: "证明", Push: "推动",
    Hook: "钩子", Story: "故事", Offer: "邀约",
    Amplify: "放大", Transformation: "蜕变", Response: "回应",
  };
  const TRIGGER_I18N = {
    FOMO: "错失恐惧", Scarcity: "稀缺", Urgency: "紧迫感",
    "Social Proof": "从众效应", Authority: "权威背书", Anchoring: "价格锚定",
  };

  // Camera-move phrase pools — cycled independently per mode so adjacent
  // shots never repeat the same move, giving each cut visible variety.
  const MOVES = {
    face: {
      en: [
        "Follow-cam tracking alongside as he walks",
        "Slow push-in while he delivers the line",
        "Circular tracking shot around talent",
        "Low-angle tracking shot, walk-and-reveal",
        "Steady handheld follow, close 3/4 angle",
      ],
      zh: [
        "跟拍镜头，随他走动",
        "缓慢推近，配合台词",
        "环绕跟拍镜头",
        "低角度跟拍，边走边揭示",
        "稳定手持跟拍，3/4 侧脸近景",
      ],
    },
    vo: {
      en: [
        "Slow gliding b-roll under voice-over",
        "Macro push-in under voice-over narration",
        "Wide establishing pan under voice-over",
      ],
      zh: [
        "旁白配音下的缓慢空镜滑动",
        "旁白配音下的微距推近",
        "旁白配音下的广角横摇",
      ],
    },
    broll: {
      en: [
        "Slow drone glide reveal",
        "Dolly-in on facility detail",
        "Wide establishing pan",
        "Macro push-in on texture/feature",
        "Whip-pan transition to next space",
        "Slow pull-back reveal",
        "Handheld walk-through",
        "Slow orbit around key feature",
      ],
      zh: [
        "缓慢无人机航拍揭示",
        "推近设施细节",
        "广角横摇空镜",
        "微距特写材质／卖点",
        "甩镜转场至下一空间",
        "缓慢拉远揭示",
        "手持穿行镜头",
        "围绕核心卖点缓慢环绕",
      ],
    },
  };
  function makeMovePicker(){
    const counters = { face: 0, vo: 0, broll: 0 };
    return (mode) => {
      const i = counters[mode]++;
      const pool = MOVES[mode];
      return { en: pool.en[i % pool.en.length], zh: pool.zh[i % pool.zh.length] };
    };
  }

  // maps each readiness key to which tab + field it belongs to, so the
  // "Fix" button can jump straight there.
  const READINESS_TARGET = {
    rTalent: { tab: "style", focus: "talentEthnicity" },
    rPersonality: { tab: "style", focus: "personalityChips" },
    rNegative: { tab: "style", focus: "negativeField" },
    rGoal: { tab: "project", focus: "audience" },
    rFramework: { tab: "project", focus: "framework" },
    rTriggers: { tab: "project", focus: "triggersField" },
    rProjectBasics: { tab: "project", focus: "projectName" },
    rUsps: { tab: "project", focus: "uspField" },
  };
  const STYLE_READINESS_KEYS = ["rTalent", "rPersonality", "rNegative"];
  const PROJECT_READINESS_KEYS = ["rGoal", "rFramework", "rTriggers", "rProjectBasics", "rUsps"];

  let lang = localStorage.getItem(LANG_KEY) || "en";
  function t(key){ return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key; }

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
    avgShotSec: document.getElementById("avgShotSec"),
    negativeGrid: document.getElementById("negativeGrid"),
    saveStyleBtn: document.getElementById("saveStyleBtn"),
    loadStyleBtn: document.getElementById("loadStyleBtn"),
    resetStyleBtn: document.getElementById("resetStyleBtn"),
    saveState: document.getElementById("saveState"),
    langToggle: document.getElementById("langToggle"),
    readinessBadge: document.getElementById("readinessBadge"),

    gate: document.getElementById("gate"),
    gateForm: document.getElementById("gateForm"),
    gatePassword: document.getElementById("gatePassword"),
    gateError: document.getElementById("gateError"),
    appRoot: document.getElementById("appRoot"),

    tabbar: document.getElementById("tabbar"),
    panelStyle: document.getElementById("panelStyle"),
    panelProject: document.getElementById("panelProject"),
    panelReview: document.getElementById("panelReview"),
    dotStyle: document.getElementById("dotStyle"),
    dotProject: document.getElementById("dotProject"),
    dotReview: document.getElementById("dotReview"),

    tool: document.getElementById("tool"),
    platform: document.getElementById("platform"),
    projectName: document.getElementById("projectName"),
    location: document.getElementById("location"),
    propertyType: document.getElementById("propertyType"),
    scriptLang: document.getElementById("scriptLang"),
    threeAngles: document.getElementById("threeAngles"),
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

    reviewSummary: document.getElementById("reviewSummary"),
    readinessList: document.getElementById("readinessList"),
    skeletonSub: document.getElementById("skeletonSub"),
    skeletonOutput: document.getElementById("skeletonOutput"),
    promptOutput: document.getElementById("promptOutput"),
    copyBtn: document.getElementById("copyBtn"),
    downloadBtn: document.getElementById("downloadBtn"),
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

  // ---------- Tab navigation ----------
  const TAB_PANELS = { style: els.panelStyle, project: els.panelProject, review: els.panelReview };
  let activeTab = "style";
  function setActiveTab(tabName, focusId){
    activeTab = tabName;
    Object.entries(TAB_PANELS).forEach(([name, panel]) => { panel.hidden = name !== tabName; });
    els.tabbar.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === tabName));
    window.scrollTo({ top: 0, behavior: "auto" });
    if (focusId) {
      requestAnimationFrame(() => {
        const target = document.getElementById(focusId);
        if (!target) return;
        target.scrollIntoView({ block: "center" });
        const focusable = target.matches("input,select,textarea,button") ? target : target.querySelector("input,select,textarea,button");
        if (focusable) focusable.focus({ preventScroll: true });
      });
    }
  }
  els.tabbar.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".tab-btn");
    if (!btn) return;
    setActiveTab(btn.dataset.tab);
  });
  document.querySelectorAll("[data-goto]").forEach(btn => {
    btn.addEventListener("click", () => setActiveTab(btn.dataset.goto));
  });
  els.readinessBadge.addEventListener("click", () => setActiveTab("review"));

  // ---------- Static translation pass ----------
  function applyStaticTranslations(){
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach(node => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(node => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    document.querySelectorAll(".lang-toggle .lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }
  // delegated so it covers both the gate's language toggle and the app's
  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".lang-btn");
    if (!btn) return;
    lang = btn.dataset.lang;
    localStorage.setItem(LANG_KEY, lang);
    applyStaticTranslations();
    updateSaveState();
    els.uspList.querySelectorAll("input").forEach(i => { i.placeholder = t("uspPlaceholder"); });
    render();
  });

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
    input.placeholder = t("uspPlaceholder");
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
      avgShotSec: Number(els.avgShotSec.value),
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
    els.avgShotSec.value = style.avgShotSec || 7;
    const negSet = new Set(style.negatives || []);
    els.negativeGrid.querySelectorAll("input").forEach(i => { i.checked = negSet.has(i.dataset.neg); });
  }
  function saveStyle(){
    localStorage.setItem(STYLE_KEY, JSON.stringify(collectStyle()));
    updateSaveState();
    showToast(t("toastStyleSaved"));
  }
  function loadStyle(){
    const raw = localStorage.getItem(STYLE_KEY);
    if (!raw) { showToast(t("toastNoSavedStyle")); return; }
    applyStyle(JSON.parse(raw));
    render();
    showToast(t("toastStyleLoaded"));
  }
  function resetStyle(){
    applyStyle({ negatives: ["No subtitles / on-screen text","No background music","No sound effects","No static camera during talk","No stiff / robotic delivery","No boring opening shot"] });
    setChipValues(els.personalityChips, []);
    render();
  }
  function updateSaveState(){
    const raw = localStorage.getItem(STYLE_KEY);
    els.saveState.textContent = raw ? t("saveStateSaved") : t("saveStateEmpty");
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
    showToast(t("toastProjectCleared"));
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

    if (coldSocial) return { key: "HSO", reasonKey: "recColdSocial" };
    if (testimonialWords.some(w => blob.includes(w))) return { key: "PASTOR", reasonKey: "recTestimonial" };
    if (painWords.some(w => blob.includes(w))) return { key: "PAS", reasonKey: "recPain" };
    if (featureWords.some(w => blob.includes(w))) return { key: "FFAB", reasonKey: "recFeature" };
    return { key: "AIDA", reasonKey: "recDefault" };
  }

  // ---------- Scene skeleton ----------
  function buildSkeleton(frameworkKey, lengthSec, triggers, avgShotSec, deliveryPrimary){
    const meta = FRAMEWORK_META[frameworkKey] || FRAMEWORK_META.AIDA;
    const pickMove = makeMovePicker();
    let cursor = 0;
    const rows = [];
    meta.stages.forEach(([name, pct], idx) => {
      const isLast = idx === meta.stages.length - 1;
      let dur = Math.round(lengthSec * pct);
      if (isLast) dur = lengthSec - cursor;
      const start = cursor;
      const end = cursor + dur;
      cursor = end;

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
        const mid = Math.floor(meta.stages.length / 2);
        if (idx === mid && triggers[0]) trigger = triggers[0];
        if (idx === meta.stages.length - 1 && triggers[1]) trigger = triggers[1];
      }

      // split the stage into individual, fully-specified cuts — the first
      // cut always carries the spoken line (face-cam or VO per style),
      // every cut after it is a supporting b-roll cutaway.
      const shotCount = Math.max(1, Math.round(dur / avgShotSec));
      let sCursor = start;
      const shots = [];
      for (let i = 0; i < shotCount; i++) {
        const shotIsLast = i === shotCount - 1;
        let shotDur = Math.round(dur / shotCount);
        if (shotIsLast) shotDur = end - sCursor;
        const sStart = sCursor, sEnd = sCursor + shotDur;
        sCursor = sEnd;
        const mode = i === 0 ? (deliveryPrimary === "Voice over" ? "vo" : "face") : "broll";
        const move = pickMove(mode);
        shots.push({ start: sStart, end: sEnd, mode, cameraEn: move.en, cameraZh: move.zh });
      }
      rows.push({ name, start, end, trigger, shots });
    });
    return rows;
  }

  function translateTriggerLabel(triggerStr){
    if (!triggerStr) return "";
    return triggerStr.split(" + ").map(part => TRIGGER_I18N[part] || part).join(" + ");
  }

  const MODE_KEY = { face: "modeFace", vo: "modeVO", broll: "modeBroll" };

  function renderSkeleton(rows){
    els.skeletonOutput.innerHTML = "";
    rows.forEach(r => {
      const stageBlock = el("div", "sk-stage-block");
      const head = el("div", "sk-stage-head");
      const time = el("span", "sk-time", `${r.start}–${r.end}s`);
      const stageName = lang === "zh" ? (STAGE_I18N[r.name] || r.name) : r.name.toUpperCase();
      const stage = el("span", "sk-stage", stageName);
      head.appendChild(time);
      head.appendChild(stage);
      if (r.trigger) {
        const trig = el("span", "sk-trigger", `${t("triggerWord")}: ${lang === "zh" ? translateTriggerLabel(r.trigger) : r.trigger}`);
        head.appendChild(trig);
      }
      stageBlock.appendChild(head);

      r.shots.forEach(s => {
        const shotRow = el("div", "sk-shot");
        const shotTime = el("span", "sk-shot-time", `${s.start}–${s.end}s`);
        const modeTag = el("span", `sk-mode sk-mode-${s.mode}`, t(MODE_KEY[s.mode]));
        const camera = el("span", "sk-camera", lang === "zh" ? s.cameraZh : s.cameraEn);
        shotRow.appendChild(shotTime);
        shotRow.appendChild(modeTag);
        shotRow.appendChild(camera);
        stageBlock.appendChild(shotRow);
      });
      els.skeletonOutput.appendChild(stageBlock);
    });
  }

  // ---------- Readiness ----------
  function computeReadiness(style, project){
    const triggerCount = getChipValues(els.triggerChips).length;
    return [
      { key: "rTalent", ok: !!(style.talentEthnicity && style.talentAge && style.talentRole) },
      { key: "rPersonality", ok: style.personality.length >= 2 && style.personality.length <= 3 },
      { key: "rGoal", ok: !!(project.audience && project.objective) },
      { key: "rFramework", ok: !!project.framework },
      { key: "rTriggers", ok: triggerCount >= 2 && triggerCount <= 3 },
      { key: "rProjectBasics", ok: !!(project.projectName && project.location) },
      { key: "rUsps", ok: project.usps.length >= 3 },
      { key: "rNegative", ok: style.negatives.length >= 4 },
    ];
  }

  function renderReadiness(items){
    els.readinessList.innerHTML = "";
    items.forEach(it => {
      const li = el("li", it.ok ? "ok" : "bad");
      const dot = el("span", "readiness-dot");
      const label = el("span", "r-label", t(it.key));
      li.appendChild(dot);
      li.appendChild(label);
      if (!it.ok && READINESS_TARGET[it.key]) {
        const fixBtn = el("button", "r-fix", t("rFix"));
        fixBtn.type = "button";
        fixBtn.addEventListener("click", () => {
          const target = READINESS_TARGET[it.key];
          setActiveTab(target.tab, target.focus);
        });
        li.appendChild(fixBtn);
      }
      els.readinessList.appendChild(li);
    });

    const okCount = items.filter(i => i.ok).length;
    els.readinessBadge.textContent = `${okCount}/${items.length}`;
    els.readinessBadge.classList.toggle("ready", okCount === items.length);

    const styleOk = items.filter(i => STYLE_READINESS_KEYS.includes(i.key)).every(i => i.ok);
    const projectOk = items.filter(i => PROJECT_READINESS_KEYS.includes(i.key)).every(i => i.ok);
    els.dotStyle.classList.toggle("complete", styleOk);
    els.dotProject.classList.toggle("complete", projectOk);
    els.dotReview.classList.toggle("complete", styleOk && projectOk);
  }

  function renderReviewSummary(project){
    els.reviewSummary.innerHTML = "";
    const title = el("div", "rs-title", project.projectName || t("rsUntitled"));
    els.reviewSummary.appendChild(title);
    const fwMeta = FRAMEWORK_META[project.framework];
    const items = [
      [t("rsLength"), `${project.lengthSec}s`],
      [t("rsPlatform"), project.platform],
      [t("rsFramework"), fwMeta ? fwMeta.name : "—"],
      [t("rsTriggers"), getChipValues(els.triggerChips).join(", ") || "—"],
      [t("rsScriptLang"), project.scriptLang],
    ];
    items.forEach(([label, value]) => {
      const span = el("span", "rs-item");
      const b = el("b", null, value);
      span.appendChild(document.createTextNode(label + ": "));
      span.appendChild(b);
      els.reviewSummary.appendChild(span);
    });
  }

  // ---------- Prompt assembly (always English) ----------
  function buildPrompt(style, project, skeleton){
    const personality = style.personality.join("/").toLowerCase() || "confident/professional";
    const uspLine = project.usps.length ? project.usps.join(" · ") : "[add your selling points]";
    const skeletonLines = skeleton.map(r => {
      const header = `${r.start}-${r.end}s ${r.name.toUpperCase()}${r.trigger ? " — trigger: " + r.trigger : ""}`;
      const shotLines = r.shots.map((s, i) =>
        `  Cut ${i + 1} (${s.start}-${s.end}s, ${s.mode}): ${s.cameraEn}`
      ).join("\n");
      return `${header}\n${shotLines}`;
    }).join("\n");
    const fwMeta = FRAMEWORK_META[project.framework];
    const fwName = fwMeta ? fwMeta.name : "[choose a framework]";
    const triggerLine = getChipValues(els.triggerChips).join(", ") || "[pick 2-3 triggers]";

    return `01 ROLE
You are my property-ad creative director & ${project.tool || "Seedance 2.0"} prompt engineer.
Market: Malaysia. Platform: ${project.platform}. Goal: grab attention, never bore,
build desire, trigger sign-ups.

02 PROJECT
Project: ${project.projectName || "[project name]"} · Location: ${project.location || "[location]"}
Property type: ${project.propertyType}
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
Script language: write every spoken/VO line in ${project.scriptLang}. Keep all
camera directions, shot labels and technical notes in English.

SCENE SKELETON — follow these exact cuts, time codes, modes and camera moves.
Each "Cut" is a separate shot in the final video (multi-cut, not one long take):
${skeletonLines}

${project.threeAngles
  ? `Generate 3 DIFFERENT creative angles for this video — vary the hook and\nemotional angle each time (e.g. different opening line, different framing of\nthe selling points) — but have all 3 follow the same scene skeleton above.\nLabel them clearly "ANGLE 1", "ANGLE 2", "ANGLE 3". For every cut in each\nangle, write the full shot: camera framing/movement (expand on the move\ngiven), what's happening on screen, and — for face-cam/VO cuts only — the\nspoken line in ${project.scriptLang}. Keep b-roll cuts wordless.`
  : `For every cut above, write the full shot: camera framing/movement (expand on\nthe move given), what's happening on screen, and — for face-cam/VO cuts only —\nthe spoken line in ${project.scriptLang}. Keep b-roll cuts wordless.`}
Output in a format ready to paste straight into ${project.tool || "Seedance 2.0"}.`;
  }

  // ---------- Main render ----------
  function render(){
    const style = collectStyle();
    const project = {
      tool: els.tool.value.trim(),
      platform: els.platform.value,
      projectName: els.projectName.value.trim(),
      location: els.location.value.trim(),
      propertyType: els.propertyType.value,
      scriptLang: els.scriptLang.value,
      threeAngles: els.threeAngles.checked,
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
        els.frameworkTipText.textContent = `${FRAMEWORK_META[rec.key].name} — ${t(rec.reasonKey)}`;
        els.acceptFrameworkBtn.onclick = () => { els.framework.value = rec.key; render(); };
      } else {
        els.frameworkTip.hidden = true;
      }
    } else {
      els.frameworkTip.hidden = true;
    }

    const activeFrameworkKey = project.framework || (project.audience || project.objective ? recommendFramework(project).key : "AIDA");
    const triggers = getChipValues(els.triggerChips);
    const skeleton = buildSkeleton(activeFrameworkKey, project.lengthSec, triggers, style.avgShotSec, style.deliveryPrimary);
    renderSkeleton(skeleton);
    els.skeletonSub.textContent = t("skeletonSub").replace("{sec}", style.avgShotSec);

    const projectForDisplay = { ...project, framework: project.framework || activeFrameworkKey };
    renderReadiness(computeReadiness(style, project));
    renderReviewSummary(projectForDisplay);

    els.promptOutput.textContent = buildPrompt(style, projectForDisplay, skeleton);
  }

  // wire up remaining inputs to re-render
  [
    "talentEthnicity","talentGender","talentAge","talentRole","deliveryPrimary","mood","avgShotSec",
    "tool","platform","projectName","location","propertyType","scriptLang","audience","objective","priceInfo",
    "sizeInfo","furnishing","lengthSec","framework"
  ].forEach(id => {
    els[id].addEventListener("input", render);
    els[id].addEventListener("change", render);
  });
  els.negativeGrid.addEventListener("change", render);
  els.threeAngles.addEventListener("change", render);

  // copy
  els.copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(els.promptOutput.textContent);
      showToast(t("toastCopied"));
    } catch (e) {
      showToast(t("toastCopyFailed"));
    }
  });

  // download
  els.downloadBtn.addEventListener("click", () => {
    const name = (els.projectName.value.trim() || "video-prompt").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const blob = new Blob([els.promptOutput.textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}-prompt.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast(t("toastDownloaded"));
  });

  let toastTimer;
  function showToast(msg){
    els.toast.textContent = msg;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2600);
  }

  // ---------- Password gate ----------
  async function sha256Hex(text){
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
  }
  function unlockApp(){
    els.gate.classList.add("unlocking");
    els.appRoot.hidden = false;
    setTimeout(() => { els.gate.hidden = true; }, 250);
  }
  els.gateForm.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const hash = await sha256Hex(els.gatePassword.value);
    if (hash === PASSWORD_HASH) {
      localStorage.setItem(GATE_KEY, "1");
      els.gateError.hidden = true;
      unlockApp();
    } else {
      els.gateError.hidden = false;
      els.gatePassword.value = "";
      els.gatePassword.focus();
    }
  });

  // init
  resetStyle();
  applyStaticTranslations();
  updateSaveState();
  const savedRaw = localStorage.getItem(STYLE_KEY);
  if (savedRaw) applyStyle(JSON.parse(savedRaw));
  setActiveTab("style");
  render();

  if (localStorage.getItem(GATE_KEY) === "1") {
    els.appRoot.hidden = false;
    els.gate.hidden = true;
  } else {
    els.gatePassword.focus();
  }
})();
