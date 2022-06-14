import { Text, Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { NoEthereumProviderError } from '@web3-react/injected-connector'
import { useEffect, useState } from "react"
import { injected } from "./connectors"

const MissingMetamask = () => {
    const { activate } = useWeb3React()
    
    const [isNoEthereumProviderError, setIsNoEthereumProviderError] = useState(false)

    useEffect(() => {
        const activator = async () => {
            await activate(injected, (err) => {
                if (err instanceof NoEthereumProviderError) {
                    setIsNoEthereumProviderError(true)
                }
            })
        }
        activator()
    }, [])

    return (
        <Modal
            blockScrollOnMount={false}
            isOpen={isNoEthereumProviderError}
            onClose={null}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex justify="center">
                        <Text>Missing Metamask</Text>
                    </Flex>
                </ModalHeader>
                <ModalBody>
                    <Flex justify="center">
                        <Text>Please install Metamask.</Text>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default MissingMetamask