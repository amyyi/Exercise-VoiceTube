# 說明
請用您熟悉的 JavaScript、CSS 框架完成。(Vue.js, ReactJS, Vanilla JS, jQuery...)

FrontEnd/index.html 是這次的考題，裡面有設計師給的規格，請依照設計師的設計，完成畫面。

請盡情地發揮，展現出你的技術力！

附註： 除了規格外，也可以加上證明自己實力的東西


## 繳交期限及方式
請於收到信件的 **四日內** 完成，並以 email 夾帶原始碼檔案或提供 github、gitlab 位置。

# 功能描述
進入頁面後請呼叫 API 取得相關的影片資訊並將資訊呈現至頁面中。

## 上方篩選、排序功能列
- 為前端篩選及排序，無需經由 API 篩選及排序
- 排序可以從「發佈時間」、「觀看次數」、「收藏次數」中選擇一種，進行排序
- 長度篩選分別為「不限」、「四分鐘以下」、「5-10 分鐘」、「超過十分鐘」，擇一進行篩選
- 耳機 icon `https://material.io/icons/#ic_headset`

## 頁面設計規格補充
- 全頁水平置中對齊
- 影片資訊卡定寬定高，每排最多 4 張，卡片間間距最小為 20px，若還有更多空間，請將卡片分散對齊。
- 卡片超出四張或頁面寬度不足以容納四張，請 **自動流變** 至下一行。
- 滑鼠經過每張卡片時，請將影片縮圖放大 10%。
- 影片標題最多為兩行。

# API 規格

- Endpoint: `https://merik.voicetube.com/demo/data`
- Method: GET
- Response
```json
{
  "status": true,
  "data": [{
      "id": 52250,
      "thumbnail": "https://cdn.voicetube.com/assets/thumbnails/QxjsWwgPjwM.jpg",
      "title": "台北人英文真的超強？這部影片告訴你！(中英字幕) (Do They Speak English In Taiwan?)",
      "views": 526816,
      "collectCount": 200,
      "duration": 316,
      "publish": 1519880251,
      "level": 1,
      "captions": [
        "cht",
        "ja",
        "vi",
        "en"
      ]
    }]
}
```


|欄位|型態|說明|
|--|--|--|
|id| Number | 影片序號|
|thumbnail|String|影片縮圖|
|title|String|影片標題|
|views|Number|影片觀看人數|
|collectCount|Number|影片收藏人數|
|duration|Number|片長 (秒)|
|publish|Number|發佈時間 (timestamp)|
|level|Number|影片程度 (1-初級、2-中級、3-中高級、4-高級)|
|captions|Array|影片字幕 (cht-中文、ja-日文、vi-越南文、en-英文)
# Exercise-VoiceTube
