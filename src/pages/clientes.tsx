import { Box, Button, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue, useDisclosure, useToast  } from '@chakra-ui/react';
import type { NextPage } from 'next'
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiX } from 'react-icons/fi';
import { mask, unMask } from 'remask';
import Customer from '../classes/Customer';
import ConfirmAlertDialog from '../components/ConfirmAlertDialog';
import CustomerRegisterModal from '../components/CustomerRegisterModal';
import MenuSidebar from '../components/MenuSidebar'
import { CustomerContext } from '../contexts/CustomerContext';
import { NavigateContext } from '../contexts/NavigateContext';

const Clientes: NextPage = () => {
  const { isOpen: customerModalIsOpen, onOpen: customerModalOpenModal, onClose: customerModalCloseModal } = useDisclosure();
  const { isOpen: confirmModalIsOpen, onOpen: confirmModalOpenModal, onClose: confirmModalCloseModal } = useDisclosure();

  const [ customersData, setCustomersData ] = useState<Array<Customer>>([]);
  const [ customer, setCustomer ] = useState<Customer>(new Customer());
  
  const { setSelectedPage } = useContext(NavigateContext);
  const { searchCustomer, setSearchCustomer, filterSearchCustomers, saveCustomer, listAllCustomers, deleteCustomer } = useContext(CustomerContext);

  const toast = useToast();
  
  useEffect(() => {
    handleWithListCustomers();
  }, []);

  useEffect(() => {
    setSelectedPage({ key: 'clientes', title: 'Clientes' });
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
   * Update the Selected Customer state through Customer Modal.
   * @param event Changed field`s event
   */
  function handleWithFormUpdate(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = event.target;

    const fieldsEvents: any = {
      'name': () => setCustomer(new Customer(value, customer?.phone, customer?.mail, customer?.address, customer?.note, customer?.id)),
      'phone': () => setCustomer(new Customer(customer?.name, mask(unMask(value), ['(99) 9999-9999', '(99) 9 9999-9999']), customer?.mail, customer?.address, customer?.note, customer?.id)),
      'mail': () => setCustomer(new Customer(customer?.name, customer?.phone, value, customer?.address, customer?.note, customer?.id)),
      'address': () => setCustomer(new Customer(customer?.name, customer?.phone, customer?.mail, value, customer?.note, customer?.id)),
      'note': () => setCustomer(new Customer(customer?.name, customer?.phone, customer?.mail, customer?.address, value, customer?.id))
    };
    fieldsEvents[name]();
  }

  /**
   * Checks if all the mandatory field are filled in
   * @returns if the form is valid or not
   */
  function validateForm(): boolean {
    if (!customer.name) {
      handleWithError('Por favor, preencha o nome do cliente!', 'Customer name cannot be empty.');
      return false;
    }

    return true;
  }

  /**
   * List all customers in Customers Table
   */
  async function handleWithListCustomers(): Promise<void> {
    try {
      const customersList = await listAllCustomers();
      setCustomersData(customersList);
    } catch (error) {
      handleWithError('Falha ao listar clientes. Por favor, tente mais tarde.', error);
    }
  }

  /**
   * Function of new customer click event. Open the New Customer modal.
   */
  function handleWithNewCustomer(): void {
    setCustomer(new Customer());
    customerModalOpenModal();
  }

  /**
   * Function of edit customer click event. Open the Edit Customer modal.
   * @param selectedCustomer Editing customer
   */
  function handleWithEditCustomer(selectedCustomer: Customer): void {
    setCustomer(selectedCustomer);
    customerModalOpenModal();
  }

  /**
   * Function of delete customer click event. Open a confirm dialog.
   * @param selectedCustomer Deleting customer
   */
  function handleWithDeleteCustomer(selectedCustomer: Customer): void {
    setCustomer(selectedCustomer);
    confirmModalOpenModal();
  }

  /**
   * Save a new customer or update an existing customer and update de Customer Table.
   */
  async function handleWithSaveCustomer(): Promise<void> {
    try {
      if (validateForm()) {
        await saveCustomer(customer);
        await handleWithListCustomers();
        customerModalCloseModal();
        showToast('Cliente salvo com sucesso.', 'success');
      }
    } catch (error) {
      handleWithError('Falha ao salvar cliente. Por favor, tente mais tarde.', error);
    }
  }

  /**
   * Function of confirm delete customer click event. 
   * Detele te selected customer and update de Customer Table.
   */
  async function handleWithConfirmDeleteCustomer(): Promise<void> {
    try {
      await deleteCustomer(customer);
      await handleWithListCustomers();
      confirmModalCloseModal();
      showToast('Cliente removido com sucesso.', 'success');
    } catch (error) {
      handleWithError('Falha ao remover cliente. Por favor, tente mais tarde.', error);
    }
  }

  return (
    <MenuSidebar>
      <Box borderWidth="1px" borderRadius='lg' p="10px" mb="20px" d="flex" justifyContent="space-between">
        <Button onClick={handleWithNewCustomer} leftIcon={<FiPlus />} colorScheme='whatsapp' variant='solid'>
          Novo Cliente
        </Button>

        <InputGroup w="20%">
          <InputLeftElement pointerEvents='none'>
            <FiSearch color='gray.300' />
          </InputLeftElement>

          <Input type='text' placeholder='Pesquisar...' bg="white" value={ searchCustomer } onChange={ (event: any) => setSearchCustomer(event.target.value) } />

          <InputRightElement _hover={{ cursor: 'pointer' }} pointerEvents="all" onClick={() => setSearchCustomer('')}>
            <FiX color='gray.300' />
          </InputRightElement>
        </InputGroup>
      </Box>

      <Box borderWidth="1px" borderRadius='lg' shadow='md' p="10px" overflow='auto' bg={ useColorModeValue('white', 'gray.900') }>
        <Table variant='striped' colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Telefone</Th>
              <Th>E-mail</Th>
              <Th>Endereço</Th>
              <Th isNumeric></Th>
            </Tr>
          </Thead>
          <Tbody>
            { filterSearchCustomers(customersData).map((customer, index) => {
              return (
                <Tr key={index}>
                  <Td isTruncated>{ customer.name }</Td>
                  <Td isTruncated>{ customer.phone }</Td>
                  <Td isTruncated>{ customer.mail }</Td>
                  <Td isTruncated>{ customer.address }</Td>
                  <Td isNumeric d="flex" justifyContent="space-around">
                    <IconButton 
                      aria-label='Editar'
                      icon={ <FiEdit2 /> }
                      colorScheme="twitter"
                      variant="ghost"
                      isRound
                      onClick={ () => handleWithEditCustomer(customer) }
                    />
                    <IconButton 
                      aria-label='Editar'
                      icon={ <FiTrash2 /> }
                      colorScheme="red"
                      variant="ghost"
                      isRound
                      onClick={ () => handleWithDeleteCustomer(customer) }
                    />
                  </Td>
                </Tr>
              )
            }) }
          </Tbody>
        </Table>
      </Box>

      <CustomerRegisterModal 
        isOpen={ customerModalIsOpen }
        onClose={ customerModalCloseModal }
        saveButtonOnClick={ handleWithSaveCustomer }
        handleWithFormUpdate={ handleWithFormUpdate }
        customer={ customer }
      />

      <ConfirmAlertDialog 
        isOpen={ confirmModalIsOpen }
        onClose={ confirmModalCloseModal }
        confirmButtonOnClick={ handleWithConfirmDeleteCustomer }
        cancelButtonOnClick={ confirmModalCloseModal }
        title="Remover Cliente"
        message={ <div>Tem certeza que deseja remover o cliente <strong>{ customer.name }</strong>?</div> }
      />
    </MenuSidebar>
  )
}

export default Clientes
