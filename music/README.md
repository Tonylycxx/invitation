# 背景音乐

当前背景音乐：**`bgm.m4a`**（AAC，约 3.4MB，自动循环播放）。

- **换歌**：把新音乐放这里覆盖 `bgm.m4a`，或放别的文件并改 `index.html` 里 `<audio id="bgm">` 的 `src`。
- **转码**（本机无 ffmpeg 时，用 macOS 自带 `afconvert` 从 FLAC/WAV 转）：
  ```
  afconvert -f m4af -d aac -b 128000 "输入.flac" music/bgm.m4a
  ```
- **播放逻辑**：微信内尝试自动播；其它浏览器在第一次滑动/点击时开始；左上角图标可随时开关。
- ⚠️ 请使用你有权使用的音乐 —— 页面是公开链接，等于公开分发。
