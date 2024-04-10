// FC
const Test = () => {

}

// Function
const test2 = () => {
 let  num = {
    temp:1,
    temp2:2,
 };
 return num; 
 return {
    temp:1,
    temp2:2,
 };
}
const test3 = => ({
    temp:1,
    temp:2,
});
let num_test4 = {
    temp:1,
    temp2:2,
};
const test4 = () => num_test4;

// Function and Params
const test5 = (num:number) => num;
test5(1)
const test6 = (num:number, num2:number) => num+num2;
test6(1,2);
const test7 = ( props:{temp:number; temp2:number}) => props;
test7(num_test4);
const test8 = ({temp, temp2}:{temp:number; temp2:number}) =>temp + temp2;
test8(num_test4);

// Variable Declaration
let variable_1 = num_test4

variable_1.temp
variable_1.temp2
let {temp, temp2} = num_test4

let array = [1, 2];
let variable_2 = array;
let [val_1, val_2] = array;

let obj = {
    temp11:1,
    temp22:{
        temp221:1,
        temp222:2,
    },
};

let {
    temp11,
    temp22:{temp221, temp222},
}=obj;

temp221;
temp222;

let{
    temp11: temp111,
    temp22: {temp221: a, temp222 b},
}=obj;

temp111;
temp222;

};
