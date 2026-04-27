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
    reusableSkeleton: `Nobody believes I'm [age] anymore,
and I'm afraid to say it is from using [weird ingredient / product story].

That was my face just [timeframe] ago.

And this is all from using this one little [Korean product format],
where a main ingredient is [hero ingredient],
aka [plain explanation / weird source].

Also got [support ingredient],
and those ingredients [high-tech mechanism / skin-support reason].

Also got [hydration ingredient]
to help lock in hydration.

And if you know anything about [skin concern prevention],
you want to deeply hydrate those [fine lines / dry lines]
to help stop them from becoming [worse concern].

I've only been using this [timeframe],
and normally my skin is such a [specific dry / flat / dehydrated problem]
this time of year.

[Optional local / seasonal context].

But I've been walking around with [visible result language]
for the past [timeframe] now.

[Hero ingredient / product category] is insanely popular in Korea
for this reason.

People are paying [high price]
for [expensive / invasive version of same desire].

That's why this [product / category] quickly became
one of the fastest selling [category] products.

It just came out in [market / TikTok Shop],
and it's already [market proof if true].

I had to wait [scarcity proof],
but if you see the orange link,
I would grab this very fast while it's still available.`,
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
        visualSlots: [
          {
            label: "BDRN image",
            src: "assets/script-visuals/opening-01/bdrn.png",
            alt: "BDRN product story screenshot",
            caption: "Line match: using banana-based PDRN / BDRN product story."
          },
          {
            label: "Rub banana 1 / 2 / 3",
            caption: "One-line match: When I saw women in their 40s and 50s rubbing banana peels on their face and calling it nature's t0x, I was skeptical.",
            items: [
              {
                src: "assets/script-visuals/opening-01/rub-banana-1.png",
                alt: "Banana peel nature's t0x screenshot 1"
              },
              {
                src: "assets/script-visuals/opening-01/rub-banana-2.png",
                alt: "Banana peel nature's t0x screenshot 2"
              },
              {
                src: "assets/script-visuals/opening-01/rub-banana-3.png",
                alt: "Banana peel nature's t0x screenshot 3"
              }
            ]
          },
          {
            label: "Results 1 / 2 / 3",
            caption: "One-line match: But after seeing their amazing results, I literally could not believe my eyes.",
            items: [
              {
                src: "assets/script-visuals/opening-01/results-1.png",
                alt: "Banana peel result screenshot 1"
              },
              {
                src: "assets/script-visuals/opening-01/results-2.mp4",
                alt: "Banana peel result video 2"
              },
              {
                src: "assets/script-visuals/opening-01/results-3.png",
                alt: "Banana peel result screenshot 3"
              }
            ]
          },
          {
            label: "Plant-based PDRN",
            src: "assets/script-visuals/opening-01/plant-based-pdrn.png",
            alt: "Plant-based PDRN product explanation",
            caption: "Line match: plant-based PDRN, more gentle for sensitive skin girlies."
          },
          {
            label: "PDRN support",
            src: "assets/script-visuals/opening-01/pdrn.png",
            alt: "PDRN support screenshot",
            caption: "Line match: PDRN under eyes, smile lines, anywhere they want that plumpness back."
          },
          {
            label: "Support layer",
            src: "assets/script-visuals/opening-01/support.png",
            alt: "Skin ECM support layer diagram",
            caption: "Line match: supports your collagen scaffold, like the scaffolding beneath your skin."
          },
          {
            label: "Volufiline 1 / 2",
            caption: "Line match: This is what doctors and offices have used for years for boob enhancement and for the badonkadonk.",
            items: [
              {
                src: "assets/script-visuals/opening-01/volufiline-1.png",
                alt: "Volufiline ingredient proof screenshot 1"
              },
              {
                src: "assets/script-visuals/opening-01/volufiline-2.png",
                alt: "Volufiline ingredient proof screenshot 2"
              }
            ]
          }
        ],
        body: `Nobody believes I'm [age] anymore,
and I'm afraid to say it is from using banana-based PDRN.

That was my face just [timeframe] ago.

When I saw women in their 40s and 50s
rubbing banana peels on their face
and calling it nature's t0x,
I was skeptical.

But after seeing their amazing results,
I literally could not believe my eyes.

Now Koreans already made banana plus PDRN
into BDRN.

And if you know PDRN,
you already know people use this stuff under their eyes,
on smile lines,
anywhere they want that plumpness back.

But this one is plant-based,
and more gentle for my sensitive skin girlies.

It also supports your collagen scaffold,
basically like the scaffolding beneath your skin.

That scaffolding degrades as we age,
which is why we start seeing hollowing under the eyes,
fine lines,
some loose,
saggy-looking skin.

It also has Volufiline.

This is what doctors and offices have used for years
for boob enhancement
and for the badonkadonk.

I've only been using this for [timeframe],

and normally my skin looks dry,
flat,
and tired this time of year.

But I've been walking around with glassy,
glowy skin
for the past [timeframe].

BDRN is already getting crazy attention in Korea.

It just came out on TikTok Shop.

If you want to get that plump,
glowy skin,

you should definitely start using this stuff.

I'll leave a link on the bottom left with the orange cart.

Just act fast because I don't know how long it's gonna stay available.`
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
    reusableSkeleton: `My [face area] before I booked an appointment.

[Same face area] after I still did not book an appointment.

I saw a [trusted expert] say that this [product type] was literally going to [strong proof claim].

I could not have bought it quick enough.

It put [hero ingredient / technology] in this similar technology that they use when you go in office to [benefit 1], [benefit 2], [benefit 3].

But it also supports [skin support system],
which is basically like [simple metaphor] underneath our skin to [plain job].

And this degrades as we age,
which is why we can see [visible problem 1], [visible problem 2], and [visible problem 3].

In Korea, they heard there's a massive wave of women who don't want to get [treatment] done to their face.

So they put [key ingredient] in this.

The [ingredient] actually works [where / how],
to give a [visible appearance].

So the skin on top [visible effect].

So we're not [extreme treatment claim],
we are just [softer believable claim].

Take it from someone who has used this for [timeframe],
it freaking works.

Basically, [brand] just took my [long routine / annoying routine].

And said, we're gonna give you [professional benefit] in one [product format].

But we're gonna make it [price / access advantage].

And we're just gonna pray to god that it doesn't sell out.

This is their newest release.

If it's even still in stock, I'm gonna put the link right there.

But if you don't see that orange shopping cart,
it just means it was sold out.`,
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
        visualSlots: [
          {
            label: "Forehead / smile line",
            caption: "Line match: My [face area] before I booked an appointment. [Same face area] after I still did not book an appointment.",
            items: [
              {
                src: "assets/script-visuals/opening-02/forehead.png",
                alt: "Forehead line reference"
              },
              {
                src: "assets/script-visuals/opening-02/smile-line.avif",
                alt: "Smile line reference"
              }
            ]
          },
          {
            label: "BDRN image",
            src: "assets/script-visuals/opening-02/bdrn.png",
            alt: "BDRN product story screenshot",
            caption: "Line match: BDRN, aka banana-based plant PDRN, in this little Korean ampoule."
          },
          {
            label: "Banana proof",
            caption: "Line match: banana peels are already helping women in their 40s and 50s get amazing results.",
            items: [
              {
                src: "assets/script-visuals/opening-02/rub-banana-1.png",
                alt: "Banana peel proof screenshot 1"
              },
              {
                src: "assets/script-visuals/opening-02/rub-banana-2.png",
                alt: "Banana peel proof screenshot 2"
              },
              {
                src: "assets/script-visuals/opening-02/rub-banana-3.png",
                alt: "Banana peel proof screenshot 3"
              },
              {
                src: "assets/script-visuals/opening-02/results-1.png",
                alt: "Banana peel result screenshot 1"
              },
              {
                src: "assets/script-visuals/opening-02/results-2.mp4",
                alt: "Banana peel result video 2"
              },
              {
                src: "assets/script-visuals/opening-02/results-3.png",
                alt: "Banana peel result screenshot 3"
              }
            ]
          },
          {
            label: "PDRN proof",
            caption: "Line match: PDRN is the kind of thing people go get in office when they want collagen, elasticity, density.",
            items: [
              {
                src: "assets/script-visuals/opening-02/pdrn.png",
                alt: "PDRN explanation screenshot"
              },
              {
                src: "assets/script-visuals/opening-02/pdrn-before-after.png",
                alt: "PDRN before after screenshot"
              }
            ]
          },
          {
            label: "Volufiline 1 / 2",
            caption: "Line match: This is what people used to talk about for boob enhancement.",
            items: [
              {
                src: "assets/script-visuals/opening-02/volufiline-1.png",
                alt: "Volufiline ingredient proof screenshot 1"
              },
              {
                src: "assets/script-visuals/opening-02/volufiline-2.png",
                alt: "Volufiline ingredient proof screenshot 2"
              }
            ]
          },
          {
            label: "Aging face 1 / 2",
            caption: "Line match: as we get older, skin just does not hold the same as before.",
            items: [
              {
                src: "assets/script-visuals/opening-02/aging-face-1.webp",
                alt: "Aging face reference 1"
              },
              {
                src: "assets/script-visuals/opening-02/aging-face-2.png",
                alt: "Aging face reference 2"
              }
            ]
          }
        ],
        body: `My [face area] before I booked an appointment.

[Same face area] after I still did not book an appointment.

I saw a [credible person] say this Korean ampoule
was literally going to put her out of business.

I could not have bought it quick enough.

It put BDRN,
aka banana-based plant PDRN,
in this little Korean ampoule.

And banana peels are already helping women in their 40s and 50s
get amazing results.

And PDRN is the kind of thing people go get in office
when they want collagen here,
elasticity here,
density here.

And then they added Volufiline.

This is what people used to talk about
for boob enhancement.

As we get older,
skin just does not hold the same as before.

Which is why we can see some loose,
saggy-looking skin.

In Korea,
they heard there's a massive wave of women
who don't want to get this done to their face.

So MUMUKI basically put all the good stuff
into this one little ampoule.

So the skin on top looks smoother
and more plump.

So we're not doing t0x.

We're not freezing the face.

Take it from someone whose routine was all over the place,
this is the thing I wish I had earlier.

MUMUKI took my messy anti-aging routine
and put the glass-skin part into one ampoule.

But we're gonna make it so freaking affordable,
and way easier to try.

This just came out on TikTok Shop.

I'll do you a favor,
I'm gonna put the link right there.

But if you don't see the orange cart,
it probably means it sold out.`
      }
    ]
  },
  {
    id: "opening-03",
    title: "You got wrinkles on your forehead",
    count: "1 script",
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
    reusableSkeleton: `You got [visible problem] on your [face area] like this.

Put this [product format] all over your [problem / same area].

You got [second visible problem] right here.

[Product format] all over your [second area].

If you got [expression-line problem] like this when you [facial expression],
put the [product format] right near your [third area].

I've been using [product],
and it made my skin [visible result] like crazy.

Like this is the best my skin has looked in [timeframe].

This is the first [product type] to have [category reason].

It has [ingredient 1] and [ingredient 2]
that keeps the skin [simple hydration / skin feel].

It makes it [texture result] like this.

All kinds of [supporting proof] in here.

And this stuff is [ingredient trust proof].

No [bad ingredient / objection].
There's no BS inside of here.

It's a bunch of [simple ingredient trust]
that go straight into the skin to make it look [desired result].

If you want to get that [desired skin look],
you should definitely start using this stuff.

I'll leave a link on the bottom left with the orange cart.

Just act fast because [urgency / scarcity reason].`,
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
        title: "Script 2: Banana Peel / Glow Like Crazy",
        note: "Use finger comparison screenshots when saying “this, this, and this.”",
        visualSlots: [
          "Forehead / smile-line / eye banana-rub frames",
          "40s / 50s banana peel result proof",
          "Volufiline finger comparison",
          "Ampoule + glow result frame"
        ],
        body: `You got wrinkles on your forehead like this?

Rub banana here.

You got smile lines like this?

Rub banana here.

If your eyes get crinkly when you smile,

rub banana here.

I was skeptical when I saw women in their 40s and 50s
calling banana peel nature's t0x.

But after seeing their results,
I could not believe my eyes.

That's when I found BDRN by MUMUKI.

Basically banana PDRN,

but plant-based.

So I like it better for my sensitive skin.

And people are already putting PDRN
under their eyes,
on smile lines,

anywhere they want that plumpness back.

And then they added Volufiline.

That's the stuff that made people's fingers look like this,
this,
and this.

People used to talk about it
for boob enhancement.

I've been using this ampoule,

and it made my skin glow like crazy.

Like this is the best my skin has looked in my entire life.

If you want that plump,
glowy skin,

this is the stuff I would start using.

I'll leave the link on the bottom left with the orange cart.

Just act fast,
because this just came out on TikTok Shop
and I don't know how long it's gonna stay available.`,
        visuals: [
          {
            src: "assets/proof/volufiline-finger-proof.png",
            alt: "Volufiline finger comparison screenshot",
            caption: "Visual note: show finger comparison screenshots when saying “this, this, and this.”"
          }
        ]
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
    reusableSkeleton: `Wanna put it here, here, here, here, here, here, and even here.

Anywhere that you're noticing [target problem 1] and [target problem 2].

We're not using this [all over the face / like a random moisturizer]
because this has [weird / strong ingredient reason].

In we have [hero ingredient] to help with [main benefit],

[ingredient 2] to help [benefit 2],

[ingredient 3] for [benefit 3],

[ingredient 4] for [benefit 4],

and [ingredient 5] and [ingredient 6] for [benefit 5].

If you really want to knock it out of the park,

start with [companion product / second step].

These [companion product] were sold out,

so if you see those below,

I would definitely grab this as the bundle.`,
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
        visualSlots: [
          "Here / here face-map screenshot",
          "Banana peel nature's t0x proof",
          "Volufiline finger comparison",
          "Ampoule on target areas"
        ],
        body: `You wanna rub it here,
here,
here,
here,
here,
here,
and even here.

Anywhere you're noticing volume loss,
fine lines,
saggy skin,
all of that.

When I saw women in their 40s and 50s
rubbing banana peels on their face
and calling it nature's t0x,

I was a little skeptical.

But after seeing the amazing results,
I could not believe my eyes.

And Koreans already made this into BDRN.

Basically banana-based PDRN,

but plant-based.

Compared to animal-based PDRN,

I like it better for my sensitive skin.

People are already putting PDRN
under their eyes,
on smile lines,

anywhere they want that plumpness back.

Plus they added Volufiline.

That's the stuff that made people's fingers look like this,
this,
and this.

People used to talk about it
for boob enhancement.

And as we get older,

skin just does not hold the same as before.

That is why the face starts looking
loose,
and tired.

This is for that support layer under the skin,

so the skin on top looks smoother
and more plump.

So we're not doing t0x.

We're not freezing the face.

If you want that plump,
glowy skin,

this is the stuff I would start using.

I'll leave the link down below.

If you see the orange cart,

grab it while it's still available.`,
        visuals: [
          {
            src: "assets/proof/volufiline-finger-proof.png",
            alt: "Volufiline finger comparison screenshot",
            caption: "Visual note: show finger comparison screenshots when saying “this, this, and this.”"
          }
        ]
      }
    ]
  }
];

const bananaPeelScienceDemoScript = {
  id: "banana-peel-bdrn",
  title: "Banana Peel BDRN Science Demo",
  count: "1 script",
  note: "Why banana works → Korea upgraded it → MUMUKI ampoule.",
  body: `Why is everyone rubbing banana peel on their face,
saying it makes their skin look so much tighter?

When I first saw it,
I was a little skeptical.

But after seeing women in their 40s and 50s
get results like this,
this,
and this,

I literally could not believe my eyes.

Why does it work so well?

My ADHD brain was curious,
so I did some research.

Turns out banana peel has antioxidants in it.

That is why people use it for
dull-looking skin,
dry lines,
and texture.

And Koreans already knew this, of course.

Korean skincare,
always living in the future,

made banana-derived PDRN.

So we do not need to rub a whole banana
on our face anymore.

This is MUMUKI BDRN ampoule.

BDRN is basically the next version of PDRN,

but plant-based.

So I like it better for my sensitive skin girlies.

And if you know PDRN,

you already know people use this stuff
under their eyes,
on smile lines,
on the forehead,

anywhere they want that plumpness back.

As we get older,

skin just does not hold the same as before.

That is why the face starts looking
flat,
loose,
and tired.

This has all the good stuff for that plump,
glowy skin.

BDRN,
collagen,
Volufiline,
and 10-layer hyaluronic acid.

Look at this texture.

It feels sticky at first,

but it melts into the skin
and absorbs fast.

Super super gentle for sensitive skin.

This just came out on TikTok Shop,

and I already know people are going to sell it out.

If you still see the orange cart,

I would grab it while you can.`,
  visualMatch: [
    {
      script: `Why is everyone rubbing banana peel on their face,
saying it makes their skin look so much tighter?`,
      visual: "3 banana peel clips across the top of the screen. Talking head stays underneath."
    },
    {
      script: `When I first saw it,
I was a little skeptical.`,
      visual: "Talking head. Optional skeptical face / quick glance at the banana clips."
    },
    {
      script: `But after seeing women in their 40s and 50s
get results like this,
this,
and this,`,
      visual: "Show results 1 / results 2 / results 3. Each 'this' gets one result visual."
    },
    {
      script: "I literally could not believe my eyes.",
      visual: "Talking head reaction. Keep the results still visible or cut back to face."
    },
    {
      script: `Why does it work so well?

My ADHD brain was curious,
so I did some research.`,
      visual: "Creator talking head + quick search / screenshot setup."
    },
    {
      script: `Turns out banana peel has antioxidants in it.

That is why people use it for
dull-looking skin,
dry lines,
and texture.`,
      visual: "Readable source card. Highlight antioxidants and the benefit words. Do not use tiny article text."
    },
    {
      script: `And Koreans already knew this, of course.

Korean skincare,
always living in the future,

made banana-derived PDRN.`,
      visual: "Transition from banana peel visual to BDRN / product visual."
    },
    {
      script: `So we do not need to rub a whole banana
on our face anymore.

This is MUMUKI BDRN ampoule.`,
      visual: "Move banana away. Bring MUMUKI ampoule into frame."
    },
    {
      script: `BDRN is basically the next version of PDRN,

but plant-based.

So I like it better for my sensitive skin girlies.`,
      visual: "Plant-based PDRN card or BDRN product explanation screenshot."
    },
    {
      script: `And if you know PDRN,

you already know people use this stuff
under their eyes,
on smile lines,
on the forehead,

anywhere they want that plumpness back.`,
      visual: "Point to under eyes, smile lines, forehead. Optional PDRN proof card."
    },
    {
      script: `As we get older,

skin just does not hold the same as before.

That is why the face starts looking
flat,
loose,
and tired.`,
      visual: "Aging / flat face visual. Keep it cropped close enough for mobile."
    },
    {
      script: `This has all the good stuff for that plump,
glowy skin.

BDRN,
collagen,
Volufiline,
and 10-layer hyaluronic acid.`,
      visual: "Ingredient card or product close-up. Keep text simple: BDRN / collagen / Volufiline / 10-layer HA."
    },
    {
      script: `Look at this texture.

It feels sticky at first,

but it melts into the skin
and absorbs fast.`,
      visual: "Texture close-up. Show stretch / sticky texture, then rub in and melt."
    },
    {
      script: "Super super gentle for sensitive skin.",
      visual: "Face application or glow finish. No heavy text needed."
    },
    {
      script: `This just came out on TikTok Shop,

and I already know people are going to sell it out.

If you still see the orange cart,

I would grab it while you can.`,
      visual: "Product page / orange cart / final glow frame."
    }
  ],
  mustFollow: [
    "First 4 seconds need motion. Use banana peel clips, not only talking head.",
    "Results visuals must be big enough to read on mobile.",
    "Do not explain BDRN before the banana trend is clear.",
    "Product reveal should happen right after the banana-to-BDRN bridge.",
    "Texture must be shown when saying 'Look at this texture.'",
    "Do not say it replaces Botox, filler, injections, or medical treatments."
  ]
};

const scriptIdeaSections = [
  {
    title: "Skit",
    count: "1 skeleton",
    href: "#/script-idea/skit",
    note: "Two-person setup. Old solution fails. Product reveal gives proof."
  },
  {
    title: "Banana Peel BDRN Demo",
    count: bananaPeelScienceDemoScript.count,
    href: `#/script-idea/${bananaPeelScienceDemoScript.id}`,
    note: bananaPeelScienceDemoScript.note
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
  } else if (path === `/script-idea/${bananaPeelScienceDemoScript.id}`) {
    renderBananaPeelScienceDemoScriptIdea();
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
          Skit, 4 opening systems, and the banana peel BDRN demo.
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

          ${item.reusableSkeleton ? `
            <section class="script-section">
              <div class="section-head">
                <p class="eyebrow">Reusable skeleton</p>
              </div>
              <div class="script-draft-card skeleton-template-card">
                <pre>${escapeHtml(item.reusableSkeleton)}</pre>
              </div>
            </section>
          ` : ""}

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

function renderBananaPeelScienceDemoScriptIdea() {
  const item = bananaPeelScienceDemoScript;

  app.innerHTML = `
    <section class="page script-page script-detail-page">
      <a class="back-link" href="#/script-idea">← Back to Script Idea</a>
      <div class="page-header">
        <div>
          <p class="eyebrow">New Script</p>
          <h1>${item.title}</h1>
        </div>
        <p class="small-note">${item.note}</p>
      </div>

      <article class="standalone-script-card">
        <section class="script-section">
          <div class="section-head">
            <p class="eyebrow">Full script</p>
            <strong>word by word</strong>
          </div>
          <div class="script-draft-card">
            <pre>${escapeHtml(item.body)}</pre>
          </div>
        </section>

        <section class="script-section">
          <div class="section-head">
            <p class="eyebrow">Script + on-screen visuals</p>
            <strong>line match</strong>
          </div>
          <div class="visual-match-table">
            <div class="visual-match-head">
              <span>Script</span>
              <span>On-screen visuals</span>
            </div>
            ${item.visualMatch.map((row) => visualMatchRow(row)).join("")}
          </div>
        </section>

        <section class="script-section">
          <div class="section-head">
            <p class="eyebrow">Must follow</p>
            <strong>shooting rules</strong>
          </div>
          <ul class="must-follow-list">
            ${item.mustFollow.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}
          </ul>
        </section>
      </article>
    </section>
  `;
}

function visualMatchRow(row) {
  return `
    <div class="visual-match-row">
      <pre>${escapeHtml(row.script)}</pre>
      <p>${escapeHtml(row.visual)}</p>
    </div>
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
      ${scriptVisualBoard(script)}
    </div>
  `;
}

function scriptVisualBoard(script) {
  const visuals = script.visuals || [];
  const slots = script.visualSlots || [
    "Hook frame",
    "Proof screenshot",
    "Product / texture frame",
    "Result / CTA frame"
  ];

  return `
    <div class="script-visual-board">
      <div class="script-visual-head">
        <p class="eyebrow">Visual board</p>
        <strong>Script-specific screenshots / proof frames</strong>
      </div>
      <div class="script-visual-list">
        ${slots.map((slot) => scriptVisualSlot(slot)).join("")}
        ${visuals.map((visual) => scriptVisualCard(visual)).join("")}
      </div>
    </div>
  `;
}

function scriptVisualSlot(slot) {
  if (typeof slot === "object" && slot.items) {
    return scriptVisualGroup(slot);
  }

  if (typeof slot === "object" && slot.src) {
    return scriptVisualCard(slot);
  }

  const label = typeof slot === "object" ? slot.label : slot;

  return `
    <div class="script-visual-slot">
      <span>Drop image here</span>
      <strong>${escapeHtml(label)}</strong>
    </div>
  `;
}

function scriptVisualGroup(group) {
  return `
    <figure class="script-visual-card script-visual-group-card">
      ${group.label ? `<span>${escapeHtml(group.label)}</span>` : ""}
      <div class="script-visual-group">
        ${group.items.map((visual) => scriptVisualMedia(visual)).join("")}
      </div>
      <figcaption>${escapeHtml(group.caption)}</figcaption>
    </figure>
  `;
}

function scriptVisualCard(visual) {
  return `
    <figure class="script-visual-card">
      ${visual.label ? `<span>${escapeHtml(visual.label)}</span>` : ""}
      ${scriptVisualMedia(visual)}
      <figcaption>${escapeHtml(visual.caption)}</figcaption>
    </figure>
  `;
}

function scriptVisualMedia(visual) {
  const isVideo = visual.type === "video" || /\.(mp4|mov|webm)$/i.test(visual.src);

  return isVideo
    ? `<video src="${visual.src}" controls muted playsinline></video>`
    : `<img src="${visual.src}" alt="${escapeHtml(visual.alt)}">`;
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
