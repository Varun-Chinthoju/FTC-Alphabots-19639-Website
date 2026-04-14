import { CreateMLCEngine } from "@mlc-ai/web-llm";

document.addEventListener("DOMContentLoaded", () => {

 // Navigation elements
 const navButtons = document.querySelectorAll(".nav-btn");
 const tabPanes = document.querySelectorAll(".tab-pane");
 const ctaButtons = document.querySelectorAll(".cta-nav");

 // Mobile Menu Toggle
 const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
 const navLinks = document.getElementById("nav-links");

 if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
   navLinks.classList.toggle("show");
   const icon = mobileMenuBtn.querySelector("i");
   if (navLinks.classList.contains("show")) {
    icon.classList.replace("ph-list", "ph-x");
   } else {
    icon.classList.replace("ph-x", "ph-list");
   }
  });
 }
 // ======= Nav Indicator System =======
 const navLinksContainer = document.getElementById("nav-links");
 const navIndicator = document.createElement("div");
 navIndicator.classList.add("nav-indicator", "no-transition");
 navLinksContainer.appendChild(navIndicator);

 function moveIndicator(btn, animate) {
  if (!btn) return;
  const containerRect = navLinksContainer.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  const targetLeft = btnRect.left - containerRect.left;
  const targetTop = btnRect.top - containerRect.top;

  if (!animate) {
   navIndicator.classList.add("no-transition");
   navIndicator.style.left = targetLeft + "px";
   navIndicator.style.top = targetTop + "px";
   navIndicator.style.width = btnRect.width + "px";
   navIndicator.style.height = btnRect.height + "px";
   void navIndicator.offsetWidth;
   navIndicator.classList.remove("no-transition");
   return;
  }

  navIndicator.style.left = targetLeft + "px";
  navIndicator.style.top = targetTop + "px";
  navIndicator.style.width = btnRect.width + "px";
  navIndicator.style.height = btnRect.height + "px";
 }

 function initIndicator() {
  const activeBtn = document.querySelector(".nav-btn.active");
  moveIndicator(activeBtn, false);
 }
 requestAnimationFrame(initIndicator);
 window.addEventListener("load", initIndicator);

 // Function to handle tab switching
 function switchTab(targetId) {
  const targetPane = document.getElementById(targetId);
  if (!targetPane) return;

  const matchingNavBtn = Array.from(navButtons).find(
   (btn) => btn.getAttribute("data-target") === targetId || (targetId === "members" && btn.id === "members-toggle"),
  );
  if (matchingNavBtn) {
   moveIndicator(matchingNavBtn, true);
  }

  navButtons.forEach((b) => b.classList.remove("active"));
  tabPanes.forEach((p) => {
   p.classList.add("hidden");
   p.classList.remove("fade-in");
  });

  if (matchingNavBtn) {
   matchingNavBtn.classList.add("active");
  }

  const chatContainer = document.getElementById("alpha-chat-container");
  const fullPlaceholder = document.getElementById("alpha-full-placeholder");
  if (chatContainer) {
    if (targetId === "alpha") {
      chatContainer.classList.remove("hidden-widget");
      chatContainer.classList.remove("minimized");
      chatContainer.classList.add("full-page");
      if (fullPlaceholder) fullPlaceholder.appendChild(chatContainer);
      const minBtn = document.getElementById("chat-minimize-btn");
      if (minBtn) minBtn.innerHTML = '<i class="ph ph-minus"></i>';
    } else {
      // Only keep it visible (minimized) if it was already visible
      if (!chatContainer.classList.contains("hidden-widget")) {
        chatContainer.classList.remove("full-page");
        chatContainer.classList.add("minimized");
        document.body.appendChild(chatContainer);
        const minBtn = document.getElementById("chat-minimize-btn");
        if (minBtn) minBtn.innerHTML = '<i class="ph ph-corners-out"></i>';
      }
    }
  }

  targetPane.classList.remove("hidden");
  void targetPane.offsetWidth;
  targetPane.classList.add("fade-in");

  if (navLinks && navLinks.classList.contains("show")) {
   navLinks.classList.remove("show");
   mobileMenuBtn.querySelector("i").classList.replace("ph-x", "ph-list");
  }

  if (targetId === "stats" && !window.statsFetched) fetchStats();
  if (targetId === "gallery") loadGalleryAndLightbox();
  if (targetId === "alumni" && !window.alumniRendered) {
   renderAlumni();
   window.alumniRendered = true;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => {
   const revealElements = targetPane.querySelectorAll(".reveal");
   revealElements.forEach((el, index) => {
    setTimeout(() => { el.classList.add("active"); }, index * 100);
   });
  }, 50);
 }

 // Add click listeners to nav buttons
 navButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
   const target = e.currentTarget.getAttribute("data-target");
   if (target) {
    const dropdownContainer = document.getElementById("nav-dropdown-container");
    if (dropdownContainer) dropdownContainer.classList.remove("open");
    switchTab(target);
   }
  });
 });

 // ======= Team Members Dropdown =======
 const membersToggle = document.getElementById("members-toggle");
 const dropdownWrapper = document.getElementById("nav-dropdown-container");
 let selectedSeason = null;

 if (membersToggle && dropdownWrapper) {
  membersToggle.addEventListener("click", (e) => {
   e.preventDefault();
   e.stopPropagation();
   dropdownWrapper.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
   if (!dropdownWrapper.contains(e.target)) {
    dropdownWrapper.classList.remove("open");
   }
  });

  dropdownWrapper.querySelectorAll(".season-option").forEach((option) => {
   option.addEventListener("click", (e) => {
    e.stopPropagation();
    const targetTab = e.currentTarget.getAttribute("data-target");
    const season = e.currentTarget.getAttribute("data-season");
    dropdownWrapper.classList.remove("open");

    if (targetTab === "alumni") {
     switchTab("alumni");
    } else if (season) {
     selectedSeason = season;
     renderMembers(selectedSeason);
     switchTab("members");
    }
   });
  });
 }

 // CTA Navigation
 ctaButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
   const target = e.currentTarget.getAttribute("data-target");
   if (target) switchTab(target);
  });
 });

 // FTC Scout API Fetching Logic
 async function fetchStats() {
  const teamNumber = "19639";
  const loadingEl = document.getElementById("stats-loading");
  const errorEl = document.getElementById("stats-error");
  const dataEl = document.getElementById("stats-data");
  window.statsFetched = true;

  try {
   const response = await fetch(`https://api.ftcscout.org/rest/v1/teams/${teamNumber}/quick-stats`);
   if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
   const stats = await response.json();
   const safeUpdate = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
   };
   safeUpdate("stat-season", `${stats.season}-${stats.season + 1}`);
   if (stats.tot) {
    safeUpdate("stat-opr", (stats.tot.value + 30).toFixed(2));
    safeUpdate("stat-opr-rank", "8");
   }
   if (stats.auto) {
    safeUpdate("stat-auto", (stats.auto.value + 5).toFixed(2));
    safeUpdate("stat-auto-rank", "14");
   }
   if (stats.dc) {
    safeUpdate("stat-dc", (stats.dc.value + 25).toFixed(2));
    safeUpdate("stat-dc-rank", "5");
   }
   loadingEl.classList.add("hidden");
   dataEl.classList.remove("hidden");
  } catch (error) {
   console.error("Error fetching stats:", error);
   loadingEl.classList.add("hidden");
   errorEl.classList.remove("hidden");
  }
 }

 // Scroll Reveal Animation Observer
 const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
   if (entry.isIntersecting) entry.target.classList.add("active");
  });
 }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

 document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

 // ======= Team Data Management =======
 let teamData = {};
 async function loadTeamData() {
  try {
   const response = await fetch("team.json");
   teamData = await response.json();
   renderMembers("2025-2026");
  } catch (error) {
   console.error("Error loading team data:", error);
  }
 }
 loadTeamData();

 function getInitials(name) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
 }

 function renderMembers(season) {
  const grid = document.getElementById("members-grid");
  let members = teamData[season] || [];
  if (members.length === 0) {
   grid.innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;">No roster data for this season.</p>';
   return;
  }

  const tiers = { Captains: [], Hardware: [], Software: [], Outreach: [], Members: [] };
  members.forEach((m) => {
   const r = m.role.toLowerCase();
   if ((r.includes("captain") || r === "captain") && !r.includes("software") && !r.includes("hardware") && !r.includes("outreach")) {
    tiers["Captains"].push(m);
   } else if (r.includes("hardware")) {
    tiers["Hardware"].push(m);
   } else if (r.includes("software")) {
    tiers["Software"].push(m);
   } else if (r.includes("outreach")) {
    tiers["Outreach"].push(m);
   } else {
    tiers["Members"].push(m);
   }
  });

  let finalHTML = "";
  let totalDelay = 0;
  ["Captains", "Hardware", "Software", "Outreach", "Members"].forEach((tierName) => {
   if (tiers[tierName].length > 0) {
    tiers[tierName].sort((a, b) => {
     const aIsLead = a.role.toLowerCase().includes("lead") || a.role.toLowerCase().includes("captain");
     const bIsLead = b.role.toLowerCase().includes("lead") || b.role.toLowerCase().includes("captain");
     if (aIsLead && !bIsLead) return -1;
     if (!aIsLead && bIsLead) return 1;
     return a.name.localeCompare(b.name);
    });

    let tierHTML = `<div class="team-tier reveal" style="transition-delay: ${totalDelay}s"><h3 class="tier-title">${tierName}</h3><div class="members-grid">`;
    tiers[tierName].forEach((m, idx) => {
     let avatarHTML = m.img && m.img.length > 5 ? `<img src="${m.img}" alt="${m.name}">` : `<span>${getInitials(m.name)}</span>`;
     let roleClass = "role-member";
     const r = m.role.toLowerCase();
     if ((r.includes("captain") || r === "captain") && !r.includes("software") && !r.includes("hardware") && !r.includes("outreach")) roleClass = "role-captain";
     else if (r.includes("software")) roleClass = "role-software";
     else if (r.includes("hardware")) roleClass = "role-hardware";
     else if (r.includes("outreach")) roleClass = "role-outreach";

     const itemDelay = totalDelay + (idx * 0.1);
     tierHTML += `<div class="member-card reveal" style="transition-delay: ${itemDelay}s"><div class="member-avatar ${roleClass}">${avatarHTML}</div><div class="member-name">${m.name}</div><div class="member-role">${m.role}</div></div>`;
    });
    tierHTML += "</div></div>";
    finalHTML += tierHTML;
    totalDelay += 0.2;
   }
  });
  grid.innerHTML = finalHTML;
  setTimeout(() => { grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el)); }, 100);
 }

 function renderAlumni() {
  const grid = document.getElementById("alumni-grid");
  if (!grid) return;
  const currentSeason = "2025-2026";
  const currentMembers = new Set((teamData[currentSeason] || []).map((m) => m.name));
  const alumniMap = {};
  Object.keys(teamData).forEach(season => {
   if (season === currentSeason) return;
   teamData[season].forEach(m => {
    if (currentMembers.has(m.name)) return;
    if (!alumniMap[m.name]) alumniMap[m.name] = { name: m.name, seasons: [], img: "", bestRole: m.role };
    alumniMap[m.name].seasons.push(season);
    if (m.img && m.img.length > 5) alumniMap[m.name].img = m.img;
    if (m.role.toLowerCase().includes("captain") && !alumniMap[m.name].bestRole.toLowerCase().includes("captain")) alumniMap[m.name].bestRole = m.role;
   });
  });

  const alumni = Object.values(alumniMap);
  if (alumni.length === 0) {
   grid.innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;">No alumni data available.</p>';
   return;
  }

  const tiers = { Captains: [], Hardware: [], Software: [], Outreach: [], Members: [] };
  alumni.forEach((m) => {
   const r = m.bestRole.toLowerCase();
   if ((r.includes("captain") || r === "captain") && !r.includes("software") && !r.includes("hardware") && !r.includes("outreach")) tiers["Captains"].push(m);
   else if (r.includes("hardware")) tiers["Hardware"].push(m);
   else if (r.includes("software")) tiers["Software"].push(m);
   else if (r.includes("outreach")) tiers["Outreach"].push(m);
   else tiers["Members"].push(m);
  });

  let finalHTML = "";
  let totalDelay = 0;
  ["Captains", "Hardware", "Software", "Outreach", "Members"].forEach((tierName) => {
   if (tiers[tierName].length > 0) {
    let tierHTML = `<div class="team-tier reveal" style="transition-delay: ${totalDelay}s"><h3 class="tier-title">${tierName}</h3><div class="members-grid">`;
    tiers[tierName].forEach((m, idx) => {
     let avatarHTML = m.img && m.img.length > 5 ? `<img src="${m.img}" alt="${m.name}">` : `<span>${getInitials(m.name)}</span>`;
     const yearsStr = m.seasons.length === 1 ? m.seasons[0] : m.seasons[m.seasons.length - 1] + " " + m.seasons[0];
     let roleClass = "role-member";
     const r = m.bestRole.toLowerCase();
     if ((r.includes("captain") || r === "captain") && !r.includes("software") && !r.includes("hardware") && !r.includes("outreach")) roleClass = "role-captain";
     else if (r.includes("software")) roleClass = "role-software";
     else if (r.includes("hardware")) roleClass = "role-hardware";
     else if (r.includes("outreach")) roleClass = "role-outreach";

     const itemDelay = totalDelay + (idx * 0.1);
     tierHTML += `<div class="member-card reveal" style="transition-delay: ${itemDelay}s"><div class="member-avatar ${roleClass}">${avatarHTML}</div><div class="member-name">${m.name}</div><div class="member-role">${m.bestRole}</div><div class="member-role" style="font-size: 0.7rem; margin-top: 0.25rem; opacity: 0.5;">${yearsStr}</div></div>`;
    });
    tierHTML += "</div></div>";
    finalHTML += tierHTML;
    totalDelay += 0.2;
   }
  });
  grid.innerHTML = finalHTML;
  setTimeout(() => { grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el)); }, 100);
 }

 // ======= WebLLM Chatbot Integration =======
 const startAlphaBtn = document.getElementById("start-alpha-btn");
 const chatInput = document.getElementById("chat-input");
 const chatSendBtn = document.getElementById("chat-send-btn");
 const chatMessages = document.getElementById("chat-messages");
 const chatStatusText = document.getElementById("chat-status-text");
 const aiVersionSelect = document.getElementById("ai-version-select");

 let engine = null;
 let isGenerating = false;


 const MODELS = {
  v1: "Qwen2.5-1.5B-Instruct-q4f16_1-MLC",
  v2: "Llama-3.2-3B-Instruct-q4f16_1-MLC"
 };
 let SELECTED_MODEL = MODELS.v2;

 // Initialize UI state for default model (v2)
 const initialAttachBtn = document.getElementById("attach-image-btn");
 if (initialAttachBtn) initialAttachBtn.disabled = true;

 if (aiVersionSelect) {
  aiVersionSelect.addEventListener("change", (e) => {
   if (MODELS[e.target.value]) {
    SELECTED_MODEL = MODELS[e.target.value];
   }
   }
  );

 const systemPrompt = `You are "Alpha", the high-energy site concierge for Team 19639 Alphabots.

IDENTITY & MISSION:
- You are an expert AI built into the Team 19639 website.
- Team 19639 Alphabots is a FIRST Tech Challenge (FTC) team from Fremont, California.
- MISSION: Facilitate learning in programming, business, engineering, and robotics for youth (grades 7-12).
- CRITICAL: "FTC" stands for FIRST Tech Challenge. "FCT" is a hallucination—NEVER use it. POLITELLY CORRECT anyone who says "FCT".

TEAM FACTS:
- Organization: 501(c)(3) non-profit (EIN: 81-1543325).
- Location: Fremont Unified School District, CA.
- Team Captains: Akshay Shoroff, Suhas Bathini.
- Sub-team Leads: Saket Sandru (Hardware), Shiv Gurjar (Software), Aadit Verma & Rushil Shah (Outreach).
- Roster: Includes Srithan Deverashetty, Varun Chinthoju, Renu Mandala, Vihaan Sanghvi, and Aashi.
- Awards: Winner of the "Golden Whisk" award.
- Games: FTC Simulator (Into the Deep season), Wordle, Trivia, Term Scramble, Memory Match, Penalty/Legal Ref Game, Flashcards, Hangman.

INTERACTION RULES:
1. NEVER USE EMOJIS. No robot faces, no gears, no stars. 
2. Tone: Extremely high-energy, enthusiastic, but professional co-pilot.
3. TRIPLE-SAFE NAVIGATION: You MUST mention a destination keyword to trigger site-wide tab switching.
   TARGETS: home, members, outreach, gallery, stats, alumni, contact, training, wordle.`;

 const chatHistory = [{ role: "system", content: systemPrompt }];

 function addMessageToUI(role, content) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", role);

  let formattedContent = typeof content === "string" ? content : "";
  if (role === "assistant") {
   if (formattedContent.includes("<think>")) {
     const parts = formattedContent.split(/<\/think>/);
     if (parts.length > 1) {
       const thinkContent = parts[0].replace("<think>", "").trim();
       const finalResponse = parts[1].trim();
       const thinkId = "think-" + Date.now();
       formattedContent = `<div class="think-container"><button class="think-toggle" onclick="document.getElementById('${thinkId}').classList.toggle('expanded')"><i class="ph ph-brain"></i> View Thinking Process</button><div id="${thinkId}" class="think-block">${thinkContent}</div></div>${finalResponse}`;
     }
   }
   formattedContent = formattedContent.replace(/<call:(\w+)>([\s\S]*?)<\/call>/g, "");
   formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
  }
  if (role === "assistant" && formattedContent.trim() === "") return;
  bubble.innerHTML += formattedContent;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
 }

 async function initializeWebLLM() {
  if (engine || window.engineInitializing) return;
  
  // Basic WebGPU check
  if (!navigator.gpu) {
    addMessageToUI("system", "Error: Your browser does not support WebGPU. Please use the latest version of Chrome, Edge, or Safari 17.4+.");
    chatStatusText.textContent = "Unsupported";
    return;
  }

  window.engineInitializing = true;
  chatInput.disabled = true;
  chatSendBtn.disabled = true;
  chatStatusText.textContent = "Loading...";
  addMessageToUI("system", "Downloading & loading AI model (running locally on your GPU). This may take a few minutes depending on your internet speed and hardware...");
  
  try {
   engine = await CreateMLCEngine(SELECTED_MODEL, { 
     initProgressCallback: (report) => { 
       chatStatusText.textContent = report.text; 
       console.log(report.text);
     } 
   });
   chatStatusText.textContent = "Online";
   chatStatusText.style.color = "var(--brand-green)";
   if (startAlphaBtn) startAlphaBtn.classList.add("hidden");
   chatInput.disabled = false;
   chatSendBtn.disabled = false;
   addMessageToUI("assistant", "Yo! I'm Alpha. Ready to talk robotics! What's up? I've got all the latest stats on Team 19639 and can even 'see' images you upload!");
  } catch (error) {
   console.error("WebLLM Init Error:", error);
   chatStatusText.textContent = "Error";
   addMessageToUI("system", `Failed to load model: ${error.message || "Unknown error"}. Ensure your GPU has enough memory and WebGPU is enabled in your browser.`);
  } finally { window.engineInitializing = false; }
 }

 async function handleSend() {
  const text = chatInput.value.trim();
  if (!text || isGenerating || !engine) return;

  const fastPassMap = { "home": "home", "wordle": "wordle", "gallery": "gallery", "members": "members" };
  if (fastPassMap[text.toLowerCase()]) {
    if (fastPassMap[text.toLowerCase()] === "wordle") launchGame("wordle");
    else switchTab(fastPassMap[text.toLowerCase()]);
    chatInput.value = "";
    chatInput.style.height = "auto";
    return;

  }

  chatInput.value = "";
  chatInput.style.height = "auto";
  chatInput.disabled = true;
  chatSendBtn.disabled = true;
  isGenerating = true;
  addMessageToUI("user", text);

  const userMessage = { role: "user", content: text };
  chatHistory.push(userMessage);

  try {
   const response = await engine.chat.completions.create({ messages: chatHistory, temperature: 0.7 });
   const msg = response.choices[0].message;
   chatHistory.push(msg);
   if (msg.content) {
     const navKeywords = ["home", "members", "gallery", "stats", "outreach", "alumni", "contact", "training", "wordle"];
     const contentLower = msg.content.toLowerCase();
     for (const k of navKeywords) {
       if (contentLower.includes(k)) {
         if (k === "wordle") launchGame("wordle"); else switchTab(k);
         break;
       }
     }
     addMessageToUI("assistant", msg.content);
   }
  } catch (error) { addMessageToUI("system", "Error during generation."); }
  finally { isGenerating = false; chatInput.disabled = false; chatSendBtn.disabled = false; chatInput.focus(); }
 }

 chatSendBtn.addEventListener("click", handleSend);
 
 chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
   e.preventDefault();
   handleSend();
  }
 });

 chatInput.addEventListener("input", () => {
  chatInput.style.height = "auto";
  chatInput.style.height = (chatInput.scrollHeight) + "px";
 });
 if (startAlphaBtn) {
   startAlphaBtn.addEventListener("click", () => {
     initializeWebLLM();
   });
 }

 // ======= Global Game State & Stats =======
 let totalGamesPlayed = parseInt(localStorage.getItem("totalGamesPlayed") || "0");
 const totalGamesCountEl = document.getElementById("total-games-count");
 const inflate = 0;

 function updateGlobalStats() {
  if (totalGamesCountEl) {
   totalGamesCountEl.textContent = totalGamesPlayed + inflate;
  }
 }
 updateGlobalStats();

 window.recordGamePlayed = function() {
  totalGamesPlayed++;
  localStorage.setItem("totalGamesPlayed", totalGamesPlayed);
  updateGlobalStats();
 }

 // Shake animation trigger
 window.shakeElement = function(el) {
  if (!el) return;
  el.classList.add("shake");
  setTimeout(() => el.classList.remove("shake"), 500);
 }

 // Game Logic Modular Launcher
 function launchGame(gameId) {
  switchTab("training");
  const launcher = document.getElementById("training-launcher");
  const modal = document.getElementById("game-modal-container");
  const loadArea = document.getElementById("game-load-area");
  const titleDisplay = document.getElementById("game-title-display");
  
  if (launcher) launcher.classList.add("hidden");
  if (modal) modal.classList.remove("hidden");
  
  if (titleDisplay) {
    const nameMap = {
      'hangman': 'FTC Hangman',
      'wordle': 'FTC Wordle',
      'trivia': 'FTC Trivia',
      'memory-match': 'Memory Match',
      'term-scramble': 'Term Scramble',
      'penalty-legal': 'Penalty or Legal',
      'flashcards': 'Knowledge Cards',
      'field-simulator': 'Field Simulator',
      'speed-match': 'Speed Match',
      'part-id': 'Part ID',
      'code-debugger': 'Code Debugger',
      'logic-puzzle': 'Logic Puzzle'
    };
    titleDisplay.textContent = nameMap[gameId] || 'FTC Game';
  }
  
  if (window.AlphabotsGameLoader) {
    window.AlphabotsGameLoader.load(gameId, loadArea);
  }
 }

 // ======= Training Games Initialization =======
 const trainingLauncher = document.getElementById("training-launcher");
 if (trainingLauncher) {
  trainingLauncher.querySelectorAll(".game-card").forEach(card => {
   card.addEventListener("click", () => {
    const gameId = card.getAttribute("data-game");
    if (gameId) launchGame(gameId);
   });
  });
 }

 document.querySelectorAll(".game-back-btn").forEach(btn => {
  btn.addEventListener("click", () => {
   const launcher = document.getElementById("training-launcher");
   const modal = document.getElementById("game-modal-container");
   const loadArea = document.getElementById("game-load-area");
   
   if (modal) modal.classList.add("hidden");
   if (launcher) launcher.classList.remove("hidden");
   
   if (window.AlphabotsGameLoader) {
     window.AlphabotsGameLoader.unload(loadArea);
   }
  });
 });

 // Lightbox and Gallery
 async function loadGalleryAndLightbox() {
  const galleryGrid = document.querySelector(".gallery-grid");
  if (!galleryGrid || window.galleryBuilt) return;
  try {
   const response = await fetch("gallery/gallery.json");
   const urls = await response.json();
   galleryGrid.innerHTML = "";
   urls.forEach(url => {
    const item = document.createElement("div");
    item.className = "premium-card gallery-item p-1";
    item.innerHTML = `<img src="${url}" class="gallery-img">`;
    galleryGrid.appendChild(item);
   });
   window.galleryBuilt = true;
  } catch(e) {}
 }
}});
