# 婚礼请柬 · 刘禹辰 & 王思越

一个纯静态的移动端电子请柬（左右滑动翻页），无需任何构建步骤，开箱即可部署到 Vercel。

## 目录结构

```
.
├── index.html              # 请柬主页面（部署入口）
├── photos/                 # 全部图片资源（封面 / 头像 / 相册 / 结尾）
│   ├── cover.jpg           # 首屏封面，同时用作社交分享缩略图
│   ├── groom.jpg / bride.jpg
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
- **社交分享封面**：由 `<meta property="og:image">` 指向 `photos/cover.jpg` 决定。
