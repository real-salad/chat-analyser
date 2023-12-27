# install

```
npm i
npm run start
```

# about

Each `report` implements the `onMessage` function of the `Analyser` base class.

Each `Analyser` is instantiated and passed to the `parser` which runs each report in turn.

We iterate over each month to avoid requesting the entire data set in one request.

