## 概要
このプロジェクトはVue＋AWS CDKで構築されているSeedプロジェクト

## 初回セットアップ

```sh
npm install
```

### ローカルでの起動方法

```sh
npm run dev
```

### ビルド方法

```sh
npm run build
```

# AWSへのデプロイ方法
## 1. 事前準備
1-1. 公式手順などを参考に、AWS CLI 2 のインストールを行ってください。
https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/getting-started-install.html

1-2. 公式手順などを参考に、AWS CDK CLI (ツールキット) のインストールを行ってください。
https://aws.amazon.com/jp/getting-started/guides/setup-cdk/module-two/

以下のコマンドでインストールできます。(2023/01/22時点)

```
npm install -g aws-cdk
```

## 2. CDKの初期設定
以下のコマンドを実行し、AWSアカウントとCDKのブートストラップをおこなってください
```
# Bootstrap the account
cdk bootstrap aws://<任意のAWSアカウントID>/<任意のAWSリージョン>

※ プロファイル指定したい場合は、末尾に --profile <任意のプロファイル>をつける
(例)
cdk bootstrap aws://123456/us-east-1
```

ブートストラップに成功すると以下のような結果が出力されます。

```
 ✅  Environment aws://<任意のAWSアカウントID>/<任意のAWSリージョン> bootstrapped (no changes).
```

## 3. デプロイする
以下のコマンドでデプロイを実行できます。

```
npm run deploy -profile='任意のプロファイル名'
```

### モックサーバー起動
npx json-server --watch db.json


