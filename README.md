# プロジェクト名

このプロジェクトは、React と Vite を使用して構築されたアプリケーションです。

## 前提条件

このプロジェクトをローカル環境で実行するには、以下のソフトウェアがインストールされている必要があります。

-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/) または [yarn](https://yarnpkg.com/)

## プロジェクトのセットアップ

1. リポジトリを HTTPS でクローンします。

    ```bash
    git clone https://github.com/Bioinformatics-And-Bioengineering/Grade-Calculation.git
    ```

    または SSH を使用してクローンします。

    ```bash
    git clone git@github.com:Bioinformatics-And-Bioengineering/Grade-Calculation.git
    ```

2. プロジェクトディレクトリに移動します。

    ```bash
    cd Grade-Calculation
    ```

3. 必要なパッケージをインストールします。

    npm を使用する場合:

    ```bash
    npm install
    ```

    または yarn を使用する場合:

    ```bash
    yarn install
    ```

4. `.env` ファイルをプロジェクトルートに作成し、必要な環境変数を設定します。このファイルには、Supabase の URL や API キーなど、プロジェクトが必要とする環境設定が含まれます。

-   VITE_SUPABASE_URL
-   VITE_SUPABASE_ANON_KEY

## 開発環境の起動

プロジェクトをローカルで実行するには、以下のコマンドを使用します。

npm を使用する場合:

```bash
npm run dev
```

または yarn を使用する場合:

```bash
yarn dev
```

これにより、Vite の開発サーバーが起動し、ブラウザでアプリケーションを表示できます。デフォルトでは、`http://localhost:5173` でアプリケーションが利用可能です。

## ビルド

本番環境用にアプリケーションをビルドするには、以下のコマンドを実行します。

npm を使用する場合:

```bash
npm run build
```

または yarn を使用する場合:

```bash
yarn build
```

これにより、`dist` フォルダ内に最適化されたバンドルが生成されます。

## プレビュー

ビルド後のアプリケーションをローカルでプレビューするには、以下のコマンドを使用します。

npm を使用する場合:

```bash
npm run preview
```

または yarn を使用する場合:

```bash
yarn preview
```

## デプロイ

<!-- アプリケーションをデプロイするには、ビルドを作成し、生成されたファイルをウェブサーバーに配置してください。 -->
