const mikhail = {_id: 'Mike'}

const violetta = {_id: 'Vio'}

const sergey = {_id: 'Sergey'}

const bill11 = {
    user: mikhail,
    payments: [
        {user: mikhail, amount: 374},
        {user: violetta, amount: 373},
        {user: sergey, amount: 373}
    ]
}

const bill12 = {
    user: mikhail,
    payments: [
        {user: mikhail, amount: 122},
        {user: violetta, amount: 110},
        {user: sergey, amount: 31}
    ]
}

const bill13 = {
    user: mikhail,
    payments: [
        {user: mikhail, amount: 220},
        {user: violetta, amount: 220},
        {user: sergey, amount: 220}
    ]
}

const bill14 = {
    user: mikhail,
    payments: [
        {user: mikhail, amount: 556},
        {user: violetta, amount: 123},
        {user: sergey, amount: 440}
    ]
}

const bill21 = {
    user: sergey,
    payments: [
        {user: mikhail, amount: 16},
        {user: violetta, amount: 16},
        {user: sergey, amount: 16}
    ]
}

const bill22 = {
    user: sergey,
    payments: [
        {user: mikhail, amount: 180},
        {user: violetta, amount: 180},
        {user: sergey, amount: 180}
    ]
}

const bill31 = {
    user: violetta,
    payments: [
        {user: mikhail, amount: 60},
        {user: violetta, amount: 60},
        {user: sergey, amount: 10}
    ]
}

const bill32 = {
    user: violetta,
    payments: [
        {user: mikhail, amount: 50},
        {user: violetta, amount: 50},
        {user: sergey, amount: 50}
    ]
}

const bill33 = {
    user: violetta,
    payments: [
        {user: mikhail, amount: 48},
        {user: violetta, amount: 37},
        {user: sergey, amount: 45}
    ]
}

const transfer1 = {
    userFromId: violetta._id,
    userToId: mikhail._id,
    amount: 649
}

const transfer2 = {
    userFromId: sergey._id,
    userToId: mikhail._id,
    amount: 602
}

const transfer3 = {
    userFromId: mikhail._id,
    userToId: violetta._id,
    amount: 50
}

const transfer4 = {
    userFromId: sergey._id,
    userToId: violetta._id,
    amount: 50
}

const transfer5 = {
    userFromId: violetta._id,
    userToId: mikhail._id,
    amount: 210
}

const transfer6 = {
    userFromId: sergey._id,
    userToId: mikhail._id,
    amount: 125
}

const group = {
    users: [mikhail, violetta, sergey],
    bills: [
        bill11, bill12, bill13, bill14,
        bill21, bill22, bill31,
        bill32, bill33
    ],
    transfers: [transfer1, transfer2, transfer3, transfer4, transfer5, transfer6]
}

function split() {
    let owesList = []

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

        owesList.push({userId: userId, owes: userOwes - userOwed})
    }

    let finalTransfers = calculateFinalTransfers(owesList)
    owesList = []

    group.transfers.forEach(transfer => {
        const index = finalTransfers.findIndex(finalTransfer => {
            return finalTransfer.userFromId === transfer.userFromId && finalTransfer.userToId === transfer.userToId
        })
        if (index !== -1) {
            finalTransfers[index].amount = finalTransfers[index].amount - transfer.amount
        } else {
            finalTransfers.push({
                userFromId: transfer.userFromId, userToId: transfer.userToId, amount: -transfer.amount
            })
        }
    })

    finalTransfers.forEach(finalOwe => {
        const indexOfFrom = owesList.findIndex(owe => owe.userId === finalOwe.userFromId)
        if (indexOfFrom !== -1) {
            owesList[indexOfFrom].owes = owesList[indexOfFrom].owes + finalOwe.amount
        } else {
            owesList.push({userId: finalOwe.userFromId, owes: finalOwe.amount})
        }

        const indexOfTo = owesList.findIndex(owe => owe.userId === finalOwe.userToId)
        if (indexOfTo !== -1) {
            owesList[indexOfTo].owes = owesList[indexOfTo].owes - finalOwe.amount
        } else {
            owesList.push({userId: finalOwe.userToId, owes: -finalOwe.amount})
        }
    })

    return calculateFinalTransfers(owesList)
}

function calculateFinalTransfers(owesList) {
    let finalOwes = []
    while (owesList.length !== 0) {
        owesList = owesList.filter(owe => owe.owes !== 0)
        const firstOweIndex = owesList.indexOf(owesList.find(owe => owe.owes > 0))

        if (firstOweIndex !== -1) {
            const secondOweIndex = owesList.indexOf(owesList.find(owe => owe.owes < 0))

            const firstOweOwes = owesList[firstOweIndex].owes
            const secondOweOwed = -owesList[secondOweIndex].owes

            let amount
            let newOweIndex
            let deleteOweIndex

            if (secondOweOwed >= firstOweOwes) {
                amount = firstOweOwes
                newOweIndex = secondOweIndex
                deleteOweIndex = firstOweIndex
            } else {
                amount = secondOweOwed
                newOweIndex = firstOweIndex
                deleteOweIndex = secondOweIndex
            }

            finalOwes.push({
                userFromId: owesList[firstOweIndex].userId,
                userToId: owesList[secondOweIndex].userId,
                amount: amount
            })

            owesList[newOweIndex].owes = firstOweOwes - secondOweOwed
            owesList.splice(deleteOweIndex, 1)
        }
    }

    return finalOwes
}

const result = split()
result.forEach(transfer => {
    console.log(`${transfer.userFromId} -> ${transfer.userToId}: ${transfer.amount}`)
})