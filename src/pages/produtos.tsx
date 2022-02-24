import { Box, Button, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue, useDisclosure, useToast  } from '@chakra-ui/react';
import type { NextPage } from 'next'
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiX } from 'react-icons/fi';
import Product from '../classes/Product';
import ConfirmAlertDialog from '../components/ConfirmAlertDialog';
import MenuSidebar from '../components/MenuSidebar'
import ProductRegisterModal from '../components/ProductRegisterModal';
import { NavigateContext } from '../contexts/NavigateContext';
import { ProductContext } from '../contexts/ProductContext';

const Produtos: NextPage = () => {
  const { isOpen: productModalIsOpen, onOpen: productModalOpenModal, onClose: productModalCloseModal } = useDisclosure();
  const { isOpen: confirmModalIsOpen, onOpen: confirmModalOpenModal, onClose: confirmModalCloseModal } = useDisclosure();

  const [ productsData, setProductsData ] = useState<Array<Product>>([]);
  const [ product, setProduct ] = useState<Product>(new Product());
  
  const { setSelectedPage } = useContext(NavigateContext);
  const { searchProduct, setSearchProduct, filterSearchProducts, saveProduct, getAllProducts, deleteProduct, handleWithCurrencyValue, handleWithShowCurrencyValue } = useContext(ProductContext);

  const toast = useToast();
  
  useEffect(() => {
    handleWithListProducts();
  }, []);

  useEffect(() => {
    setSelectedPage({ key: 'produtos', title: 'Produtos' });
  }, [setSelectedPage]);

  /**
   * Show a custom toast message
   * @param title title of toast
   * @param status status of toast
   */
  function showToast(title: string, status: 'success' | 'error'): void {
    toast({
      title,
      status,
      position: 'top-right',
      variant: 'left-accent'
    });
  }

  /**
   * Shows an error to the user and log it on the console
   * @param message Error message showed to the user and logged on the console
   * @param error Error logged on the console
   */
  function handleWithError(message: string, error: any): void {
    console.log(message);
    console.error(error);
    showToast(message, 'error');
  }

  /**
   * Update the Selected Product state through Product Modal.
   * @param event Changed field`s event
   */
  function handleWithFormUpdate(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value, checked } = event.target;

    const fieldsEvents: any = {
      'code': () => setProduct(new Product(value, product?.name, product?.purchaseValue, product?.saleValue, product?.isProduct, product?.id)),
      'name': () => setProduct(new Product(product?.code, value, product?.purchaseValue, product?.saleValue, product?.isProduct, product?.id)),
      'purchaseValue': () => setProduct(new Product(product?.code, product?.name, handleWithCurrencyValue(value), product?.saleValue, product?.isProduct, product?.id)),
      'saleValue': () => setProduct(new Product(product?.code, product?.name, product?.purchaseValue, handleWithCurrencyValue(value), product?.isProduct, product?.id)),
      'isProduct': () => setProduct(new Product(product?.code, product?.name, product?.purchaseValue, product?.saleValue, checked, product?.id))
    };
    fieldsEvents[name]();
  }

  /**
   * Read a boolean value and return it's value in string
   * @param value boolean value if is a product
   * @returns if true, returns 'Sim', if false returns 'Não'
   */
  const handleWithShowBooleanValue = (value: boolean) => value ? 'Sim' : 'Não';

  /**
   * List all products in Products Table
   */
  async function handleWithListProducts(): Promise<void> {
    try {
      const productsList = await getAllProducts();
      setProductsData(productsList);
    } catch (error) {
      handleWithError('Falha ao listar produtos. Por favor, tente mais tarde.', error);
    }
  }

  /**
   * Function of new product click event. Open the New Product modal.
   */
  function handleWithNewProduct(): void {
    setProduct(new Product());
    productModalOpenModal();
  }

  /**
   * Function of edit product click event. Open the Edit Product modal.
   * @param selectedProduct Editing product
   */
  function handleWithEditProduct(selectedProduct: Product): void {
    setProduct(selectedProduct);
    productModalOpenModal();
  }

  /**
   * Function of delete product click event. Open a confirm dialog.
   * @param selectedProduct Deleting product
   */
  function handleWithDeleteProduct(selectedProduct: Product): void {
    setProduct(selectedProduct);
    confirmModalOpenModal();
  }

  /**
   * Save a new product or update an existing product and update de Product Table.
   */
  async function handleWithSaveProduct(): Promise<void> {
    try {
      await saveProduct(product);
      await handleWithListProducts();
      productModalCloseModal();
      showToast('Produto salvo com sucesso.', 'success');
    } catch (error) {
      handleWithError('Falha ao salvar produto. Por favor, tente mais tarde.', error);
    }
  }

  /**
   * Function of confirm delete product click event. 
   * Detele te selected product and update de Product Table.
   */
  async function handleWithConfirmDeleteProduct(): Promise<void> {
    try {
      await deleteProduct(product);
      await handleWithListProducts();
      confirmModalCloseModal();
      showToast('Produto removido com sucesso.', 'success');
    } catch (error) {
      handleWithError('Falha ao remover produto. Por favor, tente mais tarde.', error);
    }
  }

  return (
    <MenuSidebar>
      <Box borderWidth="1px" borderRadius='lg' p="10px" mb="20px" d="flex" justifyContent="space-between">
        <Button onClick={handleWithNewProduct} leftIcon={<FiPlus />} colorScheme='whatsapp' variant='solid'>
          Novo Produto
        </Button>

        <InputGroup w="20%">
          <InputLeftElement pointerEvents='none'>
            <FiSearch color='gray.300' />
          </InputLeftElement>

          <Input type='text' placeholder='Pesquisar...' bg="white" value={ searchProduct } onChange={ (event: any) => setSearchProduct(event.target.value) } />

          <InputRightElement _hover={{ cursor: 'pointer' }} pointerEvents="all" onClick={() => setSearchProduct('')}>
            <FiX color='gray.300' />
          </InputRightElement>
        </InputGroup>
      </Box>

      <Box borderWidth="1px" borderRadius='lg' p="10px" overflow='auto' bg={ useColorModeValue('white', 'gray.900') }>
        <Table variant='striped' colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Código</Th>
              <Th>Nome</Th>
              <Th>Valor de Compra</Th>
              <Th>Valor de Venda</Th>
              <Th>Produto</Th>
              <Th isNumeric></Th>
            </Tr>
          </Thead>
          <Tbody>
            { filterSearchProducts(productsData).map((product, index) => {
              return (
                <Tr key={index}>
                  <Td isTruncated>{ product.code }</Td>
                  <Td isTruncated>{ product.name }</Td>
                  <Td isTruncated>{ handleWithShowCurrencyValue(product.purchaseValue) }</Td>
                  <Td isTruncated>{ handleWithShowCurrencyValue(product.saleValue) }</Td>
                  <Td isTruncated>{ handleWithShowBooleanValue(product.isProduct) }</Td>
                  <Td isNumeric d="flex" justifyContent="space-around">
                    <IconButton 
                      aria-label='Editar'
                      icon={ <FiEdit2 /> }
                      colorScheme="twitter"
                      variant="ghost"
                      isRound
                      onClick={ () => handleWithEditProduct(product) }
                    />
                    <IconButton 
                      aria-label='Editar'
                      icon={ <FiTrash2 /> }
                      colorScheme="red"
                      variant="ghost"
                      isRound
                      onClick={ () => handleWithDeleteProduct(product) }
                    />
                  </Td>
                </Tr>
              )
            }) }
          </Tbody>
        </Table>
      </Box>

      <ProductRegisterModal 
        isOpen={ productModalIsOpen }
        onClose={ productModalCloseModal }
        saveButtonOnClick={ handleWithSaveProduct }
        handleWithFormUpdate={ handleWithFormUpdate }
        product={ product }
      />

      <ConfirmAlertDialog
        isOpen={ confirmModalIsOpen }
        onClose={ confirmModalCloseModal }
        confirmButtonOnClick={ handleWithConfirmDeleteProduct }
        cancelButtonOnClick={ confirmModalCloseModal }
        title="Remover Produto"
        message={ <div>Tem certeza que deseja remover o produto <strong>{ product.name }</strong>?</div> }
      />
    </MenuSidebar>
  )
}

export default Produtos
