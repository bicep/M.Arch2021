import fs from 'fs'
import c from 'canvas'
import sha1 from 'sha1'
const { createCanvas } = c
import csv from 'csv-parse'


const results = [];
const nIdenticon = 35

// constants for internal grid for each identicon
const mirrorN = 5
const gridUnit = 100
const internalGridDim = mirrorN * gridUnit

//constants for external grid for all the identicons
const margin = 30
const ncol = 20
const nrow = 20
const identiconXSpacing = 30
const identiconYSpacing = 30
const externalGridWidth = (internalGridDim + identiconXSpacing)*ncol
const externalGridHeight = (internalGridDim + identiconYSpacing)*nrow

// const filename = './binance.csv'
const filename = './blockchair2012.csv'

fs.createReadStream(filename)
  .pipe(csv({from_line: 2 }))
  .on('data', (data) => 
    results.push(data[1]))
  .on('end', () => {
    // start from i = 1 because the 0th index contains the csv headers
    const canvas = createCanvas(externalGridHeight+2*margin, externalGridWidth+2*margin)
    const ctx = canvas.getContext('2d')

    // iterate through 2D grid
    for (var row = 0; row < nrow; row++) {
      for (var col = 0; col < ncol; col++) {
        identicon(results[ncol*row + col], ctx, row, col)
      }
    }

    const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync(`./test.png`, buffer)
  });

function identicon(input, ctx, row, col) {
  // input -> split into strings of 2 char 
  const hashed = sha1(input)
  const splithash = hashed.match(/.{1,2}/g)

  const baseTenList = splithash.map((hexstr) => parseInt(hexstr, 16))
  const mirrorHalf = Math.round(mirrorN/2)
  // Note splice changes the original list baseTenList as well
  const remaining = baseTenList.splice(mirrorN * mirrorHalf)

  const mirror = []
  for (var i = 0; i < mirrorN; i++) {
    let temp = []
    for (var j = 0; j < mirrorN; j++) {
      if (j < mirrorHalf) {
        temp.push(baseTenList[(i*(mirrorN-1))+j])
      } else {
        temp.push(baseTenList[(i*(mirrorN-1))+(mirrorN-1-j)])
      }
    }
    mirror.push(temp)
  }
  // The following line makes color cooler (blues)
  // ctx.fillStyle = `rgb(${remaining[0]}, ${remaining[1]}, 255)`;
  ctx.fillStyle = `rgb(${remaining[0]}, ${remaining[1]}, ${remaining[2]})`;
  let ctx2 = drawRectangles(mirror, ctx, row, col)

  return writeHash(
    ctx2,
    input,
    row*(identiconXSpacing + internalGridDim) + margin,
    col*(identiconYSpacing + internalGridDim) + internalGridDim
  )
}

function drawRectangles(mirrorList, ctx, row, col) {
  for (var i = 0; i < mirrorList.length; i++) {
    for (var j = 0; j < mirrorList[i].length; j++) {
      if (isEven(mirrorList[i][j])) {
        ctx.fillRect(
          row*(identiconXSpacing + internalGridDim) + j*gridUnit + margin,
          col*(identiconYSpacing + internalGridDim) +  i*gridUnit + margin,
          gridUnit,
          gridUnit
        )
      }
    }
  }
  return ctx
}

function writeHash(ctx, hash, x, y) {
  // ctx.textBaseline = 'bottom'
  ctx.fillStyle = '#2b484c'
  ctx.font = 'bold 50pt Menlo'
  ctx.fillText(`${hash.substring(0,7)}...`, x, y)
}

function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}