import Customer from "../classes/Customer";
import CustomerInterface from "../interfaces/CostumerInterface";
import firebase from './Config';

export default class CustomerService implements CustomerInterface {
    private converter = {
        toFirestore(customer: Customer): firebase.firestore.DocumentData {
            return {
                name: customer.name,
                phone: customer.phone,
                mail: customer.mail,
                address: customer.address,
                note: customer.note
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Customer {
            const data = snapshot.data(options)!;
            return new Customer(data.name, data.phone, data.mail, data.address, data.note, snapshot?.id);
        }
    }

    private collection = firebase.firestore().collection('customer').withConverter(this.converter);

    constructor() { }

    async getAll(): Promise<Customer[]> {
        const query = await this.collection.get();
        return query.docs.map(doc => doc.data());
    }
    
    async store(customer: Customer): Promise<Customer | undefined> {
        if (customer?.id) {
            await this.collection.doc(customer.id).set(customer);
            return customer;
        }

        const docRef = await this.collection.add(customer);
        const doc = await docRef.get();
        return doc.data();
    }
    
    async delete(customer: Customer): Promise<void> {
        await this.collection.doc(customer.id).delete();
    }
}