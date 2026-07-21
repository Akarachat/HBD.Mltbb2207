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
    subtitle: "ขอบคุณที่เข้ามาเป็นดาวดวงโปรดในจักรวาล ขอให้ปีนี้เต็มไปด้วยความสุข รอยยิ้ม และเรื่องดี ๆ"
  },

  timeline: [
    {
      date: "วันแรกที่เราได้รู้จักกัน",
      title: "ดาวดวงแรกของเรา",
      text: "บี๋เอาตุ๊กตาแกะมาให้ ตกใจ และเซอร์ไพรส์มาก โดนตกเลย"
    },
    {
      date: "ช่วงเวลาที่ประทับใจ",
      title: "การเดินทางที่อยากจำ",
      text: "ไปเดทด้วยกันเป็นที่แรก เขินมาก ตอนนั้นเกร็ง แต่ว่าเนียนทำทรง 555"
    },
    {
      date: "วันนี้",
      title: "อีกหนึ่งปีที่บี๋โตขึ้น",
      text: "หวังว่าจะได้สร้างความทรงจำใหม่ ๆ ไปด้วยกันอีกเยอะๆเลย"
    }
  ],

  quiz: [
    {
      question: "เราเจอกันครั้งแรกที่ไหน?",
      options: ["เกาะล้าน", "เซเว่น", "บีเอ็นที", "ในฝัน"],
      answer: 1
    },
    {
      question: "ศิลปินคนโปรดของบีบี๋ ในช่วงแรก?",
      options: ["Taylor Swift", "พี่ฟลุ๊ค", "Sabrina", "ไหมไทย"],
      answer: 0
    },
    {
      question: "สิ่งที่พี่ฟลุ๊คชอบที่สุดเกี่ยวกับนินาคืออะไร?",
      options: ["รอยยิ้ม", "ความใจดี", "ความตลก", "ทุกข้อ"],
      answer: 3
    }
  ],

  memorySymbols: ["🌙", "🪐", "🚀", "💜", "⭐", "🌌"],

  photoQuiz: {
    image: "images/photo-quiz.svg",
    question: "ภาพนี้คือความทรงจำจากเหตุการณ์ไหน?",
    options: ["ด๊อบบี้แมวปีศาจ", "อ่างแก้ว", "วันเกิดปีที่แล้ว", "วันที่ตากฝนด้วยกัน"],
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
    { title: "เพลงที่ 1", artist: "Movie", cover: "mvcv.jpg", file: "music/song1.wav", preview: 30 },
    { title: "เพลงที่ 2", artist: "Dance With Me", cover: "bbcv.jpg", file: "music/song2.wav", preview: 30 },
    { title: "เพลงที่ 3", artist: "ชายหน้ามึน", cover: "atcv.jpg", file: "music/song3.wav", preview: 30 },
    { title: "เพลงที่ 4", artist: "Don't Smile", cover: "sbcv.jpg", file: "music/song4.wav", preview: 30 },
    { title: "เพลงที่ 5", artist: "u + me = <3", cover: "olcv.jpg", file: "music/song5.wav", preview: 30 },
    { title: "เพลงที่ 6", artist: "Style", cover: "tscv.jpg", file: "music/song6.wav", preview: 30 },
    { title: "เพลงสุดท้าย", artist: "Sunset With you", cover: "swcv.jpg, file: "music/song7.wav", preview: 30 }
  ],

  specialRecord: {
    title: "อีกแล้ว",
    artist: "Secret Song",
    cover: "againcv.jpg",
    file: "music/secret-song.wav",
    preview: 30
  },

  secret: {
    heading: "Happy Birthday คับเบบี๋, My Favorite Person ✨",
    body: `ขอให้วันเกิดปีนี้เป็นจุดเริ่มต้นของปีที่ดีที่สุด
ขอให้บี๋มีความสุขในทุกวัน ได้ทำในสิ่งที่รัก
และไม่ว่าจะเดินทางไปไกลแค่ไหน พี่ฟลุ๊คจะอยู่ข้าง ๆ เสมอ

รักบี๋มากกว่าดวงดาวทั้งหมดในจักรวาลลล`,
    signature: "- P'Fluke 💜"
  }
};
