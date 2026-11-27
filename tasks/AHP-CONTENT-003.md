# AHP-CONTENT-003 — 中文版演示文章

## 目标

把 `docs/demo.md` 的十分钟演示翻成中文，发布到掘金 / CSDN，给中文读者一条可复制、可验证的入口。

## 范围

- 正文：`publish/demo.zh.md`（已写，已跑通）
- 不做：新功能、新门禁、新渠道；不碰安全文章的审核线
- 平台：掘金（一个标签，进入审核）、CSDN（即时发布，标签只能选推荐项）

## 验收

- 至少一个中文渠道发布成功，URL 记入 `HANDOFF.md` §6
- 正文里的命令和输出与 `agent-handoff-cli@0.1.1` 实际一致
- 发布后管理列表没有重复文章（CSDN）

## 检查清单

- [x] `publish/demo.zh.md` 写完
- [x] 空目录跑通两行安装 + `check`（11 PASS / 1 SKIP）
- [x] 改坏 `current_file` → `HANDOFF_BODY` 变红；改回变绿
- [x] `ACTIVE` 无租约 → `LEASE` 变红
- [x] 用户读一遍正文
- [x] 发掘金（https://juejin.cn/post/7712966444408995874）/ CSDN（https://blog.csdn.net/WillCheah/article/details/171526305）
- [x] URL 记入 HANDOFF §6，单元转 COMPLETE
