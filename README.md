# custom-gacha
- コンテンツを自由に設定してガチャを弾ける

## 開発環境構築
- プロジェクトをclone
```
git clone git@github.com:Gachal29/custom-gacha.git
```

- Dockerを利用する場合
```
$ cd custom-gacha/

# イメージのビルド
$ docker image build -t custom-gacha .

# 初回コンテナ起動
$ docker container run -it --rm -p 3000:3000 --mount type=bind,source=.,target=/root/workspace custom-gacha npm ci && npm run dev

# 2回目以降 (パッケージのインストールなし)
$ docker container run -it --rm -p 3000:3000 --mount type=bind,source=.,target=/root/workspace custom-gacha npm run dev
```
