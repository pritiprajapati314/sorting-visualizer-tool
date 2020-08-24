let mainArr = [] 
let size = 50;
let range = 49;
let timeSpeed = 100;
let defaultColor = "#79cad9";
let compareColor = "#f2dc6b";
let unorderedColor = "#d4827f";
let orderedColor = "#80cc7e";
let finalColor = "#a893ad"

//Initiatio of slider size and speed

let sizeSlider = document.getElementById("sizeSlider");
let speedSlider = document.getElementById("speedSlider");

sizeSlider.oninput = function() {
    size = this.value * 10;
    generateRandomMainArray();

}

speedSlider.oninput = function(){
    timeSpeed = 500/this.value;
}

//Default value
function setupSortingVisualizer(){
    generateRandomMainArray();
    sizeSlider.value = 5;
    speedSlider.value = 10;
    timpSpeed = 500;
    size = 50;

    document.getElementById("navId").style.backgroundColor = defaultColor;

}

//Disable of other function

function disableButtons(){
    let buttons = document.getElementsByClassName("buttons");

    for(var i = 0; i<buttons.length; i++){
        buttons[i].disabled = true;
        buttons[i].style.color = "grey"
    }
}

// enable buttons
function enableButtons(){
    let buttons = document.getElementsByClassName("buttons");

    for(var i = 0; i<buttons.length; i++){
        buttons[i].disabled = false;
        buttons[i].style.color = null
    }
}

//Generating array
function generateRandomMainArray(){
    let cont = document.getElementById("main");
    while(cont.hasChildNodes()){
        cont.removeChild(cont.childNodes[0]);
    }

    for(let i = 0; i<size; i++){
        mainArr[i] = Math.floor(Math.random()*range)+1;
        let cont = document.getElementById("main");

        let tempName = "bar" + i.toString();
        let tempHeight = (mainArr[i]*8).toString() + "px";
        let wid = (100/size).toString() + "%"
        let colElm = document.createElement("div");
        colElm.className = "column";
        colElm.style.width = wid;

        let barElm = document.createElement("div");
        barElm.className = "bar";
        barElm.id = tempName;

        barElm.style.height = tempHeight;

        colElm.appendChild(barElm);
        cont.appendChild(colElm);
    }
}


























//Animations
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function traverse(){
    for(let i = 0; i<size; i++){
        let temp = "bar" + i.toString();
        document.getElementById(temp).style.backgroundColor = finalColor;
        await sleep(timeSpeed);
    }

}

async function compareBar(i,j){
    let temp1 = "bar" + j.toString();
    let temp2 = "bar" + i.toString();
    
    document.getElementById(temp1).style.backgroundColor = compareColor;
    document.getElementById(temp2).style.backgroundColor = compareColor;
    await sleep(timeSpeed);

}

async function orderedBar(i,j){
    let temp1 = "bar" + j.toString();
    let temp2 = "bar" + i.toString();
    
    document.getElementById(temp1).style.backgroundColor = orderedColor;
    document.getElementById(temp2).style.backgroundColor = orderedColor;
    await sleep(timeSpeed);

}

async function defaultBar(i,j){
    let temp1 = "bar" + j.toString();
    let temp2 = "bar" + i.toString();
    
    document.getElementById(temp1).style.backgroundColor = defaultColor;
    document.getElementById(temp2).style.backgroundColor = defaultColor;
    await sleep(timeSpeed);
}

async function unorderedBar(i, j){
    let temp1 = "bar" + i.toString();
    let temp2 = "bar" + j.toString();
    let temp3 = document.getElementById(temp1).style.height;
    document.getElementById(temp1).style.height = document.getElementById(temp2).style.height;
    document.getElementById(temp2).style.height = temp3;

    document.getElementById(temp1).style.backgroundColor = unorderedColor;
    document.getElementById(temp2).style.backgroundColor = unorderedColor;
    await sleep(timeSpeed);
}


async function compareBarSingle(i){
    let elm = "bar" + i.toString();

    document.getElementById(elm).style.backgroundColor = compareColor;

    await sleep(timeSpeed);
}

async function defaultBarSingle(i){
    let elm = "bar" + i.toString()

    document.getElementById(elm).style.backgroundColor = defaultColor;

    await sleep(timeSpeed);
}

//Merge sort
async function unorderedMerge(temp, i){

    for(let j = 0; j<temp.length; j++){
        var temp1 = "bar" + i.toString();
        document.getElementById(temp1).style.height = (temp[j]*8).toString() + "px";
        i++;
        document.getElementById(temp1).style.backgroundColor = unorderedColor;
        await sleep(timeSpeed);
    }
}



async function defaultMerge(temp, i){

    for(let j = 0; j<temp.length; j++){
        var temp1 = "bar" + i.toString();
        i++;
        document.getElementById(temp1).style.backgroundColor = defaultColor;
        await sleep(timeSpeed);
    }
}





















// algorithms

//Bubble sort
async function bubbleSort(){
    disableButtons();
    for(let i = 0; i<size; i++){
        let flag = true;
        for(let j = 0; j<size-i-1; j++){
            await compareBar(j, j+1);
            if(mainArr[j]>mainArr[j+1]){
                let temp = mainArr[j];
                mainArr[j] = mainArr[j+1];
                mainArr[j+1] = temp;
                flag = false;
                await unorderedBar(j, j+1);
            }
            await orderedBar(j,j+1);
            await defaultBar(j,j+1);
        }
        if(flag)break;
    }
    await traverse();
    enableButtons();
}


//insertion Sort
async function insertionSort(){
    disableButtons();
    for(let i = 1; i<size; i++){
        temp = mainArr[i];
        let j=i-1;
        await compareBar(i, j);
        await defaultBar(i, j);
        while(j>=0 && mainArr[j]>temp){
            await compareBar(j+1, j);
            mainArr[j+1] = mainArr[j];
            await unorderedBar(j+1, j);
            await orderedBar(j+1, j);
            await defaultBar(j+1, j);
            j--;
        }
        mainArr[j+1] = temp;
    }

    await traverse();
    enableButtons();
}


async function intialiseMergeSort(){
    var start = 0;
    var end = size-1;
    disableButtons();
    await mergeSort(start, end);
    await traverse(); 
    enableButtons();
}


async function mergeSort(start, end){
    var mid = Math.floor((start+end)/2);
    if(start < end){
        await mergeSort(start, mid);
        await mergeSort(mid+1, end);
        await merge(start, mid, end);
    }

}

async function merge(start, mid, end){
    var ll = start;
    var ul = mid+1;
    var k = 0;
    var temp = [];
    while(ll<=mid && ul<=end){
        await compareBar(ll, ul);
        await defaultBar(ll, ul);
        if(mainArr[ll] <= mainArr[ul]){
            temp[k] = mainArr[ll];
            ll++;
        }else{
            temp[k] = mainArr[ul];
            ul++;
        }
        k++;
    }
    if(ll>mid){
        while(ul<=end){
            temp[k] = mainArr[ul];
            k++; ul++;
        }
    }
    if(ul>end){
        while(ll<=mid){
            temp[k] = mainArr[ll];
            k++; ll++;
        }
    }
    for(let i = start, j = 0; i<=end; i++, j++){
        mainArr[i] = temp[j]; 
    }
    await unorderedMerge(temp, start);
    await defaultMerge(temp, start);
}



// initaiteQuickSort
async function initiateQuickSort(){
    disableButtons();
    await quickSort(0,size-1);
    await traverse();
    enableButtons();
}

async function quickSort(start, end){
    if(start < end){
        let privot = await partition(start, end);
        await quickSort(start, privot-1);
        await quickSort(privot+1, end);
    }
}

//Quick sort 
async function partition(start, end){
    let privot = start;
    await compareBarSingle(privot);
    while(start < end){
        while(mainArr[start] <= mainArr[privot]){
            await compareBarSingle(start);
            if(start !== privot) await defaultBarSingle(start);
            start++;
        }
        while(mainArr[end] > mainArr[privot]){
            await compareBarSingle(end);
            await defaultBarSingle(end);
            end--;
        }
        if(start<end){
            await unorderedBar(start, end);
            await orderedBar(start, end);
            await defaultBar(start, end);
            let temp = mainArr[start];
            mainArr[start] = mainArr[end];
            mainArr[end] = temp;
        }
    }
    await unorderedBar(privot, end);
    await orderedBar(privot, end);
    await defaultBar(privot, end);
    let temp = mainArr[privot];
    mainArr[privot] = mainArr[end];
    mainArr[end] = temp;

    return end;
}

//Heap Sort
