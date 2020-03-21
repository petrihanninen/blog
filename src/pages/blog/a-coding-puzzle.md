---
templateKey: 'blog-post'
title: 'A Coding Puzzle'
date: 2020-03-18T21:52:10.000Z
featuredimage: /img/a-coding-puzzle.jpg
photographername: Sebastian Hermann
photographerurl: https://unsplash.com/@officestock
description: >
  What to do when you're bored
---

Read part two [here](/blog/a-coding-puzzle-pt-2)

## A New Kind of Challenge

Today I gave a shot at something I've never done - a coding [puzzle / game](https://tracking-game.reaktor.com/) made by Reaktor.

The whole thing was really freakin' hard, as I'm just your average, mostly self-thaught frontend developer, with no clue about anything computer-sciency. However, I've lately gotten into watching Coding Challenges by [The Coding Train](https://www.youtube.com/user/shiffman) and Coding Interview Questions by [Nick White](https://www.youtube.com/channel/UC1fLEeYICmo3O9cUsqIi7HA) on Youtube, which I think helped quite a bit with getting into the right mindset.

Today I figured that I'd share how awfully the challenge went, and maybe some takeaways.

### Why Though?

The whole idea of trying new, weird things started with this whole Quarantine thing. Finding inspiration to try out new things seems to be quite easy, when you're confined to your own home. It's what [got me started with this blog](/blog/brand-new-blog) as well.

Reaktor published a nice, [short read](https://www.reaktor.com/blog/adjusting-to-a-new-normal-what-we-have-learned-from-the-first-weeks-of-the-work-from-home-era/) about remote work, where they, among other things, discussed about mental well being, and as a part of that, learning new things. There they also hinted to this coding puzzle, and here we are.

### Getting started

First of all, the back story of the game was a nice surprise. I kind of expected to find something cool-ish, but still I found myself surprised. Imagining myself fighting an international ecoterrorist group called Unnamed was quite exciting. Nerds are a fun breed.

Onwards, towards Mission 001.

#### DON'T READ FURTHER IF YOU DON'T WANT SPOILERS

Starting mission one, I was completely lost to start with. You get presented with a wall of text and some vague instructions about a difficult-to-decode distress signal.

My first instinct was to read the task as carefully as I can so as not to miss anything. I think that's a habit I picked up from high school maths.

> We know the signal to be exactly 16 bytes long, and containing no repeating characters

HEY! I know this! Or I know about something like this. One of those coding interview question videos by Nick White talked about figuring out strings with no repeating characters. So, how do I apply it here..? Let's note that down and move on.

The description of the task doesn't contain that much more useful details, but the signal itself starts with something interesting:

```
DISPATCH LEVEL: URGENT
SET_ENCODING: BASE_64
TRANSMITTING SIGNAL......................
```

Okay, so base 64. I know I've heard of it before, it's some kind of encoding, right? YES, that's how you embed images as text into css and stuff. Oh yeah, I know my shit! But.. What to do with that information?

### Banging My Head Against the Wall

At this point I'm fairly sure that I have the building blocks of this task figured out:
- String to be decoded
- Base 64 encoded
- 16 bytes, whatever the hell that means
- No repeating characters

Next step: ?

I tried putting the string through an online base 64 decoder. Didn't work. I tried another one, and with quite a few different encodings. Useless. Eventually I gave up trying that over and over, though it took embarasingly long. Definition of crazy is doing the same thing and expecting a different result..

So, what now? I tried reading about base 64, and came to conclusion that that information doesn't really help. I read about signals and noise, trying to figure out if there's some noise removal algorithms or somethign. Needless to say, I was getting nowhere.

My next step was to start googling around 16 bytes and base 64. With 20-20 hindsight, I was actually quite close, reading through some old posts about deciphering a 16-byte, base 64 string, but still I didn't figure out how to move forward.

### Cheating time

You see, my issue was that I was too fixated on the base 64 part. I was about to get nowhere with it, so I googled this specific game and came across a [Medium post](https://medium.com/@nikkijacktech/reaktor-tracking-game-write-up-6e575650de72) from Nikki Jack about going through solving the puzzles. From there I figured out the key piece I was missing: I need to find the non-repeating string FROM THE ENCODED STRING, and only after that do the base 64 decoding.

I felt like an idiot. I think my issue, in addition to not knowing how to think these things through, was getting fixated on one angle of approach. I wasn't able to take a step back, but kept repeating the same mistake. I probably should've just taken a break, maybe coming back to the game the next day, but nope. I was determined to solve the puzzle, which prevented me from solving the puzzle -.-

### Solution

Enough cheating, now I finally know roughly what I'm going to do:
1. Find the non-repeating, 16 character long string
2. Decode it.

This should be simple enough? Sure, I'll just brute force it. There could probably be a way to do this more elegantly, but I'm here just to find out a solution to this question, not to make production code. Besides, as I'm just looking for a string of fixed length, I don't need to worry so much about time complexity, as it's not gonna be O(n^2), but O(n*16), which is O(n) (I think).

Okay, so the idea in the brute force solution is to loop through every single 16-character substring, check if that is non-repeating, and if it is, just console.log it.

Here's my full solution, with some comments that hopefully make things clear. Open up the results tab, if you wanna see the password.

<iframe height="501" style="width: 100%;" scrolling="no" title="XWbYOYj" src="https://codepen.io/pphanninen/embed/XWbYOYj?height=501&theme-id=dark&default-tab=js" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/pphanninen/pen/XWbYOYj'>XWbYOYj</a> by Petri Hänninen
  (<a href='https://codepen.io/pphanninen'>@pphanninen</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Wrap-up

Yay, we did it!

Solving Mission 001 took a couple of hours, a lot of googling and some cheating. It wasn't the most glorious start, but I'm happy enough that I got it done. I think doing these challenges is very worth while for learning the problem solving mindset and attitude, so maybe I'll be doing more.

This ended up becoming quite a long post, so I think I'll leave talking about the rest of the puzzle to other posts ([check out part 2 here](/blog/a-coding-puzzle-pt-2)). Thanks for sticking through until the end to probably at this point nobody but myself :)