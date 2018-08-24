# monocycle-seed

Create a directory and initialize an empty Git repository:
```
mkdir myproject && cd myproject && git init
```
Add "seed" remote and fetch the commits:
```
git remote add seed https://github.com/gastonite/monocycle-seed.git
git fetch seed
```
Finally merge the seed master branch to your current branch (master):
```
git merge seed/master
```

And, here we go !
