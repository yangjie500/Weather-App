export default function testing() {
  interface Person {
    name: string;
    age: number;
    house: string;
    data: object;
    dollar: object;
  }

  interface Part {
    name: string;
    house: string;
    dollar: object;
  }

  interface arr {
    type: string;
    count: number;
  }

  const obj: Person = { name: "John", age: 15, house: "HDB", data: { money: 500, currency: "SGD" }, dollar: [{ type: "$2", count: 50 }] };

  console.log(obj);

  const { dollar } = obj;

  console.log(dollar);
}
