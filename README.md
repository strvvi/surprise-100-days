# 100 天紀念驚喜網站 (Our 100 Days) 💕

專為 2026/08/12 - 2026/11/20 打造的 100 天紀念日互動網站。

---

## 快速啟動預覽

### 方法一：使用 Python 內建伺服器（推薦）
在終端機執行：
```bash
cd /Users/vixuscheng/.gemini/antigravity/scratch/surprise-100-days
python3 -m http.server 5173
```
然後在瀏覽器打開：
`http://localhost:5173`

> 💡 **手機同步看**：如果你的手機跟 Mac 在同一個 Wi-Fi，在瀏覽器輸入 `http://<你的Mac本機IP>:5173`，女友也可以在手機上直接體驗！

### 方法二：直接點開
直接在 Finder 中對 `index.html` 點兩下即可用 Safari / Chrome 開啟。

---

## 怎麼替換你們真實的照片與文字？

### 1. 照片替換
1. 從手機 IG 典藏將限動存下來，或直接截圖。
2. AirDrop 傳到電腦後，將照片檔複製到 `photos/` 資料夾（例如存成 `story1.jpg`, `story2.jpg`...）。
3. 打開 `js/config.js`，將 `image: "photos/story1.svg"` 改成 `image: "photos/story1.jpg"`。

### 2. 文案、日期與情書修改
所有內容都集中在 `js/config.js`：
- `boyName` / `girlName`：修改彼此暱稱
- `stories`：修改每則限動的地點（`location`）、日期（`date`）、心情文案（`caption`）
- `coupons`：修改專屬兌換券的項目（例如吃甜點、按摩、和好券）
- `loveLetter`：修改第 100 天的手寫情書內容
- `bgmPath`：如果有你們專屬的浪漫定情曲，將 mp3 放入 `audio/romantic.mp3` 即可（若無，系統會自動使用內建的浪漫鋼琴合成旋律）。

---

## 包含的六大驚喜模組
1. 💌 **3D 火漆印信封拆封**：點擊蠟印觸發紙屑爆發與音樂。
2. ⏱️ **100 天即時計時器**：天、時、分、秒即時遞增跳動。
3. 📱 **IG 限動沉浸模式**：全螢幕直式進度條播放、按住暫停、愛心漂浮特效。
4. 📷 **拍立得回憶照片牆**：拍立得質感相框，點擊直接播放對應限動。
5. 🎫 **刮刮卡願望兌換券**：手指/滑鼠塗層刮刮樂互動。
6. 💌 **第 100 天深情手寫信**：典雅信紙彈窗與手寫簽名。
