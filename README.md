# クリプトニュース記事管理アプリ  
*このプロジェクトは、ユーザーごとに記事を登録し、コメントを追加するアプリケーションです。  
Next.js、Supabase を使用し、外部apiの記事をマイニュースとして扱い大きな出来事のニュースにコメントを追加するものとしています。*  
  
## デモ  
[signin](https://crypto-app-six-livid.vercel.app/signin)  
ユーザー名: design2124@gmail.com  
パスワード: testuser  

## 主な機能  
### 1.認証機能  
* Supabase Auth を使用した メール/パスワード認証
  
### 2.ニュース管理機能  
* News Api 読み込み
* 外部 Api記事 mynews化
    * mynews追加
    * mynews削除
    * mynews一覧表示
    * mynews詳細ページ
    * mynews詳細ページコメント追加

## 技術構成  
* フロントエンド
    * Next.js 15（App Router 使用）
    * React 18
    * Tailwind CSS
  
* バックエンド
    * Next.js API Routes
    * Supabase（PostgreSQL）
    * 認証（Auth）

## データベース設計  
### ニュース テーブル
|  カラム  |  型  |  説明  |
| --- | --- | --- |
|  id  |  uuid  |  追加記事ID  |
|  title  |  varchar  |  記事タイトル  |
|  url  |  varchar  |  記事URL  |
|  description  |  varchar  |  記事説明分  |
|  image_url  |  varchar  |  記事画像  |
|  published_at  |  varchar  |  記事が追加された日付  |
|  user_id  |  text  |  記事追加したuserId  |




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
