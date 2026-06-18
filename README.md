# 婚礼请柬 · 刘禹辰 & 王思越

一个纯静态的移动端电子请柬（左右滑动翻页），无需任何构建步骤，开箱即可部署到 Vercel。

## 目录结构

```
.
├── index.html              # 请柬主页面（部署入口）
├── photos/                 # 全部图片资源
│   ├── share-cover.jpg     # 微信/社交分享缩略图（正方形 400×400）
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
- **分享缩略图**：替换 `photos/share-cover.jpg`（保持正方形，约 400×400）。

## 微信转发缩略图（路线 A）

转发到微信时显示的卡片：**标题**取自 `<title>`；**缩略图**由微信自动从页面抓图——我们把一张正方形合影 `photos/share-cover.jpg` 放在页面最前（`img.wx-share`，移出屏幕但保留真实尺寸）来「导向」它。`og:image` / `og:url` 由页面底部的小脚本按当前域名自动补成绝对地址，**换域名无需改代码**。

- **换缩略图**：替换 `photos/share-cover.jpg`（正方形），或改 `<img class="wx-share">` 的 `src`。
- **换标题**：改 `<title>`。
- **真机测试**：把链接发到「文件传输助手」看卡片；微信对每个链接缓存很重，改完重测时在 URL 后加 `?v=2`（每次换个数字）强制刷新。
- ⚠️ **不保证 100%**：不接微信 JS-SDK 时缩略图是「尽力而为」。要完全可控需 JS-SDK（需企业/组织**认证公众号**）。
- ⚠️ **域名可达性**：`*.vercel.app` 在国内/微信里可能很慢或被拦，最终建议用**已备案的自有域名 + 国内可达托管/CDN**；Vercel 域名仅供初步测试。
