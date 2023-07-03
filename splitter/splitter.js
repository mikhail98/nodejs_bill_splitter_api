const mikhail = {_id: 'Mike'}

const violetta = {_id: 'Vio'}

const sergey = {_id: 'Sergey'}

const bill11 = {
    user: mikhail,
    currency: 'PLN',
    payments: [
        {user: mikhail, amount: 374},
        {user: violetta, amount: 373},
        {user: sergey, amount: 373}
    ]
}

const bill12 = {
    user: mikhail,
    currency: 'PLN',
    payments: [
        {user: mikhail, amount: 122},
        {user: violetta, amount: 110},
        {user: sergey, amount: 31}
    ]
}

const bill13 = {
    user: mikhail,
    currency: 'PLN',
    payments: [
        {user: mikhail, amount: 220},
        {user: violetta, amount: 220},
        {user: sergey, amount: 220}
    ]
}

const bill21 = {
    user: sergey,
    currency: 'PLN',
    payments: [
        {user: mikhail, amount: 16},
        {user: violetta, amount: 16},
        {user: sergey, amount: 16}
    ]
}

const bill31 = {
    user: violetta,
    currency: 'PLN',
    payments: [
        {user: mikhail, amount: 60},
        {user: violetta, amount: 60},
        {user: sergey, amount: 10}
    ]
}

const group = {
    users: [mikhail, violetta, sergey],
    bills: [bill11, bill12, bill13, bill21, bill31]
}

function split() {
    let owes = []

    const users = group.users
    for (let userIndex = 0; userIndex < users.length; userIndex++) {
        const userId = users[userIndex]._id
        let userOwed = 0
        let userOwes = 0
        group.bills.forEach(bill => {
            if (bill.user._id === userId) {
                let billTotal = 0
                bill.payments.forEach(payment => {
                    billTotal = billTotal + payment.amount
                })
                userOwed = userOwed + billTotal
            }
            bill.payments.forEach(payment => {
                if (payment.user._id === userId) {
                    userOwes = userOwes + payment.amount
                }
            })
        })
        owes.push({
            _id: userId,
            owes: userOwes - userOwed
        })
    }

    let finalOwes = []

    console.log(owes)
    while (owes.length !== 0) {
        console.log(owes)
        owes = owes.filter(owe => owe.owes !== 0)
        const firstOweIndex = owes.indexOf(owes.find(owe => owe.owes > 0))

        if (firstOweIndex !== -1) {
            const secondOweIndex = owes.indexOf(owes.find(owe => owe.owes < 0))

            const firstOweOwes = owes[firstOweIndex].owes
            const secondOweOwed = -owes[secondOweIndex].owes

            const from = owes[firstOweIndex]._id
            const to = owes[secondOweIndex]._id
            const newOwes = firstOweOwes - secondOweOwed

            let value
            let newOweIndex
            let deleteOweIndex

            if (secondOweOwed >= firstOweOwes) {
                value = firstOweOwes
                newOweIndex = secondOweIndex
                deleteOweIndex = firstOweIndex
            } else {
                value = secondOweOwed
                newOweIndex = firstOweIndex
                deleteOweIndex = secondOweIndex
            }

            finalOwes.push({from: from, to: to, value: value})

            owes[newOweIndex].owes = newOwes
            owes.splice(deleteOweIndex, 1)
        }
    }

    return finalOwes
}


const result = split()
result.forEach(owe => {
    console.log(`${owe.from} -> ${owe.to}: ${owe.value}`)
})
