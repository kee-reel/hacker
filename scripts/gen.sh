hugo
mv generated ..
git checkout gh-pages
rm -rf ./*
rsync -vaz ../generated/* ./
rm -rf ../generated
git add .
git commit -m 'Update content'
git push
git checkout master
