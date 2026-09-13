# 婚礼请柬 · 刘禹辰 & 王思越

一个纯静态的移动端电子请柬（左右滑动翻页），无需任何构建步骤，开箱即可部署到 Vercel。

## 目录结构

```
.
├── index.html              # 请柬主页面（部署入口）
├── share.html              # 微信分享入口，首图可见，按钮进入完整请柬
├── photos/                 # 全部图片资源
│   ├── share-cover.jpg     # 原分享缩略图，保留旧链接
│   ├── share-cover-v2.jpg  # 旧分享缩略图，保留旧链接
│   ├── share-red-portrait-v3.jpg # 当前红底合照分享封面（800×1200）
│   ├── bride-avatar.png / groom-avatar.png   # The Couple 页卡通头像
│   ├── cover.jpg           # 原合影（现作分享图素材，封面已改为无照片设计）
│   ├── alb1.jpg … alb10.jpg
│   ├── couple-big.jpg
│   └── end.jpg
├── vercel.json             # Vercel 配置（图片缓存策略 + cleanUrls）
├── .vercelignore           # 部署时忽略的文件
└── 婚礼请柬_单文件版.html   # 离线单文件备份（图片已内嵌，可直接发微信/邮件，不参与线上部署）
```

## 部署到 Vercel

### 方式一：从 GitHub 一键导入（推荐）

1. 把本仓库推送到 GitHub（已关联远程：`Tonylycxx/invitation`）。
2. 打开 https://vercel.com/new ，选择 **Import Git Repository** 并选中本仓库。
3. Framework Preset 保持 **Other**，其余设置全部留空（无需 Build Command / Output Directory）。
4. 点击 **Deploy**，约 10 秒后即可获得线上地址。

> 之后每次 `git push` 到默认分支，Vercel 都会自动重新部署。

### 方式二：用 Vercel CLI 本地部署

```bash
npm i -g vercel
vercel          # 首次会引导登录与项目创建
vercel --prod   # 发布到正式环境
```

## 本地预览

因为页面通过相对路径加载 `photos/`，直接双击打开 `index.html` 也能看，但用本地服务器更接近线上效果：

```bash
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 自定义内容

直接编辑 `index.html` 即可：

- **新人姓名 / 日期 / 时间 / 地点**：搜索对应中文文案修改（如 `2026年9月26日`、`北京友谊宾馆`）。
- **导航地图链接**：第 5 屏的「打开地图导航」按钮 `href`（高德 `uri.amap.com` 链接）。
- **照片**：替换 `photos/` 下的同名图片即可（建议保持竖图比例：封面/大图约 1080×1620，头像约 500×600）。
- **分享封面**：当前使用 `photos/share-red-portrait-v3.jpg`（800×1200），按原比例完整展示；更换时使用新文件名，并同步更新 `share.html` 与 `index.html` 的分享地址和尺寸。
- **点滴瞬间第 10 页**：「心动，仍在继续」使用 `demos/moments/assets/red-married.jpg`（1440×1920）的「已嫁／已娶」拼图。网页副本仅等比缩小、压缩，保留 sRGB 色彩配置；原文件与原红底合照资源均保留。

## 微信分享入口

分享地址为 `https://lyc-wsy-wedding.click/share`。`share.html` 把照片正常显示为第一张图片，没有脚本、离屏定位、隐藏或自动跳转；「打开完整请柬」按钮进入主页面。用户已确认此前的可见首图方案能在微信生成带图卡片；本次更换红底封面后的实际卡片仍需在微信中复验。

两个页面都在初始 HTML 中提供分享标题、描述、封面绝对 HTTPS 地址、图片类型和尺寸。`og:image`、`og:image:secure_url`、`link[rel=image_src]`、网站图标和首图均指向 `photos/share-red-portrait-v3.jpg`。封面地址统一附带 `?v=20260913-red`，避开部署前被 CDN 缓存的 404 响应。主请柬的 `img.wx-share` 仍为离屏辅助图，转发优先使用已验证的 `/share` 入口。

- **换封面**：保留旧文件，使用新 JPEG 文件名；同步更新两个页面的地址、宽高和图片说明，保持分享页首图可见。
- **换域名或标题**：同步修改静态分享地址、`og:url`、`canonical`、`<title>` 与 `og:title`，不要依赖浏览器脚本补地址。
- **微信复验**：在微信里打开 `/share`，等新照片显示后重新分享给「文件传输助手」。若仍显示旧卡片，可使用 `https://lyc-wsy-wedding.click/share?v=20260913-red` 测试新链接。历史聊天卡片未必刷新；上线检查与微信实际卡片验收分开进行。

## 背景音乐

当前背景音乐为 **`music/bgm.m4a`**（约 3.4MB / AAC，自动循环）。左上角有开关图标。

- **自动播放**：手机浏览器禁止"带声音自动播放"，所以——微信内用 `WeixinJSBridgeReady` 尝试自动播；其它浏览器在用户**第一次滑动/点击**时开始；左上角图标可随时静音/恢复。
- **换音乐**：替换 `music/bgm.m4a`，或放新文件并改 `<audio id="bgm">` 的 `src`。本机无 ffmpeg 时可用 `afconvert -f m4af -d aac -b 128000 输入文件 music/bgm.m4a` 转码。
- ⚠️ 请使用你有权使用的音乐（自有或免版权），页面是公开链接。
- ⚠️ 离线单文件版（`婚礼请柬_单文件版.html`）不内嵌音乐，所以**单文件版没有背景音乐**（避免体积过大）。
