./scripts/update_status.sh
hugo
mv generated ..
git stash
git checkout gh-pages
rm -rf ./*
mv ../generated ./
mv ./generated/* .
rmdir ./generated
git add .
git commit --amend
git checkout master
git stash pop
