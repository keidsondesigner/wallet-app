const Modal = {
            
    open(){
        //alert('Abrir Nova Transação?')
        // Abrir Modal
        // Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close(){
        // Fechar o Modal
        // Remover a  class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')

    }
    
}

const Transaction = {
    all: [
        {
        description: 'Luz',
        amount: -50001,
        date: '21/02/2021',
        },
        {
            description: 'Website',
            amount: 500000,
            date: '21/02/2021',
        },
        {
            description: 'Internet',
            amount: -20012,
            date: '21/02/2021',
        },
        {
            description: 'App',
            amount: 200000,
            date: '21/02/2021',
        },
    ],

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },


    incomes() {
        let income = 0;
        // Pegar todas as transacoes
        // Para cada transacao
        Transaction.all.forEach(transaction => {
            // Se ela for maior que zero
            if (transaction.amount > 0) {
                // somar a variavel e retornar a variavel
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        let expense = 0;
        // Pegar todas as transacoes
        // Para cada transacao
        Transaction.all.forEach(transaction => {
            // Se ela for menor que zero
            if (transaction.amount < 0) {
                // somar a variavel e retornar a variavel
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransition(transaction)

        DOM.transactionsContainer.appendChild(tr)

    },
    innerHTMLTransition(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)


        const html = `
        <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="assets/minus.svg" alt="Remover Transação">
        </td>
        `
        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value) {
        value = Number(value) * 100

        return value
    },

    formatDate(date) {
        const splitteDate = date.split("-")
        return `${splitteDate[2]}/${splitteDate[1]}/${splitteDate[0]}`

    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValue() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },


  
    ValidateFields() {
        const {description, amount, date} = Form.getValue()
        
        if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos.")
        }

    },

    formatValues() {
        let {description, amount, date} = Form.getValue()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }

    },

    saveTransaction(transaction) {
        Transaction.add(transaction)
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            // Verificar se todas as informacoes foram preenchidas 
            Form.ValidateFields()
            // formatar os dados para salvar
            const transaction = Form.formatValues(transaction)
            // salvar
            Form.saveTransaction(transaction)
            //Apagar os dados do formulario 
            Form.clearFields()
            // Fechar Modal
            Modal.close()
        } catch (error) {
            alert(error.message)

        }


    }

}

const App = {
    init() {

        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()

    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()



