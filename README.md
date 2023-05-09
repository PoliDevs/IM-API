<img src="https://github.com/SantiagoRiveros/IM-API/assets/70020219/82e215f7-dda2-4f48-a88c-34acf72a5d27" width="400" height="400"/>

# Index:

1. [Introduction](#introduction)
2. [Stack](#stack)
3. [Rules](#rules) <br/>
  a. [About Tasks & Chart](#rules-about-tasks-&-chart)<br/>
  a. [About Branches](#rules-about-branches)<br/>
  b. [About Commits](#rules-about-commits)<br/>
  c. [About Pull Requests](#rules-about-pull-requests)<br/>
  d. [About Merge Conflicts](#rules-about-merge-conflicts)<br/>
  e. [About Variables](#rules-about-variables)<br/>
  f. [About New Modules](#rules-about-installing-new-modules) <br/>
4. [External References](#external-references)

# Introduction <a name="introduction"></a>


# Stack <a name="stack"></a>


# Rules <a name="rules"></a>

### Rules about Tasks & Chart: <a name="rules-about-tasks-&-chart"></a>
When you get a new task, and you start doing it, you need to follow the next steps:
1. create a [branch](#rules-about-branches)
2. put the task in jira to `In Progress` state.
3. make all the code you need to fulfill the requirementes, for more info [about this](#rules-about-commits)
4. when you think that the task is done, make all the necessary commits/push and then, go back to github, and in the upper tab, go to `Pull Requests`
5. when you are in that tab, you can create the [Pull Request](#rules-about-pull-requests)
6. then, put the task to `Code Review` state.
7. wait for another developer to review your pull request (You can reach out if this step takes a lot of time)
8. when that developer merges your code, he is responsible to put your task in Jira to `Donde` state.

### Rules about Branches: <a name="rules-about-branches"></a>
All branches must match his name with an specific task-card of the project in Jira. <br/>
All must match this format `IM-{Number of the task}`.

### Rules about Commits: <a name="rules-about-commits"></a>
All commits must intend to be minimal, with no more of 100 lines of code. (Also, you can make a lot of commits on the same branch, is better have little commits to review it better) <br/>
All commits must follow the next Format `{Performed Action} + {The site itself of the changes or the name of the file} + {details}` <br/>
All commits must be in English, you can use a translator.

### Rules about Pull Request: <a name="rules-about-pull-requests"></a>
You never, never, never, make a change directly to main Branch, you can also, make a PR of your task branch to main. <br/>
Never merge your own PR, another dev will need to review it and merge it. <br/>
Try to make a PR with a title that matches the nature of the task itself, if you can't find the words to make it, you can simply put the task code, or the branch name. <br/>

### Rules about Merge Conflicts: <a name="rules-about-merge-conflicts"></a>
In case of merge conflict, **notify the owner of the pull request**, it is their responsibility to solve the conflict, once they have solved it, they can notify you so that the pull request can be merged.

### Rules about Variables: <a name="rules-about-variables"></a>
All of the variables in the project, must use camelCase, and all of them must be in English. <br/> 
Its better to have a long variable name but, with a descriptive name like `var anotherUnnecesaryAndWeirdWithNoSenseVariable = ""` than `var varA = ""`. Try to avoid misspellings in the variable name.

### Rules about installing new modules: <a name="rules-about-installing-new-modules"></a>
You can install new dependencies, to do that, simply reach out [@SantiagoRiveros] (https://www.github.com/SantiagoRiveros) (or simply email him to `santiagoriverosjasis@gmail.com`) to notify all of the dev team, and to make sure we are creating a consistent project.

# External References <a name="external-references"></a>

1. [Jira](https://i-menu.atlassian.net/jira/software/projects/IM/boards/1)
