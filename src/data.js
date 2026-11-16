// ═══════════════════════════════════════════════════════════════
//  data.js — All personal content lives here.
//  Edit ONLY this file to customize everything on the page.
// ═══════════════════════════════════════════════════════════════

const DATA = {
  // ── Names & Nicknames ──────────────────────────────────────
  gifterName: "Mudassir",
  partnerName: "Shaista",
  nicknames: ["Saizzu", "Rooh-E-Mann", "Babu", "Jaan"],

  // ── Important Dates ────────────────────────────────────────
  // Format: "YYYY-MM-DD"
  relationshipStartDate: "2023-11-26", // When you became a couple
  specialDate: "2026-11-15", // The day this page is for
  milestoneDate: "2026-11-15", // Next big milestone
  milestoneText: "1 year to our milestone, Insha'Allah 💫",
  moonPhaseDate: "2023-11-26", // Date for moon phase visual
  moonPhaseLabel: "The night our story began",

  // ── Hero Section ───────────────────────────────────────────
  heroHeadline: "To The Love of My Life",
  heroName: "Shaista",
  heroSubtext:
    "Welcome to our little corner of the internet, my Shaista. Every scroll here is a small piece of my heart, built just to celebrate you and the magic you've brought into my life. Take your time, Rooh-E-Mann—this entire space is a reminder of how deeply loved and precious you are to me.",

  // ── Love Letter (Envelope Reveal) ──────────────────────────
  envelopeSealLetter: "M",
  loveLetter: `میری جان، میری شائستہ،

کبھی کبھی الفاظ اتنے چھوٹے پڑ جاتے ہیں کہ وہ یہ بیان کر سکیں کہ تم میرے لیے کیا ہو۔ تم صرف میری محبت نہیں ہو، تم میری روحِ من ہو—میری روح کا وہ حصہ جس کے بغیر میں خود کو ادھورا محسوس کرتا ہوں۔

میری زندگی میں تمہارا آنا کسی خوبصورت دعا کے قبول ہونے جیسا ہے۔ جب سے تم آئی ہو، ہر عام سا دن بھی خاص بن گیا ہے، اور ہر مشکل آسان لگنے لگی ہے۔ تمہاری ایک مسکراہٹ میری ساری تھکن مٹا دیتی ہے، اور تمہاری آواز سن کر دل کو ایک عجیب سا سکون ملتا ہے۔

پیاری سائزو، تم میرے لیے دنیا کی سب سے قیمتی چیز ہو—ایک ایسا خزانہ جسے میں اپنی ہر سانس کے ساتھ سنبھال کر رکھنا چاہتا ہوں۔ چاہے وقت کیسا بھی ہو، بابو، میرا ہر کل، میری ہر خوشی، اور میری ہر دعا صرف تم سے شروع ہوتی ہے اور تم پر ہی ختم ہوتی ہے۔

ہمیشہ میری رہنا، جان۔ میں تم سے بے انتہا محبت کرتا ہوں۔`,

  // ── Scratch Card ───────────────────────────────────────────
  scratchCard: {
    prompt: "Scratch to uncover a hidden memory",
    caption: "Our favourite moment together ✨",
    // Replace with your actual photo path in /public/photos/
    photo: "/photos/scratch-reveal.jpg",
  },

  // ── Envelope Photo ─────────────────────────────────────────
  envelopePhoto: "/photos/envelope-photo.jpg",

  // ── Relationship Timer Labels ──────────────────────────────
  timerTitle: "Every Second With You",
  timerSubtitle: "Since our hearts found their home — 26 November 2023",

  // ── Chat Stats (Our Story in Numbers) ──────────────────────
  chatStats: {
    totalMessages: "100,000+",
    dailyAverage: "400",
    whoTextsMore: { name: "Both equally", percent: "50/50" },
    busiestHours: "6 AM & 12 AM",
    mostUsedWord: "Hmmm",
    favoriteEmojis: ["❤️", "😂", "🌹", "🫂", "😘"],
    totalCalls: "500+",
    longestCall: "~2.5 hours",
    funStat: {
      label: '"Sona mat, baat karni hai!"',
      value: "450 / 500",
      note: "Whenever I plead 'don't sleep, I wanna talk' at night or morning... she knows it, yet still drifts straight into dreamland without listening 😴",
    },
  },

  // ── Reasons I Love You ─────────────────────────────────────
  reasons: [
    {
      icon: "🔄",
      title: "Always finding your way back to me",
      text: "No matter how intense our fights get or how upset we are, you always come back to my side—because what we have is always bigger than any argument.",
    },
    {
      icon: "🤝",
      title: "Standing beside me through the hardest days",
      text: "You never let go of my hand when life got heavy; staying strong with me in my toughest moments showed me what real loyalty looks like.",
    },
    {
      icon: "🌙",
      title: "Protecting me from wrong paths and sin",
      text: "The way you care for my soul and gently keep me away from going astray makes me want to become a better person every single day.",
    },
    {
      icon: "☮️",
      title: "The calm you bring to my chaos",
      text: "Just hearing your voice or seeing your smile takes away all my stress and makes my whole world feel peaceful again.",
    },
    {
      icon: "💖",
      title: "And honestly, I don't even need a reason",
      text: "Even without a single reason on this list, my heart would still choose you every time—simply because you are you, my Rooh-E-Mann.",
    },
  ],

  // ── Spin the Wheel ─────────────────────────────────────────
  wheelItems: [
    { label: "Surprise Food Delivery Treat", emoji: "🍕", color: "#E11D48" },
    { label: "Virtual Movie Night (You Pick!)", emoji: "🎬", color: "#7C3AED" },
    {
      label: "Late-Night Uninterrupted Video Call",
      emoji: "📞",
      color: "#0891B2",
    },
    { label: "Surprise Wishlist Gift", emoji: "🎁", color: "#059669" },
    { label: "Handwritten Love Letter", emoji: "💌", color: "#D97706" },
    { label: "Our Next Meet-Up Wish", emoji: "✈️", color: "#2563EB" },
    {
      label: "Whatever You Want (Golden Ticket)",
      emoji: "🎫",
      color: "#CA8A04",
    },
  ],
  wheelNote: "Whatever it lands on, I owe you. No respins. 💕",

  // ── Love Compatibility ─────────────────────────────────────
  compatPerson1: "Mudassir",
  compatPerson2: "Shaista",
  compatResult: 101,
  compatVerdict: "Eternal Soulmates 💫",

  // ── Soundtrack / Music Player ──────────────────────────────
  playlistTitle: "Songs That Remind Me of You",
  playlistSubtitle: "Every lyric, every beat — it's us",
  songs: [
    {
      title: "Haan Tu Hai",
      artist: "KK (Pritam)",
      reason:
        "Because every single lyric expresses exactly how deeply I feel for you, each and every day.",
      youtubeId: "V1fbOsHBlZE",
      color: "#E11D48",
    },
    {
      title: "Humdard",
      artist: "Arijit Singh (Mithoon)",
      reason:
        "Because this song captures just how rare, irreplaceable, and deeply special you are to my soul.",
      youtubeId: "FJ55SHCzt88",
      color: "#7C3AED",
    },
    {
      title: "Banjaara",
      artist: "Mohammed Irfan (Mithoon)",
      reason:
        "Because it reflects how completely my life changed for the better the moment you walked into it.",
      youtubeId: "0NFxcNheoLc",
      color: "#0891B2",
    },
    {
      title: "Tujhe Sochta Hoon",
      artist: "KK (Pritam)",
      reason:
        "Because not a single day passes without you on my mind, from the moment I wake up until I fall asleep.",
      youtubeId: "76bHXlozrZ4",
      color: "#D97706",
    },
    {
      title: "Mast Magan (from 2 States)",
      artist: "Arijit Singh & Chinmayi Sripada",
      reason:
        "Because every time I listen to this song—especially the part about coming to your city—it fills my heart with the longing to travel all the way to your city just to see you.",
      youtubeId: "fXRvluHnjxE",
      startTime: 178,
      color: "#BE185D",
    },
    {
      title: "Sitaare",
      artist: "Arijit Singh (White Noise Collectives)",
      reason:
        "Because it feels like our stars aligned the moment we met, turning every path I walk into a journey toward you.",
      youtubeId: "ANn4sxq0xT8",
      color: "#EAB308",
    },
    {
      title: "Dil Ibaadat",
      artist: "KK (Pritam)",
      reason:
        "Because you aren’t just someone I love—you are the quiet prayer my heart whispers every single day.",
      youtubeId: "U2QNhsAgIIE",
      color: "#E11D48",
    },
    {
      title: "Ye Tune Kya Kiya",
      artist: "Javed Bashir (Pritam)",
      reason:
        "Because I could win against the whole world, yet one glance from you made me surrender my heart completely.",
      youtubeId: "w9Qo6p4XsXE",
      color: "#9333EA",
    },
    {
      title: "I Love You",
      artist: "Ash King & Clinton Cerejo (Pritam)",
      reason:
        "Because loving you has quietly made me a better person, and every part of me just wants to say those three words to you.",
      youtubeId: "0JLRExeOH-k",
      color: "#F97316",
    },
    {
      title: "Tum Hi Ho",
      artist: "Arijit Singh (Mithoon)",
      reason:
        "Because you are my peace, my strength, and the reason every moment of my life feels complete.",
      youtubeId: "81qmmlsIE3k",
      color: "#DC2626",
    },
    {
      title: "Piya O Re Piya",
      artist: "Atif Aslam & Shreya Ghoshal",
      reason:
        "Because even when we are miles apart, it feels like our hearts have already bridged the distance between us.",
      youtubeId: "u-FaTNxrWhw",
      color: "#0284C7",
    },
    {
      title: "Tum Se Hi",
      artist: "Mohit Chauhan (Pritam)",
      reason:
        "Because my mornings begin with you, my evenings end with you, and every breath in between feels like life only because of you.",
      youtubeId: "mt9xg0mmt28",
      color: "#16A34A",
    },
    {
      title: "Tere Hawaale",
      artist: "Arijit Singh & Shilpa Rao (Pritam)",
      reason:
        "Because even when we aren’t physically together, you always feel right beside me—and I’ve surrendered my entire heart and soul to you.",
      youtubeId: "2CXSw1oPj3I",
      startTime: 220,
      color: "#0D9488",
    },
    {
      title: "Teri Jhuki Nazar",
      artist: "Shafqat Amanat Ali (Pritam)",
      reason:
        "Because even when you don’t say a word, one shy glance from you tells me everything my heart needs to hear.",
      youtubeId: "BgmVrguFO4o",
      color: "#DB2777",
    },
  ],

  // ── Photo Gallery ──────────────────────────────────────────
  galleryPhotos: [
    {
      src: "/photos/gallery/1.jpg",
      caption: "Where our story quietly started, even before we knew ✨",
    },
    {
      src: "/photos/gallery/2.jpg",
      caption: "Young, innocent, and already falling for you 💕",
    },
    {
      src: "/photos/gallery/3.jpg",
      caption: "Under a thousand lights, my eyes only saw you 🌟",
    },
    {
      src: "/photos/gallery/4.jpg",
      caption: "Your grace, your beauty, my whole world 🌹",
    },
    {
      src: "/photos/gallery/5.jpg",
      caption: "The smile that makes every single day worth living 😊",
    },
    {
      src: "/photos/gallery/6.jpg",
      caption: "The real laughs and the unfiltered joy only you bring me 😂💖",
    },
  ],

  // ── Closing Note ───────────────────────────────────────────
  closingNote:
    "You've reached the end of this little page, Saizzu, but our story is only just getting started. Every single day with you feels like a gift I never want to take for granted. Keep smiling that breathtaking smile, Babu—I'm always right here, loving you more than yesterday and less than tomorrow.",
  signOff: "All of me, forever yours",
  signName: "Mudassir",

  // ── Flower Burst Button ────────────────────────────────────
  flowerButtonText: "You deserve all the flowers today 🌸",
};

export default DATA;
