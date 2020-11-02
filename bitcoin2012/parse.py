import csv
import sys
import random
import rhinoscriptsyntax as rs
import ghpythonlib.treehelpers as th
import math

def TSVtoCSV(fileName, fileDestination):
    tabin = csv.reader(open(fileName), dialect=csv.excel_tab)
    commaout = csv.writer(open(fileDestination, 'wb'), dialect=csv.excel)
    for row in tabin:
        commaout.writerow(row)
       
def inputToDimension(input):
    # return int(math.sqrt(float(input)))
    return float(input)**(1./8.)

def buildCSV(fileName):
    chain = []

    with open(fileName) as csvFile:
        reader = csv.reader(csvFile)
        next(reader, None)  # skip the header

        prev = None
        block = []
        maxList = []
        maxValue = 0

        for row in reader:

            if prev is not None and prev!=row[0]:
                maxList.append(maxValue)
                chain.append(block)
                block = []
                maxValue = 0
            # 0- block index, 1 - hash, 12 - input_total (USD)
            headersWeWant =[0, 1, 12]

            row[12] = inputToDimension(row[12])
            if (row[12]) > 0:
               
                # editedRow = [ row[h] for h in headersWeWant ]
                editedRow = row[12]
                block.append(editedRow)
                if row[12] > maxValue:
                    maxValue = row[12]

            prev = row[0]

    return (chain, maxList)


fileName = r'C:\Users\ko Yiu Chung\Desktop\blockchain morphologies\blockchair2012.csv'
chain, maxList = buildCSV(fileName)
maxTree = th.list_to_tree(maxList)
tree = th.list_to_tree(chain)