# Queue Modelling 

### About

Queue Modelling Software For M\M\C M\G\C G\G\C Distributions. Calculates Length of Queue (Lq), Wait in Queue (Wq), Length of System (Ls), Wait in System (Ws) and Server Utilization provided the required characterisitcs of interarrival and service distributions.

Associated Course: BSCS-507 | Operations Research

### Input Parameters 

1) InterArrival (IA) Distribution
2) Service Distribution
3) Number of Servers
4) Parameters for IA and Service Dist

##### Built using React JS

### Working 

Calculations based on formulas specific to the system selected. Formulas can be found in ``` index.js ``` file of the result component [src/components/Result/index.js]

### Pre-Requisites:

1) Node Package Manager
2) React
4) Modules

* Visit https://docs.npmjs.com/downloading-and-installing-node-js-and-npm to download npm
* Vist https://react.dev/learn/installation to install react
* Type ``` npm install ``` in terminal to download all node modules required

## Images

The attached screenshots show a M/M/C system running on the software

### Home
![home](https://github.com/MuhammadHabibKhan/queue-modelling/blob/main/home.png)

### Input Parameters
![mean](https://github.com/MuhammadHabibKhan/queue-modelling/blob/main/mean.png)

### Results
![result](https://github.com/MuhammadHabibKhan/queue-modelling/blob/main/result.png)

## Possible Improvements:

No warning or handling for Little's Law where if service mean exceeds inter arrival mean, then queue may be infinitely long, resulting in infinite values. 
