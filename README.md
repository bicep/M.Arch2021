# Fall 2021 M. Arch I Portfolio Code

This readme contains instructions on how to run the various scripts for the project **Blockchain Housing Prototype** in my Masters in Architecture I portfolio. 

## Networks

In page 2, I compared different types of networks. Here you can find the graphs that I produced to compare centralized, decentralized and distributed networks. Built with Python.

Go into the directory, and use the package manager [pip](https://pip.pypa.io/en/stable/) to install dependencies.

```bash
pip install requirements.txt
```
Run with:
```bash
python networks.py
```

## Identicons

In page 6, I detailed the logic for identicon generation. This folder contains the code. Use the run time environment [NodeJS](https://nodejs.org/en/) and its package manager NPM to install dependencies:

```bash
npm install package.json
```

Run with

```bash
node identicon.js
```

## Bitcoin data (2012)

In page 7, I explained that I generated the "vertical neighborhoods" with hypothetical transaction data derived from Bitcoin on the 15th of April 2012. This CSV data is obtained for free from [Blockchair's data dumps](https://gz.blockchair.com/bitcoin/transactions/). 

I include the GhPython script used to parse the csv file for form generation in Grasshopper.

## License
[MIT](https://choosealicense.com/licenses/mit/)
