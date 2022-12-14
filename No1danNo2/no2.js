const benefit = [
    {
        id: 1,
        name: "Gaji Pokok",
        amount: 3000000,
        unit: 12
    },
    {
        id: 2,
        name: "Tunjangan Hari Raya (THR)",
        amount: 0,
        unit: 1
    },
    {
        id: 3,
        name: "Uang makan",
        amount: 100000,
        unit: 12
    },
    {
        id: 4,
        name: "Tunjangan shift",
        amount: 0,
        unit: 0.2
    },
    ]

    const kriteria = [
        {'Gaji Pokok':['Tunjangan Hari Raya (THR)','Tunjangan shift']}
    ];


function copyAmountField () {
    for (let i=0; i<benefit.length; i++){
        if ((benefit[i].name === kriteria[0]["Gaji Pokok"][0]) || (benefit[i].name === kriteria[0]["Gaji Pokok"][1])) {
            benefit[i].amount = 3000000
        }
        benefit[i].unit = 12
    }

    console.log(benefit)
}
   
// execute fungsi menyalin nilai field amount berdasarkan kriteria
copyAmountField()