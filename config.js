/*
  แก้ไขข้อมูลเว็บไซต์ส่วนใหญ่ได้จากไฟล์นี้
  รูปภาพแนะนำให้ใส่ในโฟลเดอร์ images แล้วเขียน path เช่น "images/photo1.jpg"
*/

const SITE_CONFIG = {
  intro: {
    title: "สุขสันต์วันเกิดนะ บีบี๋ 💜",
    text: "นี่คือจักรวาลเล็ก ๆ นี้ไว้ให้นักสำรวจนินา "
  },

  hero: {
    title: "สุขสันต์วันเกิดคับ",
    subtitle: "ขอบคุณที่เข้ามาเป็นดาวดวงโปรดในจักรวาลของฉัน ขอให้ปีนี้เต็มไปด้วยความสุข รอยยิ้ม และเรื่องดี ๆ"
  },

  timeline: [
    {
      date: "วันแรกที่เราได้รู้จักกัน",
      title: "ดาวดวงแรกของเรา",
      text: "แก้ข้อความนี้เป็นเรื่องราววันแรกที่คุณกับแฟนได้รู้จักกัน"
    },
    {
      date: "ช่วงเวลาที่ประทับใจ",
      title: "การเดินทางที่อยากจำ",
      text: "ใส่เหตุการณ์สำคัญ เช่น เดตแรก ทริปแรก หรือวันที่หัวเราะด้วยกันมากที่สุด"
    },
    {
      date: "วันนี้",
      title: "อีกหนึ่งปีที่มีเธอ",
      text: "และฉันหวังว่าจะได้สร้างความทรงจำใหม่ ๆ ไปด้วยกันอีกเยอะเลย"
    }
  ],

  quiz: [
    {
      question: "เราเจอกันครั้งแรกที่ไหน?",
      options: ["ร้านกาแฟ", "ที่ทำงาน", "มหาวิทยาลัย", "ในเกม"],
      answer: 1
    },
    {
      question: "อาหารที่เราชอบกินด้วยกันมากที่สุดคืออะไร?",
      options: ["ชาบู", "พิซซ่า", "ส้มตำ", "ซูชิ"],
      answer: 0
    },
    {
      question: "สิ่งที่ฉันชอบที่สุดเกี่ยวกับเธอคืออะไร?",
      options: ["รอยยิ้ม", "ความใจดี", "ความตลก", "ทุกข้อ"],
      answer: 3
    }
  ],

  memorySymbols: ["🌙", "🪐", "🚀", "💜", "⭐", "🌌"],

  photoQuiz: {
    image: "images/photo-quiz.svg",
    question: "ภาพนี้คือความทรงจำจากเหตุการณ์ไหน?",
    options: ["เดตแรกของเรา", "ทริปแรก", "วันเกิดปีที่แล้ว", "วันที่ฝนตกด้วยกัน"],
    answer: 1
  },

  gallery: [
    { image: "memory-1.jpg", caption: "ภาพความทรงจำที่ 1" },
    { image: "images/memory-2.svg", caption: "ภาพความทรงจำที่ 2" },
    { image: "images/memory-3.svg", caption: "ภาพความทรงจำที่ 3" },
    { image: "images/memory-4.svg", caption: "ภาพความทรงจำที่ 4" },
    { image: "images/memory-5.svg", caption: "ภาพความทรงจำที่ 5" },
    { image: "images/memory-6.svg", caption: "ภาพความทรงจำที่ 6" }
  ],


  music: [
    { title: "เพลงของเรา 1", artist: "Our Memory", cover: "memory-1.jpg", file: "music/song1.wav", preview: 30 },
    { title: "เพลงของเรา 2", artist: "Moonlight Date", cover: "images/memory-2.svg", file: "music/song2.wav", preview: 30 },
    { title: "เพลงของเรา 3", artist: "First Journey", cover: "images/memory-3.svg", file: "music/song3.wav", preview: 30 },
    { title: "เพลงของเรา 4", artist: "Starlight Drive", cover: "images/memory-4.svg", file: "music/song4.wav", preview: 30 },
    { title: "เพลงของเรา 5", artist: "Dancing Galaxy", cover: "images/memory-5.svg", file: "music/song5.wav", preview: 30 },
    { title: "เพลงของเรา 6", artist: "Wish Upon a Star", cover: "images/memory-6.svg", file: "music/song6.wav", preview: 30 },
    { title: "เพลงสุดท้ายของเรา", artist: "Forever With You", cover: "images/photo-quiz.svg", file: "music/song7.wav", preview: 30 }
  ],

  specialRecord: {
    title: "เพลงลับของเรา",
    artist: "Secret Star",
    cover: "images/photo-quiz.svg",
    file: "music/secret-song.wav",
    preview: 30
  },

  secret: {
    heading: "Happy Birthday, My Favorite Person ✨",
    body: `ขอให้วันเกิดปีนี้เป็นจุดเริ่มต้นของปีที่ดีที่สุด
ขอให้เธอมีความสุขในทุกวัน ได้ทำในสิ่งที่รัก
และไม่ว่าจะเดินทางไปไกลแค่ไหน ขอให้รู้ไว้ว่ายังมีฉันอยู่ข้าง ๆ เสมอ

รักเธอมากกว่าดวงดาวทั้งหมดในจักรวาล`,
    signature: "จากคนที่รักเธอที่สุด 💜"
  }
};
