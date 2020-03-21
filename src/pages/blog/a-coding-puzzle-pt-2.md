---
templateKey: 'blog-post'
title: 'A Coding Puzzle, Pt 2'
date: 2020-03-21T21:52:10.000Z
featuredimage: /img/a-coding-puzzle.jpg
photographername: Sebastian Hermann
photographerurl: https://unsplash.com/@officestock
description: >
  Better Than Part 1
---

[Check out part one here](/blog/a-coding-puzzle)

## Going for Level Two

On my last post I [told about my struggles](/blog/a-coding-puzzle) with a coding [puzzle / game](https://tracking-game.reaktor.com/) made by Reaktor. Now, I'm writing about solving the second level.

### The Task at Hand

You can check out the second challenge [here](https://tracking-game.reaktor.com/parts/per/billion/play), though you probably should go through this challenge step by step.

#### DON'T READ FURTHER IF YOU DON'T WANT SPOILERS

This level is about a gas line between Turkmenistan and China, which experiences some off-gassing at times due to sabotage. The data provided is of levels of contaminants. Individually the levels of contaminants vary over time, but the totals should remain within a standard deviation at all times.

We are also provided with a set of example data:

<table>
  <thead>
    <tr>
      <td>CONTAMINANT</td>
      <td>ID</td>July 3, 1am</td>
      <td>July 3, 2am</td>
      <td>July 3, 3am</td>
      <td>July 3, 4am</td>
      <td>July 3, 5am</td>
    </tr>
  </thead>

  <tr>
    <td>#FD4</td>
    <td>3</td>
    <td>79</td>
    <td>3</td>
    <td>2085</td>
    <td>588</td>
  </tr>
  <tr>
    <td>#753</td>
    <td>4211</td>
    <td>6</td>
    <td>1</td>
    <td>1</td>
    <td>4</td>
  </tr>
  <tr>
    <td>#645</td>
    <td>4</td>
    <td>5526</td>
    <td>3325</td>
    <td>139394</td>
    <td>1</td>
  </tr>
  <tr>
    <td>#157</td>
    <td>32</td>
    <td>2569</td>
    <td>104</td>
    <td>276</td>
    <td>32283</td>
  </tr>
  <tr>
    <td>#19A</td>
    <td>14993</td>
    <td>31</td>
    <td>73240</td>
    <td>13930</td>
    <td>3</td>
  </tr>
  <tr>
    <td>#DDF</td>
    <td>778</td>
    <td>1</td>
    <td>16</td>
    <td>1</td>
    <td>16867</td>
  </tr>
  <tr>
    <td>#398</td>
    <td>2</td>
    <td>8</td>
    <td>27</td>
    <td>124</td>
    <td>36497</td>
  </tr>
  <tr>
    <td>#CF3</td>
    <td>245</td>
    <td>655</td>
    <td>725</td>
    <td>25</td>
    <td>113985</td>
  </tr>
  <tr>
    <td>#F86</td>
    <td>10</td>
    <td>5</td>
    <td>649</td>
    <td>7300</td>
    <td>31</td>
  </tr>
  <tr>
    <td>#288</td>
    <td>9400</td>
    <td>189990</td>
    <td>116255</td>
    <td>36978</td>
    <td>18</td>
  </tr>
  <tr>
    <td>#7A4</td>
    <td>2</td>
    <td>1</td>
    <td>50</td>
    <td>128</td>
    <td>0</td>
  </tr>
  <tr>
    <td>#925</td>
    <td>656</td>
    <td>1259</td>
    <td>25</td>
    <td>0</td>
    <td>0</td>
  </tr>
  <tr>
    <td>#7AD</td>
    <td>170391</td>
    <td>0</td>
    <td>61620</td>
    <td>0</td>
    <td>0</td>
  </tr>
  <tr>
    <td>#677</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
  </tr>
  <tr>
    <td>#3F8</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Total</td>
    <td>200727</td>
    <td>200130</td>
    <td><b>256040</b></td>
    <td>200242</td>
    <td>200277</td>
  </tr>
  <tr>
    <td></td>
    <td>Standard Variance</td>
    <td>Standard Variance</td>
    <td><b>Dangerous Anomaly</b></td>
    <td>Standard Variance</td>
    <td>Standard Variance</td>
  </tr>
</table>

### Start Solving

The actual data provided is a bunch of ones and zeroes. There's probably a code-y way to extract the data, but googling "binary to text" and copy-paste to a [translator](https://www.rapidtables.com/convert/number/binary-to-ascii.html) is both easier and more efficient if you, like I, don't have a clue about what you're doing. This gives us a bunch of json, which can be just used as is. Phew.

The data is formatted like so, with days ranging from Dec 1st to Dec 31st and times ranging from 0 to 23:

```javascript
[{
  date: "1-Dec-2018",
  readings: [{
    time: 0,
    id: "7D643075F3DD43",
    contaminants: {
      "#B48": 359011
      "#16F": 40255
      "#C32": 2
      "#CEA": 2
      "#3F9": 204547
      "#E48": 549
      "#8F5": 30
      "#281": 17
      "#6F3": 244414
      "#4D4": 60707
      "#5B9": 56404
      "#B30": 37247
    }
  }]
}]
```

After starting off strong, I felt fairly certain that I had also figured out a good direction to head to, unlike with the previous task.

The key here is that you can't gain anything from the individual bits of data, but the totals should stay _within a standard deviation_. So my plan is to calculate the sums of the contaminants for each hour and check which one of those numbers is clearly out of whack.

### Time to Code

To start, I just built a second set of data where I include the totals by mapping through the original data and reducing the contaminant readings:

```javascript
const raw_data = [] // The json gained from the binary -> text translation

let d2 = raw_data.map(x => { return {
    date: x.date,
    readings: x.readings.map(y => { return {
        id: y.id,
        contaminants: y.contaminants,
        total: Object.values(y.contaminants).reduce((a, c) => a + c, 0)
    }})
}})
```

Then, as I again went with a simple solution instead of a graceful one, I just figured that I can skim through a couple of data points and guess an average (just a hint above 1 million). Then, I could loop over this new bunch of data and find the one anomaly. The required value, I assume, is the id of the time of reading.

```javascript
d2.forEach(x => {
  x.readings.forEach(y => {
    if (Math.abs(y.total - 1000000) > 10000) {
        console.log(y.id)
    }
  })
})
```

### Solution

Yep, that's an ugly way to approach the problem at hand, but low and behold, the outcome:

>4B554E47524144

BOOM! This is a random ID and it's confusing, but I'm quite confident that I know what's going on in my solution and it spat out just a single value. Hooray. Just plug that into the password field and... wrong answer. SH**. Okay, take a breath. What could've gone wrong here? Could it be that I need the date and time or something..

No, but wait. The answer to the previous puzzle was a word, could this be one as well? These ID values seem to remind me of something.. HA! There are numbers and letters from A to F, which must be (I hope) a hex value! Thank god for playing with CSS and color values.

Again, we have a translation problem, which could be neatly solved with some magical code, or just thrown into [a translator](https://codebeautify.org/hex-string-converter).

>KUNGRAD

Paste that into the password field and WE ARE IN. Damn, I'm good.

### Final notes

Just replacing the standard deviation part with an eyeballed average and variation might be a bit grinchy way to solve this problem. I actually think it's smart - work smart, not hard and all that.

Googling the [formula for standard deviation](https://en.wikipedia.org/wiki/Standard_deviation), I decided to give a shot at coding a function for that. Just so that I can prove to myself that I'm capable.

Also, there's no reason to rebuild the whole dataset, as we only need the id and the sum of contaminants. So here's my final, complete solution:

```javascript
const solvePartsPerBillion = data => {
  const contaminations = []

  const calcSumOfObjValues = o => Object.values(o).reduce((a, c) => a + c, 0)

  // Transpose our raw data to shape {id, value}
  data.forEach(x => {
    x.readings.forEach(y => {
      contaminations.push({
        id: y.id,
        value: calcSumOfObjValues(y.contaminants),
      })
    })
  })

  const mean = contaminations.reduce((a, c) => a + c.value, 0) / d.length

  // Solving standard deviation, making things slightly more readable by solving in parts
  const standardDevSum = (a, c) => a + Math.pow(c.value - mean, 2)
  const sd = Math.sqrt(contaminations.reduce(standardDevSum, 0) / (d.length - 1))

  const isOutsideStandardDeviation = x => Math.abs(x.value - mean) > sd

  // Return the first element that matches our criteria
  return contaminations.find(isOutsideStandardDeviation)
}
```

It ended up quite need if I say so myself. This was fun. After actually figuring this challenge against all the odds, I actually feel quite a bit more confident. A small victory against the constantly present imposter syndrome, which is neat.

Towards the next level, which proved to be a bit disheartening...