#!/bin/bash

rm -R pages

git worktree remove ./pages

git worktree add ./pages pages

mdbook build

cp theme/robots.txt ./pages/

git --git-dir ./.git/worktrees/pages --work-tree ./pages add .

git --git-dir ./.git/worktrees/pages --work-tree ./pages commit --file - < version.md

git --git-dir ./.git/worktrees/pages --work-tree ./pages push origin pages

git worktree prune
