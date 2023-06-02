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

# Here is what I know about your company:

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

# Let's talk about pain

## Pain of Maven

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

<Transform scale="0.59">

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

---

# Slow build of the monorepo

## Incremental builds to the rescue!

<div v-click>

![](/incremental.png)

</div>
<div v-click>

![](/javanet.png)

</div>


---
layout: statement
---

# Not the case with Gradle!

---

# Gradle speeds things up

<v-clicks>

1. Gradle daemon
1. Gradle incremental build (`org.gradle.caching=true`)
1. Multithreading OOTB
1. Configuration caching (`org.gradle.configuration-cache=true`)
1. Lazy task configuration
1. Gradle enterprise helps with anomaly detection and understanding

</v-clicks>

---

# Maven inter-module dependencies

## What if you have a library?

I know, any big organization has their own libraries and this is cool!

But what happens when you library depends on, say, HTTP client?

It will be available to all the clients of the library!

---
layout: statement
---

# Not the case with Gradle!

---

# Api dependencies in Gradle

## Module is just another flavor of library

- `api` dependencies will be visible to those who depend on a library
- `implementation` dependencies won't be

Just change preferred HTTP client without breaking others!

```kotlin
api(project(":core"))
```

This ↑ is how dependency on other module looks

---

# Profiles

## I had a `profile` hell!

For Tomcat I had a crazy profiles to download the correct `tcnative` library.

```xml
<groupId>org.apache.maven.plugins</groupId>
<artifactId>maven-antrun-plugin</artifactId>
<executions>
  <execution>
    <phase>initialize</phase>
    <configuration>
      <exportAntProperties>true</exportAntProperties>
      <target>
        <condition property="tcnative.classifier" value="${os.detected.classifier}-fedora" else="${os.detected.classifier}">
          <isset property="os.detected.release.fedora"/>
        </condition>
      </target>
    </configuration>
    <goals>
      <goal>run</goal>
    </goals>
  </execution>
</executions>
```

---
layout: statement
---

# Not the case with Gradle!

---
layout: center
---

# Just use `if`s

## You have all the JVM's power at your disposal


---
layout: statement
---

# Migration

---

# Migration

## Basic scenario

```bash
gradle init
```

<div v-click>

- Will generate basic `build.gradle`
- With scopes defined as accurate as possible

</div>

---

# Migration

## Better scenario

1. Create a Build Scan for Maven with Gradle Enterprise
2. Learn how to compare artifacts
3. `gradle init`
4. Create a Build Scan for Gradle
5. Compare results until match

---
layout: center
---

# But what about our plugins?

---
layout: two-cols
---

# Plugin migration
<br>
Bad news:

> One does not simply reuse Maven plugins in Gradle

<p class="text-right"><i>Ben Franklin</i></p>

<div v-click="2">

Good news:

1. Plugin ecosystem is **mammoth** <vscode-icons-file-type-gradle/>.<br/>
   Probably somebody already did what you need
2. Writing plugins for Gradle is order of magnitude easier
3. We have awesome docs
4. We can help you!

</div>

::right::

<br/>
<br/>
<br/>
<br/>
<div v-click="1">

![](/onecant.jpg)

</div>

---
layout: center
---

# Summary

## What might gradle do for you?

1. Make your builds faster
2. Resolve conflicts better
3. Write in a _normal_ ™ programming language
4. Give you more flexibility

---
layout: center
---

# Do you have issues with Maven?

# Hopefully it's not the case with Gradle!

---
layout: center
---

# Thank you!

## It's time for your questions!

