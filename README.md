# Schedia 官网与 App Store 政策页面

这是一份可以直接发布到 GitHub Pages 的独立静态网站源码，只有 **Schedia 英文版**。它从现有双语官网整理而来，已将页面、脚本和图片路径改为相对路径；放在 GitHub Pages 仓库根目录或 `/<仓库名>/` 子路径都能工作。查课啦中文版、服务器部署脚本、证书和登录凭据不在本目录中。

## 文件说明

| 路径 | 用途 |
| --- | --- |
| `index.html` | Schedia 英文首页；产品介绍、交互演示、合作与联系方式 |
| `privacy/index.html` | 隐私政策 |
| `privacy-choices/index.html` | 隐私选择与数据删除指引 |
| `terms/index.html` | 使用条款 |
| `support/index.html` | 技术支持与联系渠道 |
| `style.css` | 响应式布局、颜色和动效 |
| `app.js` | 首页演示、菜单、弹窗和政策页交互 |
| `config.js` | Schedia 的 App Store 下载地址配置；目前留空 |
| `assets/schedia-icon.png` | Schedia 图标 |
| `.nojekyll` | 让 GitHub Pages 原样发布这些静态文件 |

这五个页面已经是可直接上传的 HTML 源码，**不需要 npm、构建命令或数据库**。政策文案直接在相应的 `index.html` 中维护；更改政策时，也要检查首页和其他政策页是否引用了旧表述或旧链接。页面页脚使用此前确认的名称“漩涡”和联系邮箱 `mcwhirl@qq.com`。

## 上传到 GitHub Pages

1. 新建一个 GitHub 仓库，例如 `schedia`。要使用 GitHub Free 的 Pages，可将仓库设为 Public。
2. 将**本目录中的文件和文件夹**上传到仓库根目录。仓库根目录应直接看到 `index.html`、`privacy/`、`assets/` 等；不要只上传压缩包，也不要多包一层 `Schedia-GitHub-Pages/` 文件夹。
3. 在仓库的 **Settings → Pages → Build and deployment** 中，将 **Source** 设为 **Deploy from a branch**，选择 `main` 分支和 `/(root)` 目录并保存。
4. 等 Pages 显示发布网址后，用浏览器逐一打开首页、隐私政策、删除指引、支持页；确认网址可以在未登录 GitHub 的窗口中打开。确认公开可访问后再填写 App Store Connect。

GitHub 官方操作说明：[配置 Pages 发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

如果仓库名为 `schedia`，发布后将 `<你的GitHub用户名>` 换成自己的账号名：

| App Store Connect 字段 | 可填写的网址 |
| --- | --- |
| Privacy Policy URL（必填） | `https://<你的GitHub用户名>.github.io/schedia/privacy/` |
| User Privacy Choices URL（选填，建议填写） | `https://<你的GitHub用户名>.github.io/schedia/privacy-choices/` |
| Support URL | `https://<你的GitHub用户名>.github.io/schedia/support/` |
| Marketing URL | `https://<你的GitHub用户名>.github.io/schedia/` |

如果仓库名本身是 `<你的GitHub用户名>.github.io`，上述网址中**去掉 `/schedia`**。如果采用其他仓库名，也把网址中的 `schedia` 替换成实际仓库名。App Store Connect 的字段说明见 [Apple App Privacy](https://developer.apple.com/help/app-store-connect/reference/app-privacy/) 和 [Platform Version Information](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/)。

## 修改内容与预览

- 修改政策：直接编辑 `privacy/index.html`、`privacy-choices/index.html` 等页面正文；保留各页面顶部导航、相对链接及页脚。政策日期有变动时，同步修改页面显示的日期与 `<time datetime="...">`。
- 修改邮箱：在五个 HTML 文件里搜索 `mcwhirl@qq.com`，逐一修改正文、合作入口和页脚。
- Schedia 上架后：在 `config.js` 的 `en.appStoreUrl` 中填入**实际可访问**的 `https://apps.apple.com/...` 地址。此前没有提供 Schedia 商店地址，因此下载按钮目前显示说明弹窗。
- 修改外观：编辑 `style.css`。页面不加载外部字体或分析脚本。
- 本地预览：在本目录运行 `python -m http.server 8765`，然后打开 `http://127.0.0.1:8765/`。请用本地服务器预览，而不是直接双击 HTML 文件。

隐私政策中的 App 数据处理描述来自现有 Schedia 资料；发布或更新 App 前，请对照实际版本核对 iCloud、诊断记录、日历订阅和删除流程。此次独立版已移除原双语站的语言跳转提示及其网站备案状态，保留了政策对网站托管连接信息的说明。
