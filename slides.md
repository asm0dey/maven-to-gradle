---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# persist drawings in exports and build
drawings:
  persist: false
# page transition
# transition: fade
# use UnoCSS
css: unocss
colorSchema: 'dark'
background: black
---

# OK, we're on Gradle.
# What's next?

Pasha Finkelshteyn

---

# Congratulations!

What you already know:

<v-clicks>

1. You will (finally!) write in <mdi-language-kotlin />
    - Yay, autocompletion!!!
2. You'll finally get rid of <mdi-xml/>

</v-clicks>

<div v-click>

This talk is about less obvious things. 

And your concerns.

</div>

---

# Here is what I know about you:

- You already use Gradle for your Android projects
- You have one Java monorepo
- You have small Java satellite repositories
- You current primary build system is Maven (with antrun mixins)
- You have your own plugins

---
layout: cover
background: /pain.png
---

<div class='text-center'>

# Let's highlight your current pains

</div>

---

# Current pains

- Dependency conflict resolution is _crazy_ complicated
- Lifecycle is not flexible enough
- Different build systems for different languages
- Slow builds of monorepo
- Complex dependencies between modules


---

# Dependency conflict resolution in Maven

```txt
  A
  ├── B
  │   └── C
  │       └── D 2.0
  └── E
      └── D 1.0
```

How will the dependency be resolved?

1. Exception
2. 1.0
3. 2.0
4. Depends on the code


---

# Dependency conflict resolution in Maven

```txt
  A
  ├── B
  │   └── C
  │       └── D 2.0
  └── E
      └── D 1.0
```

How will the dependency be resolved?

1. Exception
2. <u style="color: red;">1.0</u>
3. 2.0
4. Depends on the code

<div v-click>

<br/>
<br/>
<fluent-emoji-high-contrast-exploding-head/> What are the chances that `A` won't work?

</div>

---
layout: statement
---

# Not the case with Gradle!

---

# Gradle dependency resolution

- Gradle will select the _highest_ one
- Gradle is semver-aware
- Rich version declarations helps to make the best decision possible

Rich version declaration ↓

<Transform scale="0.5">

[![Rich version declaration](http://api.qrserver.com/v1/create-qr-code/?color=FFFFFF&bgcolor=000000&data=https%3A%2F%2Fdocs.gradle.org%2Fcurrent%2Fuserguide%2Frich_versions.html%23rich-version-constraints&qzone=1&margin=0&size=400x400&ecc=L)](https://docs.gradle.org/current/userguide/rich_versions.html#rich-version-constraints)

</Transform>

---

# Maven Lifecycle

<Transform scale="0.6">

![](https://i.stack.imgur.com/DU5hL.png)

</Transform>

---

# Maven Lifecycle

## Is it flexible?

On which phase do you obfuscate your `jar` file? `pre-integration-test`? `post-integration-test`?

---
layout: statement
---

# Not the case with Gradle!

---
layout: two-cols
---

# Gradle lifecycle

## You define the Gradle Lifecycle!

```kotlin {all|1|2|3|4-6|all}
project("project-a") {
    tasks.register("taskX") {
        dependsOn(":project-b:taskY")
        doLast {
            println("taskX")
        }
    }
}
```

<p v-click>And you can define graph as complex as you need!</p>

::right::

<div v-click>

[![](http://api.qrserver.com/v1/create-qr-code/?color=FFFFFF&bgcolor=000000&data=https%3A%2F%2Fdocs.gradle.org%2Fcurrent%2Fuserguide%2Fmore_about_tasks.html%23sec%3Aordering_tasks&qzone=1&margin=0&size=400x400&ecc=L)](https://docs.gradle.org/current/userguide/more_about_tasks.html#sec:ordering_tasks)

</div>