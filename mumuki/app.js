const data = window.referenceData;
const visualHookGroupsData = window.visualHookGroupsData || [];
const app = document.querySelector("#app");

const lanceSkitSkeleton = {
  title: "Old solution fails → product gives visible proof",
  creator: "@lanceshopfinds1",
  sourceTitle: "Product Solves the Annoying Part",
  localVideo: "assets/videos/skit-lanceshopfinds1-7618446657650314509.mp4",
  thesis: "The video is not selling mouthwash first. It sells the belief that the viewer's current solution looks normal but is not actually doing the job.",
  coreMechanic: "Accuse the problem → let the person defend their current habit → prove that habit fails → hand them the product → show a visible result.",
  skeleton: [
    ["Problem accusation", "No wonder your breath stinks so bad."],
    ["Defensive response", "My breath stinks?"],
    ["Existing habit defense", "Am I not supposed to rinse my mouth out with mouthwash?"],
    ["Old solution rejection", "But you're using American mouthwash. That does nothing for you, by the way."],
    ["Skeptic response", "Really?"],
    ["Failed proof of old solution", "Yeah. And look, as you spit, nothing comes out."],
    ["Curiosity gap", "Wait, there's something that's supposed to come out?"],
    ["Product handoff", "Yes. Try this."],
    ["Product identity question", "What is this?"],
    ["Product category / authority", "This is Japanese mouthwash."],
    ["Simple mechanism", "It actually pulls that gunk and dirt out of your mouth."],
    ["Demo action", "He uses the product on camera."],
    ["Visible proof / reaction", "Ew. Oh, my gosh. You see that? What the heck?"],
    ["Proof explanation", "All that plaque, gunk and build up comes right out with that brand."],
    ["Belief shift", "I've never seen a mouthwash actually pull that."],
    ["Immediate benefit", "My breath smells so much better."],
    ["Authority line", "In Japan, they actually take their oral care seriously."],
    ["Price objection", "Is this expensive? Like 40, $50?"],
    ["Price reassurance", "No, it's actually very affordable."],
    ["TikTok Shop CTA", "I'll leave a link down below in the orange shopping cart."]
  ],
  slotMap: [
    ["(problem)", "breath stinks → dull skin / flat skin / tired-looking skin"],
    ["(current solution)", "American mouthwash → raw banana / raw honey directly on face"],
    ["(old solution failure)", "nothing comes out → raw banana or honey is not formulated skincare, so the effect is not concentrated enough"],
    ["(product identity)", "Japanese mouthwash → Korean Honey Banana BDRN Ampoule"],
    ["(visible proof)", "gunk comes out → ampoule texture, glow finish, plumper-looking skin"],
    ["(authority)", "Japan takes oral care seriously → K-beauty knows how to make glow wearable"]
  ],
  mumukiDirection: [
    "Keep the two-person interruption.",
    "Open on someone putting raw banana or honey directly on their face.",
    "Do not pitch MUMUKI first.",
    "Attack the raw ingredient version as not strong or formulated enough, not just messy.",
    "Use “Try this” as the reveal.",
    "Position MUMUKI as the formulated BDRN + collagen version of that ingredient idea.",
    "Show ampoule texture immediately after reveal.",
    "Proof is visual: finish, glow, spread, skin look.",
    "CTA stays short."
  ]
};

const week1ScriptSystems = [
  {
    id: "opening-01",
    title: "Nobody believes I'm [age] anymore",
    count: "1 script",
    creator: "@elder.jack",
    sourceTitle: "PDRN K-Beauty Trend",
    localVideo: "assets/videos/talking-elder.jack-7560208949903920414.mp4",
    note: "Weird ingredient confession, recent before proof, product reveal, Korea / market proof.",
    originalOpening: "Nobody believes I'm 37 anymore, and I'm afraid to say it is from using salmon sperm.",
    coreStructure: [
      "weird result confession",
      "recent before proof",
      "product reveal",
      "hero ingredient explanation",
      "support ingredient",
      "pain education",
      "personal use proof",
      "visible result language",
      "Korea authority",
      "expensive / invasive comparison",
      "market proof",
      "scarcity CTA"
    ],
    skeleton: [
      ["Weird result confession", "Nobody believes I'm 37 anymore, and I'm afraid to say it is from using salmon sperm.", "Uses strange ingredient + age disbelief to stop the scroll."],
      ["Recent before proof", "That was my face just a month ago.", "Adds a short time gap so the claim feels visual."],
      ["Product reveal", "And this is all from using this one little Korean anti wrinkle stick...", "Reveals product after curiosity, not before."],
      ["Hero ingredient", "where a main ingredient is salmon DNA aka PDRN, derived from salmon sperm.", "Turns weird ingredient into skincare mechanism."],
      ["Support ingredient", "Also got salmon collagen...", "Adds one more ingredient to support the skin story."],
      ["Hydration education", "if you know anything about wrinkle prevention, you want to deeply hydrate those fine lines...", "Reframes fine lines as a hydration problem."],
      ["Personal use proof", "I've only been using this a month...", "Gives usage timeframe."],
      ["Result payoff", "I've been walking around with glassy, glowy hydrated skin...", "Names the skin result."],
      ["Korea authority", "PDRN is insanely popular in Korea for this reason.", "Borrows demand from Korea."],
      ["Scarcity CTA", "If you see an orange link on screen right here, I would grab this very fast...", "Ends with orange-link urgency."]
    ],
    slotMap: [
      ["weird ingredient / product story", "banana and honey / Honey Banana PDRN"],
      ["Korean product format", "Korean ampoule"],
      ["hero ingredient", "BDRN, which is Honey Banana PDRN, plus collagen"],
      ["hydration support", "panthenol and 10-layer hyaluronic acid"],
      ["result language", "glassy, glowy skin / hydrated, plumper-looking finish"],
      ["market proof", "only use Korea virality if brand confirms"]
    ],
    scripts: [
      {
        title: "MUMUKI Script",
        note: "Keep the confession first. Do not explain the product too early.",
        body: `Nobody believes I'm [age] anymore,
and I'm afraid to say it is from using banana and honey.

That was my face just [timeframe] weeks ago.

And this is all from using this one little Korean ampoule.

Main thing in here is Honey Banana PDRN,
plus collagen.

It also has Volufiline.

And if you know Volufiline,
people used to talk about it for breast-volume creams,

yeah, the boob filler thing.

Also got panthenol and 10-layer hyaluronic acid
to lock in hydration.

And if you know anything about wrinkle prevention,
you want to keep those lines hydrated
before they start looking worse.

I've only been using this for [timeframe] weeks,

and normally my skin is such a dry, flat mess this time of year.

But I've been walking around with glassy, glowy skin
for the past [timeframe] weeks now.

This Honey Banana BDRN thing is already super viral in Korea.

It just came out on TikTok Shop.

If you see the orange link,
grab it fast while it's still available.`
      }
    ]
  },
  {
    id: "opening-02",
    title: "Before I booked an appointment",
    count: "1 script",
    creator: "@biohacking.babe",
    sourceTitle: "Fine Lines Serum Talk",
    localVideo: "assets/videos/talking-biohacking.babe-7628791249079700767.mp4",
    note: "Appointment hesitation, credible person proof, pro-tech skincare transfer.",
    originalOpening: "My forehead before I booked an appointment. Forehead after I still did not book an appointment.",
    coreStructure: [
      "before appointment hook",
      "after without appointment",
      "expert proof",
      "instant purchase reaction",
      "professional-tech mechanism",
      "skin support metaphor",
      "aging problem explanation",
      "Korea no-treatment desire",
      "ingredient reveal",
      "soft mechanism",
      "not freezing, just relaxing",
      "routine replacement",
      "new release CTA"
    ],
    skeleton: [
      ["Before appointment hook", "My forehead before I booked an appointment.", "Creates treatment tension immediately."],
      ["After without appointment", "Forehead after I still did not book an appointment.", "Makes viewer ask what happened instead."],
      ["Expert proof", "I saw a 40 year old esthetician say that this serum by Medik8 was literally going to put her out of business.", "Uses authority proof before explaining ingredients."],
      ["Purchase reaction", "I could not have bought it quick enough.", "Signals urgency and desire."],
      ["Professional-tech mechanism", "It put epidermal growth factor in this similar technology that they use when you go in office...", "Connects skincare to the in-office desire."],
      ["Skin support metaphor", "basically like a spanks layer underneath our skin to hold everything up.", "Explains support in a rough metaphor."],
      ["Aging problem", "this degrades as we age, which is why we can see some loose, saggy skin and some drooping.", "Names the visible problem."],
      ["Korea desire", "In Korea, they heard there's a massive wave of women who don't want to get this done to their face.", "Sets up skincare version of treatment desire."],
      ["Claim softener", "So we're not freezing our face, we are just relaxing.", "Softens the treatment comparison."],
      ["CTA", "If it's even still in stock, I'm gonna put the link right there.", "Closes with availability pressure."]
    ],
    slotMap: [
      ["face area", "forehead / smile lines / under eyes / flat-looking skin"],
      ["credible person", "K-beauty creator / esthetician / skincare reviewer"],
      ["hero ingredient", "BDRN / Honey Banana PDRN / collagen"],
      ["professional context", "what people go in office chasing"],
      ["soft claim", "not doing t0x / not freezing the face / smoother and plumper-looking skin"],
      ["routine replacement", "messy anti-aging routine → one ampoule"]
    ],
    scripts: [
      {
        title: "MUMUKI Script",
        note: "Keep the appointment tension and rough in-office comparison.",
        body: `My [face area] before I booked an appointment.

[Same face area] after I still did not book an appointment.

I saw a [credible person] say this made her rethink booking the appointment.

I could not have bought it quick enough.

It put BDRN in this little Korean ampoule.

BDRN is Honey Banana PDRN, plus collagen.

It put BDRN in this similar technology that people use when they go in office
to pump up collagen here,
elasticity here,
density here.

But it also has ceramide, peptides, and Volufiline.

And if you know Volufiline,
you already know why people used to talk about it for breast-volume creams,
yeah, the boob filler thing.

And as we get older,
skin just does not hold the same as before.

Which is why we can see some loose,
saggy-looking skin.

In Korea,
they heard there's a massive wave of women
who don't want this stuff in their face.

So they put Honey Banana PDRN in this,
plus collagen and 10-layer hyaluronic acid.

So the skin on top does not look as dry and flat.

So we're not doing t0x.

We're not freezing the face.

We're just trying to make the skin look smoother and plumper.

Take it from someone whose routine was all over the place,
this is the thing I wish I had earlier.

Basically, MUMUKI took my messy anti-aging routine
and put the glass-skin part into one ampoule.

This just came out on TikTok Shop.

I'll do you a favor,
I'm gonna put the link right there.

Grab it while it's still available.`
      }
    ]
  },
  {
    id: "opening-03",
    title: "You got wrinkles on your forehead",
    count: "2 scripts",
    creator: "@wellnessbenefitsonly",
    sourceTitle: "Wrinkle Skin Hook",
    localVideo: "assets/videos/talking-wellnessbenefitsonly-7624739135223336205.mp4",
    note: "Direct face-area callout, rub banana visual, rough ingredient proof.",
    originalOpening: "You got wrinkles on your forehead like this.",
    coreStructure: [
      "direct face-area callout",
      "apply product to same area",
      "second face-area callout",
      "apply product to same area",
      "expression-line callout",
      "apply product to same area",
      "personal use proof",
      "best-skin result",
      "product reason",
      "ingredient hydration proof",
      "texture result",
      "no-BS clean trust",
      "desired skin restatement",
      "orange cart CTA"
    ],
    skeleton: [
      ["Direct face-area hook", "You got wrinkles on your forehead like this.", "Calls out one visible problem."],
      ["Apply to exact problem", "Put this skin tiny beef tallow all over your wrinkles.", "Shows what to do immediately."],
      ["Second problem area", "You got small lines right here.", "Moves to another local problem."],
      ["Apply to second area", "The skin tiny beef tallow all over your mouth.", "Repeats the simple use logic."],
      ["Expression-line problem", "If you got crinkly eyes like this when you smile", "Uses facial expression to show the line."],
      ["Personal use proof", "I've been using skin China Beef tallow and it made my skin glow like crazy.", "Gives personal proof and visible result."],
      ["Best-skin result", "Like this is the best my skin has looked in my entire life.", "Emotional payoff."],
      ["Ingredient proof", "It has chamomile mushroom extract and shea butter that keeps the skin super hydrated.", "Ties ingredient to a simple skin feel."],
      ["No-BS trust", "No harsh ingredients. There's no BS inside of here.", "Removes objection in blunt language."],
      ["CTA", "I'll leave a link on the bottom left with the orange cart.", "Gives the TikTok Shop action."]
    ],
    slotMap: [
      ["visible problem", "forehead wrinkles / smile lines / crinkly eyes"],
      ["product action", "rub banana here / apply ampoule here"],
      ["visible result", "glow like crazy / best skin in my life"],
      ["product reason", "banana natural t0x / Honey Banana PDRN"],
      ["ingredient proof", "panthenol / HA / ceramide / peptides / Volufiline"],
      ["trust line", "no harsh stuff / no BS inside"]
    ],
    scripts: [
      {
        title: "Script 1: Natural t0x / BDRN Transfer",
        note: "Uses the face-area rhythm, then transfers into Korea / BDRN logic.",
        body: `You got wrinkles on your forehead like this?

Rub banana here.

You got smile lines like this?

Rub banana here.

If your eyes get crinkly when you smile,

rub banana here.

I saw [credible person / review screenshot] say banana is called natural t0x.

It's that same thing people go in office for
to pump up collagen here,
elastin here,
density structure here.

And as we age,
skin just does not hold the same as before.

Which is why we can see some loose,
saggy skin,
and some drooping.

In Korea,
they heard there's a massive wave of women
who don't want this stuff in their face.

So they made BDRN.

Basically Honey Banana PDRN.

And MUMUKI put it in this little Korean ampoule.

It also has ceramide,
peptides,
and Volufiline.

And if you know Volufiline,
people used to talk about it for breast-volume creams,

yeah, the boob filler thing.

So this is not just banana plus honey.

This is actually the kind of thing people use when they want their skin to look
smoother,
and more plump.

If you want that glowy skin,

this is the stuff I would start using.

I'll leave the link on the bottom left with the orange cart.

Just act fast,
because this just came out on TikTok Shop
and I don't know how long it's gonna stay available.`
      },
      {
        title: "Script 2: Banana Peel / Glow Like Crazy",
        note: "Closer to the original beef-tallow order: personal proof before ingredient explanation.",
        body: `You got wrinkles on your forehead like this?

Rub banana here.

You got smile lines like this?

Rub banana here.

If your eyes get crinkly when you smile,

rub banana here.

I've been using banana peel for a while,
and it made my skin glow like crazy.

Like this is the best my skin has looked in my entire life.

This is why people keep calling banana natural t0x.

In Korea,
they heard there's a massive wave of women
who don't want this stuff in their face.

So they made BDRN.

Basically Honey Banana PDRN.

And MUMUKI put it in this little Korean ampoule.

It has panthenol and 10-layer hyaluronic acid,
so your skin stays super hydrated.

It has ceramide,
peptides,
and Volufiline,

so the skin looks bouncier and less flat.

And if you know Volufiline,
people used to talk about it for breast-volume creams,

yeah, the boob filler thing.

No harsh stuff.

No BS inside.

Just natural ingredients going straight on the skin
to make it look really youthful.

If you want that plump, glowy skin,

this is the stuff I would start using.

I'll leave the link on the bottom left with the orange cart.

Just act fast,
because this just came out on TikTok Shop
and I don't know how long it's gonna stay available.`
      }
    ]
  },
  {
    id: "opening-04",
    title: "You wanna rub it here",
    count: "1 script",
    creator: "@kaylavashti",
    sourceTitle: "Turning 39 Skin Hook",
    localVideo: "assets/videos/talking-kaylavashti-7629543244132551949.mp4",
    note: "Face-map application, Volufiline curiosity, one ingredient one job.",
    originalOpening: "Wanna put it here, here, here, here, here, here, and even here. Anywhere that you're noticing volume loss and fine lines.",
    coreStructure: [
      "application map hook",
      "target problem",
      "usage boundary",
      "weird ingredient reason",
      "hero plumping ingredient",
      "firming ingredient",
      "hydration ingredient",
      "moisture ingredient",
      "elasticity stack",
      "orange cart CTA"
    ],
    skeleton: [
      ["Application map hook", "Wanna put it here, here, here, here, here, here, and even here.", "Creates immediate face-pointing rhythm."],
      ["Target problem", "Anywhere that you're noticing volume loss and fine lines.", "Defines local use-case."],
      ["Usage boundary", "We're not using this all over our face", "Makes the product feel active and specific."],
      ["Weird ingredient reason", "because this has an ingredient that used to be used as boob filler.", "Uses Volufiline curiosity for plumping tension."],
      ["Hero plumping ingredient", "In we have that 5% volufiline to help with plumping", "Ingredient, one job."],
      ["Firming ingredient", "PDRN to help firm the skin", "Ingredient, one job."],
      ["Hydration ingredient", "hyaluronic acid for hydration", "Ingredient, one job."],
      ["Elasticity stack", "and NAD and collagen for elasticity.", "Adds elasticity support."],
      ["Bundle CTA", "if you see those below, I would definitely grab this as the bundle.", "Ends with buying path."]
    ],
    slotMap: [
      ["application map", "smile lines / forehead / under eyes / neck / flat areas"],
      ["target problem", "volume loss / fine lines / wrinkles"],
      ["weird ingredient", "Volufiline / used as boob filler"],
      ["firming ingredient", "BDRN / Honey Banana PDRN"],
      ["hydration ingredient", "10-layer hyaluronic acid"],
      ["moisture / barrier", "ceramide capsules"],
      ["elasticity", "collagen"],
      ["CTA", "link below / orange cart"]
    ],
    scripts: [
      {
        title: "MUMUKI Script",
        note: "Keep it choppy. Do not turn ingredient stack into brand-page copy.",
        body: `You wanna rub it here,
here,
here,
here,
here,
here,
and even here.

Anywhere you're noticing volume loss,
fine lines,
wrinkles,
all of that.

Banana peel has potassium in it.

it Makes your skin look smoother.
Tighter.

That's why people keep calling it natural t0x.

In Korea,
they heard there's a massive wave of women
who want that smooth, plump look,

but don't want this thing in their face.

So they come up with BDRN.

Basically Honey Banana PDRN.

And MUMUKI put it in this little Korean ampoule.

We're not using this all over our face.

Because this has an ingredient that used to be used as boob filler.

Volufiline for plumping.

BDRN to help firm the skin.

10-layer hyaluronic acid for hydration.

Ceramide capsules for moisture.

Collagen for elasticity.

If you want that plump, glowy skin,

no harsh stuff,

all natural,

this is the stuff I would start using.

I'll leave the link down below.

If you see the orange cart,

grab it while it's still available.`
      }
    ]
  }
];

const scriptIdeaSections = [
  {
    title: "Skit",
    count: "1 skeleton",
    href: "#/script-idea/skit",
    note: "Two-person setup. Old solution fails. Product reveal gives proof."
  },
  ...week1ScriptSystems.map((item, index) => ({
    title: `Opening 0${index + 1}`,
    count: item.count,
    href: `#/script-idea/${item.id}`,
    note: item.title
  }))
];

const biohackingFineLinesSkeleton = {
  creator: "@biohacking.babe",
  sourceTitle: "Fine Lines Serum Talk",
  localVideo: "assets/videos/talking-biohacking.babe-7628791249079700767.mp4",
  skeleton: [
    "My [problem area] before I [high-friction appointment / treatment].",
    "[Problem area] after I still did not [high-friction appointment / treatment].",
    "I saw a [trusted expert] say this [product type] was going to [strong proof claim].",
    "I could not have bought it quick enough.",
    "It puts [hero mechanism] into [product format], similar to the technology they use [professional context] to [benefit 1], [benefit 2], [benefit 3].",
    "But it also supports [under-skin support system], basically like [simple metaphor] underneath our skin to [plain job].",
    "[Support system] degrades as we age, which is why we start seeing [visible problem 1], [visible problem 2], [visible problem 3].",
    "In Korea, there is a wave of women who want [desired result] without [high-friction treatment].",
    "So they put [ingredient / mechanism] into this.",
    "That [ingredient / mechanism] works by [plain mechanism], so the skin on top looks [visible result].",
    "We're not [extreme claim]. We're just [softer believable claim].",
    "Take it from someone who has used this for [time / credibility source], it works.",
    "Basically, [brand] took my [long complicated routine] and said: we will give you [professional benefit] in one [simple product].",
    "But make it [price / ease / access advantage].",
    "This is their [newest release / product], and if it is still in stock, I will put the link [orange cart / bio / description].",
    "If you do not see [buying path], it means [sold out / access reason]."
  ],
  slots: [
    ["[problem area]", "forehead / smile lines / tired skin / flat skin / dull skin"],
    ["[high-friction appointment / treatment]", "booked a facial / booked an appointment / tried another 10-step routine / used raw banana and honey again"],
    ["[trusted expert]", "esthetician / K-beauty creator / medspa girl / skincare reviewer"],
    ["[strong proof claim]", "put her out of business / replace half her routine / make people stop booking the expensive version"],
    ["[hero mechanism]", "Honey Banana BDRN + collagen / banana-derived PDRN / capsule ampoule texture"],
    ["[desired result]", "plumper-looking skin / firmer-looking skin / glass glow"],
    ["[extreme claim]", "freezing your face / doing injections at home / pretending a DIY mask is a serum"],
    ["[softer believable claim]", "giving the skin a smoother, bouncier look / making glow easier to get / turning the banana-honey idea into skincare"]
  ],
  mumukiSwaps: [
    ["Medik8 serum", "MUMUKI Honey Banana BDRN Ampoule"],
    ["in-office technology", "Korean ampoule format"],
    ["no tox peptide", "Honey Banana BDRN + collagen"],
    ["60-step anti-aging routine", "banana + honey DIY / long glow routine"],
    ["smooths and relaxes", "plumper-looking, firmer-looking, glass glow finish"],
    ["sold out CTA", "orange cart / form / bio CTA"]
  ]
};

const skitSkeletonBeats = [
  {
    title: "Callout",
    original: "No wonder your breath stinks so bad.",
    meaning: "Start with a direct problem callout."
  },
  {
    title: "Defensive reaction",
    original: "My breath stinks?",
    meaning: "Let the other person push back."
  },
  {
    title: "Existing habit defense",
    original: "Am I not supposed to rinse my mouth out with mouthwash?",
    meaning: "They explain the thing they already do."
  },
  {
    title: "Old solution attack",
    original: "You're using American mouthwash. That does nothing for you.",
    meaning: "Attack the current solution, not the person."
  },
  {
    title: "Proof old solution fails",
    original: "Look, as you spit, nothing comes out.",
    meaning: "Show why the old solution is weak."
  },
  {
    title: "Curiosity gap",
    original: "Wait, there's something that's supposed to come out?",
    meaning: "Create the gap before showing the product."
  },
  {
    title: "Product reveal",
    original: "Yes. Try this.",
    meaning: "Only reveal the product after the viewer understands the gap."
  },
  {
    title: "Simple mechanism",
    original: "It actually pulls that gunk and dirt out of your mouth.",
    meaning: "Explain the mechanism in one plain sentence."
  },
  {
    title: "Visible proof",
    original: "Ew. Oh my gosh. You see that?",
    meaning: "The result has to be visible on camera."
  },
  {
    title: "Benefit + CTA",
    original: "My breath smells so much better. Link in the orange cart.",
    meaning: "Close with the benefit and buying path."
  }
];

const skitSellingCards = [
  {
    title: "What this skit is selling",
    lines: [
      "Viewer thinks their current solution is already doing the job.",
      "Skit proves the current solution is weak.",
      "Then product reveal feels earned.",
      "MUMUKI version: banana t0x DIY gets attention, but raw banana / honey is slow, messy, or not giving fast glow."
    ]
  },
  {
    title: "Replaceable slots",
    slots: [
      ["Old problem", "bad breath → flat / dull / tired-looking skin"],
      ["Old solution", "American mouthwash → raw banana / raw honey / banana t0x DIY"],
      ["Old solution weakness", "nothing comes out → slow / messy / not giving instant glow"],
      ["Product", "Japanese mouthwash → MUMUKI Honey Banana BDRN Ampoule"],
      ["Mechanism", "pulls gunk out → Honey Banana PDRN + collagen in ampoule format"],
      ["Visible proof", "gunk in cup → texture / spread / glow / plumper-looking finish"]
    ]
  },
  {
    title: "How to film the tension",
    lines: [
      "Person B is already using the DIY method: rubbing banana, dripping honey, or applying a banana-honey mask.",
      "Person A interrupts and calls out the weak result.",
      "Person B defends the trend.",
      "Person A attacks the raw method, not the person.",
      "Make the old method look weak.",
      "Reveal MUMUKI.",
      "Show capsule ampoule texture.",
      "Rub it in.",
      "Show glow / plump / glossy finish.",
      "CTA to orange cart."
    ]
  },
  {
    title: "Do not change",
    lines: [
      "Do not start with the product.",
      "Do not turn this into ingredient education.",
      "Do not attack the viewer.",
      "Do not say botx. Say t0x.",
      "Pick one payoff: glow, plump, or glass skin."
    ]
  }
];

function route() {
  const hash = window.location.hash || "#/";
  const path = hash.replace(/^#/, "");

  if (path.startsWith("/skit/")) {
    renderSkitDetail(path.split("/").pop());
  } else if (path.startsWith("/reference-video/")) {
    renderReferenceCategory(path.split("/").pop());
  } else if (path === "/reference-video") {
    renderReferenceVideo();
  } else if (path === "/visual-hook-bank" || path === "/visual-hook-grouping") {
    renderVisualHookGrouping();
  } else if (path.startsWith("/script-idea/opening-")) {
    renderWeek1ScriptIdea(path.split("/").pop());
  } else if (path === "/script-idea/skit") {
    renderSkitScriptIdea();
  } else if (path.startsWith("/script-idea/talking-head")) {
    renderScriptIdea();
  } else if (path === "/script-idea") {
    renderScriptIdea();
  } else {
    renderHome();
  }

  setActiveNav(path === "/visual-hook-grouping" ? "/visual-hook-bank" : path);
}

function setActiveNav(path) {
  document.querySelectorAll(".nav a").forEach((link) => {
    const target = link.dataset.route;
    const isActive = target === "/" ? path === "/" : path.startsWith(target);
    link.classList.toggle("is-active", isActive);
  });
}

function renderHome() {
  app.innerHTML = `
    <section class="page home-page">
      <div class="product-hero">
        <figure class="product-image-card">
          <img src="assets/thumbnail-ampoule.webp" alt="MUMUKI Honey Banana BDRN Ampoule">
        </figure>

        <div class="product-copy">
          <p class="eyebrow">Hero product</p>
          <h1>MUMUKI Honey Banana BDRN Ampoule</h1>
          <p class="hero-note">
            Banana natural t0x is already super viral on TikTok.
            MUMUKI turns banana + honey skincare into a Korean glass-skin ampoule.
          </p>

          <div class="hot-points">
            <article>
              <span>01</span>
              <strong>What is BDRN?</strong>
              <p>Honey Banana PDRN + collagen.</p>
            </article>
            <article>
              <span>02</span>
              <strong>Plumper looking skin</strong>
            </article>
            <article>
              <span>03</span>
              <strong>Firmer looking skin</strong>
            </article>
            <article>
              <span>04</span>
              <strong>Glass glow</strong>
            </article>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderReferenceVideo() {
  app.innerHTML = `
    <section class="page">
      <div class="page-header">
        <div>
          <p class="eyebrow">Reference library</p>
          <h1>Reference Video</h1>
        </div>
      </div>

      <div class="category-grid">
        ${categoryCard("Viral Non TikTokShop Video", "viral", data.viralNonTikTokShop.length)}
        ${categoryCard("Talking Head", "talking-head", data.talkingHead.length)}
        ${categoryCard("Skit", "skit", data.skit.length)}
      </div>
    </section>
  `;
}

function categoryCard(title, slug, count) {
  return `
    <a class="category-card" href="#/reference-video/${slug}">
      <p class="eyebrow">${count} references</p>
      <h2>${title}</h2>
    </a>
  `;
}

function renderReferenceCategory(slug) {
  const config = getReferenceConfig(slug);

  app.innerHTML = `
    <section class="page">
      <a class="back-link" href="#/reference-video">← Back to Reference Video</a>
      <div class="page-header">
        <div>
          <p class="eyebrow">Reference Video</p>
          <h1>${config.title}</h1>
        </div>
        <p class="small-note">${config.items.length} references</p>
      </div>

      <div class="gallery-grid">
        ${config.items.map((item, index) => universalGalleryCard(item, index, config.type)).join("")}
      </div>
    </section>
  `;

  refreshTikTokEmbed();
}

function renderVisualHookGrouping() {
  const totalClips = visualHookGroupsData.reduce((sum, group) => sum + group.items.length, 0);

  app.innerHTML = `
    <section class="page visual-hook-page">
      <div class="page-header">
        <div>
          <p class="eyebrow">Banana & Honey Clips</p>
          <h1>Visual Hook Bank</h1>
        </div>
        <p class="small-note">${visualHookGroupsData.length} groups. ${totalClips} selected clips.</p>
      </div>

      <div class="group-stack">
        ${visualHookGroupsData.map((group) => hookGroupSection(group)).join("")}
      </div>
    </section>
  `;
}

function hookGroupSection(group) {
  return `
    <section class="hook-group-section" id="${group.id}">
      <div class="hook-group-head">
        <div>
          <span class="group-chip">${group.label}</span>
          <h2>${group.title}</h2>
          <p>${group.why}</p>
        </div>
        <strong>${group.items.length} clips</strong>
      </div>

      <div class="hook-gallery-grid">
        ${group.items.map((item) => hookClipCard(item)).join("")}
      </div>
    </section>
  `;
}

function hookClipCard(item) {
  const start = item.startSeconds ?? "";
  const end = item.endSeconds ?? "";
  const time = start !== "" && end !== "" ? `${Number(start).toFixed(1)}-${Number(end).toFixed(1)}s` : "";
  const priority = item.clipPriority ? `P${item.clipPriority}` : "Clip";

  return `
    <article class="hook-card">
      <div class="hook-video">
        <video class="local-video" controls preload="metadata" playsinline>
          <source src="${item.clipPath}" type="video/mp4">
        </video>
      </div>
      <div class="hook-body">
        <div class="hook-meta-row">
          <span class="meta">${item.creator}</span>
          <span class="pill">${priority}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${time}</p>
      </div>
    </article>
  `;
}

function getReferenceConfig(slug) {
  const map = {
    "viral": {
      title: "Viral Non TikTokShop Video",
      items: data.viralNonTikTokShop,
      type: "viral"
    },
    "talking-head": {
      title: "Talking Head",
      items: data.talkingHead,
      type: "talking"
    },
    "skit": {
      title: "Skit",
      items: data.skit,
      type: "skit"
    }
  };

  return map[slug] || map.viral;
}

function universalGalleryCard(item, index, type) {
  const video = item.localVideo
    ? localVideo(item)
    : item.url && item.videoId
      ? tiktokEmbed(item)
      : `<div class="empty-video">Add reference video</div>`;
  const bodyContent = `
    <p class="meta">${item.creator || item.source || type}</p>
    <h3>${item.title}</h3>
    <span class="pill">${item.status}</span>
  `;
  const body = type === "skit"
    ? `<a class="gallery-body gallery-link-body" href="#/skit/${item.id}">${bodyContent}</a>`
    : `<div class="gallery-body">${bodyContent}</div>`;

  return `
    <article class="gallery-card ${type === "skit" ? "is-clickable" : ""}">
      <div class="gallery-video">
        ${video}
      </div>
      ${body}
    </article>
  `;
}

function renderSkitDetail(id) {
  const item = data.skit.find((entry) => entry.id === id);
  if (!item) {
    renderReferenceVideo();
    return;
  }

  app.innerHTML = `
    <section class="page">
      <a class="back-link" href="#/reference-video">← Back to Reference Video</a>
      <div class="page-header">
        <div>
          <p class="eyebrow">${item.creator}</p>
          <h1>${item.title}</h1>
        </div>
        <p class="small-note">${item.status}. This page is built for teardown, not decoration.</p>
      </div>

      <div class="detail-layout">
        <aside class="video-panel">
          <div class="video-frame">
            ${item.localVideo ? localVideo(item) : tiktokEmbed(item)}
          </div>
        </aside>

        <div>
          <article class="detail-card">
            <p class="eyebrow">Reference teardown</p>
            ${detailRow("Why it worked", item.whyItWorks)}
            ${detailRow("Core pattern", item.pattern)}
            ${detailRow("MUMUKI translation", item.mumukiTranslation)}
          </article>

          <article class="detail-card">
            <p class="eyebrow">Shoot this version</p>
            ${detailRow("Opening shot", item.openingShot)}
            ${detailRow("Text overlay", item.overlay)}
            ${detailRow("Shot list", `<ol>${item.shotList.map((shot) => `<li>${shot}</li>`).join("")}</ol>`)}
            ${detailRow("Raw demo", item.rawDemo)}
          </article>
        </div>
      </div>
    </section>
  `;

  refreshTikTokEmbed();
}

function renderScriptIdea() {
  app.innerHTML = `
    <section class="page script-page">
      <div class="page-header">
        <div>
          <p class="eyebrow">Execution layer</p>
          <h1>Week 1 Script System</h1>
        </div>
        <p class="small-note">
          Keep the skit. Add 4 reference skeletons and 5 MUMUKI scripts.
        </p>
      </div>

      <div class="script-nav-grid">
        ${scriptIdeaSections.map((section) => scriptIdeaCard(section)).join("")}
      </div>
    </section>
  `;
}

function renderWeek1ScriptIdea(id) {
  const item = week1ScriptSystems.find((entry) => entry.id === id);
  if (!item) {
    renderScriptIdea();
    return;
  }

  app.innerHTML = `
    <section class="page script-page script-detail-page">
      <a class="back-link" href="#/script-idea">← Back to Script Idea</a>
      <div class="page-header">
        <div>
          <p class="eyebrow">Week 1 Talking Head</p>
          <h1>${item.title}</h1>
        </div>
        <p class="small-note">${item.count}. ${item.note}</p>
      </div>

      <article class="script-skeleton-card">
        <div class="script-reference-panel">
          <p class="eyebrow">Reference video</p>
          <div class="script-video-frame">
            ${localVideo(item)}
          </div>
          <div class="script-reference-copy">
            <p class="meta">${item.creator}</p>
            <h2>${item.sourceTitle}</h2>
            <p>${item.originalOpening}</p>
          </div>
        </div>

        <div class="script-breakdown">
          <section class="script-section">
            <div class="section-head">
              <p class="eyebrow">Core structure</p>
            </div>
            <div class="skeleton-line-table">
              ${item.coreStructure.map((line) => skeletonLineRow(line)).join("")}
            </div>
          </section>

          <section class="script-section">
            <div class="section-head">
              <p class="eyebrow">Original skeleton</p>
            </div>
            <div class="beat-list">
              ${item.skeleton.map((beat, index) => week1SkeletonBeat(beat, index)).join("")}
            </div>
          </section>

          <section class="script-section">
            <div class="section-head">
              <p class="eyebrow">MUMUKI slot map</p>
            </div>
            <div class="slot-map-list">
              ${item.slotMap.map((slot) => slotMapRow(slot)).join("")}
            </div>
          </section>

          <section class="script-section">
            <div class="section-head">
              <p class="eyebrow">MUMUKI scripts</p>
              <strong>${item.scripts.length} script${item.scripts.length > 1 ? "s" : ""}</strong>
            </div>
            <div class="script-draft-list">
              ${item.scripts.map((script) => scriptDraftCard(script)).join("")}
            </div>
          </section>
        </div>
      </article>
    </section>
  `;
}

function scriptIdeaCard(section) {
  return `
    <a class="script-idea-card" href="${section.href}">
      <p class="eyebrow">${section.count}</p>
      <h2>${section.title}</h2>
      <p>${section.note}</p>
    </a>
  `;
}

function renderSkitScriptIdea() {
  app.innerHTML = `
    <section class="page script-page script-detail-page">
      <a class="back-link" href="#/script-idea">← Back to Script Idea</a>
      <div class="page-header">
        <div>
          <p class="eyebrow">Skit</p>
          <h1>Skit Skeleton</h1>
        </div>
      </div>

      ${scriptSkitSkeletonCard(lanceSkitSkeleton)}
    </section>
  `;
}

function renderTalkingHeadScriptIdea(item) {
  app.innerHTML = `
    <section class="page script-page script-detail-page">
      <a class="back-link" href="#/script-idea">← Back to Script Idea</a>
      <div class="page-header">
        <div>
          <p class="eyebrow">Talking Head Skeleton</p>
          <h1>${item.sourceTitle}</h1>
        </div>
      </div>

      <article class="script-skeleton-card">
        <div class="script-reference-panel">
          <p class="eyebrow">Reference</p>
          <div class="script-video-frame">
            ${localVideo(item)}
          </div>
          <div class="script-reference-copy">
            <p class="meta">${item.creator}</p>
            <h2>${item.sourceTitle}</h2>
          </div>
        </div>

        <div class="script-breakdown">
          <section class="script-section">
            <div class="section-head">
              <p class="eyebrow">Skeleton to reuse</p>
            </div>
            <div class="skeleton-line-table">
              ${item.skeleton.map((line) => skeletonLineRow(line)).join("")}
            </div>
          </section>

          <section class="script-section">
            <div class="section-head">
              <p class="eyebrow">Slot options</p>
            </div>
            <div class="slot-map-list">
              ${item.slots.map((slot) => slotMapRow(slot)).join("")}
            </div>
          </section>

          <section class="script-section">
            <div class="section-head">
              <p class="eyebrow">MUMUKI swaps</p>
            </div>
            <div class="slot-map-list">
              ${item.mumukiSwaps.map((slot) => slotMapRow(slot)).join("")}
            </div>
          </section>
        </div>
      </article>
    </section>
  `;
}

function scriptSkitSkeletonCard(item) {
  return `
    <article class="script-skeleton-card">
      <div class="script-reference-panel">
        <p class="eyebrow">Skit reference</p>
        <div class="script-video-frame">
          ${localVideo(item)}
        </div>
        <div class="script-reference-copy">
          <p class="meta">${item.creator}</p>
          <h2>${item.sourceTitle}</h2>
        </div>
      </div>

      <div class="script-breakdown">
        <section class="script-section">
          <div class="section-head">
            <p class="eyebrow">Original skeleton</p>
          </div>
          <div class="beat-list">
            ${skitSkeletonBeats.map((beat, index) => skitSkeletonBeat(beat, index)).join("")}
          </div>
        </section>

        <section class="script-section">
          <div class="section-head">
            <p class="eyebrow">MUMUKI reconstruction</p>
          </div>
          <div class="selling-card-grid">
            ${skitSellingCards.map((card) => sellingCard(card)).join("")}
          </div>
        </section>
      </div>
    </article>
  `;
}

function sellingCard(card) {
  return `
    <div class="selling-card">
      <h3>${card.title}</h3>
      ${card.slots ? `<div class="slot-map-list">${card.slots.map((slot) => slotMapRow(slot)).join("")}</div>` : ""}
      ${card.lines ? `<ul>${card.lines.map((line) => `<li>${line}</li>`).join("")}</ul>` : ""}
    </div>
  `;
}

function skeletonLineRow(line) {
  return `<p>${line}</p>`;
}

function week1SkeletonBeat(beat, index) {
  return `
    <div class="beat-row skit-beat-row">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div>
        <strong>${beat[0]}</strong>
        <p>${beat[1]}</p>
        <small>${beat[2]}</small>
      </div>
    </div>
  `;
}

function scriptDraftCard(script) {
  return `
    <div class="script-draft-card">
      <h3>${script.title}</h3>
      <p>${script.note}</p>
      <pre>${escapeHtml(script.body)}</pre>
    </div>
  `;
}

function skitSkeletonBeat(beat, index) {
  return `
    <div class="beat-row skit-beat-row">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div>
        <strong>${beat.title}</strong>
        <p>${beat.original}</p>
        <small>${beat.meaning}</small>
      </div>
    </div>
  `;
}

function skeletonBeat(beat, index) {
  return `
    <div class="beat-row">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div>
        <strong>${beat[0]}</strong>
        <p>${beat[1]}</p>
      </div>
    </div>
  `;
}

function slotMapRow(slot) {
  return `
    <div class="slot-map-row">
      <strong>${slot[0]}</strong>
      <p>${slot[1]}</p>
    </div>
  `;
}

function tiktokEmbed(item) {
  return `
    <blockquote
      class="tiktok-embed"
      cite="${item.url}"
      data-video-id="${item.videoId}"
      style="max-width: 420px; min-width: 280px;"
    >
      <section>
        <a target="_blank" rel="noreferrer" href="${item.url}">Watch ${item.creator} on TikTok</a>
      </section>
    </blockquote>
  `;
}

function localVideo(item) {
  return `
    <video class="local-video" controls preload="metadata" playsinline>
      <source src="${item.localVideo}" type="video/mp4">
    </video>
  `;
}

function detailRow(label, value) {
  const content = String(value || "").trim().startsWith("<")
    ? value
    : `<p>${value}</p>`;

  return `
    <div class="detail-row">
      <strong>${label}</strong>
      ${content}
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function refreshTikTokEmbed() {
  const oldScript = document.querySelector("#tiktok-embed-script");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.id = "tiktok-embed-script";
  script.async = true;
  script.src = "https://www.tiktok.com/embed.js";
  document.body.appendChild(script);
}

window.addEventListener("hashchange", route);
route();
