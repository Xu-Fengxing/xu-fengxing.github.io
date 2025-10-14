---
title: "Markdown鍗氬绯荤粺瀹炵幇"
category: "绉戞妧"
tags: ["鎶€鏈?, "鍗氬", "Markdown"]
date: "2025骞?0鏈?4鏃?
excerpt: "浠嬬粛濡備綍灏嗙‖缂栫爜鐨勬枃绔犵郴缁熸敼閫犱负鍩轰簬Markdown鐨勭伒娲诲崥瀹㈡鏋躲€?
---
## 涓轰粈涔堥渶瑕丮arkdown锛?
浼犵粺鐨勭‖缂栫爜鏂囩珷绯荤粺瀛樺湪浠ヤ笅闂锛?
### 纭紪鐮佺殑灞€闄愭€?
1. **缁存姢鍥伴毦**锛氭瘡娆℃坊鍔犳枃绔犻兘闇€瑕佷慨鏀逛唬鐮?
2. **鐗堟湰鎺у埗澶嶆潅**锛氭枃绔犲唴瀹瑰拰浠ｇ爜娣峰湪涓€璧?
3. **闈炴妧鏈汉鍛樻棤娉曞弬涓?*锛氶渶瑕佸紑鍙戣€呮墠鑳芥坊鍔犲唴瀹?
4. **鏍煎紡闄愬埗**锛氬彧鑳藉湪浠ｇ爜涓啓鏂囩珷锛屾牸寮忓彈闄?
### Markdown鐨勪紭鍔?
1. **绠€鍗曟槗瀛?*锛歁arkdown璇硶绠€娲佺洿瑙?
2. **鐗堟湰鎺у埗鍙嬪ソ**锛氱函鏂囨湰鏂囦欢锛屾槗浜庤拷韪彉鏇?
3. **璺ㄥ钩鍙板吋瀹?*锛氫换浣曟枃鏈紪杈戝櫒閮借兘缂栬緫
4. **鏍煎紡涓板瘜**锛氭敮鎸佹爣棰樸€佸垪琛ㄣ€佷唬鐮佸潡绛?
## 绯荤粺鏋舵瀯璁捐
### 鏂囦欢缁撴瀯
```
content/
  articles/
    7w5i.md
    tzh7.md
  README.md
```
### 浠ｇ爜绀轰緥
```typescript
// 鐢熸垚鏂囩珷閾炬帴鐨勫搱甯屽€?
export const generateArticleHash = (title: string) => {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    const char = title.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 杞崲涓?2浣嶆暣鏁?
  }
  return Math.abs(hash).toString(36).substring(0, 4)
}
```
### 鍏冩暟鎹牸寮?
姣忕瘒鏂囩珷浣跨敤Front Matter鏍煎紡锛?
```yaml
---
title: "鏂囩珷鏍囬"
category: "鍒嗙被"
tags: ["鏍囩1", "鏍囩2"]
date: "2025骞?0鏈?4鏃?
excerpt: "鏂囩珷鎽樿"
---
```
## 瀹炵幇姝ラ
### 1. 鍒涘缓鏂囩珷鐩綍
棣栧厛鍒涘缓 `content/articles/` 鐩綍鏉ュ瓨鏀炬墍鏈塎arkdown鏂囦欢銆?
### 2. 瑙ｆ瀽Markdown鏂囦欢
浣跨敤Node.js鐨勬枃浠剁郴缁烝PI璇诲彇鎵€鏈?`.md` 鏂囦欢锛屽苟瑙ｆ瀽Front Matter銆?
### 3. 鐢熸垚鏂囩珷鍒楄〃
浠庢墍鏈塎arkdown鏂囦欢涓彁鍙栧厓鏁版嵁锛岀敓鎴愭枃绔犲垪琛ㄣ€?
### 4. 鍔ㄦ€佽矾鐢?
鏍规嵁鏂囩珷鏍囬鐢熸垚鍞竴鐨勫搱甯孖D锛屽垱寤哄姩鎬佽矾鐢便€?
## 鎶€鏈疄鐜?
### 鏂囦欢璇诲彇
```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getAllArticles() {
  const articlesDirectory = path.join(process.cwd(), 'content/articles')
  const filenames = fs.readdirSync(articlesDirectory)
  
  return filenames.map(filename => {
    const filePath = path.join(articlesDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      id: generateArticleHash(data.title),
      title: data.title,
      category: data.category,
      tags: data.tags,
      date: data.date,
      excerpt: data.excerpt,
      content: content
    }
  })
}
```
### 鍝堝笇鐢熸垚
淇濇寔鍘熸湁鐨勫搱甯岀敓鎴愰€昏緫锛岀‘淇濋摼鎺ョ殑涓€鑷存€с€?
## 鏈潵鎵╁睍
### 鍔熻兘澧炲己
1. **鎼滅储鍔熻兘**锛氬熀浜庢枃浠跺唴瀹圭殑鍏ㄦ枃鎼滅储
2. **鍒嗙被绠＄悊**锛氳嚜鍔ㄧ敓鎴愬垎绫婚〉闈?
3. **鏍囩浜?*锛氬姩鎬佺敓鎴愭爣绛剧粺璁?
4. **RSS璁㈤槄**锛氳嚜鍔ㄧ敓鎴怰SS婧?
### 鍐呭绠＄悊
1. **缂栬緫鍣ㄩ泦鎴?*锛氭敮鎸佸湪绾跨紪杈?
2. **鍥剧墖绠＄悊**锛氳嚜鍔ㄥ鐞嗘枃绔犱腑鐨勫浘鐗?
3. **鑽夌绯荤粺**锛氭敮鎸佽崏绋垮拰鍙戝竷鐘舵€?
4. **澶氳瑷€鏀寔**锛氬浗闄呭寲鍐呭绠＄悊
## 鎬荤粨
閫氳繃灏嗙‖缂栫爜鐨勬枃绔犵郴缁熸敼閫犱负鍩轰簬Markdown鐨勬鏋讹紝鎴戜滑鑾峰緱浜嗭細
- **鏇村ソ鐨勫彲缁存姢鎬?*
- **鏇寸伒娲荤殑鍐呭绠＄悊**
- **鏇村弸濂界殑缂栬緫浣撻獙**
- **鏇村己鐨勬墿灞曟€?*
杩欐槸涓€涓粠闈欐€佸埌鍔ㄦ€併€佷粠纭紪鐮佸埌閰嶇疆鍖栫殑鍏稿瀷婕旇繘杩囩▼銆?

