import Product from "../classes/Product";
import ProductInterface from "../interfaces/ProductInterface";
import firebase from './Config';

export default class ProductService implements ProductInterface {
    private converter = {
        toFirestore(product: Product): firebase.firestore.DocumentData {
            return {
                code: product.code,
                name: product.name,
                purchaseValue: product.purchaseValue,
                saleValue: product.saleValue,
                isProduct: product.isProduct
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Product {
            const data = snapshot.data(options)!;
            return new Product(data.code, data.name, data.purchaseValue, data.saleValue, data.isProduct, snapshot?.id);
        }
    }

    private collection = firebase.firestore().collection('products').withConverter(this.converter);

    constructor() {  }

    async getAll(): Promise<Product[]> {
        const query = await this.collection.get();
        return query.docs.map(doc => doc.data());
    }

    async store(product: Product): Promise<Product | undefined> {
        if (product?.id) {
            await this.collection.doc(product.id).set(product);
            return product;
        }

        const docRef = await this.collection.add(product);
        const doc = await docRef.get();
        return doc.data();
    }

    async delete(product: Product): Promise<void> {
        await this.collection.doc(product.id).delete();
    }

}