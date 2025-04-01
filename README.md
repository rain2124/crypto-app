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
### 1.ニュース テーブル
|  カラム  |  型  |  説明  |
| --- | --- | --- |
|  id  |  uuid  |  追加記事ID  |
|  title  |  varchar  |  記事タイトル  |
|  url  |  varchar  |  記事URL  |
|  description  |  varchar  |  記事説明分  |
|  image_url  |  varchar  |  記事画像  |
|  published_at  |  varchar  |  記事が追加された日付  |
|  user_id  |  text  |  記事追加したuserId  |

### 2.コメント テーブル
|  カラム  |  型  |  説明  |
| --- | --- | --- |
|  id  |  uuid  |  コメントのID  |
|  user_id  |  text  |  記事追加したuserId  |
|  comment  |  varchar  |  追加したコメント  |
|  mynews_id  |  text  |  コメントを追加した記事ID  |
|  created_at  |  timestampts  |  コメントを追加した日付  |

## アプリ動作フロー  
### 1.ユーザー登録 & ログイン  
  1.Supabase Auth でログイン（メール認証）
  2.ログイン済みにて記事一覧に記事追加機能が追加される
### 2.MYNEWSリスト
  1.ログインしている状態にて、add mynewsにて自身の記事一覧に記事追加
  2./mynews/にて自身の記事一覧を表示
  3.deleteにて記事削除、commentにて記事に対しコメント追加

# 今後追加したい内容
  * カレンダー機能追加
  * ページネーション & 検索機能追加
  * 前年度、今年度の月の記事比較
