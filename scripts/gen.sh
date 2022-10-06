hugo
mv generated ..
git stash
git checkout gh-pages
rsync -vaz ../generated/* ./
rm -rf ../generated
git add .
git commit --amend
git push --force
git checkout master
git stash pop
