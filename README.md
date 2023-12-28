# install

```
npm i
npm run start
```

# usage



# about

Each `report` implements the `onMessage` function of the `Analyser` base class.

Each `Analyser` is instantiated and passed to the `parser` which runs each report in turn.

We iterate over each month to avoid requesting the entire data set in one request.

When testing use:

```
const months = require('./test-months.json');
```

to run analysis for January & February only.

# report output

top ten emotes: not much viz (top ten)
message length:
    do clustering to determine ranges of short  / medium / long
    use these ranges to determine which category the user falls in
    volume per category (user)
    most long messages
    on average which person posts the most in each category