./scripts/update_status.sh
hugo
git add .
git commit --amend --no-edit
git push --force
