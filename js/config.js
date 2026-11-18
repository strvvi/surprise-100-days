/**
 * 100 天紀念驚喜網站 - 設定檔
 * 日期已精準更新為真實限動日期 (共 25 部)
 */
const CONFIG = {
  // 兩人的名字
  boyName: "Vixus",
  girlName: "Mimi",
  
  // 紀念日設定 (年, 月-1, 日, 時, 分)
  // 在一起的第一天：2026/08/12 00:00:00
  startDate: new Date(2026, 7, 12, 0, 0, 0),
  
  // 第 100 天紀念日：2026/11/20
  target100Date: new Date(2026, 10, 20, 0, 0, 0),

  // 背景音樂路徑 (Taylor Swift - Love Story 歌詞版)
  bgmPath: "audio/love_story.m4a?v=lyrics",

  // 浪漫名言 / 首頁標題
  quote: "遇見妳之後，平凡的每一天都成了值得紀念的浪漫。",

  // IG 限時動態資料庫 (共 25 部影片，精準對應真實發布日期)
  stories: [
    {
      id: 1,
      media: "photos/d993df848a1c4c57b86c547396a00d47.MOV",
      type: "video",
      date: "9月5日",
      location: "我們的回憶足跡 📍",
      caption: "初秋的美味約會 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 2,
      media: "photos/cebbc34a6ccf4d50b5590dfe45342d89.MOV",
      type: "video",
      date: "9月6日",
      location: "我們的回憶足跡 📍",
      caption: "兩人的晚餐時光 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 3,
      media: "photos/eae088d8656148c398b1f9f662782b45.MOV",
      type: "video",
      date: "9月9日",
      location: "我們的回憶足跡 📍",
      caption: "心動的日常 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 4,
      media: "photos/b3a279082984487b89421b0ae1f119c3.MOV",
      type: "video",
      date: "9月17日",
      location: "我們的回憶足跡 📍",
      caption: "甜蜜微醺時刻 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 5,
      media: "photos/8f32a7ae67b1466c9708b2381d958041.MOV",
      type: "video",
      date: "9月17日",
      location: "我們的回憶足跡 📍",
      caption: "公館雪花冰約會 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 6,
      media: "photos/2bc4ca1338d2426f83f745838c02f25f.MOV",
      type: "video",
      date: "9月18日",
      location: "我們的回憶足跡 📍",
      caption: "牽手吹風的日子 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 7,
      media: "photos/5cd8fcde970b42a2a5115c6aee8f353c.MOV",
      type: "video",
      date: "9月21日",
      location: "我們的回憶足跡 📍",
      caption: "專屬彼此的節奏 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 8,
      media: "photos/5bf40945e23c4da6b9858f072f63ca47.MOV",
      type: "video",
      date: "9月24日",
      location: "我們的回憶足跡 📍",
      caption: "甜甜的陪伴 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 9,
      media: "photos/5cc5b754740548e791f0885dae654270.MOV",
      type: "video",
      date: "9月25日",
      location: "我們的回憶足跡 📍",
      caption: "有妳在就是風景 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 10,
      media: "photos/27e6cd85de804617b9742fef06390d50.MOV",
      type: "video",
      date: "10月7日",
      location: "我們的回憶足跡 📍",
      caption: "秋高氣爽的散步 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 11,
      media: "photos/62870822c1f34e04a1157adacded002b.MOV",
      type: "video",
      date: "10月7日",
      location: "我們的回憶足跡 📍",
      caption: "一起吃甜甜 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 12,
      media: "photos/d539a8b8badc42dd9333ff50cb997d4c.MOV",
      type: "video",
      date: "10月15日",
      location: "我們的回憶足跡 📍",
      caption: "藏在眼裡的溫柔 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 13,
      media: "photos/5d1e30ec99c74ed0a42ee220c86681cd.MOV",
      type: "video",
      date: "10月15日",
      location: "我們的回憶足跡 📍",
      caption: "每一刻都想記錄 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 14,
      media: "photos/bbaaf6de83ea4ed1a236b5898875bdf9.MOV",
      type: "video",
      date: "10月16日",
      location: "我們的回憶足跡 📍",
      caption: "儀式感的禮物 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 15,
      media: "photos/c0bfa5004f664f7a98d929a646723001.MOV",
      type: "video",
      date: "10月19日",
      location: "我們的回憶足跡 📍",
      caption: "屬於我們的默契 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 16,
      media: "photos/e763e1d655324d138091fe9b6f02166f.MOV",
      type: "video",
      date: "10月19日",
      location: "我們的回憶足跡 📍",
      caption: "生活中的小確幸 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 17,
      media: "photos/a8ceee2aa6ae461fbcb16a66850319b3.MOV",
      type: "video",
      date: "10月21日",
      location: "我們的回憶足跡 📍",
      caption: "牽手漫步的街頭 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 18,
      media: "photos/487ad1b1188e45f988dae79c2aacf8e6.MOV",
      type: "video",
      date: "10月23日",
      location: "我們的回憶足跡 📍",
      caption: "妳笑起來最美 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 19,
      media: "photos/740d0a763f79402580b45d6ea97370a2.MOV",
      type: "video",
      date: "10月30日",
      location: "我們的回憶足跡 📍",
      caption: "想去哪都陪妳 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 20,
      media: "photos/67cb6c5922494c5eb7924f8012afa0d7.MOV",
      type: "video",
      date: "11月4日",
      location: "我們的回憶足跡 📍",
      caption: "幸福的約會時光 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 21,
      media: "photos/3d3daadb61174bc68a5d8ef94fad84f9.MOV",
      type: "video",
      date: "11月6日",
      location: "我們的回憶足跡 📍",
      caption: "最放鬆的時刻 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 22,
      media: "photos/add5d2981e92416b8ab1d1503092a3eb.MOV",
      type: "video",
      date: "11月9日",
      location: "我們的回憶足跡 📍",
      caption: "微涼秋天的溫暖 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 23,
      media: "photos/ce68b48145e64f3d9cd482974eea63df.MOV",
      type: "video",
      date: "11月12日",
      location: "我們的回憶足跡 📍",
      caption: "走過無數條街 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 24,
      media: "photos/6d408659cae4419aa737becd7655abab.MOV",
      type: "video",
      date: "11月14日",
      location: "我們的回憶足跡 📍",
      caption: "烏薩奇與三麗鷗相聚 ✨ 走過的每一天都有妳的笑容。",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    },
    {
      id: 25,
      media: "photos/20d5d8d0e45a4d269c32b788dafca51c.MOV",
      type: "video",
      date: "11月18日",
      location: "午後窗邊特調 🍹",
      caption: "每一天都要一起喝好喝的，每一口都是甜甜的滋味 ✨",
      likes: "520",
      avatar: "photos/momonga_avatar.png"
    }
  ],

  // 拍立得精選照片牆
  polaroids: [
    {
      media: "photos/d993df848a1c4c57b86c547396a00d47.MOV",
      title: "初秋的美味約會",
      date: "2026.09.05",
      rotate: "-3deg"
    },
    {
      media: "photos/b3a279082984487b89421b0ae1f119c3.MOV",
      title: "甜蜜微醺時刻",
      date: "2026.09.17",
      rotate: "2deg"
    },
    {
      media: "photos/5cd8fcde970b42a2a5115c6aee8f353c.MOV",
      title: "專屬彼此的節奏",
      date: "2026.09.21",
      rotate: "-2deg"
    },
    {
      media: "photos/27e6cd85de804617b9742fef06390d50.MOV",
      title: "秋高氣爽的散步",
      date: "2026.10.07",
      rotate: "3deg"
    },
    {
      media: "photos/bbaaf6de83ea4ed1a236b5898875bdf9.MOV",
      title: "儀式感的禮物",
      date: "2026.10.16",
      rotate: "-4deg"
    },
    {
      media: "photos/487ad1b1188e45f988dae79c2aacf8e6.MOV",
      title: "妳笑起來最美",
      date: "2026.10.23",
      rotate: "1deg"
    },
    {
      media: "photos/3d3daadb61174bc68a5d8ef94fad84f9.MOV",
      title: "最放鬆的時刻",
      date: "2026.11.06",
      rotate: "-2deg"
    },
    {
      media: "photos/6d408659cae4419aa737becd7655abab.MOV",
      title: "烏薩奇與三麗鷗相聚",
      date: "2026.11.14",
      rotate: "4deg"
    },
    {
      media: "photos/20d5d8d0e45a4d269c32b788dafca51c.MOV",
      title: "午後窗邊特調",
      date: "2026.11.18",
      rotate: "3deg"
    }
  ],

  // 專屬約會願望兌換券 (刮刮卡)
  coupons: [
    {
      id: "coupon-1",
      icon: "cake",
      title: "無條件陪吃甜點券",
      desc: "憑此券任何時候想吃舒芙蕾、可麗露或千層蛋糕，無條件陪同買單！",
      validUntil: "永久有效"
    },
    {
      id: "coupon-2",
      icon: "heart-handshake",
      title: "吵架無條件和好券",
      desc: "不論誰對誰錯，只要出示此券，立刻獲得一個緊緊的擁抱與和好！",
      validUntil: "永久有效"
    },
    {
      id: "coupon-3",
      icon: "graduation-cap",
      title: "Mimi 專屬！無條件耐煩教學券",
      desc: "課業難題、任何疑問或想學的新技能，隨傳隨到，保證超級耐心、溫柔解答到妳懂為止！",
      validUntil: "永久有效"
    },
    {
      id: "coupon-4",
      icon: "compass",
      title: "神秘未知浪漫約會券",
      desc: "行程、交通、餐廳全部由我一手包辦，妳只需要漂亮出席！",
      validUntil: "永久有效"
    }
  ],

    // 給 萌萌純純大壞咪 的第 100 天情書
  loveLetter: {
    title: "給最親愛的 萌萌純純大壞咪",
    subtitle: "寫在我們相愛的第 100 天",
    content: [
      "親愛的 萌萌純純大壞咪：",
      "不知不覺，我們居然一起走過 100 天了。",
      "其實早在 8 月 12 號我們正式在一起之前，在那個滿天星空下緊緊抱住妳的那一刻，我的心就已經完全被妳偷走了。那一晚的夜風、還有靠在妳身邊的心跳聲，直到現在我都還記得很清楚。",
      "雖然 8 月 12 號那天我在日本，我們沒能見到面，只能抱著手機跟彼此說著心裡話，但那天看著螢幕傻笑的我，心裡比任何時候都還要確定，總有一天，我會好好牽住這個女孩的手，帶她在世界到處遊玩。",
      "回頭翻看這段日子的限動，真的滿滿都是我們的回憶。記得九月初我們跑去信義區玩、隔天又一起去敦化吃義大利麵；還有大熱天一起跑去公館吃芒果冰；十月中我送妳的那個充滿儀式感的手鏈，有好好帶者吧，到現在想起來心裡還是暖暖的；一直到最近我們窩在咖啡廳裡，桌上擺著飲料、妳的大耳狗、還有烏薩奇，每天都好萌萌呢",
      "這些看似平常的小事，有妳在身邊，就全部變成了閃閃發光的回憶。跟妳在一起的時候，時間總是過得特別快，每次要送妳回家的時候我總是捨不得。",
      "儘管在這之中，我們有不少次爭吵，但我們都走過來了呢，也沒想到時光荏苒，歲月如梭，我們默默地陪伴了彼此100天了呢",
      "只是最近很忙，想必萌萌小公主一定都覺得男朋友怎麼都不怎麼陪了對吧，但是說真的，男朋友真的非常非常愛萌萌咪呢！",
      "每次捉弄萌萌咪都是因為很愛萌萌咪，覺得小公主生氣的樣子很可愛呢",
      "謝謝妳這 100 天以來的陪伴跟包容，謝謝妳走進我的生活，讓我每天都有了最期待見到的人。",
      "100 天只是一個小小的里程碑，未來的每一個日子，不管是一起去吃好吃的、一起發呆、或是妳需要我教學解惑的時候，我都一定會在妳身邊。",
      "第 100 天快樂，我的萌萌小公主。我愛妳！"
    ],
    sign: "愛妳的 Vixus",
    date: "2026.11.20"
  },

  // 心動悄悄話資料庫 (點擊大愛心隨機彈出)
  // 此處專屬稱呼：萌萌咪，代稱：我 (無烏薩奇)
  heartWhispers: [
    "今天的萌萌咪也是 100 分的可愛！",
    "遇到妳是我今年最幸運的事。",
    "想牽著妳的手走過未來的很多個 100 天。",
    "肚子餓了嗎？我隨時待命帶妳吃好吃的！",
    "遇見萌萌咪之後，世界變得好溫柔。",
    "不論發生什麼事，我永遠都在妳身邊。",
    "今天也有超級想妳 ❤️",
    "世界很大，但我的眼裡只有萌萌咪。",
    "最喜歡看妳笑起來眼睛彎彎的樣子。",
    "謝謝妳出現在我的生命裡，成為我的最愛。"
  ],

  // 100 天默契小測驗 (無烏薩奇字樣)
  quizQuestions: [
    {
      question: "我們是在哪一天正式在一起的？",
      options: ["2026 年 8 月 12 日", "昨天啦～"],
      answer: 0,
      wrongTip: "笨蛋～答錯要罰一個抱抱！我們是 8/12 在一起的 ❤️"
    },
    {
      question: "第一次一起喝咖啡聊到店家打烊是去哪裡？",
      options: ["深夜咖啡廳", "巷口便利商店"],
      answer: 0,
      wrongTip: "笨蛋～答錯要罰一個抱抱！那次在深夜咖啡廳聊超久～"
    },
    {
      question: "我最想對 Mimi 說的心底話是？",
      options: ["肚子好餓想吃宵夜", "我超級超級愛妳，全都要！❤️"],
      answer: 1,
      wrongTip: "笨蛋～答錯要罰一個抱抱！當然是愛妳全都要啦！"
    }
  ],
};
