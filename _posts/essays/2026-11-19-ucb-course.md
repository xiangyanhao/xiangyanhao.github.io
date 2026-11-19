---
title: 关于 26Fall 我上的 UC Berkeley 课程
date: 2026-11-19 09:00:00 -0800
description: UC Berkeley 在 26Fall 改革的亲历者
tags: [blog]
lang: zh-CN
---

在 UC Berkeley 访学期间，我没有选任何一门人工智能高阶课程，而是选择了下面这些课程：CIVENG 93，EECS 126，CS 168，CS 194-61A。虽然名义上是以 Data Science 专业进入 GLOBE 项目，但一门 DATA 开头都没有，究其原因是 UC Berkeley 很多高阶课自己人都爆满，遑论连 waitlist 资格都没有的 GLOBE 项目学生了。甚至 CS 194-61A 还是为了凑 F1 的 12 学分要求硬加上去的，也真是没谁了。

实际上，在选课过程中也设想过很多备选，甚至有一门课程（CDSS 94）还 enroll 进去了。这里的课程和西湖大学不一样，通常只有注册进课程才能看到完整的 syllabus。这门课程看简介是一门事情不太多的数据科学人文课，结果一看 syllabus 是这样的：

> | Grade Breakdown:  | |
> | --- | --- |
> | Attendance & Participation: | 15% | 
> | Group Presentations: | 15% |
> | Midterm Exam I: | 20% |
> | Midterm Exam II: | 20% |
> | Final Exam: | 30% |
>
> **Participation**: *Attendance* — Coming to class and actively participating are mandatory. You will be graded on the quality of your participation. It is vital that you familiarize yourself with the readings assigned for the week when the topic is being covered in class. You are allowed four absences with no penalty to this category. The four free absences cover the participation category only. They do not excuse graded work. If you are absent on an exam day or a presentation, you lose those points even if you are still within your four absences. 
>
> *Lectures* — All slides of lectures will be posted on bCourses during the week that they are delivered. Laptops may not be used for any purpose other than note-taking. Attendance is recorded with a sign-in sheet that circulates during lectures. You write your name and signature. The sheet travels in an unpredictable path through the room, so please plan to be present. Signing 
in for another student, or asking someone to sign in for you, is a form of academic dishonesty and will be treated as such. 
>
> *Office hours* — Each student is strongly encouraged to attend office hours with me at least once during the semester. This is an opportunity to get to know your instructor and ask questions about the course readings, assignments, data science as a major, and other topics related to the course. My office hours are in 1136 Gateway, Mon 12:30–1:30 p.m. & Wed 10:00–11:00 a.m. 
> **Group Presentations**: Group presentations take place in class and run on a rotating format. The class is divided into five groups of three or four students each per panel topic. On each panel presentation day, five groups take the stage, present around a topic, and field questions from the room. Topics range from the existential risks of AGI and machines that deceive their makers to viral recommendation algorithms, deepfakes, AI companions, and whether AI will take your job. Stake out a position, make your case, and defend it live. The goal is to work as a team and gain fluency in presenting orally before an audience.

显然这种课程设置十分不友好，于是我果断退掉了这门课，改选了一门当时只是凑学分的 CS194-61A，到最后的结果超乎我的想象。

## CS 194-61A：只有一次的教学改革见证课

这门课程在课程系统里面的名字是 Functional Programming and AI-Assisted Application Development，这实际上是一个相当具有吸引力的名字：一个 geek 含量拉满的名词（至少在我看来）和一个时代含量拉满的名字组合到一起，而且是刚刚好用来填满 12 学分的 1 学分课程，也不像 CDSS 94 那样占用很多额外时间——简直是必选的神仙课程。这门课程在 UC Berkeley 官方是为了在 26Fall 之前修读 CS61A 的人补上 26Fall 的 CS61A 新增部分内容而添加的课程，我通过找 ISS 说明情况，并表明自己在 home school 已经上过类似于 CS61A 的程序设计课程，最终成功注册进了这一课程。有趣的是，虽然这门课程在 UC Berkeley 官方看来是对程序设计入门课的补充，然而对于我这样外校的高年级本科生而言，实际上是一门学习全新知识的课程，即使已经上过相当的程序设计课程（计算机和程序设计基础，数据结构与算法，算法导论）。

这门课程采用 Gleam 语言教函数式编程。这是一门非常新的编程语言（2016 年发明），给大家看一下代码（来自课程作业）：

```gleam
/// The value of `expr` when each variable has the value it is bound to in
/// `bindings`, or `NameNotFound(name)` for a variable that isn't bound.
pub fn eval(expr: Expr, bindings: Dict(String, Int)) -> Result(Int, EvalError) {
  case expr {
    Binary(operator, left, right) ->
      case eval(left, bindings), eval(right, bindings) {
        // YOUR CODE HERE (replace the code below)
        Ok(a), Ok(b) -> Ok(calculate(operator, a, b))
        Error(e), _ | _, Error(e) -> Error(e)
      }
    // YOUR CODE HERE (replace the code below)
    N(n) -> Ok(n)
    Var(var) -> {
      let result = dict.get(bindings, var)
      case result {
        Ok(value) -> Ok(value)
        Error(e) -> Error(NameNotFound(var))
      }
    }
  }
}
```

相信大家已经感受到这种语言的特殊之处了。从 26Fall 开始，CS 61A 将 Scheme 语言替换成了 Gleam 语言，并增设了相应的 Animator 项目（我的实现见[此](/animator)）。可以看出，即使是 CS 61A 这样老牌的经典课程，也在这个学期迎来了巨大的调整，当然一部分是和 AI 相关的（AI-Assisted Programming），另外的由 Scheme 换成 Gleam 的部分则和 AI 没有直接关系。

本学期还是 Preceptor 和 Provenance 在程序设计作业中首次使用的学期。Preceptor 是一个 AI 程序，在本地跑测试错误的时候会自动跳出来给提示（可选是否开启），然后在程序测试通过后会进行 AI Checkoff Interview 以检验理解。在写 Animator 项目的解释器阶段的时候，我在一道题上甚至出现了写程序过测试的时间极短，但通过 checkoff 用了很长时间的情况，可见原先的那种莫名其妙写对的那种模式不太行得通了。Provenance 则用于记录整个过程中人和 IDE 的交互记录，在提交作业时导出相应的 Provenance Bundle 使得作业过程可审计。两个程序均以 VS Code 扩展的形式提供。顺带一提，Preceptor 后台貌似接的是 Gemini 3.7 Flash（从 JSON 里面读出来的）。

总之就是恰好赶上了这个新改革，然后趁着这个 1 学分的课体验一把，毕竟完整上一遍 CS 61A 对于高年级本科生来说没什么必要。

## CS 168：老牌网络课程的项目大更新

CS 168 是 UC Berkeley 享誉全球的经典计算机网络课程，以 Traceroute、Routing、Transport 这三个项目著称，以前三个项目都是实现指定模块跑单元测试，但是今年的 Transport 项目发生了巨大改动：改为文献阅读（回答问题）、小组写设计报告、**可用 Coding Agent**自主实现传输层协议并通过给定场景下的性能要求：LEO 卫星、数据中心、传感器浮标三选一。这是一个相当大的改动，原本想着单人过所有课程的，也不得不在 EDSTEM 开始找队友（虽然后面又说可以单人，但那个时候已经找到队友了）。

Stage 1 的 Design Review 并没有想象的那么难，基本只需要对自己所写文档内容的复述。而 Stage 2 和 Stage 3 由于可以用 Coding Agent，可以针对场景自动化设置 hidden workload 从而增大通过测试的可能性。从这一阶段开始，实际上取得满分并不困难，但这传递的课程理念变化是第一次的。

## CIVENG 93 和 EECS 126：不一样的学习体验

这两门课程放一起选，其实有点奇怪的：后者所需要的概率基础远超前者，因此如果一个人能学明白 EECS 126 那么 CIVENG 93 基本上是纯水课了。但是还是放在一起选，这是因为 CIVENG 93 在访学项目的 Pre-Approval 当中，而且课程名字很吓唬人：Engineering Data Analysis。

今年的 CIVENG 93 换了 Ziqi Wang 来上，课程理念有很大调整：作业和考试基本不区分人，而是真的只考基础部分，而且全开卷（Python 和 Mathematica 软件也允许使用）。Ziqi Wang 这样表达了考试的设计理念：

> Guys: 
> 
> We have received several questions regarding what is and isn't permitted during our exams. I want to take a moment to share my guiding principles behind our policy.
> 
> My goal is to create a realistic problem-solving environment where you have access to standard resources (notes, slides, books, calculators/Python). I want to completely eliminate the scenario where you cannot solve a problem simply because you forgot a specific formula. I am proud to offer a testing format that reflects how you will work in the real world.
>
> However, this flexibility is meant to support your thinking, not replace it. The policy should not be exploited to find innovative workarounds. For instance, wrapping a lightweight, offline LLM into a Python package to crack the (any) exam. 
>
> Exams are not about scores; they are an opportunity to check your understanding of the material. I trust you to respect the spirit of this policy.

然而，EECS 126 的考试则不是这么设计的。我在 EECS 126 的 Midterm 2 中，因为忘记了 Chernoff Bound 而且 cheatsheet 上也漏掉了（基本全押随机过程），导致丢掉了一道大题 10 分的全部分数，可以说十分悲惨。

这两门课程存在内容上的公共部分但深度差异显著，反映的教学理念也存在不同。EECS 126 也迎来了新教授 Anatharam，不过这个更属于常规轮换。

## 总结与参考链接

这次的选课看似只是一个凑学分的选课，但实际上却体验到了 UC Berkeley 当下发生的课程改革的最前线。我觉得这样的选课比那种“CS 161、CS 162、CS 164”的选课组合虽然硬核度上下降严重，但却让我以一种开放的心态看待这个世界发生的变化，同时保留更多体验生活的机会，比那种每天午夜之后才睡觉，周末根本不出门，全指望着感恩节一次性玩掉整个湾区的学习生活体验好很多。当然，这些东西绝不会进入西湖大学官方的海外交流叙事中。如果你对这种官方叙事感兴趣，可以参考以下链接：

- [少年新事丨2023级本科生海外访学归来](https://mp.weixin.qq.com/s/3n3PgEMUxKRVcXWQwvjD8g)
- [西游记｜西湖大学首届本科生赴美归来](https://mp.weixin.qq.com/s/pXTdcMB3v2mKcDf5WS5UGQ)

关于提到的课程以及正在进行的相应改革，可以参考以下链接：

- [CS 61A 关于课程改革的相关说明](https://cs61a.org/fa26/articles/whats-new)
- [CS194-61A 课程链接](https://cs61a.org/cs194-fa26)
- [CS 168 改版后 Project 3](https://fa26.cs168.io/proj3/)