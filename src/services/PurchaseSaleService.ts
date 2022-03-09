import PurchaseSale from "../classes/PurchaseSale";
import PurchaseSaleInterface from "../interfaces/PurchaseSaleInterface";
import firebase from './Config';

export default class PurchaseSaleService implements PurchaseSaleInterface {
    private converter = {
        toFirestore(purchaseSale: PurchaseSale): firebase.firestore.DocumentData {
            return purchaseSale.convertToFirestore();
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): PurchaseSale {
            const data = snapshot.data(options)!;
            return new PurchaseSale(data.type, data.data, data.currentDate, snapshot?.id);
        }
    }

    private collection = firebase.firestore().collection('purchaseSale').withConverter(this.converter);

    constructor() {
    }
    
    async registerSale(purchaseSale: PurchaseSale): Promise<PurchaseSale | undefined> {
        try {
            await this.collection.add(purchaseSale);
            return purchaseSale;
        } catch (error) {
            console.log('[Error] Fail at saving register of purchase/sale to firestore');
            console.error(error);
            throw error;
        }
    }
}