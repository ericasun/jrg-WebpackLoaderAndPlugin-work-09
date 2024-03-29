#!/usr/bin/env sh

# abort on errors
set -e

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git rm -r --cached . 
git init
git add . &&

# 这里一定要用数字1接收值，不能用其他变量，执行命令时默认是update，需要输入值就用""号括起来
git commit -m "${1:-update}" &&
git branch -M main &&
git remote add origin git@github.com:ericasun/jrg-WebpackLoaderAndPlugin-pratice-09.git

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

git push -u origin main &&

echo ------------------上传代码成功------------------


