import inMemoryMongoDatabase from '../../utils/inMemoryMongo'
import Product from '../models/Product'

const erroneousTestData = {
    id: '12311',
    brand: 123
}
const incompleteTestData = {
    id: 123,
    brand: 'abbs'
}
const correctTestData = {
    id: 123,
    brand: 'aobo',
    description: 'asdas fasdas dd',
    image: 'http://some.tld/image.jpeg',
    price: 123002
}
describe('Mongoose Model & Schema with in-memory mode', () => {
    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    /**
     * Connect to a new in-memory database before running any tests.
     */
    beforeAll(async () => await inMemoryMongoDatabase.connect());

    /**
     * Clear all test data after every test.
     */
    // afterEach(async () => await inMemoryMongoDatabase.clearDatabase());

    /**
     * Remove and close the db and server.
     */
    afterAll(async () => await inMemoryMongoDatabase.closeDatabase());

    it('should save a Product successfully', async () => {
        const product = new Product(correctTestData)
        const spy = jest.spyOn(product, 'save')

        await product.save()
        expect.assertions(3)
        expect(spy).toBeCalled()
        expect(product).toMatchObject({
            ...correctTestData
        })
        expect(product.id).toBe(correctTestData.id)
    })
    it('should fail to validate new Product', async () => {
        const productWithoutRequiredField = new Product(incompleteTestData)
        expect(productWithoutRequiredField.validate).toThrow()
    })

    it('should fail validation for id', async () => {
        const productWithErronousId = new Product(erroneousTestData)
        expect.assertions(1)
        expect(productWithErronousId.validate).toThrow()
    })
})

describe('MongoDB records', () => {
    it.todo('should return an empty list')
    it.todo('should return one record in an list')
    it.todo('should return many records on a list')
})