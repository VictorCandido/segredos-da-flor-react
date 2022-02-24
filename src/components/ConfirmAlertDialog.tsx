import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useRef } from "react";
import ConfirmAlertDialogInterface from "../interfaces/ConfirmAlertDialogInterface";

export default function ConfirmAlertDialog(props: ConfirmAlertDialogInterface) {
  const confirmModalCancelRef = useRef<any>();
  
  return (
        <AlertDialog
            isOpen={ props.isOpen }
            onClose={ props.onClose }
            leastDestructiveRef={confirmModalCancelRef}
            size="xl"
            isCentered
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    { props.title }
                </AlertDialogHeader>

                <AlertDialogBody>
                    { props.message }
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={confirmModalCancelRef} onClick={ props.cancelButtonOnClick }>
                    { props.cancelButtonMessage || 'Cancelar' }
                </Button>
                <Button colorScheme='red' onClick={ props.confirmButtonOnClick } ml={3}>
                    { props.confirmButtonMessage || 'Confirmar' }
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}