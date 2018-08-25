# monocycle-seed

A seed to start developing an isomorphic application using [monocycle](https://github.com/gastonite/monocycle)

## Create your project

Create a directory and initialize an empty Git repository:
```
mkdir myproject && cd myproject && git init
```
Add "seed" remote and fetch the commits:
```
git remote add seed 
git fetch seed
```
Finally add the "seed/master" commits to your current local branch (master):
```
git merge seed/master
```

## Start a development server
```
npm run watch
```

## Build and start application (developement)
```
npm run dev
```

## Build and start application (production)
```
npm run prod
```



