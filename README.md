# かるたくん

音声付きのかるた学習アプリです。かるたと読み手を選ぶと、札をシャッフルして VOICEVOX の音声で読み上げます。PWA としてホーム画面に追加できます。

## 機能

- かるたの種類と読み手を選んで開始
- 札をランダム順で読み上げ
- 進捗表示（何枚目 / 全枚数）
- ホーム画面へのインストール（PWA）

収録しているかるた:

- ぐりとぐら
- ことわざかるた
- ゴロゴロイメージ都道府県

## 使い方

1. かるたを選ぶ
2. よむ人を選ぶ（選ぶとその名前を読み上げます）
3. 「はじめる」を押す
4. 「次を読む」で次の札へ、「やめる」で最初の画面に戻る

読み上げにはインターネット接続が必要です。

## ローカルでの実行方法

静的ファイルだけなので、ビルドは不要です。`file://` だと Service Worker が動かないため、ローカルサーバー経由で開いてください。

VS Code / Cursor の Live Server で `index.html` を開くか、次でも起動できます。

```bash
npx --yes serve .
```

ブラウザで表示された URL（例: http://localhost:3000）を開きます。

## 構成

```
.
├── index.html      # 画面
├── manifest.json   # PWA マニフェスト
├── sw.js           # Service Worker
├── css/            # スタイル
├── js/             # アプリ本体と jQuery
└── icons/          # PWA アイコン
```

アプリ一式はリポジトリ直下に置いています。ビルド成果物用のサブフォルダは使っていません。

## 技術

- HTML / CSS / jQuery
- [VOICEVOX](https://voicevox.hiroshiba.jp/) の読み上げ API（[tts.quest](https://deprecatedapis.tts.quest/)）
- PWA（Web App Manifest + Service Worker）

PWA のインストールには HTTPS または localhost が必要です。
