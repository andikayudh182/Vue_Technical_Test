
const employees = [
    { "nik":"1", "name":"ABIYYU" },
    { "nik":"2", "name":"ADHIKA" },
    { "nik":"3", "name":"AFRIE" },
    { "nik":"4", "name":"ALAM"}
    ];
const selected_employees = [
    { "nik": "1", "name": "ABIYYU" },
    { "nik": "2","name":"ADHIKA"}
];

// cara 1, menggunakan kombinasi looping dengan array splice dan mencocokan dengan variable selected employees
function arraySpliceLoop() {

    for (let i = 0; i< employees.length; i++) {
        if (i < selected_employees.length){
            if ((employees[i].nik === selected_employees[i].nik)&&(employees[i].name === selected_employees[i].name)) 
            {
            employees.splice(i,2)
            }
        
        }
    
    }
    console.log(employees)
}

// cara 2, sama dengan cara 1 hanya ada perbedaan dalam kondisi if menggunakan JSON Stringify
function arraySpliceLoopStringify () {
  
    for (let i = 0; i< employees.length; i++) {
        if (i < selected_employees.length){
            if (JSON.stringify(employees[i]) === JSON.stringify(selected_employees[i])) 
            {
                employees.splice(i,2)
            }
        
        }
    
    }
    console.log(employees)
}


// // cara 3, menggunakan array slice dari index ke 2 
console.log(employees.slice(2))

// // cara 4, menggunakan array slice dari index ke 2 yang didapat dari jumlah index selected_employees
console.log(employees.slice(selected_employees.length))

// running cara 1
arraySpliceLoop()
// running cara 2
arraySpliceLoopStringify()
