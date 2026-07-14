# Galaxy Birthday Website

เว็บไซต์วันเกิด Theme Galaxy แบบแผนที่กาแล็กซี พร้อมมินิเกม 3 แบบ

- เกมตอบคำถาม
- เกมจับคู่
- เกมทายภาพ
- Gallery รูปความทรงจำ
- ข้อความลับหลังทำภารกิจครบ
- Responsive ใช้ได้ทั้งมือถือและคอมพิวเตอร์

## วิธีแก้ไข

### 1. แก้ข้อความ คำถาม และคำตอบ
เปิดไฟล์ `config.js`

จุดสำคัญ:
- `intro` ข้อความหน้าแรก
- `hero` หัวข้อหลัก
- `timeline` เรื่องราวของเรา
- `quiz` คำถามตอบคำถาม
- `photoQuiz` เกมทายภาพ
- `gallery` รูปใน Gallery
- `secret` ข้อความสุดท้าย

คำตอบของ Quiz ใช้เลข index เริ่มจาก 0

ตัวอย่าง:
```js
options: ["A", "B", "C", "D"],
answer: 1
```
หมายถึงคำตอบที่ถูกคือ B

### 2. เปลี่ยนรูป
นำรูปไปใส่ในโฟลเดอร์ `images`

ตัวอย่างชื่อ:
- `photo1.jpg`
- `photo2.png`

แล้วแก้ใน `config.js`

```js
{ image: "images/photo1.jpg", caption: "วันแรกของเรา" }
```

## วิธีเปิดดูในเครื่อง

ดับเบิลคลิกไฟล์ `index.html`

## วิธีอัปขึ้น GitHub Pages

1. สร้าง Repository ใหม่ใน GitHub
2. อัปโหลดไฟล์ทั้งหมด โดยต้องมี `index.html` อยู่หน้าสุด
3. เข้า `Settings`
4. เลือก `Pages`
5. Source เลือก `Deploy from a branch`
6. Branch เลือก `main` และโฟลเดอร์ `/root`
7. กด Save
8. รอสักครู่ GitHub จะแสดงลิงก์เว็บไซต์

## โครงสร้างไฟล์

```text
galaxy-birthday-website/
├─ index.html
├─ style.css
├─ script.js
├─ config.js
├─ README.md
└─ images/
   ├─ memory-1.svg
   ├─ memory-2.svg
   ├─ ...
   └─ photo-quiz.svg
```


## ระบบสำรวจดาว

หน้าแรกเป็นแผนที่กาแล็กซี คลิกดาวภารกิจเพื่อซูมเข้า เมื่อกด `กลับสู่กาแล็กซี` ระบบจะซูมกลับมาที่ภาพรวมโดยอัตโนมัติ


## เพิ่ม Section เพลง (Music Galaxy)

แนะนำเพิ่ม Section ใหม่ชื่อ **Music Galaxy** ระหว่าง Gallery และ Finale

ฟีเจอร์:
- แสดงแผ่นเสียง 7 แผ่น
- คลิกแผ่นเสียงเพื่อเล่นเพลง
- แผ่นเสียงหมุนระหว่างเล่น
- เล่นตัวอย่างเพลงประมาณ 30 วินาที
- เล่นได้ทีละเพลง (เพลงใหม่จะหยุดเพลงเก่า)
- มี Progress Bar และเวลา
- มีเอฟเฟกต์ Equalizer
- เปลี่ยนปกอัลบั้มได้เอง
- เปลี่ยนไฟล์เพลงได้เองในโฟลเดอร์ /music

โครงสร้างไฟล์

music/
 ├─ song1.mp3
 ├─ song2.mp3
 ├─ song3.mp3
 ├─ song4.mp3
 ├─ song5.mp3
 ├─ song6.mp3
 └─ song7.mp3

config.js

music:[
 {title:"เพลงของเรา 1",artist:"Artist",cover:"images/cover1.jpg",file:"music/song1.mp3",preview:30},
 ...
]

UX เพิ่มเติม
- ถ้าเพลงเล่นครบ 30 วิ จะค่อยๆ Fade out 2 วินาที
- Hover แผ่นเสียงจะมีแสงสีม่วง
- ตอนเล่นจะมีเข็มแผ่นเสียงเลื่อนลงอัตโนมัติ
- มีข้อความ "Now Playing"


## ระบบ Music Galaxy ใช้งานจริง

เว็บไซต์มีแผ่นเสียง 7 แผ่นและไฟล์เสียงตัวอย่างในโฟลเดอร์ `music`

แก้ชื่อเพลง ศิลปิน ปก และไฟล์ได้ใน `config.js`

```js
music: [
  {
    title: "ชื่อเพลง",
    artist: "ชื่อศิลปิน",
    cover: "images/cover.jpg",
    file: "music/song.mp3",
    preview: 30
  }
]
```

สามารถนำไฟล์ MP3 ของคุณมาใส่แทนไฟล์ตัวอย่างได้ แล้วแก้ค่า `file` ให้ตรงกับชื่อไฟล์

ข้อควรระวัง: ใช้เพลงที่คุณมีสิทธิ์นำมาเผยแพร่บนเว็บไซต์

## Grand Adventure V7

- NPC แนะนำเนื้อเรื่อง 4 ตัว
- ดาว Final Planet ที่ปลดล็อกเมื่อผ่านภารกิจครบ 3 ดวง
- กล้อง Warp พร้อม Particle และเสียงเอฟเฟกต์ที่สร้างด้วย Web Audio
- ดาวและชั้นเมฆหมุนแยกความเร็ว
- Final Planet แบบ Our Universe และ Ending Cinema
- Easter Egg: กดแผ่นเสียงลำดับ 2 สองครั้ง แล้วลำดับ 7 หนึ่งครั้งภายใน 5 วินาที เพื่อปลดล็อกแผ่นเสียงลับลำดับ 8
- ระบบ Pause, Resume, Previous และ Next เปลี่ยนเป็น command token เพื่อป้องกัน Fade Timer ชนกัน
