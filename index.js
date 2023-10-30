const reservas = [
    {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3
    },
    {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4
    },
    {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1
    }
];

// Caso 1

// class ListadoReservas {
//     constructor () {
//         this._reserva = [];
//         this._subtotal = 0;
//         this._total = 0;
//     }

//     precioHabitacion (tipoHabitacion) {
//         switch (tipoHabitacion) {
//             case "standard" : return 100;
//             case "suite" : return 150;
//         }
//     }

//     extras (pax) {
//         if (pax > 1) return 40 * (pax - 1)
//         else return 0;
//     }

//     calculaSubtotal () {
//         this._subtotal = this._reserva.reduce ((acc, { tipoHabitacion, pax, noches }) =>
//             acc + ((this.precioHabitacion(tipoHabitacion) * noches) + this.extras(pax)), 0);
//     }

//     calculaTotal () {
//         this._total = this._subtotal * 1.21;
//     }

//     get subtotal () {
//         return this._subtotal.toFixed(2);
//     }

//     get total() {
//         return this._total.toFixed(2);
//     };

//     set reservasACalcular (reservaExterna) {
//         this._reserva = reservaExterna;
//         this.calculaSubtotal();
//         this.calculaTotal();
//     };
// };

// console.log("- - - - Caso 1 - - - -")
// const listado = new ListadoReservas ();
// listado.reservasACalcular = reservas;
// console.log("Subtotal =", listado.subtotal, "€");
// console.log("Total =", listado.total, "€");

// Caso 2

// class ListadoReservasTourOperador extends ListadoReservas {

//     calculaSubtotal() {
//         this._subtotal = this._reserva.reduce ((acc, { pax, noches }) =>
//         acc + ((100 * noches) + this.extras(pax)), 0);
//     }

//     calculaTotal () {
//         this._total = (this._subtotal * 1.21) - (this._subtotal * 1.21 * 0.15)
//     }
// }

// console.log("- - - - Caso 2 - - - -")
// const listadoTourOperador = new ListadoReservasTourOperador ();
// listadoTourOperador.reservasACalcular = reservas;
// console.log("Subtotal =", listadoTourOperador.subtotal, "€");
// console.log("Total =", listadoTourOperador.total, "€");

// Desafío + ejercicio adicional

class ListadoReservas {
    constructor (prices) {
        this._reserva = [];
        this._subtotal = 0;
        this._total = 0;
        this._prices = prices;
    }

    extras (pax, desayuno, noches) {
        let plus = 0;
        (pax > 1)? plus += (40 * (pax - 1)) : plus += 0;

        desayuno? plus += (15 * pax * noches) : plus += 0;

        return plus;
    }

    get subtotal () {
        return this._subtotal.toFixed(2);
    }

    get total() {
        return this._total.toFixed(2);
    };

    set reservasACalcular (reservaExterna) {
        this._reserva = reservaExterna;
        this.calculaSubtotal();
        this.calculaTotal();
    };
};

class ListadoReservasParticular extends ListadoReservas {
    constructor () {
        super({standard: 100, suite: 150})
    }

    precioHabitacion (tipoHabitacion) {
        switch (tipoHabitacion) {
            case "standard" : return this._prices.standard;
            case "suite" : return this._prices.suite;
        }
    }

    calculaSubtotal () {
        this._subtotal = this._reserva.reduce ((acc, { tipoHabitacion, pax, desayuno, noches }) =>
            acc + ((this.precioHabitacion(tipoHabitacion) * noches) + this.extras(pax, desayuno, noches)), 0);
    }

    calculaTotal () {
        this._total = this._subtotal * 1.21;
    }
}

class ListadoReservasTourOperador extends ListadoReservas {
    constructor () {
        super(100);
    }

    calculaSubtotal() {
        this._subtotal = this._reserva.reduce ((acc, { pax, desayuno, noches }) =>
        acc + ((this._prices * noches) + this.extras(pax, desayuno, noches)), 0);
    }

    calculaTotal () {
        this._total = (this._subtotal * 1.21) - (this._subtotal * 1.21 * 0.15)
    }
}

console.log("- - - - Caso 1 - - - -")
const listado = new ListadoReservasParticular ();
listado.reservasACalcular = reservas;
console.log("Subtotal =", listado.subtotal, "€");
console.log("Total =", listado.total, "€");

console.log("- - - - Caso 2 - - - -")
const listadoTourOperador = new ListadoReservasTourOperador ();
listadoTourOperador.reservasACalcular = reservas;
console.log("Subtotal =", listadoTourOperador.subtotal, "€");
console.log("Total =", listadoTourOperador.total, "€");
