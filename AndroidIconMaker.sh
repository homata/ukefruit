#!/bin/sh

# ImageMagick
# http://cactuslab.com/imagemagick/

# 1枚の画像からAndroidアプリ提出に必要なサイズを自動生成！with ImageMagick（シェル使いかた説明アリ）
# http://qiita.com/BlueRoyInc/items/397e8e71ef57551e1e09

if [ $# -ne 1 ]; then
  echo "指定された引数は$#個です。" 1>&2
  echo "実行するには1個の引数が必要です。" 1>&2
  exit 1
fi

src=$1

convert -geometry 36x36! $src   36x36.png
convert -geometry 48x48! $src   48x48.png
convert -geometry 72x72! $src   72x72.png
convert -geometry 96x96! $src   96x96.png
convert -geometry 144x144! $src 144x144.png
convert -geometry 512x512! $src 512x512.png
